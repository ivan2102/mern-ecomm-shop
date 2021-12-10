import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, FormControl, FormGroup, FormLabel, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
//import products from '../products';
import { ListGroupItem } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct, productReviewsAction } from '../actions/productAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { PRODUCT_REVIEWS_RESET } from '../actions/types';


function ProductPage({history, match}) {

 const [ quantity, setQuantity ] = useState(1);
 const [ rating, setRating ] = useState(0);
 const [ comment, setComment ] = useState('')

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails)

    const {loading, error, product} = productDetails;

    const productReviews = useSelector(state => state.productReviews);
    const {error: errorReview, success: successReview} = productReviews;

    const userLogin = useSelector(state => state.login);
    const { userInfo } = userLogin;

       useEffect(() => {

        if(successReview) {

            alert('Review added successfully!')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_REVIEWS_RESET})
        }

        dispatch(getSingleProduct(match.params.id))

       
    }, [dispatch, match.params.id, successReview])

   
    
    // Add to Cart
    const addToCartHandler = () => {

        history.push(`/cart/${match.params.id}?qty=${quantity}`)
    }

    //Add Review 
    const submitHandler = (event) => {
        event.preventDefault();

        dispatch(productReviewsAction(match.params.id, {

            rating,
            comment
        }))
    }

  // const product = products.find(p => p._id === params.id);

    return (
        <>
            <Link className="btn btn-light my-3" to='/'>Home</Link>

            {loading ? 
            
            (

            <Loader />
            
            ) :
            
            error ? (
            
            <Message variant="danger">{error}</Message>
            
            ) : ( 

                <>

                <Meta title={product.name} />
                
                <Row>
                <Col md={7}>
                <Image  src={product.image} alt={product.name} fluid />
                </Col>


                <Col md={3} style={{'margin': ' 0rem 5rem'}}>
                    <Card>
                        <ListGroup variant="flush">

                            <ListGroupItem>
                                <Row>
                                    <Col>Price:</Col>

                                    <Col>
                                    <strong>{product.price}</strong>
                                    </Col>
                                </Row>
                                </ListGroupItem>

                                <ListGroupItem>

                                    <Row>
                                        <Col>Status:</Col>

                                        <Col>
                                        {product.countInStock > 0 ? 'In Stock': 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                                {product.countInStock > 0 && (

                                    <ListGroupItem>
                                        <Row>
                                            <Col> Qty </Col>
                                            <Col>
                                            <FormControl 
                                            as="select"
                                             value={quantity}
                                              onChange={event => setQuantity(event.target.value)}>
                                                 { [...Array(product.countInStock).keys()].map(item => (

                                                      <option key={item + 1} value={item + 1}>
                                                          { item + 1 }
                                                      </option>
                                                  ))}
                                              </FormControl>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}

                                <ListGroupItem>
                                    <Button 
                                    onClick={ addToCartHandler }
                                    className="btn-block button"
                                     type="button" 
                                     disabled={product.countInStock === 0}
                                     >
                                    Add To Cart
                                    </Button>
                                </ListGroupItem>
                            
                        </ListGroup>
                    </Card>
                </Col>
                  

                


                <Col md={5}>

               <ListGroup variant="flush">
                   <ListGroupItem>
                       <h2>{ product.name }</h2>
                   </ListGroupItem>

                   <ListGroupItem>
                       <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                   </ListGroupItem>

                   <ListGroupItem>
                       Price: ${product.price}
                   </ListGroupItem>

                   <ListGroupItem>
                       Description: {product.description}
                   </ListGroupItem>
               </ListGroup>

                </Col>

               </Row>
            
            <Row>
            <Col md={6}>
                <h2>Reviews</h2>

                {product.reviews.length === 0 && <Message>No Reviews found</Message>}

                <ListGroup variant='flush'>
                    {product.reviews.map(review => (

                        <ListGroupItem key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating}/>
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>
                        </ListGroupItem>
                    ))}

                    <ListGroupItem>
                        <h3>Write your Review</h3>


                      {errorReview && <Message variant='danger'>{ errorReview }</Message>}

                      {userInfo ? (

                      <Form onSubmit={submitHandler}>
                      <FormGroup controlId='rating'>
                          <FormLabel>Rating</FormLabel>
                          <FormControl as='select' value={rating} onChange={event => setRating(event.target.value)}>
                          <option value=''>Select</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                          </FormControl>
                      </FormGroup>

                      <FormGroup controlId='comment'>
                          <FormLabel>Write your Comment</FormLabel>
                          <FormControl as='textarea' row='3' value={comment} onChange={event => setComment(event.target.value)}></FormControl>
                      </FormGroup>

                      <Button type='submit' className='btn btn-block btn-button my-3'>Submit</Button>
                      </Form>

                      ) : (
                          <Message>
                          Please <Link to='/login'>sign in</Link> to write a review
                      </Message>)}
                    </ListGroupItem>
                </ListGroup>
            </Col>
            </Row>
            
            </>
            )}

          
        </>
    )
}

export default ProductPage;
