FROM java:openjdk-8-jre-alpine
COPY . /opt/app
WORKDIR /opt/app/CodeNinja502/feed-fetch-service
EXPOSE 8090
CMD ["java", "-jar", "./target/feed-fetch-service-0.0.5.jar"]
