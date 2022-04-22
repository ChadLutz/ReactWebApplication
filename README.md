# ReactWebApplication #
 Full stack React-Router-Axios-Bootstrap-NodeJSExpress-JWT-BCrypt-PostgreSQL application
## Building The React App ##
* After cloning the repo to the desired directory, use the command prompt or terminal to navigate to that directory, and then into the reactapp folder.
* When in the root of the reactapp folder, run **npm install**.
* Then, run **npm run build**.
* After that finishes, copy all the files in the build folder (dont copy the build folder, copy all the files in the build folder), and then paste them in the "node-js-server/app/views" folder.
## Setting Up The Server ##
* Then in the command prompt or terminal navigate to the root of the node-js-server folder, and run **npm install**.
* Fill in the files in ~/ReactWebApplication/node-js-server/app/config with the correct info, and then remove GitPlaceholder from both files names.
* Finally, in the command prompt or terminal while still in the root of ReactWebApplication, run **node server.js**.
* The server should be running and listening for requests with the react app on **http://localhost:8080/**.
