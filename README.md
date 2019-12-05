#Prerequisite:
sudo apt-get update
sudo apt install build-essential apt-transport-https lsb-release ca-certificates curl
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:

1.	run ```git clone [repository]```
2.	unzip ```node_modules.zip``` inside the root folder 
3.	run ```npm run dev``` to start the dev server Now a local http server is runnning in the root directory. ```https://localhost:8888```

## Develop
1. run ```npm run dev``` to start the dev server Now a local http server is runnning in the root directory. ```https://localhost:8888```
2. start api-hackathon-graphql repository and run ```npm run start:dev ``` to start a GraphQL API. Example for GraphiQL at ```http://localhost:3000```
3. run ```npm run test:watch``` to run web component test oder  run ```npm test``