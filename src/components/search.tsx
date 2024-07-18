import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface ApiResponse {
    data: any;
}

function Search( { setApiResponses } : any) {
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
            handleSubmit();
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
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        className='search-bar'
        sx={{ ml: 1, flex: 1 }}
        inputRef = {inputRef}
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        multiline={true}
        rows={3}
      />
      <div onClick={handleSubmit}>
        <IconButton 
                disabled={isLoading || value.trim() === ''}
                type="button" 
                sx={{ p: '10px' }} 
                aria-label="search">
            <SearchIcon />
        </IconButton>
      </div>
    </Paper>
  );
}

export default Search;
