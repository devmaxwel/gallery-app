pipeline{
    agent any
    tools{
        nodejs 'Node-18'
    }
    environment {
        MONGODB_URI = credentials('mongo-db')
    }
    stages{
        stage('Install Node Modules Packages'){
            steps{
                sh 'npm install'
            }
        }
        stage('Test'){
            steps{
                
                sh 'npm test'
            }
        }
        stage('Build Docker Image'){
            steps{
                echo 'Building docker image....'
            }
        }
        stage('Push to Docker Image Repository'){
            steps{
                echo 'deploying the image to docker.....'
            }
        }
        stage('Deploy to Heroku'){
            steps{
                echo 'deploying the image to production environment.....'
            }
        }
    }
    // post{
    //     always{
    //         slackSend channel:'jenkins', color: 'good', message: "Node Gallery Pipeline Message- ${currentBuild.currentResult}  ${env.JOB_NAME} ${env.BUILD_NUMBER} ${BUILD_URL}"
    //     }
        
    // }
}