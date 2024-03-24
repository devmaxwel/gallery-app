pipeline{
    agent any
    tools{
        nodejs 'Node-18'
    }
    environment {
        MONGODB_URI = credentials('mongo-db')
        DOCKER_USER_NAME= 'devmaxwel'
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
        stage('Build && push image to docker hub'){
            steps {
                script {
                    echo 'Pushing the image to Docker Hub.....'
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]){
                        sh "docker build -t $DOCKER_USER_NAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG ."
                        sh "echo $PASSWORD | docker login -u $USERNAME --password-stdin"
                        sh "docker push $DOCKER_USER_NAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG"
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