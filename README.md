# Share here

### Author

Sothis-baka



### Description

An online forum. (the code in this rep is for **front end**)

##### Backend

Apollo server (GraphQL)

##### Frontend

React.js



### Usage

Clone the repo

```
git clone https://github.com/Sothis-baka/Share_here_client.git
```

<span style="color:red;"><u>**You need to first set up backend Uri in .env file**</u></span>

```
REACT_APP_Server_Uri = "https://*****.com"
```

Run

```
npm start
```

Then go to localhost:3000. React app is running there.



### Deployment

Client deployed at [Heroku](https://share-here-cli.herokuapp.com/)

Server deployed at [Heroku](https://share-here-server.herokuapp.com/)



### Source code

[client](https://github.com/Sothis-baka/Share_here_client)

[server](https://github.com/Sothis-baka/Share_here_server)



### Version

2.0



### Last update

9/15/2021



### Consideration

The reason not using Redux

> The only global states used is the user login status, which is only checked once if no request is made

Debounce

> Skip the submit event if loading is true

Use set up status code in server to know mutation result for convenience

Use local storage to store JWT. 

> React is XSS protected (except for some dangerous use)
>
> Unlike cookies, tokens won't be sent automatically with request (safer to CSRF attack)
>
> If there is sensitive data/action, should add more protection (mostly in back end, front end is never safe, if exposed to XSS attack, attackers can do anything on behalf of the user.) 

compress icon before use

If multiple state need to update, combine them together. Use a copy of object so that diff function can quickly distinguish.

use PureComponent, React.memo when possible

implement shouldComponentUpdate to avoid unnecessary render

Responsive design

> ​	Auto focus on input
>
> * feedback
>
>   All hover, focus on interactable component will have some effect
>
>   When a request is submitted, show loading animation
>
>   If input is not valid, show error message immediately
>
> * screen size
>
>   For login page, I only changed the font size so that it can fit into a mobile screen
>   
>   For register page, conceal the icon in smaller screen and adjust layout from horizontal to vertical
>
> 

How I implement the visual list

* Query data

  It takes time to communicate with server, and the server is deployed on Heroku which means it needs time to wake up, which worsen the situation.

  With a wrapper component, I delay the render of post area so that other components may load first.

* Scroll event listener

  The scrollable part is main content, the parent div of post area (which also contains an input area)

  I came up with two ways to listen the event.

  1. Add scroll listener to main content component, and use ref to call corresponding child for data operation
  2. Inside the child component, add a event listener to main content from DOM tree

  And I selected to use the second approach.

  

  Why add passive to event listener?

  It promises that scroll event won't be blocked, so that performance can be guaranteed.

* Throttle

  Use lodash.throttle to decorate the event listener. 

  It won't be triggered more than once in a frame (60 frames per second)

* Detect scroll direction

  Record the scrollTop value of last event and compare with current event.

* Layout

  The screen can roughly contain 6 items. So I only render 8 items of the list.

  I record the position of the first and last items. 

  > When scrolling up, if the last item is out of view, index of rendered items will change  from (n, n+8) to (n-2, n+6).
  >
  > When scrolling down, if the first item is out of view, index of rendered items will change  from (n, n+8) to (n+2, n+10).

  

