FROM java:8-jdk-alpine

COPY ./target/feed-fetch-service-0.0.5.jar /usr/app/

WORKDIR /usr/app

RUN sh -c 'touch feed-fetch-service-0.0.5.jar'

ENTRYPOINT ["java","-jar","feed-fetch-service-0.0.5.jar"]
