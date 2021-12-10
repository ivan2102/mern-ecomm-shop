import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { userLogin } from '../actions/userAction';
import FormContainer from '../components/FormContainer';

const LoginPage = ({ location, history }) => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const dispatch = useDispatch();

    const login = useSelector(state => state.login)

    const { loading, error, userInfo } = login;

    const redirect = location.search ? location.search.split('=')[1]: '/'

    useEffect(() => {

        if(userInfo) {

            history.push(redirect);
        }
    }, [history, userInfo, redirect])

    

    const submitHandler = event => {

        event.preventDefault();

        dispatch(userLogin(email, password));
    }

    return (
        <FormContainer>
            <h1>Login Form</h1>

            { error && <Message variant='red'>{ error }</Message> }
            { loading && <Loader/> }

            <Form onSubmit={ submitHandler }>
            <FormGroup controlId="email">
                <FormLabel>Your Email</FormLabel>
                <FormControl 
                type="email"
                 placeholder="Your Email Address"
                  value={ email } 
                  onChange={event => setEmail(event.target.value)}></FormControl>
            </FormGroup>

            <FormGroup controlId="password">
                <FormLabel>Your Password</FormLabel>
                <FormControl 
                type="password"
                 placeholder="Your Password"
                  value={ password }
                   onChange={event => setPassword(event.target.value)}></FormControl>
            </FormGroup>

            <Button type="submit" className="btn-block button my-3">Sign In</Button>
            </Form>

            <Row className="py-3">
                <Col>
                Register a new User?{' '}
                <Link to={redirect ? `/register?redirect=${ redirect }` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginPage;
