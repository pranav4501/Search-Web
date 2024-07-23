import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import recommedations from '../data/recommendations.json';
import {useSelector, useDispatch } from 'react-redux';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import slice from '../state/Slice';
import '../assets/search.css'
import { ApiResponse, ApiResponses } from '../interfaces/responses';


interface SearchProps {
    setApiResponses: React.Dispatch<React.SetStateAction<ApiResponse[]>>;
    extraProps?: any;
  }

function Search( { setApiResponses, extraProps } : any) {
    const [value, setValue] = useState('');
    const [queryType, setQueryType] = useState<string>('ask');
    const isLoading = useSelector((state: any) => state.loading);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(inputRef.current) {
        inputRef.current.focus();
        }
    }, []);

    const handleQueryTypeChange = (event: SelectChangeEvent<string>) => {
        setQueryType(event.target.value);
    };

    const handleChange = (e : ChangeEvent<HTMLInputElement |  HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const handleKeyDown = (e : KeyboardEvent<HTMLInputElement |  HTMLTextAreaElement>) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

  const handleSubmit = async () => {
    if(value.trim() === '') {
        return;
        }
        dispatch(slice.actions.setLoading({loading: true}))
        let fullResponse = '';
        try {
            const res = await fetch(`https://fast-api-openai-dstryr.replit.app/${queryType}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                query: value,
                }),
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            if(queryType === 'search') {
            const data = await res.json();
            setApiResponses((prevResponses: ApiResponses[]) => [
                ...prevResponses,
                { query: value, query_type: queryType, response: data.json }
              ]);
            }
            else if(queryType === 'ask') {
                const reader = res.body!.getReader();
                const decoder = new TextDecoder();
                let buffer = '';
                while (true) {
                    const { done, value:chunk } = await reader.read();
                    if (done) {
                        break;
                    }
                    const text = decoder.decode(chunk);
                    fullResponse += text;
                    setApiResponses((prevResponses: ApiResponses[]) => {
                        const updatedResponses = [...prevResponses];
                        const lastResponse = updatedResponses[updatedResponses.length - 1];
                        if (lastResponse && lastResponse.query === value && lastResponse.query_type === 'ask') {
                          lastResponse.response[0].text = fullResponse;
                        } else {
                          updatedResponses.push({
                            query: value,
                            query_type: 'ask',
                            response:[{"text": fullResponse, "author": "", "highlights": "", "id": "", "published_data": "", "score": "", "summary": "",  "title": "", "url": ""}]
                          });
                        }
                        return updatedResponses;
                    });
                    
                    
                }  
            }         
            
            setValue('');
            if(inputRef.current) {
                inputRef.current.innerText = '';
            }
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(slice.actions.setLoading({loading: false}))
        }
        setValue('');
      };

  const handleRecommend = (query : string) => {
    setValue(query);
    handleSubmit();
  }

  return (
    <div className='search-div'>
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
    <Select
        value={queryType}
        onChange={handleQueryTypeChange}
        sx={{ mr: 1 }}
        MenuProps={{
          PaperProps: {
            className: "query-ask-select"
          }
        }}>
        <MenuItem value="ask">Ask</MenuItem>
        <MenuItem value="search">Search</MenuItem>
    </Select>
      <InputBase
        className='search-bar'
        sx={{ ml: 1, flex: 1 }}
        inputRef = {inputRef}
        value={value}
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
        placeholder="Ask me something about recent events"
        inputProps={{ 'aria-label': 'search' }}
        multiline={extraProps?.multiline ?? true}
        rows={extraProps?.rows ?? 3}
      />
      <div onClick={handleSubmit}>
        <IconButton 
                disabled={isLoading || value.trim() === ''}
                type="button" 
                sx={{ p: '10px' }} 
                aria-label="search">
            <ArrowUpwardIcon />
        </IconButton>
      </div>
    </Paper>
    {extraProps?.recommended && <div className='recommended-div'>
        {
            recommedations.map((recommendation, index) => (
                <button key={index} onClick={() => handleRecommend(recommendation)}>{recommendation}</button>
            ))
        }
    </div>}
    </div>
  );
}

export default Search;
