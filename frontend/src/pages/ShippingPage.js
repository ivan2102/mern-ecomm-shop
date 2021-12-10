import React, { useState } from 'react';
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartAction';

function ShippingPage({ history }) {

    

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [ address, setAddress ] = useState(shippingAddress.address)
    const [ city, setCity ] = useState(shippingAddress.city)
    const [ zipCode, setZipCode ] = useState(shippingAddress.zipCode)
    const [ country, setCountry ] = useState(shippingAddress.country)

    const dispatch = useDispatch()

       const submitHandler = event => {

        event.preventDefault();

        dispatch(saveShippingAddress({address, city, zipCode, country}))
        history.push('/payment');
       }

    return (
        <FormContainer>

            <CheckoutSteps  step1 step2 />

           <h1>Shipping Address</h1> 

           <Form onSubmit={ submitHandler }>
               <FormGroup controlId="address">
                   <FormLabel>Your Address</FormLabel>
                   <FormControl 
                   type="text" 
                   placeholder="Your Address" 
                   value={ address } 
                   onChange={event => setAddress(event.target.value)}></FormControl>
               </FormGroup>

               <FormGroup controlId="city">
                   <FormLabel>Your City</FormLabel>
                   <FormControl 
                   type="text" 
                   placeholder="Your City"
                    value={ city }
                     onChange={event => setCity(event.target.value)}></FormControl>
               </FormGroup>

               <FormGroup controlId="zipCode">
                   <FormLabel>Your Postal Code</FormLabel>
                   <FormControl 
                   type="text" 
                   placeholder="Your Postal Code"
                    value={zipCode } 
                    onChange={event => setZipCode(event.target.value)}></FormControl>
               </FormGroup>

               <FormGroup controlId="country">
                   <FormLabel>Your Country</FormLabel>
                   <FormControl 
                   type="text"
                    placeholder="Your Country"
                     value={country } 
                     onChange={event => setCountry(event.target.value)}></FormControl>
               </FormGroup>

               <Button type="submit" className="btn-block button my-3">Shipping</Button>
           </Form>
        </FormContainer>
    )
}

export default ShippingPage;

