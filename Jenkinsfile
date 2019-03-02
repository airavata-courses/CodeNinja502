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
			}
		}
		stage('Deploy'){
			steps{
				build 'deploy-feed-fetch-service'
			}
		}
	}
}
