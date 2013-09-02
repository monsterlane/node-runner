node-framework
===

HTML5 Node Framework using Node, doT.js for templating, MongoDB for persistent data, and Redis for session and real-time data.

Installation:
---

1. Install Node http://nodejs.org/

2. Install MongoDB http://www.mongodb.org/
> Mac: http://mac-dev-env.patrickbougie.com/mongodb/

3. Install Redis http://redis.io/
> Mac: http://reistiago.wordpress.com/2011/07/23/installing-on-redis-mac-os-x/

3. Install MongoDB driver for Node
> sudo npm install mongodb

4. Install doT.js templating engine
> sudo npm install dot

5. Install Socket.IO
> sudo npm install socket.io

6. Install Supervisor to restart server when files are modified
> sudo npm install supervisor -g

7. Install/configure package.json dependencies
> cd ~/Sites/node-framework/app
> npm install

8. Run the app
> supervisor app.js
