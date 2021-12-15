# __ToDo List__

I decided to manage both the client and the server in different repositories to facilitate the deployments in HEROKU, the respective repositories are:
- __Frontend__: [https://github.com/BraianMG/todo-list-frontend](https://github.com/BraianMG/todo-list-frontend)
- __Backend__: [https://github.com/BraianMG/todo-list-backend](https://github.com/BraianMG/todo-list-backend)

__You can use and test the deployment at__ [https://braianmg-todo-list.herokuapp.com/](https://braianmg-todo-list.herokuapp.com/)


## __Comments__
With the extra time they gave me I managed to solve problems with the persistence of the session on the client side, it was something that bothered me a lot since it did not allow the app to be functional or at least from my point of view.

Another thing I managed to do was deploy both the client and the server in HEROKU, facilitating the use of the app by anyone through the link https://braianmg-todo-list.herokuapp.com/
With the deploy of the server I had an unexpected problem that in the end turned out to be a detail as fine as confusing lowercase with capital letters and HEROKU, for that difference, he could not do the import in some require, the truth that he had me a few hours thinking until I could find out haha

As for the tests, the truth is that I do not completelymaster, I tried to test the back with Jest and the front with Cypress but they did not work correctly, I did not think it would be so complicated for me.

These were the improvements that I was able to make and the complications that I encountered, the truth is that I really liked this challenge, it made me discover some specific points to improve, so I will not hesitate to strengthen those areas, surely this project will continue improving and adding to it some new features, maybe like some kind of notice based on a due date and time that has been put to each task, I think it would be interesting
