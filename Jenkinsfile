pipeline {
    agent any

    environment {
        VERCEL_TOKEN_STAGING = credentials('vercel-token-staging')
        VERCEL_TOKEN_PRODUCTION = credentials('vercel-token-production')
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/ProductSingh/my-web-app.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    sh 'vercel --token $VERCEL_TOKEN_STAGING --prod'
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    sh 'vercel --token $VERCEL_TOKEN_PRODUCTION --prod'
                }
            }
        }
    }
}
