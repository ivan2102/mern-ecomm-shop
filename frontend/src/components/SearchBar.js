import React, { useState } from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';

function SearchBar({history}) {

   const [keyword, setKeyword] = useState('');

   const submitHandler = event => {
       event.preventDefault();

       if(keyword.trim()) {

        history.push(`/search/${keyword}`)

       }else {

        history.push('/')
       }
   }

    return (
        <Form onSubmit={ submitHandler } className='d-flex'>
          <FormControl
           type='text'
            name='searchbar'
             onChange={event => setKeyword(event.target.value)}
             placeholder='Find your Product'
             className='mr-sm-2 ml-sm-5'
             ></FormControl> 
             <Button type='submit' variant='outline-info' className='p-2'>Search</Button>
        </Form>
    )
}

export default SearchBar;
