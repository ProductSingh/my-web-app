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
                    sh 'zip -r build.zip .'
                    archiveArtifacts artifacts: 'build.zip', fingerprint: true
                    echo 'Build stage completed: Dependencies installed and build artifact created'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'npm test'
                    echo 'Test stage completed: All tests ran successfully'
                }
            }
        }

        stage('Code Quality Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    script {
                        sh 'sonar-scanner'
                        echo 'Code Quality Analysis stage completed: SonarQube analysis performed'
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    sh 'vercel --token $VERCEL_TOKEN_STAGING --prod'
                    echo 'Deploy to Staging stage completed: Application deployed to Vercel staging'
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    sh 'vercel --token $VERCEL_TOKEN_PRODUCTION --prod'
                    echo 'Deploy to Production stage completed: Application deployed to Vercel production'
                }
            }
        }
    }
}
