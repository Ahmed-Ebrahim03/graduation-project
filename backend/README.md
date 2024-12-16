# backend

# routes
1. Auth
    - POST: /api/auth/signup
    - POST: /api/auth/login
    - GET:  /api/auth/logout
    - GET:  /api/auth/me
2. summarize
    - POST: /api/summarize
        - post a book pdf/txt file in order to get a summary
    - GET:  /api/summarize
        - get a list of all summaries
    - GET:  /api/summarize/:id
        - get a summary by id
    - 