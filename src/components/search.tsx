import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';


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

    const handleChange = (e : FormEvent<HTMLDivElement>) => {
        setValue(e.currentTarget.innerText);
    };

    const handleKeyDown = (e : KeyboardEvent<HTMLDivElement>) => {
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
    <div>
        <div ref = {inputRef} contentEditable onInput={handleChange} onKeyDown={handleKeyDown} role='textbox' aria-multiline = 'true' />
        <button onClick={handleSubmit} disabled={isLoading || value.trim() === ''}>{isLoading ? <span>Sending</span>:<span>Send</span>}</button>  
    </div>
  );
}

export default Search;
