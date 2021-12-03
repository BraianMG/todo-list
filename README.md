# ToDo List (Documentation)

- [ToDo List (Documentation)](#todo-list-documentation)
  - [Backend](#backend)
  - [Frontend](#frontend)

## Backend
- API
  - Users:
    - POST /api/v1/users/
      ```javascript
      {
        "name": "example",
        "email": "example@example.com",
        "password": "example"
      }
      ```

    - POST /api/v1/auth/login
      ```javascript
      {
        "email": "example@example.com",
        "password": "example"
      }

    - GET /api/v1/users
    
    - PUT /api/v1/users/<id>
      ```javascript
      {
        "name": "example",
        "email": "example@example.com",
        "password": "example"
      }
      ```

    - DELETE /api/v1/users/<id>
  
  - Tasks:
    - POST /api/v1/tasks/
      ```javascript
      {
        "description": "Task 1"
      }
      ```

    - GET /api/v1/tasks
    
    - PUT /api/v1/tasks/<id>
      ```javascript
      {
        "description": "Task 2",
        "done": true
      }
      ```

    - DELETE /api/v1/tasks/<id>

## Frontend

