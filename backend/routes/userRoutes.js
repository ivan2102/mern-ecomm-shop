import express from 'express';
const router = express.Router();
import { authUser,
     getUserProfile, 
     registerUser, 
     updateUserProfile,
      getUsers,
       deleteUser,
       getUserById,
       updateUserAdmin 
    } 
    from '../controllers/userController.js';
import { authToken, admin } from '../middleware/authMiddleware.js';


router.post('/login', authUser);
router.route('/').post(registerUser).get(authToken, admin, getUsers);
router.route('/profile').get(authToken, getUserProfile).put(authToken, updateUserProfile);
router.route('/:id').delete(authToken, admin, deleteUser).get(authToken, admin, getUserById).put(authToken, admin, updateUserAdmin);


export default router;