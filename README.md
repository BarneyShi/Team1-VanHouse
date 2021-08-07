# Team1-Project

# Final Report
## `Project Description` 
VanHouse is an app for landlords and prospective tenants to find and rent property. Landlords can post property listings including details and images. Users can search for properties that match their criteria, review/comment on listings, and contact landlords to arrange meetings.

## `Project goals:`
### `Minimal requirements`
* :heavy_check_mark: Hosts will be able to create, read, update, and delete postings about their real estate properties.
* :heavy_check_mark: The website will facilitate scheduling of meetings between hosts/tenants.
* :heavy_check_mark: Users will be able to search for properties according to different filters and sort the results in several different ways.
* :heavy_check_mark: Users will be able to log into or sign up for an account on the website.

### `Standard requirements`
* :heavy_check_mark: Properties will have a map API on their details page so users can easily discern where they are.
* :warning: Tenants will be able to post reviews of properties they have stayed at, and hosts will be able to review their tenants.
  * :speech_balloon: Since users are already able to post comments on properties (see next standard goal), we thought that a separate function for reviewing properties would be redundant. Thus, we consider the comment function to be the 'review properties' function.
  * :speech_balloon: As for hosts being able to review their tenants, we ultimately decided that such a function could easily be used maliciously. We have thus removed this standard goal from our final project.
* :heavy_check_mark: Users will be able to post comments on property detail pages.
* :heavy_check_mark: Each user and property will have a “Report” function on their page.
* :heavy_check_mark: Hosts will be able to upload images of their properties.

### `Stretch requirements`
* :heavy_check_mark: Users will be able to search by keyword (instead of just by location or specific address and then filtering).
* :heavy_check_mark: Users will be able to toggle between different languages -- at present, we have English and Chinese versions of our webapp.
* :x: Users will be able to send direct messages to other users.

## `Tech`
- React.js: We used React.js to build our front-end. We created many granular functional components such as Post, PostCollection, PostDetail, LoginForm, SearchBar, and UserList. In addition to CSS, we used React Bootstrap to style some of our components to improve consistency across the app.
- Node.js/Express.js: We used Node.js/Express to serve up the static website after building and deploying. We also created a RESTful API for creating, reading, updating and deleting information from the MongoDB database. We also made middleware to authenticate users and made some routes protected.
- CSS: We created a styles folder to store all of the stylesheets used for each of our components. To ensure that our UI was clear and easy to use, we used a flexbox layout and a consistent colour scheme across the website.
- MongoDB: To store our backend data, we used a MongoDB Atlas Cloud database. We made 4 different models -- Comment, Post, Schedule, and User -- for this purpose. We used Mongoose as an ORM to communicate with our database.
- Heroku: We deployed our project on Heroku with Github actions. It will automatically build once we push new changes so that every team member can preview our work.

## `Above and Beyond`
- Admin page: We made an admin page as a tool for managing our website. We used Recharts to demonstrate some statistics such as daily traffic information and average prices of posted properties. Admins can also search post/user,  edit posts, delete posts or change user’s roles.  This page is strictly only accessible to users with admin roles.
- Image uploading: We added functionality for users to upload multiple images and select a main image for their post. We also added the react-easy-crop library to allow cropping the main image, and we reduce the main image size using a canvas before uploading it to the database as a base64 string so that the homepage loads more quickly.
- Login and user authentication: We added functions for users to create an account on the website, login, and access user-only actions such as creating new posts. This was to increase security and credibility on our app and decrease the amount of potential spam that might be posted. We also created a function for when users forget their password so that they are able to recover their account via email.

## `Next Steps`
- If we were to further improve our app, we would complete our second stretch requirement which would allow users to send DMs to each other.
- We would also create a functional user account page where users could see all of their posts on one page, edit or delete posts, and edit user information from a central hub.
- We would also add the function of switching languages. For example, the website could switch between Chinese and English.

