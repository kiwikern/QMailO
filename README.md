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


## Usage

### Endpoints

#### /login
* POST
  * unauthorized
  * request body (json):
    * password (required): The password you chose during the setup.
  * returns JWT token for authorized access of `/files` endpoint
  * example: `curl -X POST -H "Content-Type: application/json" -d '{"password": "test"}' localhost:30000/login`
    
#### /files
* authorized with JWT token obtained with the login method
* GET
  * query parameters:
    * search (optional): filter by file name.
  * returns a list of all .qmail files in the format `{name: string, content: string}`
* PUT
  * request body (json):
    * name (required): file name without the `.qmail-` prefix
    * content (required): content of the .qmail file
  * creates a new .qmail file. Does not override existing ones.
* POST
  * request body (json):
    * name (required): file name without the `.qmail-` prefix
    * content (required): content of the .qmail file
  * updates an existing .qmail file. Does not create new ones.
    