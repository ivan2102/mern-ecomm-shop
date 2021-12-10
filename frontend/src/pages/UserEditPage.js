import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUsers } from '../actions/userAction';
import { UPDATE_USER_RESET } from '../actions/types';

function UserEditPage({ match, history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
   
const userId = match.params.id;

const dispatch = useDispatch();

const userDetails = useSelector(state => state.details);
const { loading, error, user } = userDetails;

const updateUser = useSelector(state => state.updateUser);
const {loading: updateLoading, error: updateError, success: successUpdate} = updateUser;

useEffect(() => {

    if(successUpdate) {

        dispatch({ type: UPDATE_USER_RESET})
        history.push('/admin/userlist')

    }else {


        if(!user.name || user._id !== userId) {

            dispatch(getUserDetails(userId))
        
           }else {
        
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
           }

    }

   
}, [user, dispatch, userId, history, successUpdate])

const submitHandler = event => {

    event.preventDefault();

    dispatch(updateUsers({

        _id: userId,
        name,
        email,
        isAdmin
    }))
}



    return (
        <>
        <Link to='/admin/userlist' className='btn btn-light'>Go Back</Link>
        <FormContainer>
          <h1>Edit User</h1>
          {updateLoading && <Loader /> } 
          {updateError && <Message variant='danger'>{ updateError }</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

<Form onSubmit={ submitHandler }>
<FormGroup controlId='name'>
    <FormLabel>Your Name</FormLabel>
    <FormControl 
    type='text'
     placeholder='Your Name'
     value={ name }
     onChange={event => setName(event.target.value)}
     ></FormControl>
</FormGroup>

<FormGroup controlId='email'>
    <FormLabel>Your Email</FormLabel>
    <FormControl 
    type='email'
     placeholder='Your Email'
     value={email}
     onChange={event => setEmail(event.target.value)}
     ></FormControl>
</FormGroup>

<FormGroup controlId='isAdmin'>
    
    <FormCheck 
    type='checkbox'
     label='Admin'
     checked={isAdmin}
     onChange={event => setIsAdmin(event.target.checked)}
     ></FormCheck>
</FormGroup>

<Button type='submit' className='btn-block btn-button my-3'>Update</Button>

</Form>
        )}
        
     </FormContainer>

        </>
    )
}

export default UserEditPage;
