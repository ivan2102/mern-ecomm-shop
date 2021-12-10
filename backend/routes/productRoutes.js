import express from 'express';
const router = express.Router();
import { 
    getProducts,
     getProductById,
      deleteProduct, 
      createProduct,
       updateProduct,
        createProductReview,
        getTopProducts
    } 
from '../controllers/productController.js';
import { authToken, admin } from '../middleware/authMiddleware.js';


// GET  all products
// /api/products
router.route('/').get(getProducts).post(authToken, admin, createProduct);
router.get('/top', getTopProducts);
// GET single product
// /api/products/:id

router.route('/:id').get(getProductById).delete(authToken, admin, deleteProduct).put(authToken, admin, updateProduct);
router.route('/:id/reviews').post(authToken, createProductReview)


export default router;