## `Contributions`
- Barney worked on the post detail page, admin page and set up the database. Barney implemented a comment function, deleting post function, location display with map, post edit function, and made an admin page as admin tools. Barney helped create our MongoDB models, create schemas and connect our backend to MongoDB Atlas.
- Naithan worked on the post component, and post collection component for the homepage as well as the post creation forms. This included setting up the connections to the backend, implementing MongoDB find and insert commands, creating a loading spinner component, implementing image uploading, and creating see more posts button. Naithan also helped set up Heroku deployment by setting up the build commands and Github Actions.
- Yuxin worked on the search bar and user list page, including the function of automatically add the newly registered users saved in mongoDB into the userlist and filtering corresponding posts through cities, prices, keywords and individual users
- Sujin worked on the login/logout, user authentication, and user registration  portions of the website. This included a Forgot Password feature and relatively secure login using JSON Web Tokens stored as HTTPOnly cookies and password hashing when storing user information in the MongoDB database.



# Project Plan
## `Project Proposal`
We plan to build an app for landlords and prospective tenants to rent property. Landlords (or tenants looking for roommates) will post property listings including details and images. Interested tenants can schedule meetings with the poster. We will include review and comment functionality for each listing and build a booking tool to help with scheduling meetings between prospective tenants and landlords.

## `Who is it for?`
- Renters
- Landlords/Hosts (other tenants looking for roommates)

## `What will it do?`
The website will support users in publishing available apartments/houses/rooms for rent, including attaching images or videos of the properties. It will also facilitate online communication between users (landlords/hosts and tenants) via comments/DMs.

## `What type of data will it store?`
- House/Apartment (id, location - coords, price, contacts, lease length, no pet/cooking frequency…)
- Landlord (id, full name, real estates they own, current tenants, reviews…)
- Tenants (id, full name, current living place, reviews…)
- Scheduled meetings (time, host, renters, property id)

## `What will users be able to do with this data?`
- Users will be able to schedule meetings between tenants and landlords.
- Users will be able to view properties/rooms that are similar to the one they are currently looking at.

## `What is some additional functionality you can add/remove based on time constraints?`
- Landlords can review their tenants and vice versa.
- A DM system that landlords/tenants can chat on. 
- For each post, we will use a map to display the location of property so users can have a sense where the property is exactly. 

## `Project task requirements:`
### `3-5 minimal requirements`
* :heavy_check_mark: Hosts will be able to create, read, update, and delete postings about their real estate properties.  
* :heavy_check_mark: The website will facilitate scheduling of meetings between hosts/tenants.  
* :heavy_check_mark: Users will be able to search for properties according to different filters and sort the results in several different ways.  
* :heavy_check_mark: Users will be able to log into or sign up for an account on the website.  

### `3-7 "standard" requirements (will most likely complete)`
* :heavy_check_mark: Properties will have a map API on their details page so users can easily discern where they are.  
* :warning: Tenants will be able to post reviews of properties they have stayed at, and hosts will be able to review their tenants.  
    * :speech_balloon: Since users are already able to post comments on properties (see next standard goal), we thought that a separate function for reviewing properties would be redundant. Thus, we consider the comment function to be the 'review properties' function.  
    * :speech_balloon: As for hosts being able to review their tenants, we ultimately decided that such a function could easily be used maliciously. We have thus removed this standard goal from our final project.  
* :heavy_check_mark: Users will be able to post comments on property detail pages.  
* :heavy_check_mark: Each user and property will have a “Report” function on their page.  
* :heavy_check_mark: Hosts will be able to upload images of their properties.  

### `2-3 stretch requirements (plan to complete at least 1!)`
* :x: Users will be able to send direct messages to other users.   
* :heavy_check_mark: Users will be able to search by keyword (instead of just by location or specific address and then filtering).   

## `Pick 2 of your minimal requirements and break each of them down into ~2-5 smaller tasks!`
- Create, read, update, delete posted real estates
  - Front-end: a create button, a button to delete post, a form to edit post
  - Back-end: Renters to handle create, edit and delete requests.
  - UI: use CSS to beautify our front-end
  - UX: make a wireframe/figma
- Schedule visiting/meeting between hosts/tenants
  - Front-end: a form to send a meeting request. Landlord can choose to accept or decline
  - Back-end: user can create records for scheduled meetings
  - UI/UX: To sketch a form and apply CSS styles
- Log in/sign up
  - Front-end: Log in/sign up buttons, forgot password buttons, display info after logging in.
  - Back-end: Authentication, authorization (user validation is required)

### `P.S. We used Google Drawing to make our sketches instead of on paper because it's easier for us to collaborate remotely.`
![Home Page](./home_page.png)
![Detail Page](./detail_page.png)
![Submit Form](./submit_form.png)
