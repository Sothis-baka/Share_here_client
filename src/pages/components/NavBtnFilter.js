import React from "react";

const FilterInput = ({ handleFilterRule, handleExit }) => {
    const handleChange = (e) => {
        handleFilterRule({ keyword: e.target.value });
    }

    return (
      <div id='filterArea'>
          <input className='inputMod' type='text' placeholder='keyword' autoFocus={ true } onChange={ handleChange }/>
          <span onClick={ handleExit }>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
          </span>
      </div>
    );
}

class NavBtnFilter extends React.Component{
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = { filterOn: false };
    }

    handleClick = () => {
        if(this.state.filterOn){
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
                <FilterInput handleFilterRule={ this.props.handleFilterRule } handleExit={ this.handleClick }/>
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