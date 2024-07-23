import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/search';
import { useState } from 'react';
import { ApiResponses  } from './interfaces/responses';
import Chat from './components/chat';
import HomePage from './components/homepage';
import Navbar from './components/navbar';
import {useSelector } from 'react-redux';

function App() {

  const [apiResponses, setApiResponses] = useState<ApiResponses[]>([]);
  const isLoading = useSelector((state: any) => state.loading);
  const addApiResponse = (apiResponse: ApiResponses) => {
    setApiResponses([...apiResponses, apiResponse]);
  }

  return (
    <div className="app">
      {isLoading ? <div className='loading-div'><div className='loader' /></div> : <div/>}
      <Navbar/>
      { apiResponses.length > 0 ?
          <Chat apiResponsesArray={apiResponses} setApiResponses={setApiResponses}/> :
          <HomePage setApiResponses={setApiResponses}/>
      }
    </div>
  );
}

export default App;
