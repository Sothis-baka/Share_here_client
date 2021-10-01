import React from "react";

import '../styles/Home.css';
import Nav from "./components/Nav";
import Content from "./components/Content";

class Home extends React.Component{
    constructor(props) {
        super(props);

        let user;

        // retrieve login time from localstorage
        const loginTime = localStorage.getItem('loginTime');
        if(loginTime && new Date().getTime() - Number(loginTime) < 3600000){
            // not expired, set user info from memory
            user = JSON.parse(localStorage.getItem('user'));
        }

        this.state = { user };
    }

    render(){
        const username = this.state.user?.username;

        return (
            <div id='homeWrapper'>
                <Nav username={ username }/>
                <Content/>
            </div>
        );
    }
}

export default Home;