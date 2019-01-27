pipeline {
    agent any

    stages {
        stage('Build Frontend Application') {
            steps {
                echo 'Building Frontend..'
                bat 'cd Frontend'
                bat 'npm i && npm build'
            }
        }
        stage('Build Backend Application') {
            steps {
                echo 'Building Backend..'
                bat 'cd ../Backend'
                bat 'npm i && npm run build'
            }
        }
        stage('Test Frontend Application') {
            steps {
                echo 'Testing Frontend..'
                bat 'cd ../Frontend'
            }
        }
        stage('Test Backend Application') {
            steps {
                echo 'Testing Backend..'
                bat 'cd ../Backend'
                bat 'npm i && npm test'
            }
        }
        stage('Deploy Application') {
            steps {
                echo 'Deploying application'
                bat '../'
                bat 'docker-compose up --build -d'
            }
        }
    }
}