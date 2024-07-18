import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { ApiResponse, ApiResponses } from '../interfaces/responses';


interface ChatProps {
    apiResponsesArray: ApiResponses[];
}

const Chat : React.FC<ChatProps> = ({ apiResponsesArray } : ChatProps) => {
    console.log(apiResponsesArray[0].response,"FROM CHAT");
    return (
        <div>
            {apiResponsesArray.map((apiResponses, index) => {
                return(
                    <div key={index}>
                        <h1> {apiResponses.query}</h1>
                        {apiResponses.response.map((apiResponse, index) => {
                            return (
                                <div key={index}>
                                    <p>{apiResponse.title}</p>
                                    <a href={apiResponse.url}>{apiResponse.url}</a>
                                </div>
                            );
                        })}
                    </div>
                )
            })}
            
        </div>
    );
}

export default Chat;
