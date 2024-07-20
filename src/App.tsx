import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/search';
import { useState } from 'react';
import { ApiResponses  } from './interfaces/responses';
import Chat from './components/chat';
import HomePage from './components/homepage';

function App() {

  const [apiResponses, setApiResponses] = useState<ApiResponses[]>([]);

  const addApiResponse = (apiResponse: ApiResponses) => {
    setApiResponses([...apiResponses, apiResponse]);
    console.log(apiResponses, "FROM APP");
  }

  return (
    <div className="app">
      { apiResponses.length > 0 ?
          <Chat apiResponsesArray={apiResponses} setApiResponses={addApiResponse}/> :
          <HomePage setApiResponses={addApiResponse}/>
      }
    </div>
  );
}

export default App;
