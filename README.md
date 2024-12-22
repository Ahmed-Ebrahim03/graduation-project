# Graduation Project

This project consists of multiple services: `backend`, `web`, and `ai`. Each service is responsible for different functionalities of the application.

## Services

### Backend

The backend service is responsible for handling API requests, user authentication, and database interactions.

#### Features

- User Registration and Login
- Summary Creation and Retrieval
- Question Generation

#### How to Run

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Create a *.env* file based on the *.env.example* file and fill in the required environment variables:
    ```sh
    cp .env.example .env
    ```

<!-- 3. Build and run the Docker container:
    ```sh
    docker-compose up --build
    ``` -->

### Web

The web service is a React application that provides the user interface for the application.

#### Features

- User Registration and Login
- Upload Documents for Summarization
- View Summaries and Generated Questions

### AI

The AI service is responsible for text summarization and question generation using spaCy.

#### Features

- Text Summarization
- Question Generation

## Running the Entire Application

To run the entire application, use Docker Compose:

1. Ensure you are in the root directory of the project where the *docker-compose.yml* file is located.

2. Build and run all services:
    ```sh
    docker compose up --build
    ```

## API Endpoints

### Authentication

- **POST** `/api/auth/signup` - Create a new user account
- **POST** `/api/auth/login` - User login
- **GET** `/api/auth/me` - Get authenticated user details

### Summarization

- **POST** `/api/summarize` - Upload a document for summarization
- **GET** `/api/summarize` - Get a list of all summaries
- **GET** `/api/summarize/:id` - Get a summary by ID

### Questions

- **POST** `/api/questions` - Generate questions from a summary

## Environment Variables

Ensure the following environment variables are set in the **.env** file in */backend*:

### Backend

- **DB_URL** - MongoDB connection URL
- **PORT** - Port number for the backend service
- **API_PREFIX** - API prefix (e.g., `/api`)
- **JWT_SECRET**  - Secret key for JWT
- **AI_SERVICE_URL** - URL for the AI service

## Additional Information

- The backend service uses MongoDB for data storage.
- The web service is built using React and Vite.
- The AI service uses FastAPI and spaCy for NLP tasks.

For more detailed information, refer to the individual README files in each service directory.