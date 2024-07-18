import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/search';
import { useState } from 'react';
import { ApiResponses  } from './interfaces/responses';
import Chat from './components/chat';

function App() {

  const [apiResponses, setApiResponses] = useState<ApiResponses[]>([]);

  const addApiResponse = (apiResponse: ApiResponses) => {
    setApiResponses([...apiResponses, apiResponse]);
    console.log(apiResponses, "FROM APP");
  }

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      {apiResponses.length > 0?
      <Chat apiResponsesArray={apiResponses} /> :
      <div>Search</div>
      }
    <Search setApiResponses={addApiResponse} />
    </div>
  );
}

export default App;
