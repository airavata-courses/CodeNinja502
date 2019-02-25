package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	//bson "github.com/mongodb/mongo-go-driver/bson"

	bson "go.mongodb.org/mongo-driver/bson"
	//mongo "github.com/mongodb/mongo-go-driver/mongo"
	mongo "go.mongodb.org/mongo-driver/mongo"
	options "go.mongodb.org/mongo-driver/mongo/options"
)

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
	//client, _ := mongo.Connect(mongoctx, "mongodb://projecthub1:L03TY9pAulwt6t85yGoPNracwgXgJnWiIfHBKEndePbPGibBK5CZ0e2Y9qMpqiILWz8XHfSxO6hpOTUfXXvHbQ==@projecthub1.documents.azure.com:10255/?ssl=true")
	client, _ := mongo.NewClient(options.Client().ApplyURI("mongodb://projecthub1:L03TY9pAulwt6t85yGoPNracwgXgJnWiIfHBKEndePbPGibBK5CZ0e2Y9qMpqiILWz8XHfSxO6hpOTUfXXvHbQ==@projecthub1.documents.azure.com:10255/?ssl=true"))

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

	fmt.Println("[RecoEngine] Starting Go Server at 8082...")
	log.Fatal(http.ListenAndServe(":8082", router))

}
