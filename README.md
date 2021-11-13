# _Runway-Bay_

# OVERVIEW

Runway-Bay is a MERN stack desktop application built to the client's
requirements for compiling his tenants' information.

# FEATURES

- User login and authentication with JWT and bcrypt.
  ![Login Component](/readme-imgs/login-component.png)

- Create new tenants with user data submitted with redux & redux-thunk.
- Upload supporting documents with react-file-base64 to mongodb Atlas database.
  ![Form Component](/readme-imgs/form-component.png)

- All tenants displayed to the user on the home screen.
- Edit and delete existing tenants from the database, email individual tenants about upcoming payments.
  ![Tenants Component](/readme-imgs/tenants-component.png)

- Send out memos to all tenants regarding upcoming events, inspections, etc.
  using nodemailer.
  ![memo Component](/readme-imgs/memo-component.png)

- Schedule lease-expiration email reminders with node-cron.

# RUNNING THE PROJECT

_Live version_:

https://runway-bay.netlify.app/

# From the repo

1. Clone the project locally.
2. Cd into frontend and run npm install in your bash / command line.
   Open a terminal and run npm start.
3. Cd into backend and run npm install in your bash / command line.
   Open an additional terminal and run npm start.
4. Edit as you see fit.

# DEPENDENCIES

_Frontend_:

- @emotion/react
- @emotion/styled
- @mui/icons-material
- @mui/material
- axios
- jwt-decode
- react
- react-dom
- react-file-base64
- react-google-login
- react-redux
- react-router-dom
- react-scripts
- redux-thunk

_Backend_:

- bcryptjs
- cors
- dotenv
- express
- googleapis
- jsonwebtoken
- mongodb
- mongoose
- node-cron
- nodemailer
