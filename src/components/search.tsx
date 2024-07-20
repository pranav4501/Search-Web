import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

interface ApiResponse {
    data: any;
}

function Search( { setApiResponses, extraProps } : any) {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(inputRef.current) {
        inputRef.current.focus();
        }
    }, []);
    const handleChange = (e : ChangeEvent<HTMLInputElement |  HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const handleKeyDown = (e : KeyboardEvent<HTMLInputElement |  HTMLTextAreaElement>) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmitAsk();
        }
    };

    const handleSubmit = async () => {
        if(value.trim() === '') {
        return;
        }
        setIsLoading(true);

        try {
        const res = await fetch('https://api-kn.replit.app/search', {
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
        console.log(res, "FROM SEARCH");
        const data = await res.json();
        console.log(data.json, "FROM SEARCH");
        let js = {query: value, response: data.json};
        console.log(js, "FROM SEARCH");
        setApiResponses(js);
        console.log(data.json);
        
        setValue('');
        if(inputRef.current) {
            inputRef.current.innerText = '';
        }
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmitAsk = async () => {
    if(value.trim() === '') {
        return;
        }
        setIsLoading(true);
        try {
            const res = await fetch('https://api-kn.replit.app/ask', {
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
            console.log(res, "FROM SEARCH");
            const data = await res.json();
            console.log(data.json, "FROM SEARCH");
            let js = {query: value, query_type: "ask", response: data.json};
            console.log(js, "FROM SEARCH");
            setApiResponses(js);
            console.log(data.json);
            
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
    handleSubmitAsk();
  }

  return (
    <div className='search-div'>
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        className='search-bar'
        sx={{ ml: 1, flex: 1 }}
        inputRef = {inputRef}
        value={value} // Add this line
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
        placeholder="Ask me something about recent events"
        inputProps={{ 'aria-label': 'search' }}
        multiline={extraProps?.multiline ?? true}
        rows={extraProps?.rows ?? 3}
      />
      <div onClick={handleSubmitAsk}>
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
        <button  onClick={() => handleRecommend("What is the crowdstrike issue?")}>What is the crowdstrike issue?</button>
        <button onClick={() => handleRecommend("Who won the latest Euros?")}>Who won the latest Euros?</button>
        <button onClick={() => handleRecommend("Did the startup Exa AI get funded recently?")}>Did the startup Exa AI get funded recently?</button>
    </div>}
    </div>
  );
}

export default Search;
