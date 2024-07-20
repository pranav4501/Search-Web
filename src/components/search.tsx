import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import recommedations from '../data/recommendations.json';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import '../assets/search.css'

interface ApiResponse {
    data: any;
}

function Search( { setApiResponses, extraProps } : any) {
    const [value, setValue] = useState('');
    const [queryType, setQueryType] = useState<string>('ask');
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(inputRef.current) {
        inputRef.current.focus();
        }
    }, []);

    const handleQueryTypeChange = (event: SelectChangeEvent<string>) => {
        setQueryType(event.target.value);
        console.log(event.target.value);
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
        setIsLoading(true);
        try {
            const res = await fetch(`https://api-kn.replit.app/${queryType}`, {
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
            const data = await res.json();
            let js = {query: value, query_type: queryType, response: data.json};
            setApiResponses(js);
            
            setValue('');
            if(inputRef.current) {
                inputRef.current.innerText = '';
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
        setValue('');
      };

  const handleRecommend = (query : string) => {
    setValue(query);
    handleSubmit();
  }

  return (
    <div className='search-div'>
        {isLoading ? <div className='loading-div'><div className='loader' /></div> : <div></div>}
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
    <Select
        value={queryType}
        onChange={handleQueryTypeChange}
        sx={{ mr: 1 }}>
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
