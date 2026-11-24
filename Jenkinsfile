
pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh '''
                    docker run --rm \
                        --volumes-from jenkins \
                        -w "$WORKSPACE" \
                        node:22-alpine npm install
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh '''
                    docker run --rm \
                        --volumes-from jenkins \
                        -w "$WORKSPACE" \
                        node:22-alpine npm test
                '''
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
