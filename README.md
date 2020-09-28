# QMailO

Install QMailO on your server (e. g. Uberspace) to organize your .qmail files.
With it, you can view, add, edit and delete .qmail files.
You can use the API to write your own scripts or frontend, or use the corresponding [Angular frontend](https://github.com/kiwikern/qmailo-frontend).

## Setup
 
 * Clone the repository `git clone https://github.com/kiwikern/qmailo.git`
 * `cd qmailo`
 * Run `npm install`
 * Run `npm run setup` (Make sure you are in the root directory `qmailo`.)
 * Run `npm start` to start the server. 
 * If you're using it on Ubserspace, you can also [add it as an service](https://wiki.uberspace.de/system:daemontools).


## Endpoints

### /login
* no authorization required
* POST
  * request body (json):
    * password (required): The password you chose during the setup.
  * returns JWT token for authorized access of `/files` endpoint
  * example: `curl -X POST -H "Content-Type: application/json" -d '{"password": "test"}' localhost:30000/login`
    
### /files
* authorized with JWT token obtained with the login method
* GET
  * query parameters:
    * search (optional): filter by file name.
  * returns a list of all .qmail files without the `.qmail-` prefix in the format `{id: string, content: string}`
* PUT
  * request body (json):
    * id (required): file name without the `.qmail-` prefix
    * content (required): content of the .qmail file
  * creates a new .qmail file. Does not override existing ones.
* POST
  * request body (json):
    * id (required): file name without the `.qmail-` prefix
    * content (required): content of the .qmail file
  * updates an existing .qmail file. Does not create new ones.
    
### /files/:id
* DELETE
  * url param `:id`: file name without the `.qmail-` prefix
  * deletes the given file if found
# Qmailo

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@qmailo/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
# QmailoFrontend


QMailO helps you organize your `.qmail` files. For it to work, you need to set up the [QMailO Server](https://github.com/kiwikern/QMailO) as well. This web app was designed with Uberspace in mind.
The app is available in English and German.
<p align="center">
  <img src="https://user-images.githubusercontent.com/2671139/36565035-8ad77908-181f-11e8-9ab7-b8d673e32aa0.gif">
</p>


## Setup
* Set up your [QMailO Server](https://github.com/kiwikern/QMailO).
* Download the [latest release](https://github.com/kiwikern/QMailO-Frontend/releases/latest) and unzip the language version of your choice to the folder served by your web server.
* Forward all requests to `api/*` to your QMailO server, e. g. `localhost:30000`, anything else to `index.html`.
  * There is a `.htaccess` included with a sample configuration. If you don't want to use it, you can just delete it.

### Uberspace
* If you're using Uberspace, you can easily create a [subdomain](https://wiki.uberspace.de/domain:subdomain) for your QMailO Frontend.
* Just create a folder with your subdomain name in `/var/www/virtual/$USER/` and unzip the language version of your choice of the [latest release](https://github.com/kiwikern/QMailO-Frontend/releases/latest) into it.
  * Example: `mkdir /var/www/virtual/$USER/qmailo.kimkern.de`
* [Include your new subdomain](https://wiki.uberspace.de/webserver:https#aenderungen_am_let_s_encrypt_zertifikat) in your LetsEncrypt certificate.
* If your QMailO server is running under a different port than 30000, edit the included `.htaccess` file:
  * `RewriteRule ^api/(.*) http://localhost:30000/$1 [P]`

## Development

* Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
* For further information about the Angular CLI, run `npm run ng -- --help`.
