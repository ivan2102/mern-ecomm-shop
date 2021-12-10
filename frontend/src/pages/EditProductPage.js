import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getSingleProduct, updateProductAction } from '../actions/productAction';
import { PRODUCT_UPDATE_RESET } from '../actions/types';



function EditProductPage({ match, history }) {

    const productId = match.params.id;

    const [ name, setName ] = useState('');
    const [price, setPrice ] = useState(0);
    const [image, setImage ] = useState('');
    const [brand, setBrand ] = useState('');
    const [category, setCategory ] = useState('');
    const [ countInStock, setCountInStock ] = useState(0);
    const [description, setDescription ] = useState('')
    const [ upload, setUpload ] = useState(false)

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product } = productDetails;

    const updateProduct = useSelector(state => state.updateProduct);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = updateProduct;

    useEffect(() => {

        if(successUpdate) {

            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist');

        }else {

        if(!product.name || product._id !== productId) {

            dispatch(getSingleProduct(productId));

        }else {

            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }

    }
    }, [dispatch, history, product, productId, successUpdate])

    const submitHandler = event => {

        event.preventDefault();

        dispatch(updateProductAction({

            _id: productId,
            name,
            image,
            price,
            brand,
            category,
            countInStock,
            description
        }))
    }


    const uploadFileHandler = async (event) => {

        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUpload(true)

        try {

            const config = {

                headers: {

                    'Content-Type': 'multipart/form-data'
                }
            }

            const res = await axios.post('/api/upload', formData, config);

            setImage(res.data)

            setUpload(false)
            
        } catch (error) {
           
            console.error(error);
            setUpload(false)
        }
    }



    return (
        <>

        <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>

        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader/> }
            {errorUpdate && <Message variant='danger'>{ errorUpdate }</Message>}
            {loading ? <Loader/> : error ? (<Message variant='danger'>{ error }</Message>) : (

                <Form onSubmit={ submitHandler }>
                    <FormGroup controlId='name'>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl 
                        type='text' 
                        placeholder='Product Name'
                         value={name}
                          onChange={event => setName(event.target.value)}>
                          </FormControl>
                    </FormGroup>

                    <FormGroup controlId='image'>
                        <FormLabel>Product Image</FormLabel>
                        <FormControl 
                        type='file' 
                        placeholder='Image Url'
                         onChange={ uploadFileHandler }
                         >
                         </FormControl>

                         {/* <FormFile 
                         id='image-file'
                          label='Choose File'
                           custom 
                           onChange={ uploadFileHandler }>
                         </FormFile> */}
                         {upload && <Loader />}
                         </FormGroup>

                         <FormGroup controlId='price'>
                         <FormLabel>Product Price</FormLabel>
                         <FormControl
                          type='number'
                           placeholder='Product Price'
                            value={price} 
                            onChange={event => setPrice(event.target.value)}>
                            </FormControl>
                         </FormGroup>

                         <FormGroup controlId='brand'>
                             <FormLabel>Product Brand</FormLabel>
                             <FormControl 
                             type='text'
                              placeholder='Product Brand'
                               value={brand } 
                               onChange={event => setBrand(event.target.value)}>
                               </FormControl>
                         </FormGroup>

                         <FormGroup controlId='category'>
                             <FormLabel>Product Category</FormLabel>
                             <FormControl 
                             type='text'
                              placeholder='Product Category' 
                              value={category }
                               onChange={event => setCategory(event.target.value)}>
                               </FormControl>
                         </FormGroup>

                         <FormGroup controlId='countInStock'>
                             <FormLabel>Count In Stock</FormLabel>
                             <FormControl 
                             type='number'
                              placeholder='Count In Stock'
                               value={countInStock }
                                onChange={event => setCountInStock(event.target.value)}>
                                </FormControl>
                         </FormGroup>

                         <FormGroup controlId='description'>
                             <FormLabel>Product Description</FormLabel>
                             <FormControl 
                             type='text'
                              placeholder='Product Description'
                               value={description } 
                               onChange={event => setDescription(event.target.value)}>
                               </FormControl>
                         </FormGroup>

                          <Button type='submit' className='btn-block btn-button my-3'>Update Product</Button>
                </Form>
            )}
        </FormContainer>
            
        </>
    )
}

export default EditProductPage;
