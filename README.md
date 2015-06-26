Publicly-available URL to prototype: http://medexplorer.northropgrumman.com 
# ![MedExplorer] (docs/Diagrams/icon_logo_medex_banner.png) MedExplorer
![Agile User Centered Approach](docs/Diagrams/Agile User Centered%20Approach.png)

Our Agile User-Centered approach ensures ongoing collaboration between development team, users, and stakeholders. To implement our [framework](docs/Software Development/Processes/Readme.md) we first identified the members of [our team and the roles](docs/MedExplorer Development Team.md) they would fulfil. Our [multidisciplinary team](docs/Pictures/MedExplorer_Team.jpg) is comprised of experienced user experience (UX) designers, [product manager (PM)](docs/MedExplorer Development Team.md), software and test engineers, delivery manager, agile coach, and business owners. Our product, Medicine Explorer, is designed for the general public and clinicians who seek information on pharmaceutical (prescription and over the counter) performance so they can make better health decisions. The product supports [multiple device platforms](docs/Software Development/Screenshots/Platforms) and provides searchable information and trends on pharmaceuticals and related adverse effects. Our goal is to provide authoritative, trustworthy, and objective information to our users.

With the team we collaborated to review the RFQ details to ensure we understood the requirements and to set expectations. Part of the activities ([Sprint 0](docs/Pictures/Sprint0activities.jpg)) for the team was to review and analyze multiple data sets and API (Drugs, Devices, Foods) provided at [openFDA](http://open.FDA.gov). As part of the initial research we provided an analysis of the data to the Northrop Grumman Corporate Medical Advisory Board for input as to which sets of information would be more useful by clinicians. We also met with a domain expert in the Health Care industry and representatives from the general public to understand what information would better met their needs. This was the groundwork for understanding the user and what information would be of value. Based on feedback, we decided to focus on the data sets associated with Drugs (Adverse Events, Labeling, and Enforcement Reports). As the lead decision maker the PM agreed to this decision and gave the permission to proceed.

Next the team used the feedback and learning in the initial research phase to develop our [product vision](docs/Vision Statement.md) and [personas](docs/User Centered Design/Personas). We created two personas, [Clinician] (docs/User Centered Design/Personas/Persona_Clinician.png) and [General Public](docs/User Centered Design/Personas/Persona_General_Public.png). Using the personas the Product Manager with the team revised our [product vision](docs/Vision Statement.md) and created a [product name](docs/Pictures/Product Name Brainstorming.jpg). The draft version of our vision helped communicate with users and domain experts the problem we are trying to solve. After a walkthrough of the vision with our stakeholders we were able to refine it with more clarity around who the product is for, what it provides, and its differentiating factors. To create a product name the team brainstormed a list of names that aligned with the vision. We spent time researching name options to ensure it was not already in use or in conflict with an existing product or company, and then using a voting technique, each [team member voted](docs/Pictures/DotVoting.jpg) on their top three favorites. This resulted in our product name, Medicine Explorer or [MedExplorer](http://MedExplorer.northropgrumman.com).

To better understand the needs of the users (Clinicians and General Public), we used proven [user-centered design](docs/User Centered Design/Readme.md) practices to conduct interviews, create user models, and develop style guides so designers and developers better understand the user needs operationally. We also created designs for [multiple devices](docs/Software Development/Screenshots/Platforms) for users to review. With user input the team generated an initial backlog of stories.

Our [Agile process](docs/Software Development/Processes#agile-user-centered-design) focused on iterative development which included 2 sprints per day and [periodic standups](docs/Pictures/Morning Standup.jpg) to address concerns and impediments as we developed the [prototype](http://medexplorer.northropgrumman.com). Each sprint was comprised of planning, execution, and a review including a demonstration of working functionality and sharing of sprint results such a feedback from users as we continued to validate designs and results.

Sprint planning was a time to focus on the goal(s) for the sprint. During sprint execution team members met with users to conduct [usability](docs/User Centered Design/Research Findings/Focus_Group.pdf) and [expectancy tests](docs/User Centered Design/Research Findings/Expectancy_Tests.pdf). These tests helped the team understand how intuitive the features are, whether layouts need to be modified, and how well the features meet user expectations. Our challenge was to identify the "minimum viable product" that we would provide for the first release. This caused us to focus on feature prioritization and move some stories into the [next release](docs/Diagrams/MedExplorer Product Roadmap.png).  We used [open-source technologies](License.md) throughout development and as part of our [DevOps](docs/Software Development/Processes/DevOps.md) practices. Practices included [unit testing](docs/Software%20Development/Processes/DevOps.md#automated-test), [continuous integration](docs/Software%20Development/Processes/DevOps.md#continuous-integration), [source code management](docs/Software%20Development/Processes/DevOps.md#source-code-management), and [continuous delivery](docs/Software%20Development/Processes/DevOps.md#continuous-deliverydeployment) and [monitoring](docs/Software%20Development/Processes/DevOps.md#continuous-monitoring). We also included [install procedures](docs/Install Procedures) to support the deploy process. This enabled us to regularly test features as they were developed and build a more sustainable product. Regular demonstrations provided continuous progress of a working product to our users (internal and __IaaS provider__). Based on review feedback, we regularly reprioritized our backlog with focus on the high value items. Our detailed evidence is highlighted below.

****
## Approach Criteria Evidence
|#|criteria |evidence #1|evidence URL |
|---|---------|-----------|------------|
|1|assigned one leader, gave that person authority and responsibility, and held that person accountable for the quality of the prototype submitted|"We assigned our Product Manager (Ray R.) and gave him the authority, responsibility, and accountability for the MedExplorer prototype. 
Digital Playbook# 6 Assign one leader and hold that person accountable"|(docs/MedExplorer%20Development%20Team.md)
|2|assembled a multidisciplinary and collaborative team including a minimum of 5 labor categories from the Development Pool labor categories to design and develop the prototype|"Our MedExplorer development team used 10 of the labor categories to design and develop the prototype.

Digital Playbook#7 Bring in experienced teams"|(docs/MedExplorer%20Development%20Team.md)
|3|understand what people need, by including people in the prototype development and design process|"Our User Experience design team interviewed and performed user tests with a number for General Public and Clinician users.Users participated in  periodic demonstrations for feedback. Created scenarios and stories.
Digital Playbook#1: Understand what people need"|(docs/User%20Centered%20Design/User%20Centered%20Design.md) (docs/Software%20Development/User-Stories)
|4|used at least three "human-centered design" techniques or tools|"Our User Centered Design approach used a number of techniques and tools, including interviews, focus groups, expextancy tests, generative research, and usability tests.
Digital Playbook#3 Make it simple and intuitive"|(docs/User%20Centered%20Design/User%20Centered%20Design.md)
|5|created or used a design style guide and/or a pattern library|"Our UX team created a design style guide to provide guidance for the web front end developers.
Digital Playbook#3 Make it simple and intuitive"|
|6|performed usability tests with people|"Our UX team performed a number of usabiilty tests with users and provided feedback to the development staff.
Digital Playbook#4 Build the service using agile and iterative practices"|(docs/User%20Centered%20Design/Research%20Findings/Generative_Research.pdf)
|7|used an iterative approach, where feedback informed subsequent work or versions of the prototype|"Our UX team performed a number of usabiilty tests with users and provided feedback to the development staff.
Digital Playbook#4 Build the service using agile and iterative practices"|(docs/User%20Centered%20Design/Research%20Findings/Generative_Research.pdf)
|8|created a prototype that works on multiple devices, and presents a responsive design|"Our MedExplorer prototype was desing for multiple platforms including PCs, laptops, tablets, and phones.
Digital Playbook#2 Address the whole experience, from start to finish
Digital Playbook#7 Bring in experienced teams"|[TODO: need screenshots and pictures for multiple platforms]
|9|used at least five modern and open-source technologies, regardless of architectural layer (frontend, backend, etc.)|"Our MedExplorer used a number for modern, open source tecnologies, including TwitterBootstrap, AngularJS, NodeJS, ExpressJS, Docker, MongoDB, Jenkins and Zabbix.
Digital Playbook#8 Choose a modern technology stack"|(License.md#open-source-third-party-software-licenses)
|10|deployed the prototype on an Infrastructure as a Service (IaaS) or Platform as a Service (PaaS) provider, and indicated which provider they used|"Our MedExplorer prototype is deployed on a IaaS provider, we selected IBM SoftLayers as our provider.
Digital Playbook#9 Deploy in a flexible hosting environment"|http://MedExplorer.northropgrumman.com/
|11|wrote unit tests for their code|"Our development wrote unit tests for their code.
Digital Playbook#10 Automate testing and deployments"|(src/client/test)
|12|set up or used a continuous integration system to automate the running of tests and continuously deployed their code to their IaaS or PaaS provider|"Our development team used Jenkins for our continuous integration system to automated running of tests and to perform continuous deployment.
Digital Playbook#10 Automate testing and deployments"|(docs/Software%20Development/Screenshots#jenkins)
|13|set up or used configuration management|"We used an internal GitHub Enterprise server as our configuration management systems.
Digital Playbook#4 Build the service using agile and iterative practices"|(docs/Software%20Development/Screenshots#github)
|14|set up or used continuous monitoring|"We setup and used Zabbix to perform continuous monitoring of our development/test environment and our production environment.
Digital Playbook#12 Use data to drive decisions"|http://medexplorer.northropgrumman.com:9001/zabbix/dashboard.php
|15|deploy their software in a container (i.e., utilized operating-system-level virtualization)|"We used Docker as our container system for our MedExplorer prototype.
Digital Playbook#4 Build the service using agile and iterative practices
Digital Playbook#9 Deploy in a flexible hosting environment"|TODO: Need docker screenshot.
|16|make use of a API, by either consuming or providing one RESTfully.|"For our MedExplorer prototype, we used the openFDA API for Drug Labeling, Drug Enforcement Reports, and Drug Adverse Events.
Digital Playbook#13 Default to open"|(src/server/controllers/datasource.js)
|17|used an iterative approach, where feedback informed subsequent work or versions of the prototype|"Our UX team performed a number of usabiilty tests with users and provided feedback to the development staff.
Digital Playbook#4 Build the service using agile and iterative practices"|(docs/User%20Centered%20Design/Research%20Findings/Generative_Research.pdf)
|18|provided sufficient documentation to install and run their prototype on another machine|"We have provided instructions for installing MedExplorer in your own Docker container system.
Digital Playbook#9 Deploy in a flexible hosting environment"|(/docs/Install%20Procedures)
|19|prototype and underlying platforms used to create and run the prototype are openly licensed and free of charge|"The MedExplorer prototype and underlying platforms, components, and frameworks used on the project were open source licensed and free of charge.
Digital Playbook#13 Default to open"|(License.md)

****
## Approach Criteria Evidence
|#|criteria |evidence #1|evidence URL |
|---|---------|-----------|------------|
|1|assigned one leader, gave that person authority and responsibility, and held that person accountable for the quality of the prototype submitted|"We assigned our Product Manager (Ray R.) and gave him the authority, responsibility, and accountability for the MedExplorer prototype. 
Digital Playbook# 6 Assign one leader and hold that person accountable"|(docs/MedExplorer%20Development%20Team.md)
|2|assembled a multidisciplinary and collaborative team including a minimum of 5 labor categories from the Development Pool labor categories to design and develop the prototype|"Our MedExplorer development team used 10 of the labor categories to design and develop the prototype.

Digital Playbook#7 Bring in experienced teams"|(docs/MedExplorer%20Development%20Team.md)
|3|understand what people need, by including people in the prototype development and design process|"Our User Experience design team interviewed and performed user tests with a number for General Public and Clinician users.Users participated in  periodic demonstrations for feedback. Created scenarios and stories.
Digital Playbook#1: Understand what people need"|(docs/User%20Centered%20Design/User%20Centered%20Design.md) (docs/Software%20Development/User-Stories)
|4|used at least three "human-centered design" techniques or tools|"Our User Centered Design approach used a number of techniques and tools, including interviews, focus groups, expextancy tests, generative research, and usability tests.
Digital Playbook#3 Make it simple and intuitive"|(docs/User%20Centered%20Design/User%20Centered%20Design.md)
|5|created or used a design style guide and/or a pattern library|"Our UX team created a design style guide to provide guidance for the web front end developers.
Digital Playbook#3 Make it simple and intuitive"|
|6|performed usability tests with people|"Our UX team performed a number of usabiilty tests with users and provided feedback to the development staff.
Digital Playbook#4 Build the service using agile and iterative practices"|(docs/User%20Centered%20Design/Research%20Findings/Generative_Research.pdf)
|7|used an iterative approach, where feedback informed subsequent work or versions of the prototype|"Our UX team performed a number of usabiilty tests with users and provided feedback to the development staff.
Digital Playbook#4 Build the service using agile and iterative practices"|(docs/User%20Centered%20Design/Research%20Findings/Generative_Research.pdf)
|8|created a prototype that works on multiple devices, and presents a responsive design|"Our MedExplorer prototype was desing for multiple platforms including PCs, laptops, tablets, and phones.
Digital Playbook#2 Address the whole experience, from start to finish
Digital Playbook#7 Bring in experienced teams"|[TODO: need screenshots and pictures for multiple platforms]
|9|used at least five modern and open-source technologies, regardless of architectural layer (frontend, backend, etc.)|"Our MedExplorer used a number for modern, open source tecnologies, including TwitterBootstrap, AngularJS, NodeJS, ExpressJS, Docker, MongoDB, Jenkins and Zabbix.
Digital Playbook#8 Choose a modern technology stack"|(License.md#open-source-third-party-software-licenses)
|10|deployed the prototype on an Infrastructure as a Service (IaaS) or Platform as a Service (PaaS) provider, and indicated which provider they used|"Our MedExplorer prototype is deployed on a IaaS provider, we selected IBM SoftLayers as our provider.
Digital Playbook#9 Deploy in a flexible hosting environment"|http://MedExplorer.northropgrumman.com/
|11|wrote unit tests for their code|"Our development wrote unit tests for their code.
Digital Playbook#10 Automate testing and deployments"|(src/client/test)
|12|set up or used a continuous integration system to automate the running of tests and continuously deployed their code to their IaaS or PaaS provider|"Our development team used Jenkins for our continuous integration system to automated running of tests and to perform continuous deployment.
Digital Playbook#10 Automate testing and deployments"|(docs/Software%20Development/Screenshots#jenkins)
|13|set up or used configuration management|"We used an internal GitHub Enterprise server as our configuration management systems.
Digital Playbook#4 Build the service using agile and iterative practices"|(docs/Software%20Development/Screenshots#github)
|14|set up or used continuous monitoring|"We setup and used Zabbix to perform continuous monitoring of our development/test environment and our production environment.
Digital Playbook#12 Use data to drive decisions"|http://medexplorer.northropgrumman.com:9001/zabbix/dashboard.php
|15|deploy their software in a container (i.e., utilized operating-system-level virtualization)|"We used Docker as our container system for our MedExplorer prototype.
Digital Playbook#4 Build the service using agile and iterative practices
Digital Playbook#9 Deploy in a flexible hosting environment"|TODO: Need docker screenshot.
|16|make use of a API, by either consuming or providing one RESTfully.|"For our MedExplorer prototype, we used the openFDA API for Drug Labeling, Drug Enforcement Reports, and Drug Adverse Events.
Digital Playbook#13 Default to open"|(src/server/controllers/datasource.js)
|17|used an iterative approach, where feedback informed subsequent work or versions of the prototype|"Our UX team performed a number of usabiilty tests with users and provided feedback to the development staff.
Digital Playbook#4 Build the service using agile and iterative practices"|(docs/User%20Centered%20Design/Research%20Findings/Generative_Research.pdf)
|18|provided sufficient documentation to install and run their prototype on another machine|"We have provided instructions for installing MedExplorer in your own Docker container system.
Digital Playbook#9 Deploy in a flexible hosting environment"|(/docs/Install%20Procedures)
|19|prototype and underlying platforms used to create and run the prototype are openly licensed and free of charge|"The MedExplorer prototype and underlying platforms, components, and frameworks used on the project were open source licensed and free of charge.
Digital Playbook#13 Default to open"|(License.md)