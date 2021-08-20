# CHALLENGE 1

> This API helps you to upload a large number of data sets, validate the records and commit the data to your DB

---

## Getting Started

1. git clone this repository && cd to the project directory

## Pre-requisites

- Node.js
- Nest.js
- Git
- Postgres
- VSCode or even any other code editor of your prefered choice.

## Installing

- Install [Node.js](https://nodejs.org/en/download/) if you dont have it installed.
- Install [Nest.js](https://nestjs.com) if you dont have it installed.
- Install [Postgres](https://www.postgresql.org) if you dont have it installed.
- Install [Git](https://www.digitalocean.com/community/tutorials/how-to-contribute-to-open-source-getting-started-with-git), (optional) if you dont have it installed.
- Install a Code Editor either Eclipse or VSCode, or even any other of your prefered choice.

## Run the project

#### Using VSCode

1. run `npm install` to install project dependencies
2. run `npm run start` for production mode
3. run `npm run start:dev` for development mode
4. Congratulations! You have successfully launched the RSSB CHALLENGE API.

## To check if the API is up and running.
Run the application with `npm run start` and open an API testing tool. We will use Postman for this case.
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/)

Just call this endpoint: http://localhost:3000 using a GET method
It will return a `Hello World!` message.

For testing other endpoints, we'll use this versioned endpoint

```
http://localhost:3000/api/v1/<endpoint>
```

## Test endpoints:

Authentication
------------- |

| Method | Endpoint     | Enable a user to: |
| ------ | ------------ | -------------- |
| POST   | /auth/register | Register       |
| POST   | /auth/login  | Login          |

User
------------- |

| Method | Endpoint         | Enable a user to:                                      |
| ------ | ---------------- | --------------------------------------------------- |
| POST   | /users/upload    | Upload an excel file of users                       |
| GET    | /users           | Get a list of the uploaded file of users            |
| POST   | /users           | Commit the data of the uploaded file of users to DB |
| GET    | /users/committed | Get a list of the saved users to the DB             |

## Contributing

Please read [CONTRIBUTING.md](https://github.com/OLTRANZ/ussd_agent_irembo/blob/ft-handle-ussd-request/CONTRIBUTING.md)

## Authors

- **Amily Kassim** (https://github.com/amilykassim)

## Licence

This software is published by `Amily Kassim` under the [MIT licence](http://opensource.org/licenses/MIT).
