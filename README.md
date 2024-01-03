# Jade Resort

This project utilizes Next.js for the frontend and Express.js for the backend.

## Getting Started

### Prerequisites

- Node.js installed (https://nodejs.org)
- MongoDB Atlas account (for connecting to MongoDB)

### Setting Up Client and Server

1. Clone the repository:

    ```bash
    git clone https://github.com/gawx9/booking.git
    ```

2. Navigate to the project directory:

    ```bash
    cd project-name
    ```

### Server Setup

1. Create a `.env` file in the `server` directory with the following content:

    ```
    PORT=5000
    MONGO_URI=<your_mongo_uri>
    ```

    Replace `<your_mongo_uri>` with your MongoDB connection string.

2. Install server dependencies and start the server:

    ```bash
    cd server
    npm install
    npm start
    ```

### Client Setup

1. Navigate to the `booking-system` directory:

    ```bash
    cd ../booking-system
    ```

2. Install client dependencies and start the development server:

    ```bash
    npm install
    npm run dev
    ```
    
### URL Setup
- For Client (http://localhost:3000)
- For Admin (http://localhost:3000/jade/login)

## Project Structure

- `client`: Contains the Next.js frontend code.
- `server`: Contains the Express.js backend code.
  - `.env`: Environment configuration file for the server.
  - `models`: Mongoose models (if applicable).
  - `routes`: Express route handlers.
  - `utils`: Utility files.

## Additional Notes

- Make sure to replace placeholders like `<repository_url>` and `<your_mongo_uri>` with your actual values.
- Customize the project structure and setup as needed for your specific requirements.
- For MongoDB Atlas, sign up for an account and create a cluster. Obtain the connection string and replace `<your_mongo_uri>` in the `.env` file.

Happy coding!
