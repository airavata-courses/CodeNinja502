FROM openjdk:latest
ADD target/feed-fetch-service-0.0.5.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
EXPOSE 9090
