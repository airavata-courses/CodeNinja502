FROM java:8
EXPOSE 9090
COPY . /opt/app
WORKDIR /opt/app/feed-fetch-service
ENTRYPOINT ["java","-jar","target/feed-fetch-service-0.0.5.jar"]
