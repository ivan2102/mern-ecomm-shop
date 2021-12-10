import React, {useState} from 'react';
import { Col, Form, Button, FormGroup, FormLabel, FormCheck } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartAction';


function PaymentPage({ history }) {

    const [ paymentMethod, setPaymentMethod ] = useState('PayPal')
  

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;

    if(!shippingAddress) {

        history.push('/shipping');
    }

    const dispatch = useDispatch();

    const submitHandler = event => {

        event.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder')
    }

    return (
        <FormContainer>
           <CheckoutSteps step1 step2 step3/> 
           <h1>Payment</h1>

           <Form onSubmit={ submitHandler }>

               <FormGroup controlId="payment">
                   <FormLabel as="legend">Select Method</FormLabel>
              

               <Col>
               <FormCheck 
               type="radio"
                label="PayPal or Credit Card"
                 id="PayPal"
                  name="paymentMethod"
                   value="PayPal"
                   checked
                   onChange={event => setPaymentMethod(event.target.value)}
                   >
                   </FormCheck>
               </Col>

               <Col>
               <FormCheck
                type="radio"
                 label="Debit Card" 
                 id="DebitCart"
                  name="paymentMethod"
                   value="DebitCard"
                    checked 
                    onChange={event => setPaymentMethod(event.target.value)}
                    >     
                    </FormCheck>
               </Col>

               <Col>
               <FormCheck
                type="radio"
                 label="Cash" 
                 id="Cash"
                  name="paymentMethod"
                   value="Cash"
                    checked 
                    onChange={event => setPaymentMethod(event.target.value)}
                    >     
                    </FormCheck>
               </Col>

               <Col>
               <FormCheck
                type="radio"
                 label="Mobile Payments" 
                 id="MobilePayments"
                  name="paymentMethod"
                   value="MobilePayments"
                    checked 
                    onChange={event => setPaymentMethod(event.target.value)}
                    >     
                    </FormCheck>
               </Col>

               <Button type="submit" className="btn-block button my-3">Pay</Button>

               </FormGroup>
           </Form>
        </FormContainer>
    )
}

export default PaymentPage;
