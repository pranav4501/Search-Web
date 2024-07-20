import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { ApiResponse, ApiResponses } from '../interfaces/responses';
import Search from './search';
import '../assets/chat.css';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReactMarkdown  from 'react-markdown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import '../data/recommendations.json';

interface ChatProps {
    apiResponsesArray: ApiResponses[];
    setApiResponses: any;
}

const Chat : React.FC<ChatProps> = ({ apiResponsesArray, setApiResponses }) => {
    console.log(apiResponsesArray[0].response,"FROM CHAT");
    const [isCopied, setIsCopied] = useState(false);
    const handleCopyClick = async (event: React.MouseEvent<HTMLSpanElement>) => {
        try {
            const copyPopover = (event.target as HTMLElement).closest('.copy-popover');
            const responseDiv = copyPopover?.previousElementSibling as HTMLElement;
            const textToCopy = responseDiv?.innerText || '';
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 5000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
    };
    return (
        <div className='chat-window'>
            <div className='chat-window-header'>
                <div className='logo'>
                    అడుగు
                </div>
                <div className='icons'>
                    <SettingsIcon/>
                    <AccountCircleIcon/>
                </div>
            </div>
            <div className='chat-window-div'>
                {apiResponsesArray.map((apiResponses, index) => {
                    return(
                        <div key={index} className="query-response-pair">
                            <div className="query">
                                <div className="query-div message-div">
                                    <span>
                                        {apiResponses.query}
                                    </span>
                                </div>
                            </div>
                            <div className="response">
                                <div className='response-div message-div'>
                                {apiResponses.query_type === "ask" ? (
                                    <div className="single-response">
                                        <ReactMarkdown>{apiResponses.response[0].text}</ReactMarkdown>
                                    </div> )
                                    : (apiResponses.response.map((apiResponse, index) => {
                                    return (
                                        <div key={index} className="single-response">
                                            <p>{apiResponse.title}</p>
                                            <a target="_blank" href={apiResponse.url}>{apiResponse.url}</a>
                                        </div>
                                    );
                                }))}
                                <div className="copy-popover">
                                    <span className='copy-icon' onClick={handleCopyClick}><ContentCopyIcon/></span>
                                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='chat-search-div'>
                <Search setApiResponses={setApiResponses} extraProps={{
                    multiline: false,
                    rows: 1
                }}/>
            </div>
        </div>
    );
}

export default Chat;
