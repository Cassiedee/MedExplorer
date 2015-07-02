# ![MedExplorer] (docs/Diagrams/icon_logo_medex_banner.png) MedExplorer

## Publicly-available URL to prototype
http://medexplorer.northropgrumman.com

## Description of the approach used to create the prototype
![Agile User Centered Approach](docs/Diagrams/Agile User Centered%20Approach.png)

Our Agile User-Centered approach ensures ongoing collaboration between development team, users, and stakeholders. To implement our [framework](docs/Software Development/Processes/Readme.md) we first identified the members of [our team and the roles](docs/MedExplorer Development Team.md) they would fulfil. We aligned our team with the RFQ requirements and leveraged our experience from our [Health Division] (http://www.northropgrumman.com/Capabilities/HealthIT/Pages/default.aspx). Our [multidisciplinary team](docs/Pictures/MedExplorer_Team.jpg) is comprised of experienced user experience (UX) designers, product manager (PM), software and test engineers, delivery manager, agile coach, and business owners. Our product, Medicine Explorer, is designed for the general public and clinicians who seek information on pharmaceutical (prescription and over the counter) performance so they can make better health decisions. The product supports [multiple device platforms](docs/Software%20Development/Platform Support.md) and provides searchable information and trends on pharmaceuticals and related adverse effects. Our goal is to provide authoritative, trustworthy, and objective information to our users.

As a team we collaborated to review the RFQ details to ensure we understood the requirements and to set expectations. Part of the activities ([Sprint 0](docs/Pictures/Sprint0activities.jpg)) for the team was to review and analyze multiple data sets and API (Drugs, Devices, Foods) provided at [openFDA](http://open.FDA.gov). As part of the initial research we provided an analysis of the data to the Northrop Grumman Clinical Advisory Group for input as to which sets of information would be more useful by clinicians. We also met with a domain expert in the Health Care industry and representatives from the general public to understand what information would better meet people's needs. This was the groundwork for understanding the user and what information would be of value. Based on feedback, we decided to focus on the data sets associated with Drugs (Adverse Events, Labeling, and Enforcement Reports). As the lead decision maker the PM agreed to this decision and gave the permission to proceed. Our Product Manager played a key role in working with the team to define the level of quality and reviewing and accepting completed backlog items during sprint reviews.

Next the team used the feedback and learning in the initial research phase to develop our [product vision](docs/Vision Statement.md) and [personas](docs/User Centered Design/Personas). We created two personas, [Clinician] (docs/User Centered Design/Personas/Persona_Clinician.png) and [General Public](docs/User Centered Design/Personas/Persona_General_Public.png). Using the personas the Product Manager with the team revised our [product vision](docs/Vision Statement.md) and created a [product name](docs/Pictures/Product Name Brainstorming.jpg). The draft version of our vision helped communicate with users and domain experts the problem we are trying to solve. After a walkthrough of the vision with our stakeholders we were able to refine it with more clarity around who the product is for, what it provides, and its differentiating factors. To create a product name the team brainstormed a list of names that aligned with the vision. We spent time researching name options to ensure it was not already in use or in conflict with an existing product or company, and then using a voting technique, each [team member voted](docs/Pictures/DotVoting.jpg) on their top three favorites. This resulted in our product name, Medicine Explorer or [MedExplorer](http://MedExplorer.northropgrumman.com).

To better understand the needs of the users (Clinicians and General Public), we used proven [user-centered design](docs/User Centered Design/Readme.md) practices to conduct interviews, create user models, and develop style guides so designers and developers better understand the user needs operationally. We also created designs for [multiple devices](docs/User Centered Design/Wireframes/Design Concepts) for users to review. With user input the team generated an initial backlog of stories.

Our [Agile process](docs/Software Development/Processes#agile-user-centered-design) focused on an iterative development approach which included 2 sprints per day and [periodic standups](docs/Pictures/Morning Standup.jpg) to address concerns and impediments as we developed the [prototype](http://medexplorer.northropgrumman.com). Each sprint was comprised of planning, execution, and a review including a demonstration of working functionality and sharing of sprint results such a feedback from users as we continued to validate and improve designs and product features.

Sprint planning was a time for the team to focus on the goal(s) for the sprint. We identified [goals] (docs/Pictures/Sprint Goals.jpg) for each sprint (resulting in a set of goals for each day) and defined tasks for the highest priority stories that supported the sprint goal. Our stories and tasks were placed on our [scrum board] (docs/Pictures/Updated Task Board.jpg) in our [Scrum Room] (docs/Pictures/Scrum Room.jpg). As defects or requested improvements were identified by users and/or stakeholders these were placed on the scrum board as well for prioritization.

During sprint execution team members met with users to conduct [usability](docs/User Centered Design/Research Findings/Focus_Group.pdf) and [expectancy tests](docs/User Centered Design/Research Findings/Expectancy_Tests.pdf). A variety of [human-centered/user design techniques] (docs/User Centered Design/Readme.md) were employed including personas for our two primary user groups (Clinicians and General Public), conducting interviews, facilitating focus groups, conducting expectancy tests and gathering results, conducting generative research, and usability tests for regular feedback from our users. These were helpful techniques for the development team to better understanding the user needs and what they valued. The feedback from the test results and sprint reviews helped the team understand how intuitive the features are, whether layouts need to be modified, and how well the features meet user expectations. During sprint development we used an internal [GitHub Enterprise](docs/Software%20Development/Processes/DevOps.md#source-code-management) server as our configuration management system.  

Our challenge was to identify the "minimum viable product" that we would provide for the first release. This caused us to focus on feature prioritization and move some stories into the [next release](docs/Diagrams/MedExplorer Product Roadmap.png).  We used [open-source technologies](License.md) throughout development and as part of our [DevOps](docs/Software Development/Processes/DevOps.md) practices. Practices included [unit testing](docs/Software%20Development/Processes/DevOps.md#unit-testing-and-automated-test), [continuous integration](docs/Software%20Development/Processes/DevOps.md#continuous-integration), [source code management](docs/Software%20Development/Processes/DevOps.md#source-code-management), and [continuous delivery](docs/Software%20Development/Processes/DevOps.md#continuous-deliverydeployment) and [conintuous monitoring](docs/Software%20Development/Processes/DevOps.md#continuous-monitoring). These practices are critical for product quality and sustainability. Continuous integration played an important role in our development process as we improved testing and continuously deployed code using GitHub after the first several sprints.  We used [Docker](docs/Software%20Development/Processes/DevOps.md#continuous-deliverydeployment) as our container system for our MedExplorer prototype.  Our MedExplorer used a number for modern, [open source](/License.md#open-source-third-party-software-licenses) technologies, including TwitterBootstrap, AngularJS, NodeJS, ExpressJS, Docker, MongoDB, Jenkins and Zabbix as shown in our [technology stack diagram](docs/Diagrams/MedExplorer_TechnologyStack.png). The MedExplorer prototype and underlying platforms, components, and frameworks used on the project were [open source licensed](License.md) and free of charge.

We also included [install procedures](docs/Install Procedures) to support the deploy process. This enabled us to regularly test features as they were developed and build a more sustainable product. Regular demonstrations provided continuous progress and deployment of a working product to our users (internal and [IaaS provider/IBM Softlayer](docs/Software Development/Screenshots/softlayer.png)). Based on sprint review feedback from users and stakeholders, we regularly reprioritized our backlog with focus on the high value items. At the end of each sprint review the Product Manager would accept stories and place these stories in the [Completed Stories] (docs/Pictures/Completed Stories2.jpg) column. Each day we tracked the completed work and discussed our overall progress and any [risks or concerns] (docs/Pictures/SprintReview_RisksConcerns2.jpg) that needed to be addressed.

Our detailed evidence is highlighted [here](docs/Evidence/Readme.md).


