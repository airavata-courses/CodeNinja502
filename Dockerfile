FROM java:8
WORKDIR /
ADD feed-fetch-service/target/feed-fetch-service-0.0.5.jar.jar app.jar
EXPOSE 9090
CMD ["java","-jar","app.jar"]
