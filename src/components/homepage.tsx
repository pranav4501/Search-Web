import React from 'react';
import Search from './search';
import '../assets/homepage.scss';
import SearchIcon from '@mui/icons-material/Search';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

function HomePage({ setApiResponses } : any) {
    return (
        <div className="home-page">
            <h1>Hey There !</h1>
            <div className='search-bar-div'>
                <Search setApiResponses={setApiResponses} extraProps={{
                    recommended: true,
                    isHomePage: true
                }}/>
            </div>
            <div className='help-window'>
                <div className="help-window-info">
                    <span className='help-window-header'>Ask <QuestionMarkIcon/></span>
                    <div>Ask something about recent events, AI answers using content from the internet.</div>
                </div>
                <div className="help-window-info">
                    <span className='help-window-header'>Search <SearchIcon/></span>
                    <div>Search results from the web using contextual understanding of your query.</div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
