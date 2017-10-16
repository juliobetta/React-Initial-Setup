# React Initial Setup

## Stack


* React 16
* React-Toolbox (Material Design)
* React-Router
* redux
* PouchDB
* Jest, for unit tests
* Cypress, for integration tests
* etc
* ... and it works offline!


## Installation

`npm install -g yarn && yarn` and BOOOM!


## Run & Generate

**Development mode**

    yarn start

... and access http://localhost:8080

**Build Web package**

    yarn build

The files will be located in the folder `www`.


## Tests

The project is covered by tests using Jest and [Cypress](https://cypress.io).

To run them once, execute:

    yarn test
