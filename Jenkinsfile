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
				sh 'chown "$USER":"$USER" /var/lib/"$USER"/.docker -R'
				sh 'chmod g+rwx "/var/lib/$USER/.docker" -R'
				sh 'docker build -t pulmathdocker/fetch-service .'
				sh 'docker push pulmathdocker/fetch-service'
			}
		}
		stage('Deploy'){
			steps{
				build 'deploy-feed-service'
			}
		}
		
	}
}
