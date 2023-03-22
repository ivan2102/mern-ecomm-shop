import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { topProductAction } from '../actions/productAction';



function ProductCarousel() {

    const dispatch = useDispatch();

    const topRatedProduct = useSelector(state => state.productTop);
    const {error, loading, products} = topRatedProduct;

    useEffect(() => {

        dispatch(topProductAction())

    }, [dispatch]);
    return (
       
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

            <Carousel pause='hover' className='btn-button carousel'>
                {products.map(product => (

                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image className='carousel-img' src={product.image} alt={product.name} fluid />
                        </Link>

                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default ProductCarousel;
