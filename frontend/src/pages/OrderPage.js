import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, ListGroupItem, Button } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, getOrderPaid, orderDeliveryAction } from '../actions/orderAction';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET  } from '../actions/types';

function OrderPage({ match, history }) {

    const dispatch = useDispatch();

const orderId = match.params.id;

const [ sdkReady, setSdkReady ] = useState(false)

const userLogin = useSelector(state => state.login)
const { userInfo } = userLogin

const orderDetails = useSelector(state => state.orderDetails);
const { order, loading, error } = orderDetails;

const orderPay = useSelector(state => state.orderPay)
const {loading: loadingPay, success: successPay} = orderPay

const orderDeliver = useSelector(state => state.orderDeliver)
const {loading: loadingDeliver,  success: successDeliver} = orderDeliver

if(!loading) {
const addDecimals = (num) => {

    return (Math.round(num * 100) / 100).toFixed(2)
}

// Calculate prices
 order.itemsPrice = addDecimals(Number(order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)))
order.shippingPrice = (Number(order.itemsPrice > 100 ? 0 : 100)).toFixed(2)
order.taxPrice= addDecimals(Number((0.15 * order.itemsPrice).toFixed(2)))

}

useEffect(() => {

    if(!userInfo) {

        history.push('/login')
    }

    const addPayPalScript = async () => {

        const { data: clientId } = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {

            setSdkReady(true)
        }

        document.body.appendChild(script)
    }

    if(!order || order._id !== orderId || successPay || successDeliver) {

        dispatch({ type: ORDER_PAY_RESET })
        dispatch({ type: ORDER_DELIVER_RESET })
        
  dispatch(getOrderDetails(orderId))

    } else if(!order.isPaid) {

        if(!window.paypal) {

            addPayPalScript()

        }else {

            setSdkReady(true)
        }
    }
 
}, [dispatch, orderId, order, successPay, successDeliver])



const successPaymentHandler = (paymentResult) => {

    dispatch(getOrderPaid(orderId, paymentResult))
}


const successDeliveryHandler = () => {

   dispatch(orderDeliveryAction(order))
}

    return (
       
        loading ? <Loader /> : error ? <Message variant='danger'>{ error }</Message> : 
        
        <> 
        <h1>Order: { order._id }</h1>

        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>Shipping</h2>

                       <p> <strong>Name: </strong> { order.user.name }</p>
                        <p><strong>Email: </strong><a href={`mailto: ${ order.user.email }`}>{ order.user.email }</a></p>

                        <p>
                            <strong>Address: </strong>

                            {order.shippingAddress.address},
                            {order.shippingAddress.city} {' '},
                            { order.shippingAddress.zipCode } {' '},
                            {order.shippingAddress.country}

                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : 
                            
                            <Message variant='danger'>Not Delivered</Message>
                            
                            }
                        </p>
                    </ListGroupItem>

                    <ListGroupItem>
                        <h2>Payment Method</h2>

                        <p>
                       <strong>Method: </strong>
                        {order.paymentMethod}
                       </p>

                      {order.isPaid ? <Message variant='success'>Paid on { order.paidAt }</Message> :
                      
                      <Message variant='danger'>Not Paid</Message>
                      
                      }

                    </ListGroupItem>

            <ListGroupItem>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? <Message>Your Order is empty</Message> : (

    <ListGroup variant="flush">
        {order.orderItems.map((item, index) => (

            <ListGroupItem key={index}>
        <Row>
            <Col md={1}>

                <Image src={item.image} alt={item.name} fluid rounded />
            </Col>

            <Col>
            <Link to={`/product/${item.product}`}>
                { item.name }
            </Link>
            </Col>

            <Col md={4}>
                {item.quantity} x ${item.price} = ${ item.quantity * item.price }
                    </Col>
                </Row>
                    </ListGroupItem>
                ))}
            </ListGroup>
            )}
            </ListGroupItem>

            </ListGroup>
            </Col>


                        
             <Col md={4}>
                 <Card>
                     <ListGroup variant="flush">
                         <ListGroupItem>
                             <h2>Order Summary</h2>
                         </ListGroupItem>

                         <ListGroupItem>
                             <Row>
                                 <Col>Items</Col>
                                 <Col>${order.itemsPrice}</Col>
                             </Row>
                         </ListGroupItem>

                         <ListGroupItem>
                             <Row>
                                 <Col>Shipping</Col>
                                 <Col>${order.shippingPrice}</Col>
                             </Row>
                         </ListGroupItem>

                         <ListGroupItem>
                             <Row>
                                 <Col>Tax</Col>
                                 <Col>${order.taxPrice}</Col>
                             </Row>
                         </ListGroupItem>

                         <ListGroupItem>
                             <Row>
                                 <Col>Total Price</Col>
                                 <Col>${order.totalPrice}</Col>
                             </Row>
                         </ListGroupItem>

                         {!order.isPaid && (

                            <ListGroupItem>
                             {loadingPay && <Loader />}
                             {!sdkReady ? <Loader /> : (

                                 <PayPalButton amount={order.totalPrice} onSuccess={ successPaymentHandler }/>
                             )}
                            </ListGroupItem>
                         )}

                        { loadingDeliver && <Loader /> }
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (

                            <ListGroupItem>
                                <Button
                                 type='button' 
                                 className='btn btn-block btn-button'
                                  onClick={ successDeliveryHandler }>Mark As Delivered</Button>
                            </ListGroupItem>
                        )}
                         
                     </ListGroup>
                 </Card>
             </Col>
             </Row>
        </>
    )
}

export default OrderPage;
