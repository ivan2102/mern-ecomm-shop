import React, { useEffect } from 'react';
import { useDispatch, useSelector }  from 'react-redux';
import {Col, Row, Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { getProducts, deleteProductAction, createProduct } from '../actions/productAction';
import { PRODUCT_CREATE_RESET } from '../actions/types';

function ProductListPage({history, match}) {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();

    const productList = useSelector(state => state.product);

    const { loading, error, products, page, pages } = productList

   const deleteProduct = useSelector((state) => state.productDelete);
   const { success: successDelete} = deleteProduct

   const productCreate = useSelector((state) => state.productCreate);
   const {
       loading: loadingCreate,
        error: errorCreate,
         success: successCreate,
          product: createdProduct
        } = productCreate;
    const userLogin = useSelector(state => state.login)
    const { userInfo } = userLogin

   

    useEffect(() => {

        dispatch({

            type: PRODUCT_CREATE_RESET
        })

        if(!userInfo.isAdmin) {

            history.push('/login')

        } 

        if(successCreate) {

            history.push(`/admin/product/${createdProduct._id}/edit`)

        }else {

            dispatch(getProducts('', pageNumber))
        }

    }, [dispatch, history, userInfo,  successCreate, successDelete, createdProduct, pageNumber])


       const deleteProductHandler = (id) => {

        if(window.confirm('Are you shure you want to delete this product')) {

            dispatch(deleteProductAction(id))
        }
       }

       const addProductHandler = () => {

        dispatch(createProduct())
       }

    return (
        <>

        <Row className='align-items-center'>
            <Col>
            <h1>See Your Products</h1>
            </Col>

            <Col className='text-right'>
            <Button className='btn-button my-3' onClick={ addProductHandler }>
                Add Product
            </Button>
            </Col>
        </Row>

        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{ errorCreate }</Message>}
       
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{ error }</Message>) : (
            <>
            <Table bordered striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(product => (

                        <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>
                            <img src={product.image} alt='product_image' fluid style={{width: '60px', height: '60px'}}/>
                        </td>
                        <td>{product.name}</td>
                        <td>{product.description.substring(0, 10)}</td>
                        <td>${product.price}</td>
                        <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button className='btn-sm btn-button m-1'>
                                <i className='fas fa-edit'></i>
                            </Button>
                            </LinkContainer>

                            <Button 
                            variant='danger'
                             className='btn-sm m-1'
                              onClick={() => deleteProductHandler(product._id) }>
                                  <i className='fas fa-trash-alt'></i>
                              </Button>
                        </td>
                        </tr>
                    ))}
                   
                </tbody>
            </Table>

            <Paginate page={page} pages={pages} isAdmin={true} />

            </>
        )}
            
        </>
    )
}

export default ProductListPage;
