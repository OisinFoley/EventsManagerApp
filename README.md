## "Evenovue" Web app for creating and managing events
------
#### User will be able to add/edit events while also display a list of known events

##### Techs to build this app include:
- NodeJs
- ExpressJs
- VueJs
- MongoDb
- Bootstrap

To run:

1) Go to root and 
`node app.js`(don't need to specify start file)
2) followed by traversing to eventmanagerapp and `node`

Backend is on port 3333, frontend on 8080

Current Version 0.4

Bugs:

- Suddenly getting an error where my database thinks i'm not authenticated when attempting to read from db. Will need to retrace my steps.
- Editing event action edits a hardcoded uuid representing an event. Immediate concern next time we tackle this project is to grab the index of the event which was clicked, before passing that to the editEvent view which which is where we'll edit the event's properties before submitting and updating the database.
------
Commit History:

0.4.0
- An event can be edited.

0.3.0
- Can add users and events.

0.2.1:
- Fixed some basic styling using Bootstrap 3 which wasn't rednering properly

0.2.0:
- Setup basic authentication using Auth0, took quite a bit of troubleshooting
- User gets a JSON web token on sign-in
- Basic API setup, no database access yet. API features public and private events
- At present some events are private and are only listed when logged in
- Used the Vue cli to setup a basic view template.


0.1.0:
- Initialising repo and README
