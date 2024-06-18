# README

## Project Overview

This project is a web application for a Roblox clothes shop named "444kuda". The application allows users to register, log in, view their profile, and purchase products. It also includes admin functionalities for managing the site.

## Features

- **User Registration**: New users can sign up.
- **User Login**: Registered users can log in.
- **User Profile**: Logged-in users can view and update their profile, change their password, or delete their account.
- **Product Purchase**: Users can view and buy products.
- **Admin Panel**: Admins can manage the website content and users.

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:
   ```sh
   PORT=3000
   DB_URL=<your-mongodb-connection-string>
   USERNAME=<your-session-secret-username>
   URL_ADMIN=admin
   ```

4. **Run the application**:
   ```sh
   npm run start
   ```

5. **Open your browser** and navigate to `http://localhost:3000`.

## File Structure

### Main Files

- **app.js**: Entry point of the application, sets up the server and routes.
- **routes/**: Contains route handlers for different parts of the application.
  - **homeRoutes.js**: Handles the homepage routes.
  - **regRoutes.js**: Handles the registration routes.
  - **loginRoutes.js**: Handles the login routes.
  - **logOutRoutes.js**: Handles the logout routes.
  - **profileRoutes.js**: Handles the profile routes.
  - **adminRoutes.js**: Handles the admin routes.
- **views/**: Contains the EJS templates for rendering HTML pages.
  - **index.ejs**: Home page template.
  - **login.ejs**: Login page template.
  - **reg.ejs**: Registration page template.
  - **profile.ejs**: Profile page template.
  - **header.ejs**: Common header template included in other templates.
- **models/Users.js**: Defines the user schema and model for MongoDB.

### Additional Files

- **assets/**: Contains static files like CSS and images used in the EJS templates.

## Explanation of Key Files

### app.js

This file sets up the Express server, connects to MongoDB using Mongoose, and configures session management. It also defines the routes used by the application.

### homeRoutes.js and index.ejs

- **homeRoutes.js**: Handles the rendering of the homepage. If a user is logged in, it passes the user information to the template.
- **index.ejs**: The EJS template for the homepage. Includes a header and a main section with a link to the products page.

### loginRoutes.js and login.ejs

- **loginRoutes.js**: Manages user login. It checks the user's credentials and sets session variables if the login is successful.
- **login.ejs**: The EJS template for the login page. Displays an error message if login fails.

### regRoutes.js and reg.ejs

- **regRoutes.js**: Manages user registration. It checks if the username or email already exists, validates the password, hashes it, and saves the new user to the database.
- **reg.ejs**: The EJS template for the registration page. Displays an error message if registration fails.

### profileRoutes.js and profile.ejs

- **profileRoutes.js**: Handles rendering of the user profile page, changing the password, and deleting the account.
- **profile.ejs**: The EJS template for the profile page. Allows users to view their information, change their password, and delete their account.

## Usage

### Register a New User

1. Navigate to `/register`.
2. Fill out the registration form and submit.

### Log In

1. Navigate to `/login`.
2. Enter your username and password and submit.

### View Profile

1. Log in to the application.
2. Navigate to `/profile`.

### Change Password

1. Go to the profile page.
2. Fill out the "Change Password" form and submit.

### Delete Account

1. Go to the profile page.
2. Click the "Delete Account" button and confirm by entering your password.

## Admin Panel

1. Log in as an admin.
2. Navigate to `/admin`.

This README provides an overview and instructions for setting up and using the "444kuda" web application. If you have any questions or issues, please refer to the documentation or contact the developer.