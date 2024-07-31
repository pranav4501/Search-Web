import React from 'react';
import './App.scss';
import { useState } from 'react';
import { ApiResponses  } from './interfaces/responses';
import Chat from './components/chat';
import HomePage from './components/homepage';
import Navbar from './components/navbar';
import {useSelector } from 'react-redux';

function App() {

  const [apiResponses, setApiResponses] = useState<ApiResponses[]>([]);
  const isLightMode = useSelector((state: any) => state.isLightMode);

  return (
    <div className={`app ${isLightMode ? 'light-mode' : 'dark-mode'}`}>
      <Navbar/>
      { apiResponses.length > 0 ?
          <Chat apiResponsesArray={apiResponses} setApiResponses={setApiResponses}/> :
          <HomePage setApiResponses={setApiResponses}/>
      }
    </div>
  );
}

export default App;
