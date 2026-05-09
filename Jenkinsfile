pipeline {
  agent any

  environment {
    // These values should be defined in Jenkins job configuration or as global environment variables.
    URL = "${URL}"
    EMAIL = "${EMAIL}"
    PASSWORD = "${PASSWORD}"
  }

  stages {
    stage('Install') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm ci'
            sh 'npx playwright install'
          } else {
            bat 'npm ci'
            bat 'npx playwright install'
          }
        }
      }
    }

    stage('Run tests') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm run test:ci'
          } else {
            bat 'npm run test:ci'
          }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
