import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Button, FormGroup, FormControl, Table, FormLabel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userAction';
import { getOrdersOnProfile } from '../actions/orderAction';
import { USER_UPDATE_PROFILE_RESET } from '../actions/types';


const ProfilePage = ({ history}) => {

    const [name, setName ] = useState('')
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.details)

    const {loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.login)
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.updateProfile)
    const {  success } = userUpdateProfile;

    const myOrdersProfile = useSelector(state => state.myOrdersProfile)
    const { loading: loadingOrders, error: errorOrders, orders } = myOrdersProfile;


    

    useEffect(() => {

        if(!userInfo) {

            history.push('/login');

        }else {

            if(!user || !user.name || success) {

                dispatch({type: USER_UPDATE_PROFILE_RESET })

                dispatch(getUserDetails('profile'))

                dispatch(getOrdersOnProfile())

            }else {

              setName(user.name)
              setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success]);

      const submitHandler = event => {

        event.preventDefault();

        dispatch(updateUserProfile({id: user._id, name, email, password}))
      }

    return (
       
        <Row>
            <Col md={3}>

                <h2>User Profile</h2>
                {error && <Message variant='red'>{error}</Message>}
                { success && <Message variant='success'>Profile Updated Successfully</Message> }
                {loading && <Loader />}

            <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
                <FormLabel>Your Name</FormLabel>
                <FormControl 
                type="text"
                 placeholder="Your Name"
                  value={ name } 
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

            <Button type="button" className="btn-block button my-3">Update</Button>
        </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>

                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{ error }</Message> : (

                    <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Total Price</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Details</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (

                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (<i className='fas fa-times' style={{color: 'red'}}></i>)}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (<i className='fas fa-times' style={{color: 'red'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                    <Button className='btn-sm' variant='primary'>Order Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </Table>
                )}
            </Col>
        </Row>

        
    )
}

export default ProfilePage;
