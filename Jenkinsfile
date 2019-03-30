pipeline{
	agent any
	stages{
		stage('Build'){
			steps{
				sh 'cd ./feed-fetch-service && mvn -B -DskipTests clean package'
			}
		}	
		stage('Test'){
			steps{
				sh 'cd ./feed-fetch-service && mvn test'
				sh 'docker build -t pulmathdocker/fetch-service .'
				sh 'docker push pulmathdocker/fetch-service'
			}
		}
		
	}
}
