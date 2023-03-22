import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//import products from '../products';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { getProducts } from '../actions/productAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';




const HomePage = ({ match }) => {

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();

  const product = useSelector(state => state.product)

  const { loading, products, error, page, pages } = product;

  useEffect(() => {

      dispatch(getProducts(keyword, pageNumber))

  }, [dispatch, keyword, pageNumber]);

    return (
        <>
         
        <Meta />

       { !keyword ? <ProductCarousel /> :  <Link to='/' className='btn btn-light'>Go Home</Link>}
       
           <h1>Featured Products</h1> 

           {loading ? 
           
           (
           <Loader />
           ) : error ? ( 
           <Message variant="danger">{error}</Message>
           ) : (

           <>

           <Row>
               {products.map(product => (

                   <Col sm={12} md={6} lg={4} xl={3}>
                     <Product key={product._id} product={product} />
                   </Col>
               ))}
           </Row>

           <Paginate page={ page } pages={ pages }  keyword={ keyword ? keyword : ''}/>

           </>
           )}

           
        </>
    )
}

export default HomePage;
