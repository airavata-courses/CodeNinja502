## Install and Run "ProjectHUB"

### Fetch Microservice

#### Steps to Run "Fetch Microservice"

Requirements: Java and Maven
 - Download Java, JDK and JRE from:https://www.oracle.com/technetwork/java/javase/downloads/index.html and https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html
 - Download the file corresponding to your operating system and run it.
 - Download the file "feed-fetch-service-0.0.1-SNAPSHOT.jar" from https://github.com/airavata-courses/CodeNinja502/blob/pulmath-services/feed-fetch-service-0.0.1-SNAPSHOT.jar and run it.
 - The service is running.
 #### Thank you.


### Upload Service - This service is used to upload information about posts to mongoDB

Requirements: Go and plugins

- Install Go and set GOPATH
	Refer: https://golang.org/doc/install
 - Setup environmental variables for Go as referred in https://golang.org/doc/install
 - Verify by going to cmd(windows), terminal(linux,mac) by typing 'go' command.
 - Run following commands- <br />
 go get "github.com/gorilla/mux" <br />
 go get "github.com/mongodb/mongo-go-driver/mongo" <br />
 go get "github.com/mongodb/mongo-go-driver/bson" <br />
 
 - In cmd/terminal, go to the folder "uploadService" where main.go is located.
 - Run following commands:
  go build <br />
  go run "main.go" <br />
  
 ____upload service will run on port 8082. Can be accessed by localhost:8082/rpc and will require json in request body___
