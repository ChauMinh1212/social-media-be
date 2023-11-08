pipeline {

    agent any

    stages {

        stage('Build with Maven') {
            steps {
                echo 'Hello jenkins'
            }
        }
 
    }
    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}