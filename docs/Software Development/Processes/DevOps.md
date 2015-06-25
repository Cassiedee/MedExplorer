# DevOps
![Devops](../../Diagrams/ADS_DevOps.png)

## Source Code Management

The MedExplorer development team is using an internally hosted Enterprise GitHub repository.  The development team is continuously updating the source code baseline as they do their development.

## Continuous Integration

Our continuous integration process uses a Jenkins CI server which is connected to our GitHub source code repository.  It monitors the source files in GitHub and when there is update to the repository, Jenkins builds and deploys new Docker containers to our development/test environment.  Jenkins then runs our automated tests.

## Automated Test

The MedExplorer team is using UnitJS for unit testing the MedExplorer baseline.

## Automated Software Quality

SonarQube is being used to perform automated software quality checks on the baseline.  SonarQube checks the code against the coding standards and languages specific coding issues and provides an automated quality score and an estimate of technical debt for the code baseline.

## Continuous Delivery/Deployment

Our continuous delivery and deployment processes uses Jenkins to automate the creation and deployment of updated Docker containers to the production environment.

## Continuous Monitoring

As shown in our diagram we are using Zabbix to monitor our development/test and production environments.   Zabbix provides the ability to measure response time of the web server, CPU and memory utilization and other system measurements.  Below are pictures of the Zabbix dashbaord and some of the measurement graphs.

###Zabbix Dashboard

![Zabbix Dashboard] (../../Software Development/Screenshots/Continuous-Monitoring/dashboard.png)

###Zabbix Disk Usage

![Zabbix Disk Usage] (../../Software Development/Screenshots/Continuous-Monitoring/diskUsage.png)

### Zabbix Memory Usage

![Zabbix Memory Usage] (../../Software Development/Screenshots/Continuous-Monitoring/memoryUsage.png)

### Zabbix Web Monitoring

![Zabbix Web Monitoring] (../../Software Development/Screenshots/Continuous-Monitoring/webMonitoringPage.png)