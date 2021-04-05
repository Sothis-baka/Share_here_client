import React from "react";

const UserInfo = ({ username }) => {
    return (
        <div className='mod row'>
            <a href="#" className='col-12 col-lg-4'>
                <img src={process.env.PUBLIC_URL + 'meko.jpg'} alt="can't find icon" id='userIcon'/>
            </a>
            <span className='col-12 col-lg-4' id='username'>
                {username}
            </span>
        </div>
    );
};

class NavBar extends React.Component{
    render() {
        return (
            <div id='navBar' className='col-lg-4 col-md-3 col-1'>
                <div className="affix">
                    <UserInfo username = { this.props.username }/>
                    <ul className='mod'>
                        <li className='row' onClick={() => this.props.onClick('explore')}>
                            <span className='col-12 col-lg-4'>
                                <a href='#'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-hash" viewBox="0 0 16 16">
                                      <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"/>
                                    </svg>
                                </a>
                            </span>

                            <span className='navName col-8'><a href='#'>Explore</a></span>
                        </li>
                        <li className='row' onClick={() => this.props.onClick('posts')}>
                            <span className='col-12 col-lg-4'>
                                <a href='#'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg>
                                </a>
                            </span>

                            <span className='navName col-8'><a href='#'>Posts</a></span>
                        </li>
                        <li className='row' onClick={() => this.props.onClick('likes')}>
                            <span className='col-12 col-lg-4'>
                                <a href='#'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi" viewBox="0 0 16 16">
                                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                                    </svg>
                                </a>
                            </span>

                            <span className='navName col-8'><a href='#'>Likes</a></span>
                        </li>
                        <li className='row' onClick={this.props.toggleSearchBar}>
                            <span className='col-12 col-lg-4'>
                                <a href='#'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi" viewBox="0 0 16 16">
                                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                </a>
                            </span>
                            <span className='navName col-8'><a href='#'>Filter</a></span>
                        </li>
                    </ul>
                    <div id='contact' className='mod row'>
                        <span className='center col-6'>
                            <a href='#'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                        </span>
                        <span className='center col-6'>
                            <a href='#'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi" viewBox="0 0 16 16">
                                    <path d="M6.552 6.712c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888.008-.488-.36-.888-.816-.888zm2.92 0c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888s-.36-.888-.816-.888z"/>
                                    <path d="M13.36 0H2.64C1.736 0 1 .736 1 1.648v10.816c0 .912.736 1.648 1.64 1.648h9.072l-.424-1.48 1.024.952.968.896L15 16V1.648C15 .736 14.264 0 13.36 0zm-3.088 10.448s-.288-.344-.528-.648c1.048-.296 1.448-.952 1.448-.952-.328.216-.64.368-.92.472-.4.168-.784.28-1.16.344a5.604 5.604 0 0 1-2.072-.008 6.716 6.716 0 0 1-1.176-.344 4.688 4.688 0 0 1-.584-.272c-.024-.016-.048-.024-.072-.04-.016-.008-.024-.016-.032-.024-.144-.08-.224-.136-.224-.136s.384.64 1.4.944c-.24.304-.536.664-.536.664-1.768-.056-2.44-1.216-2.44-1.216 0-2.576 1.152-4.664 1.152-4.664 1.152-.864 2.248-.84 2.248-.84l.08.096c-1.44.416-2.104 1.048-2.104 1.048s.176-.096.472-.232c.856-.376 1.536-.48 1.816-.504.048-.008.088-.016.136-.016a6.521 6.521 0 0 1 4.024.752s-.632-.6-1.992-1.016l.112-.128s1.096-.024 2.248.84c0 0 1.152 2.088 1.152 4.664 0 0-.68 1.16-2.448 1.216z"/>
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;