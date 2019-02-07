## Install and Run "ProjectHUB"

> `git clone https://github.com/airavata-courses/CodeNinja502.git`
> `git checkout Assignment-1`

### Fetch Microservice

#### Steps to Run "Fetch Microservice"

Requirements: Java, JDK, JRE
 - Download Java, JDK and JRE (if not already installed on your system) from:
   - https://www.oracle.com/technetwork/java/javase/downloads/index.html and 
   - https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html
 - Download the file corresponding to your operating system and run it. Install both JDK and JRE. You can install in any order.
 - Download the file "feed-fetch-service-0.0.1-SNAPSHOT.jar" from https://github.com/airavata-courses/CodeNinja502/blob/pulmath-services/feed-fetch-service-0.0.2.jar and run it.
 - If your OS doesn't allow to run the above JAR file, please change settings of your OS to allow and run software from unidentified sources.
 - After the JAR file is running, to check if the service is running, go to http://localhost:8090/getLinks and you should be getting a JSON response back.
 #### Thank you.


### Upload Service - This service is used to upload information about posts to MongoDB

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
 - upload service will run on port 8082. Can be accessed by localhost:8082/rpc and will require json in request body

### Install and Run Cloud Image Upload Service and Login service
Prerequisites:
	* Node.js
	* npm
	* Check for reference : https://www.npmjs.com/get-npm

Open a new tab in command prompt / terminal
> `cd <directory where repo was cloned>/project-hub/website/backend/`
> `npm install`
> `nodemon app`

### Install and Run React Frontend
Open a new tab in command prompt / terminal
> `cd <directory where repo was cloned>/project-hub/website/backend/`
> `npm install`
> `npm start`
