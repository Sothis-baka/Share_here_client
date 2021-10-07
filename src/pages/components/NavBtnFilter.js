import React from "react";

import NavFilterInput from "./NavFilterInput";

class NavBtnFilter extends React.Component{
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = { filterOn: false };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !this.state.filterOn === nextState.filterOn;
    }

    handleClick = () => {
        if(this.state.filterOn){
            // reset filter rule
            this.props.handleFilterRule({ keyword: "" });
            this.setState({ filterOn: false });
        }else {
            this.setState({ filterOn: true });
        }
    }

    render() {
        return (
            this.state.filterOn
                ?
                <NavFilterInput handleFilterRule={ this.props.handleFilterRule } handleExit={ this.handleClick }/>
                :
                <button id='filterBtn' onClick={ this.handleClick }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    <span>Filter</span>
                </button>
        );
    }

}

export default NavBtnFilter;