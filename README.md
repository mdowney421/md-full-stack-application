# PumpedUp - *a full-stack web application for logging workouts and reviewing key metrics*

## Link to App on Heroku
https://pumpedup-web-application.herokuapp.com/

### Project Description
This project has full user authentication sessions with encrypted password storage. Users have the ability to log in to their existing account or create a new one if they do not yet have one. All user data is stored in a MongoDB remote server.

Once logged in, users are brought to their home page where they can choose between adding a workout, viewing their dashboard, or viewing their workout history. These options along with the ability to log out are also included in a drop down menu in the header.

The **ADD A WORKOUT** page consists of a form where users can enter the date, type of workout, duration, calories burned, and any relevant notes. Once the workout is submitted, the user is redirected to their workout history page.

The **WORKOUT HISTORY** page displays a simple list of their past workouts sorted by date in descending order. Users can click on any one of the workouts to view and edit them.

The **VIEW WORKOUT** and **EDIT WORKOUT** pages are mostly identical to the Add a Workout page. However, the View Workout page displays their workout data in a read only form. At the bottom they are given the option to delete or edit the workout. If they choose to delete, a modal displays to confirm their decision. If they choose the edit, the form turns from a read only form to one that can be edited.

The **DASHBOARD** page displays some infographics of key metrics from their workouts over the past 7 days.

## Methodology
This purpose of the project was to showcase full create, read, update, and delete (CRUD) functionality. It was implemented using all 7 RESTful routes in Express.js and and communicated with a remote MongoDB database via Mongoose.

The design of the application relied almost entirely on Bootstrap. I had no prior experience with Bootstrap and wanted to learn its potential.

## Technologies Used
HTML | CSS | Bootstrap | JavaScript | Node.js | Express.js | MongoDB | Mongoose

## Early Wireframes
<img width="590" alt="image" src="https://user-images.githubusercontent.com/70616807/169092129-6eb7cf0e-0be6-442c-ba66-e98f73ed12d9.png">
<img width="590" alt="image" src="https://user-images.githubusercontent.com/70616807/169092314-7dad93ca-4b02-4446-916c-998b25df148b.png">
<img width="590" alt="image" src="https://user-images.githubusercontent.com/70616807/169092450-7d00b090-ca21-425b-a3f2-186d530f4217.png">
