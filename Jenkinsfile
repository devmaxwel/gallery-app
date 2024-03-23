pipeline{
    agent any
    tools{
        nodejs 'Node-18'
        docker 'Docker'
    }
    environment {
        MONGODB_URI = credentials('mongo-db')
        DOCKER_IMAGE_NAME = 'app-gallery'
        DOCKER_IMAGE_TAG = '1.0.0'
    }
    stages{
        stage('Install dependencies'){
            steps{
                sh 'npm install'
            }
        }

        stage('Run application tests'){
            steps{
                sh 'npm test'
            }
        }

        stage('Build docker image'){
            steps{
                script {
                    echo 'Building docker image....'
                    sh "docker build -t $DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG ."
                }
            }
        }

        stage('Push image to docker hub'){
            steps {
                echo 'Pushing the image to Docker Hub.....'
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        docker.image("$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG").push()
                    }
                }
            }
        }
    }
}