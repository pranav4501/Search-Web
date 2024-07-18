import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { ApiResponse, ApiResponses } from '../interfaces/responses';
import Search from './search';


interface ChatProps {
    apiResponsesArray: ApiResponses[];
    setApiResponses: any;
}

const Chat : React.FC<ChatProps> = ({ apiResponsesArray, setApiResponses }) => {
    console.log(apiResponsesArray[0].response,"FROM CHAT");
    return (
        <div>
            <div>
                {apiResponsesArray.map((apiResponses, index) => {
                    return(
                        <div key={index}>
                            <h1> {apiResponses.query}</h1>
                            {apiResponses.response.map((apiResponse, index) => {
                                return (
                                    <div key={index}>
                                        <p>{apiResponse.title}</p>
                                        <a target="_blank" href={apiResponse.url}>{apiResponse.url}</a>
                                    </div>
                                );
                            })}
                        </div>
                    )
                })}
            </div>
            <div className='chat-search-div'>
                <Search setApiResponses={setApiResponses}/>
            </div>
        </div>
    );
}

export default Chat;
