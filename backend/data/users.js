import bcrypt from 'bcryptjs';

const users = [

    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },

    {
        name: 'Ivan Nesic',
        email: 'email@email.com',
        password: bcrypt.hashSync('123456', 10)
        
    },

    {
        name: 'Milan Nesic',
        email: 'milanradi@yahoo.com',
        password: bcrypt.hashSync('123456', 10)
        
    }
]

export default users;