# CashOverflow

![] IMAGE/GIF GOES HERE

### About

CashOverflow is a web app aimed at providing a simple, minimalist way to track your budget and transactions.

The app allows users to create budgets for different spending catagories, see how much they've spent in each catagory this month and across previous months, and view trends and spending history from their accounts and credit cards.

### Contributors

- [Brandon Leafman](https://github.com/bleafman)
- [Doris Hui](https://github.com/dorishui)
- [Evelyn Binkard](https://github.com/evelynbinkard)
- [Garrett Welson](https://github.com/garrettwelson)
- [Jordan Dillard](https://github.com/Jordielove)
- [Kevin Bench](https://github.com/kbench09)
- [Mitchell Dill](https://github.com/MitchellDill)
- [Ross F. Calimlim](https://github.com/rcalimlim)

### Tech Stack

CashOverflow was primarily built using ReactJS on the Front End and a NodeJS/Express backend. Deployment was accomplished using Docker and AWS. Other key technologies used are listed below:

<img src="https://lh5.googleusercontent.com/rdAoVdYKOCnmtev6t7DJrEY7mG4iYsRPqeTH0Z-OrlsVmiea3q5SMtOGNSa7HzJcyxcIcelTacG5gPNgyBoIviiNcLbohQAicvpldcfM32Klb_ewouDRd67OtYhUAU1CEZB4rBqB" width="100" />
<img src="https://lh6.googleusercontent.com/tKlT8lGB2bTDqSilr_a2y8vaO-QBUdcUIYASnslf-RAKTxUEiEBq-_gTVBP0irIP1ZWNuSvp1fouOJrQBXUr0joVmBZzNyOec4jBpOyVogPZMOYhPH6YQwYOiLdZnfuaDnFel9rn" width="100" />
<img src="https://cdn-media-1.freecodecamp.org/images/1*FDNeKIUeUnf0XdqHmi7nsw.png" width="100">
<img src="https://camo.githubusercontent.com/a3d5d65f55fd84b8401db7336ebe85506f069ca6/68747470733a2f2f6c68352e676f6f676c6575736572636f6e74656e742e636f6d2f707150525779434d75333943553447414552483358493066726932754a7a4d7465495635742d34714147353636494a576458524142784c6a56316a7764567649442d4e76467733555367794d3846584335775f7941696d597a344659316756456d39365964324a515a682d70596c33336c4870624f49372d332d75546978716758315848526b6572" width="100">
<img src="https://miro.medium.com/max/642/1*ReJCeRt3UrdFp65T8mWs1A.png" width="100">
<img src="https://www.docker.com/sites/default/files/d8/styles/role_icon/public/2019-07/Moby-logo.png?itok=sYH_JEaJ" width="100">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/150px-Amazon_Web_Services_Logo.svg.png" width="100">
<img src="https://cloud.mongodb.com/static/images/mdb_logo.svg" width='100'/>
 
### Technical Challenges / Research
 
Some challenges we ran into while building the app:
 
- Balancing speed of development with best practices -- we made some good choices here to slow things down in the Git workflow and use Travis and work with an existing component library for styling but other choices ended up biting us. Implementing the logic for computing balances and budgets client side and greedily pulling all account data into state ended up actually slowing development and brought unanticapated bugs.

- Authentication was a much larger undertaking than intially expected. Most of the compoents need to be authentication aware and/or render differently depending on authentication state. Took coordination across the team, lead to a lot of hard to test bugs, and the MVP build was still not production grade secure.

# Client Deliverables

Our team strived to meet the expectations of our primary user by organizing deliverables into user stories listed below:

### Minimum Viable Product (MVP)

The MVP requirement was to be able to performantly serve 250 RPS(requests per second) deployed using micro instances.

### How the App Works

Behind the scenes, the app uses Docker Swarm deployed to GCP with a ElasticSearch instance on a manager node and 6 Express servers spread across 5 other swarm nodes to serve 500 RPS/CPS ([test results](https://ldr.io/2KlKOuh)).

The tests used MongoDB deployed on GCP for the backend, PSQL was equally performant for median response time but the spread was much greater (see [DevJournal](https://github.com/lazylowesing/Search-Banner/blob/master/DevJournal.md) on July 29, 2019 for details)

### Future Features

Given time, I'd implement:

- JDBC for live connection between ElasticSearch and database. Would also write enhanced startup script for ElasticSearch, right now index is built manually.

- Refactor and retest PSQL to use horizontal partitioning. I'm reasonably certain it would end up being faster than MongoDB in that scenario and the original wasn't built with ElasticSearch implemented.
