### Introduction
API to mongodb database.
Challenge.
#### API URLs
* Production: `https://mongodb-api-w05f.onrender.com/api/v1`
### Project Support Features
* Users can signup and login to their accounts
* Public (non-authenticated) users can access all causes on the platform
* Authenticated users can access all causes as well as create a new cause, edit their created cause and also delete what they've created.
### Installation Guide
* Clone this repository [here](https://github.com/facuariasla/mongodb-api).
* The develop branch is the most stable branch at any given time, ensure you're working from it.
* Run npm install to install all dependencies
* You can either work with the default mLab database or use your locally installed MongoDB. Do configure to your choice in the application entry file.
* Create an .env file in your project root folder and add your variables. See .env.sample for assistance.
### Usage
* Run npm run dev to start the application.
* Connect to the API using Postman on port 3001.
## Authentication

This API requires authentication using a Bearer token for each request. You should include the token in the Authorization header as follows:
`Authorization: Bearer <your_token_here>`
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/v1/auth/login | To login an existing user account |
| GET | /api/v1/users | To get all users |
| POST | /api/v1/users | To create a new user |
| PUT | /api/v1/users | To update/edit your profile user |
| GET | /api/v1/pets | To get all pets |
| POST | /api/v1/pets | To create a new pet, associated to your account (user) |
| PUT | /api/v1/pets/:petId | To update/edit a single pet |
| DELETE | /api/v1/pets/:petId | To delete a single pet |


### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
* [mongodb](https://www.npmjs.com/package/mongodb/) MongoDB validation to mongo documents
### Authors
* [Facundo Arias](https://github.com/facuariasla)
### License
This project is available for use under the MIT License.