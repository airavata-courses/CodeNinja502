pipeline {
    agent any

    stages 
    {
	stage('Building Frontend') {
            steps {
                build 'frontend'
            }
        }
	stage('Building Login Service') {
            steps {
                build 'login_service'
            }
        }
        stage ('Building Upload Service') {
            steps {
                build 'go_basic'
            }
        }

        stage('Building Fetch Service') {
            steps {
               build 'fetch_service_2_ci'
            }
        }
    }
}
