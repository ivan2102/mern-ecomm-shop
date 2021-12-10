import express from 'express';
const router = express.Router();
import { 
    addOrderItems,
     getOrderById,
      updateOrderToPay,
       getMyOrdersOnProfilePage,
        getAllOrders,
        updateOrderToDeliver
     } from '../controllers/orderController.js';
import { authToken, admin } from '../middleware/authMiddleware.js';

router.route('/').post(authToken, addOrderItems ).get(authToken, admin, getAllOrders);
router.route('/myorders').get(authToken, getMyOrdersOnProfilePage);
router.route('/:id').get(authToken, getOrderById);
router.route('/:id/pay').put(authToken, updateOrderToPay);
router.route('/:id/deliver').put(authToken, admin, updateOrderToDeliver);


export default router;