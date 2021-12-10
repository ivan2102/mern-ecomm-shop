import React, { useEffect } from 'react';
import { Col, Row, Button, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderAction';

function PlaceOrderPage({ history }) {



    const dispatch = useDispatch()

  const cart = useSelector(state => state.cart);

  const addDecimals = (num) => {

    return (Math.round(num * 100) / 100).toFixed(2)
  }

  // Calculate prices
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  cart.shippingPrice = (Number(cart.itemsPrice > 100 ? 0 : 100)).toFixed(2)
 cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
 cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

 const orderCreate = useSelector(state => state.order)

 const {order, success, error} = orderCreate


 useEffect(() => {

    if(success) {

        history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
 }, [history, success]);
  


  const placeOrderHandler = event => {

    event.preventDefault();
    dispatch(createOrder({

        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
    })

    )
  }

    return (
        <>
          <CheckoutSteps step1 step2 step3 step4 /> 

          <Row>
             <Col md={8}>
                 <ListGroup variant="flush">
                     <ListGroupItem>
                         <h2>Shipping</h2>
                         <p>
                             <strong>Address: </strong>
                             {cart.shippingAddress.address}, 
                             {cart.shippingAddress.city},{' '}
                              {cart.shippingAddress.zipCode}, {' '}
                              {cart.shippingAddress.country}
                         </p>
                     </ListGroupItem>

                     <ListGroupItem>
                         <h2>Payment</h2>

                         <strong>Method: </strong>
                         { cart.paymentMethod }
                     </ListGroupItem>

                     <ListGroupItem>
                         <h2>Order Items</h2>
                         {cart.cartItems.length === 0 ? <Message>Your Cart is empty</Message> : (

                             <ListGroup variant="flush">
                                 {cart.cartItems.map((item, index) => (

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
                                 <Col>${cart.itemsPrice}</Col>
                             </Row>
                         </ListGroupItem>

                         <ListGroupItem>
                             <Row>
                                 <Col>Shipping</Col>
                                 <Col>${cart.shippingPrice}</Col>
                             </Row>
                         </ListGroupItem>

                         <ListGroupItem>
                             <Row>
                                 <Col>Tax</Col>
                                 <Col>${cart.taxPrice}</Col>
                             </Row>
                         </ListGroupItem>

                         <ListGroupItem>
                             <Row>
                                 <Col>Total Price</Col>
                                 <Col>${cart.totalPrice}</Col>
                             </Row>
                         </ListGroupItem>

                         <ListGroupItem>

                         </ListGroupItem>
                         {error && <Message variant='danger'>{ error }</Message>}
                         <ListGroupItem>
                             <Button 
                             type="button" 
                             className="btn-block button my-3"
                              disabled={cart.cartItems === 0}
                              onClick={ placeOrderHandler }
                              >Place Order</Button>
                         </ListGroupItem>
                     </ListGroup>
                 </Card>
             </Col>
        </Row> 
        </>
    )
}

export default PlaceOrderPage;
