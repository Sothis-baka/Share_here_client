import React from "react";

import '../styles/Home.css';
import Nav from "./components/Nav";
import Content from "./components/Content";

import { FilterProvider } from "./utils/filterContext";

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

        this.handleFilterRule = this.handleFilterRule.bind(this);
        this.state = { user, rule: 'no', keyword: '' };
    }

    handleFilterRule = (rule) => {
        if(rule.rule){
            this.setState({ rule: rule.rule });
        }else{
            this.setState({ keyword: rule.keyword });
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(this.state.rule === nextState.rule && this.state.keyword === nextState.keyword);
    }

    render(){
        const username = this.state.user?.username;

        return (
            <FilterProvider value={ { rule: this.state.rule, keyword: this.state.keyword } }>
                <div id='homeWrapper'>
                    <Nav username={ username } handleFilterRule={ this.handleFilterRule }/>
                    <Content/>
                </div>

            </FilterProvider>
        );
    }
}

export default Home;