package main

import (
	"context"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"runtime"
	"time"

	"github.com/gorilla/mux"

	consulapi "github.com/hashicorp/consul/api"
	bson "go.mongodb.org/mongo-driver/bson"
	mongo "go.mongodb.org/mongo-driver/mongo"
	options "go.mongodb.org/mongo-driver/mongo/options"
)

type Check struct {
	Ttl      string `json:"TTL,omitempty"`
	Http     string `json:"HTTP,omitempty"`
	Interval string `json:"Interval,omitempty"`
	Script   string `json:"Script,omitempty"`
}

// type Service struct {
// 	Name        string
// 	Port        int
// 	ID          string
// 	ConsulAgent *consul.Agent
// 	Check       *Check
// }
type db struct {
	Cred mediaDB `xml:db`
}

type mediaDB struct {
	Med clients `xml:mediaDB`
}

type clients struct {
	usernamepassword string `xml:clientURI1`
	server           string `xml:clientURI2`
	tru              string `xml:clientURI3`
	rep              string `xml:clientURI4`
}

type DBIDS struct {
	Username string `xml:"DBUID"`
	Password string `xml:"DBPASS"`
}

type Request struct {
	Userid      string  `protobuf:"bytes,1,opt,name=userid,proto3" json:"userid,omitempty"`
	Typeofmedia string  `protobuf:"bytes,2,opt,name=typeofmedia,proto3" json:"typeofmedia,omitempty"`
	Mediaid     string  `protobuf:"bytes,3,opt,name=mediaid,proto3" json:"mediaid,omitempty"`
	URL         string  `protobuf:"bytes,4,opt,name=URL,proto3" json:"URL,omitempty"`
	AOItags     string  `protobuf:"bytes,5,opt,name=AOItags,proto3" json:"AOItags,omitempty"`
	Likes       float32 `protobuf:"fixed32,6,opt,name=likes,proto3" json:"likes,omitempty"`
	Description string  `protobuf:"bytes,7,opt,name=description,proto3" json:"description,omitempty"`
	Date        string  `protobuf:"bytes,8,opt,name=date,proto3" json:"date,omitempty"`
}

// Function that forms the final JSON response
// with appropriate headers
func Respond(w http.ResponseWriter, data map[string]string, httpStatus string) {
	w.Header().Add("Content-Type", "application/json")

	if httpStatus == "OK" {
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusBadRequest)
	}

	json.NewEncoder(w).Encode(data)
}

func Preflight(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")

	w.Header().Set("Access-Control-Allow-Headers", "*")
	// return "OK"
	json.NewEncoder(w).Encode("OK")

}

//this function takes argument from the json body and posts it to DB
func PostToDB(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	var req Request

	err = json.Unmarshal(b, &req)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	//output, err := json.Marshal(request)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	mongoctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	_, filename, _, _ := runtime.Caller(0)
	filename = filename[:len(filename)-7]
	xmlFile, errc := os.Open(filename + "login.xml")

	if errc != nil {
		log.Fatal(errc)
	}

	b, _ = ioutil.ReadAll(xmlFile)
	defer xmlFile.Close()

	var c db
	xml.Unmarshal(b, &c.Cred)

	var uri string
	//uri = "mongodb://" + c.Cred.Username + ":" + c.Cred.Password + "@projecthub.documents.azure.com:10255/?ssl=true"
	uri = "mongodb://" + c.Cred.Med.usernamepassword + "@" + c.Cred.Med.server + "ssl=true"
	//client, _ := mongo.Connect(mongoctx, uri)

	client, _ := mongo.NewClient(options.Client().ApplyURI(uri))

	//for accessing media and counter collections
	collection := client.Database("MediaDB").Collection("media")
	countercollection := client.Database("MediaDB").Collection("counter")

	//getting counter value for media ID

	var Result2 struct {
		Counter float64
	}

	filter := bson.M{"search": "tom"}
	err1 := countercollection.FindOne(mongoctx, filter).Decode(&Result2)
	if err1 != nil {
		log.Fatal(err1)
	}

	newMediaID := Result2.Counter

	//insert operation
	_, err2 := collection.InsertOne(mongoctx, bson.M{"userid": req.Userid, "typeofmedia": req.Typeofmedia, "mediaid": newMediaID, "URL": req.URL, "likes": 0, "comments": "", "aoi": req.AOItags, "date": req.Date, "description": req.Description})

	if err2 != nil {
		log.Fatal(err2)
	}

	//Incrementing the value of counter for media ID

	filter2 := bson.D{{"search", "tom"}}
	update := bson.D{{"$inc", bson.D{{"counter", 1}}}}
	_, err3 := countercollection.UpdateOne(mongoctx, filter2, update)
	if err3 != nil {
		log.Fatal(err3)
	}

	fmt.Println(req)

	success_data := map[string]string{"message": "success"}

	Respond(w, success_data, "OK")
}

func main() {

	router := mux.NewRouter()
	router.HandleFunc("/rpc", Preflight).Methods("OPTIONS")
	router.HandleFunc("/rpc", PostToDB).Methods("POST")
	router.HandleFunc("/rpc", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "HealthCheck", r.URL.Path)
	})

	//////////////Consul Registration/////////////////
	config := consulapi.DefaultConfig()
	consul, _ := consulapi.NewClient(config)
	registration := new(consulapi.AgentServiceRegistration)
	registration.Name = "goService"
	registration.Port = 8082
	registration.Check = new(consulapi.AgentServiceCheck)
	registration.Check.HTTP = "http://localhost:8082/rpc"
	registration.Check.Interval = "5s"

	registration.Check.DeregisterCriticalServiceAfter = "5s"

	consul.Agent().ServiceRegister(registration)

	////////////////////////////////
	// Testing webhook and jenkins
	fmt.Println("[RecoEngine] Starting Go Server at 8082...")
	log.Fatal(http.ListenAndServe(":8082", router))

}
