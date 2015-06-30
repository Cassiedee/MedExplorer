# Install Procedures

There are three containers to deploy on a Docker container system: the Nodejs 
container, the Mongo Database container, and the Zabbix Continuous Monitoring 
container. This installation procedure assumes that you already have docker 
installed on your system.


## Deployment of Mongo Database container:

The MongoDB container is used by the web application to cache the queries,
results, and other cached items. Follow these steps to deploy the Mongo
container:


1.  First check to see if the mongodb container has already been previously deployed by running:
	
        sudo docker ps -a
	
    If there is a container named 'mongoDB', you can remove it by running:

        sudo docker rm -f mongoDB

    Otherwise, you can move on to the next step.

	
2.  You can now deploy the container by running the following command:

        sudo docker run -d --name mongoDB mongo


## Deployment of Nodejs container:
	
The Nodejs container runs the MedExplorer web application itself. To deploy
this container, follow these steps:


1.  Run the following command to pull the github repository:
    
        git clone http://git.triad.local/NorthropGrumman/MedExplorer.git

    The rest of this readme will assume that the root directory for this git 
    repository is /path/to/MedExplorer

2.  Set up the node modules for the server:

        cd /path/to/MedExplorer/src/server
        npm install

3.  Build the front-end code:

        cd /path/to/MedExplorer/src/client
        npm install
        bower install
        sudo grunt --force
        
4.  Run the following commands to deploy to build and run the nodejs container:

        cd /path/to/MedExplorer/src/server/
        sudo docker build --rm -t <name>/nodejs:centos6 .
        sudo docker run -d -p 80:80 -p 10050:10050 --link mongoDB:mdb --name nodejs <name>/nodejs:centos6
        
    Replace \<name\> with any name you would like, so long as they match in both commands.
    
		
## Deployment of Zabbix Continuous Monitoring container:

This container runs continuous monitoring on our web application. To deploy
this container, follow these steps:

1.  Simply run the following command:
	docker run -d -p 10051:10051 -p 10052:10052 -p 9001:80 -p 2812:2812 
		--name zabbix berngp/docker-zabbix
			
    Zabbix should now be accessible from \<hostname\>:9001/zabbix
	
2.  Next we need to set up Zabbix to monitor our web application. Log into the 
    Zabbix site.
	
3.  At the top of the Zabbix site, go to Configuration -> Hosts -> click on 
    Zabbix Server -> Web scenarios.

4.  At the "Configuration of Web Monitoring" page, click the "Create Scenario" 
    button on the top right corner.

5.  Enter scenario name, "MedExplorer", and select application, "General". 
    Change update interval, if necessary.

6.  Click the "Add" button at the bottom of the page.

7.  Click the "Steps" tab.

8.  Inside the steps box, click the "Add" link.

9.  Enter the necessary information for the URL to listen to and specify the 
    url to listen to (eg: http://localhost:9000/). Click the "Add" button.

10. Add any other steps to monitor a URL.

11. Click update to save the scenario.
