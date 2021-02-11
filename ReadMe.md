# SUNSHINE

<br>



## Description

Search platform for events in Barcelona, made for non-locals who just arrived in the city and want to meet other people in the same situation and do different activities with them.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage, log in and sign up. 
- **sign up** - As a user I want to sign up on the web page so that I can create or join events.
- **login** - As a user I want to be able to log in on the web page so that I can get see events, create and join them
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **edit user** - As a user I want to be able to edit my profile.
- **events page** - As a user I want to see the list of events filtered by activities that interest me
- **event details** - As a user I want to see more details for the events, the description of the event, and be able to see who created it and where it will be located (address).



<br>



## Server Routes (Back-end):



| **Method** | **Route**                            | **Description**                                              | Request  - Body                           |
| ---------- | ------------------------------------ | ------------------------------------------------------------ | ----------------------------------------- |
| `GET`      | `/`                                  | Main page route.  Renders home `index` view.                 |                                           |
| `GET`      | `/login`                             | Renders `login` form view.                                   |                                           |
| `POST`     | `/login`                             | Sends Login form data to the server.                         | { email, password }                       |
| `GET`      | `/signup`                            | Renders `signup` form view.                                  |                                           |
| `POST`     | `/signup`                            | Sends Sign Up info to the server and creates user in the DB. | {  email, name, password  }               |
| GET        | /signout                             | renders home index view                                      |                                           |
| GET        | /profile/:id //Julian                | Private route. Renders                                       |                                           |
| `GET`      | `/profile/:id/edit-profile`// Julian | Private route. Renders `edit-profile` form view.             |                                           |
| `PUT`      | `/profile/:id/edit-profile`// Julian | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, name, image, aboutme } |
| GET        | /events/create                       | Renders creation form                                        |                                           |
| POST       | /events/create                       | Send info to the server and creates event in the db          |                                           |
| GET        | /events/:id/edit                     | Renders creation form                                        |                                           |
| POST       | /events/:id/edit                     | Private route. send info to the server and update event      |                                           |
| POST       | /events/:id/delete                   | Private route. delete event from the database                |                                           |
| `GET`      | /events                              | Renders events-list` view.                                   |                                           |
| `GET`      | `/events/:id`                        | Renders events-details` view for the particular event.       |                                           |



## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  aboutme: String,
  picture: String,
  createEvent:[{  type: mongoose.Schema.Types.ObjectId  }]
  joinEvent:[{ type: mongoose.Schema.Types.ObjectId  }]
}

```



Event model

```javascript
{
  name: String,
  description: String,
  date : Date,
  location/address : String,
  picture : String,
  host : [{type: mongoose.Schema.Types.ObjectId}],
  numberParticipants : number
}

```



<br>



## Backlog

[See the Trello board.](https://trello.com/b/RUzoGS7Z/project-2)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()



<br>



### Slides

The url to your presentation slides