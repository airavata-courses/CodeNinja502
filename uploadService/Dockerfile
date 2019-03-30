FROM golang:onbuild 
RUN mkdir /app 
ADD . /app/ 
WORKDIR /app 
RUN go get "go.mongodb.org/mongo-driver/bson"
RUN go get "go.mongodb.org/mongo-driver/mongo"
RUN go get "go.mongodb.org/mongo-driver/bson" 
RUN go build -o main . 


EXPOSE 8082
CMD ["/app/main"]
