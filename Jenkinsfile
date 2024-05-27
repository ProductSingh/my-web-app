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
                echo 'Checkout stage completed: Repository cloned'
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
                    def vercelOutput = sh(script: 'vercel --token $VERCEL_TOKEN_STAGING --yes --prod', returnStdout: true).trim()
                    echo "Staging deployment output: ${vercelOutput}"
                    def urlMatch = (vercelOutput =~ /(https:\/\/[^ ]+\.vercel\.app)/)
                    if (urlMatch) {
                        echo "Staging URL: ${urlMatch[0][0]}"
                    } else {
                        echo "Staging URL not found in output."
                    }
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    def vercelOutput = sh(script: 'vercel --token $VERCEL_TOKEN_PRODUCTION --yes --prod', returnStdout: true).trim()
                    echo "Production deployment output: ${vercelOutput}"
                    def urlMatch = (vercelOutput =~ /(https:\/\/[^ ]+\.vercel\.app)/)
                    if (urlMatch) {
                        echo "Production URL: ${urlMatch[0][0]}"
                    } else {
                        echo "Production URL not found in output."
                    }
                }
            }
        }

        stage('Monitoring and Alerting') {
            steps {
                script {
                    echo 'Monitoring and Alerting stage: Placeholder for monitoring tool integration'
                    // Add commands to integrate with Datadog, New Relic, or other monitoring tools
                }
            }
        }
    }
}
