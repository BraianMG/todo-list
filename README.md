# __ToDo List__ (Documentation)

- [__ToDo List__ (Documentation)](#todo-list-documentation)
  - [__Test it__](#test-it)
  - [__Backend__](#backend)
  - [__Frontend__](#frontend)
  - [__Comments__](#comments)

## __Test it__
- Run each command in their respective directories:
  - Install dependencies for __client__ and __server__ whit __npm install__
  - Start the __server__ with __npm run dev__
  - Start the __client__ with __npm run start__
## __Backend__
- __API__
  - __Users__:
    - __POST__ /api/v1/users/ -> (To create a new user)
      ```javascript
      Body (JSON):
      {
        "name": "example",
        "email": "example@example.com",
        "password": "example"
      }
      ```

    - __POST__ /api/v1/auth/login -> (To login)
      ```javascript
      Body (JSON):
      {
        "email": "example@example.com",
        "password": "example"
      }

    - __GET__ /api/v1/users -> (To get all users)
    
    - __PUT__ /api/v1/users/{id} -> (To edit a user)
      ```javascript
      Headers:
      "x-token": token

      Body (JSON):
      {
        "name": "example",
        "email": "example@example.com",
        "password": "example"
      }
      ```

    - __DELETE__ /api/v1/users/{id} -> (To delete a user)
      ```javascript
      Headers:
      "x-token": token
      ```
  
  - __Tasks__:
    - __POST__ /api/v1/tasks/ -> (To create a task)
      ```javascript
      Headers:
      "x-token": token

      Body (JSON):
      {
        "description": "Task 1"
      }
      ```

    - __GET__ /api/v1/tasks -> (To get the user's task list)
      ```javascript
      Headers:
      "x-token": token
      ````
    
    - __PUT__ /api/v1/tasks/{id} -> (To edit a task)
      ```javascript
      Headers:
      "x-token": token

      Body (JSON):
      {
        "description": "Task 2",
        "done": true
      }
      ```

    - __DELETE__ /api/v1/tasks/{id} -> (To delete a task)
      ```javascript
      Headers:
      "x-token": token
      ```

## __Frontend__
- Login: __"/"__
- Signup: __"/signup__
- Tasks: __"/mytasks"__
- New Task: __"/newtask__
- Other: __"/*"__ (page __Not Found__)

## __Comments__
I reached a result with which I am not entirely satisfied, with a little more time I could make some improvements and add tests for both the frontend and the backend, even deploy it in, for example, Heroku
The truth is that I really liked this challenge, it made me discover some specific points to improve, so I will not hesitate to strengthen those areas, I plan to continue with this project and improve it day by day.
