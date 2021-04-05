import React from 'react';

class SearchInput extends React.Component{
    render() {
        return(
            <div id='searchInputWrapper' className='container'>
                <div id='searchInputGroup'>
                    <input type='text' name='title' placeholder='title' value={this.props.keyword.title} onChange={this.props.updateKeyword}/>
                    <input type='text' name='content' placeholder='content' value={this.props.keyword.content} onChange={this.props.updateKeyword}/>
                    <input type='text' name='username' placeholder='username' value={this.props.keyword.username} onChange={this.props.updateKeyword}/>
                    <span>
                      <a href='#' onClick={this.props.toggleSearchBar}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi" viewBox="0 0 16 16">
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                          </svg>
                      </a>
                  </span>
                </div>
            </div>
        );
    }
}

export default SearchInput;