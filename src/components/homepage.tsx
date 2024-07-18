import React from 'react';
import Search from './search';
import '../assets/homepage.css';

function HomePage({ setApiResponses } : any) {
    return (
        <div className="home-page">
            <h1>Welcome</h1>
            <div className='search-bar-div'>
                <h3>Search</h3>
                <Search setApiResponses={setApiResponses}/>
            </div>
        </div>
    )
}

export default HomePage;