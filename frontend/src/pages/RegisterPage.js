import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Col, Row, Form, Button, FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { userRegister } from '../actions/userAction';

function RegisterPage({location, history}) {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const registerUser = useSelector(state => state.register)

    const {loading, error, userInfo} = registerUser;

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        if(userInfo) {

            history.push(redirect)
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (event) => {

       event.preventDefault();

       dispatch(userRegister(name, email, password));
    }

    
    return (
        <FormContainer>

           <h1>Register Form</h1>

           {error && <Message variant='red'>{error}</Message>}
           { loading && <Loader /> }

           <Form onSubmit={submitHandler}>
           <FormGroup controlId="name">
               <FormLabel>Your Name</FormLabel>
               <FormControl 
               type="text"
                placeholder="Your Name"
                 value={name } 
                 onChange={event => setName(event.target.value)}></FormControl>
           </FormGroup>

           <FormGroup controlId="email">
           <FormLabel>Your Email</FormLabel>
           <FormControl 
           type="email" 
           placeholder="Your Email"
            value={email }
             onChange={event => setEmail(event.target.value)}></FormControl>
           </FormGroup>

           <FormGroup controlId="password">
               <FormLabel>Your Password</FormLabel>
               <FormControl 
               type="password"
                placeholder="Your Password"
                 value={password } 
                 onChange={event => setPassword(event.target.value)}></FormControl>
           </FormGroup>

           <Button type="submit" className="btn-block button my-3">Register</Button>
           </Form>

           <Row className="py-3">
               <Col>
               Already have an account?{' '}
               <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
               </Col>
           </Row>
        </FormContainer>
    )
}

export default RegisterPage;
