# backend

# Project API Documentation

## Authentication

- Type: Bearer Token
- Header: `Authorization:<token>`

## Endpoints

### 1. User Registration

- **URL:** `/api/auth/signup`
- **Method:** POST
- **Description:** Create new user account

### Request Body

```json
{
  "firstName": "your_first_name",
  "lastName": "your_last_name",
  "username": "your_username",
  "password": "your_password",
  "email": "your_email",
  "phoneNumber": "your_phone_number"
}
```
### Response
* Success: 201 
* Error: 400

## 2. User Login
- **URL:** `/api/auth/login`
- **Method:** POST
- **Description:** User login

### Request Body
```json
{
    "username": "your_username",
    "password": "your_password"
}
```

### Response
* **Success**: 200 OK. Returns a token
    - ```json
        {
            "token": "your_token"
        }
    ```
* **Error**: 401 Not authorized

## 3. 

# routes

1. auth
   - POST: /api/auth/signup
   - POST: /api/auth/login
   - GET: /api/auth/logout
   - GET: /api/auth/me
2. summarize
   - POST: /api/summarize
     - post a book pdf/txt file in order to get a summary
   - GET: /api/summarize
     - get a list of all summaries
   - GET: /api/summarize/:id
     - get a summary by id
   -
3. questions
   - POST: /api/question
     -
