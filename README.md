# Share here

### Author

Sothis-baka



### Description

An online forum. (the code in this rep is for **front end**)

##### Backend

Apollo server (GraphQL)

##### Frontend

React.js



Use local storage to store JWT. 

> React is XSS protected (except for some dangerous use)
>
> Unlike cookies, tokens won't be sent automatically with request (safer to CSRF attack)
>
> If there is sensitive data/action, should add more protection (mostly in back end, front end is never safe, if exposed to XSS attack, attackers can do anything on behalf of the user.) 



### Use

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



### Deployment

Client deployed at [Heroku](https://share-here-cli.herokuapp.com/)



### Source code

[client](https://github.com/Sothis-baka/Share_here_client)

[server](https://github.com/Sothis-baka/Share_here_server)



### Version

2.0



### Last update

9/15/2021
