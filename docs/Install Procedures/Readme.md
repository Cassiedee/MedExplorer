# Install Procedures

There are three containers to deploy on a Docker container system: the Nodejs container, the 
Mongo Database container, and the Zabbix Continuous Monitoring container. This
installation procedure assumes that you already have docker installed on your
system.

===============================================================================
Deployment of Mongo Database container:
===============================================================================

The MongoDB container is used by the web application to cache the queries,
results, and other cached items. Follow these steps to deploy the Mongo
container:


1.  First check to see if the mongodb container has already been previously 
    deployed by running:
		
		sudo docker ps -a
	
	If there is a container named 'mongoDB', you can remove it by running:
		
		sudo docker rm -f mongoDB
		
	Otherwise, you can move on to the next step.

	
2.  You can now deploy the container by running the following command:
		
		sudo docker run -d --name mongoDB mongo


===============================================================================
Deployment of Nodejs container:
===============================================================================
	
The Nodejs container runs the MedExplorer web application itself. To deploy
this container, follow these steps:


1.  SSH into the development server as fdaexplorer. The ip address is 
    10.2.101.112. Then run the script:
    
        sudo sh /home/fdaexplorer/docker_ws/scripts/DEPLOY_TO_SL.sh.
	
    This will send the the docker image currently on jenkins to the SoftLayer server.
		
2.  SSH into the Softlayer server as sstulga. The ip address is 208.43.120.198.
    Then run the script:
    
        sudo sh /home/sstulga/docker_ws/scripts/DEPLOY_FROM_DEV.sh.
	
    This will deploy the image sent from the development server.

		
===============================================================================
Deployment of Zabbix Continuous Monitoring container:
===============================================================================

This container runs continuous monitoring on our web application. To deploy
this container, follow these steps:

1.  Simply run the following command:
		docker run -d -p 10051:10051 -p 10052:10052 -p 9001:80 -p 2812:2812 
		    --name zabbix  berngp/docker-zabbix
			
	Zabbix should now be accessible from 208.43.120.198:9001
	
	
2.  Next we need to set up Zabbix to monitor our web application. Log into the 
    Zabbix site.
	
	
3.  At the top of the Zabix site, go to Configuration -> Hosts -> click on 
    Zabbix Server -> Web scenarios.

2.  At the "Configuration of Web Monitoring" page, click the "Create Scenario" 
    button on the top right corner.

3.  Enter scenario name, "MedExplorer", and select application, "General". 
    Change update interval, if necessary.

4.  Click the "Add" button at the bottom of the page.

5.  Click the "Steps" tab.

6.  Inside the steps box, click the "Add" link.

7.  Enter the necessary information for the URL to listen to and specify the 
    url to listen to. Example http://localhost:9000/. Click the "Add" button.

8.  Add any other steps to monitor a URL.

9.  Click update to save the scenario.
