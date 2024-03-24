pipeline{
    agent any
    tools{
        nodejs 'Node-18'
    }
    environment {
        MONGODB_URI = credentials('mongo-db')
        DOCKER_IMAGE_NAME = 'app-gallery'
        DOCKER_IMAGE_TAG = '1.0.0'
    }
    stages{
        stage('Get App version') {
            steps {
                script {
                    APP_VERSION = sh "git describe --tags --abbrev=0"
                }
            }
        }
        stage('Install dependencies'){
            steps{
                echo "The App version is $GIT_APP_VERSION"
                sh 'npm install'
            }
        }
        stage('Run application tests'){
            steps{
                sh 'npm test'
            }
        }
        stage('Build && Push image to docker hub'){
            steps {
                script {
                    echo 'building and pushing the image to docker hub.....'
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]){
                        sh "docker build -t $USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG ."
                        sh "echo $PASSWORD | docker login -u $USERNAME --password-stdin"
                        sh "docker push $USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG"
                    }
                }
            }
        }
        stage('Deploy to Prod'){
            steps{
                echo 'Deploy to Production Env....'
            }
        }
    }
    // post{
    //     always{
    //         // irregardles of the post job status
    //         // like sendig an email to the dev team
    //     }
    //     failure{
    //         // when a job fais
    //     }
    //     success{
    //         // 
    //     }
    // }
}

// stage("build"){
//     when{
//         expression{
//             // the expression
//         }
//     }
//     steps{

//     }
// }