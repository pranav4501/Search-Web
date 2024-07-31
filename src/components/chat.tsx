import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { ApiResponse, ApiResponses } from '../interfaces/responses';
import Search from './search';
import '../assets/chat.scss';
import ReactMarkdown  from 'react-markdown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import '../data/recommendations.json';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LinkWithPopover from './linkpopover';
import { useSelector } from 'react-redux';

interface ChatProps {
    apiResponsesArray: ApiResponses[];
    setApiResponses: any;
}

function LinkRenderer(props: any) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  }
  

const Chat : React.FC<ChatProps> = ({ apiResponsesArray, setApiResponses }) => {
    const [isCopied, setIsCopied] = useState(false);
    const isLoading = useSelector((state: any) => state.loading);
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
            <div className='chat-window-div'>
                {apiResponsesArray?.map((apiResponses, index) => {
                    return(
                        <div key={index} className="query-response-pair">
                            <div className="query">
                                <div className="query-div message-div">
                                    <span>
                                        {apiResponses.query} 
                                    </span>
                                </div>
                                <div className="query-avatar"><AccountCircleIcon/></div>
                            </div>
                            <div className="response">
                                <div className="response-avatar"><SmartToyIcon/></div>
                                <div className='response-div message-div'>
                                {apiResponses.query_type === "ask" ? (
                                    <div className="single-response single-response-ask">
                                        <ReactMarkdown components={{ a: LinkRenderer}}>{apiResponses.response[0].text}</ReactMarkdown>
                                        {isLoading && apiResponsesArray.length - 1 === index ? <div className='loading-div'><div className='loader' /></div> : null}
                                    </div> )
                                    : (apiResponses.response.map((apiResponse, index) => {
                                    return (
                                        <div>
                                            <div key={index} className="single-response single-response-search">
                                                <p>{apiResponse.title}</p>
                                                <LinkWithPopover url={apiResponse.url} summary={apiResponse.summary}/>
                                            </div>
                                            {isLoading && apiResponsesArray.length - 1 === index ? <div className='loading-div'><div className='loader' /></div> : null}
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
