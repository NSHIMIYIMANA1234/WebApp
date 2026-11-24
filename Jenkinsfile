
pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy with Docker') {
            steps {
                sh '''
                    docker build -t coderwanda-webapp:${BUILD_NUMBER} .

                    docker rm -f webapp-container || true

                    docker run -d \
                        --name webapp-container \
                        --restart unless-stopped \
                        -p 3000:3000 \
                        coderwanda-webapp:${BUILD_NUMBER}
                '''
            }
        }
    }
}
