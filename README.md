# Quora-Klone
This is an blogging website which uses React as frontend and MongoDB as database and Express as backend server.
The work is in progress.
To test this app:
- Clone this repository.
- cd node-backend
- create a .env file for process environment variables

MONGO_URL=<add the url of your mongo database server>
PORT=8000 (backend will run on port 3000, you may choose whatever you want)
JWT_SECRET=(add a secret key like) DAEDFSGRGERG532ETSDFHFD4LL32FWFWGERG3R4EFSHHFB

Now install the node modules :
- npm i 
- npm start (backend server starts in destined port).

Now time to start frontend server:
- cd ../react-front
- create a .env file for process environment variables

REACT_APP_API_URL=http://localhost:3000 (choose different from backend server's address, else it auto directs to a different address :) )

Now install the node modules :
- npm i 
- npm start (backend server starts in destined port).

Please feel free to create an issue and submit patches.

You can visit http://167.99.233.64 to view the deployment(Plaese do not upload the profile picture temporarily for now ,but you can upload the pictures for the posts, in case any error arises please refresh the pages)
