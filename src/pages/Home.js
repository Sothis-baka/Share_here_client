import React from "react";
import { Redirect } from "react-router-dom";

import '../styles/Home.css';

import NavBar from "./components/NavBar";
import MainPage from "./components/MainPage";
import SearchInput from "./components/SearchInput";

class Home extends React.Component{
    constructor(props) {
        super(props);

        let user;
        const loginTime = localStorage.getItem('loginTime');
        if(loginTime && new Date().getTime() - Number(loginTime) < 3600000){
            user = JSON.parse(localStorage.getItem('user'));
        }else{
            user = null;
        }


        this.state = {
            user,
            showing: 0,
            showSearch: false,
            keyword: {
                title: '',
                content: '',
                username: ''
            }
        };
    }

    changeShowing = (name) =>{
        switch (name){
            case 'explore':
                this.setState({
                    showing: 0
                });
                break;

            case 'posts':
                this.setState({
                    showing: 1
                });
                break;

            case 'likes':
                this.setState({
                    showing: 2
                });
                break;

            default:
                break;
        }
    };

    toggleSearchBar = () => {
        this.setState({
            showSearch: !this.state.showSearch
        });
    }

    updateKeyword = (e) => {
        const keyword = {
            ...this.state.keyword,
        };

        keyword[e.target.name] = e.target.value;

        this.setState({
            keyword
        });
    }

    render() {
        if(!this.state.user){
            return <Redirect to='/login'/>;
        }

        let username = this.state.user.username;

        return(
            <div id='homePage' className='row'>
                <NavBar username={ username } onClick={ this.changeShowing } toggleSearchBar={ this.toggleSearchBar }/>
                <MainPage showing={ this.state.showing } keyword={ this.state.keyword } username={ username }/>
                { this.state.showSearch && <SearchInput updateKeyword={ this.updateKeyword } toggleSearchBar={ this.toggleSearchBar } keyword={ this.state.keyword }/> }
            </div>
        );
    }
}

export default Home;