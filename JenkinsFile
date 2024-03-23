pipeline{
    agent any
    tools{
        nodejs 'Node-JS'
    }
    stages{
        stage('Clone Repo'){
            steps{
                git 'https://github.com/devmaxwel/gallery.git'
            }
        }
        stage('Build'){
            steps{
                sh 'npm install'
            }
        }
        stage('Test'){
            steps{
                sh 'npm test'
            }
        }
         stage('Deploy to Heroku'){
            steps{
                withCredentials([usernameColonPassword(credentialsId:'heroku', variable:'HEROKU_CREDENTIALS')]){
                    sh 'git push https://${HEROKU_CREDENTIALS}@git.heroku.com/moringa-gallery-backend.git master'
                }
            }
        }
    }
    post{
        always{
            slackSend channel:'jenkins', color: 'good', message: "Node Gallery Pipeline Message- ${currentBuild.currentResult}  ${env.JOB_NAME} ${env.BUILD_NUMBER} ${BUILD_URL}"
        }
        
    }
}