import React from "react";

import NavBtnFilter from "./NavBtnFilter";
import NavUserMobile from "./NavUserMobile";
import NavBtnPen from "./NavBtnPen";

class NavBtns extends React.Component{
    constructor(props) {
        super(props);
        this.state = { selected: 'normal' };
    }

    handleSelect = (value) => {
        this.setState({ selected: value });
        this.props.handleFilterRule({ rule: value });
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.selected !== nextState.selected;
    }

    render() {
        const selected = this.state.selected;

        return (
            <div id='navBtns' className='mod'>
                <button className={selected==='normal'?'focus':''} onClick={ () => this.handleSelect('normal') }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet">
                        <path d="M8.9,13.882l.328-3.1H3.974L3.633,14l-1.153-.12.328-3.1H0V9.619H2.932l.555-5.234H0V3.221H3.61L3.951,0,5.1.122l-.328,3.1h5.251L10.367,0l1.153.12-.328,3.1H14V4.385H11.068l-.555,5.234H14v1.163H10.39L10.049,14Zm.452-4.263L9.9,4.385H4.652L4.1,9.619Z" transform="translate(1.4 0)"/>
                    </svg>
                    <span>Explore</span>
                </button>
                <button value='post' className={selected==='post'?'focus':''} onClick={ () => this.handleSelect('post') }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                    </svg>
                    <span>Posts</span>
                </button>
                <button value='like' className={selected==='like'?'focus':''} onClick={ () => this.handleSelect('like') }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                    </svg>
                    <span>Likes</span>
                </button>
                <NavBtnFilter handleFilterRule={ this.props.handleFilterRule }/>
                <NavBtnPen/>
                <NavUserMobile/>
            </div>
        );
    }
}

export default NavBtns;