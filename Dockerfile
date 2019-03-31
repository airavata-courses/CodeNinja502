FROM java:openjdk-8-jre-alpine
COPY . /opt/app
WORKDIR /opt/app/feed-fetch-service
EXPOSE 9090
CMD ["java", "-jar", "./target/feed-fetch-service-0.0.5.jar"]
