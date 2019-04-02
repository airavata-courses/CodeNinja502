FROM openjdk:latest
ADD feed-fetch-service/target/feed-fetch-service-0.0.5.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
EXPOSE 9090
