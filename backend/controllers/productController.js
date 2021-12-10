import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';


const getProducts = asyncHandler(async (req, res) => {

    const pageSize = 10
    const page = Number(req.query.pageNumber) ||  1


    const keyword = req.query.keyword ? {

        name: {

            $regex: req.query.keyword,
            $options: 'i'
        }

    } : {}
    
    const count = await Product.count({...keyword})
   const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1 ))

   res.send({products, page, pages: Math.ceil(count / pageSize)});
})

const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    if(product) {

        res.send(product)

    }else {

       res.status(404);
       throw new Error('Product not found')
    }
})


// Create Product
// POST /api/products
const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({

        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


// Create Review
// POST /api/products/:id/reviews
const createProductReview = asyncHandler(async (req, res) => {

    const {rating, comment} = req.body

    const product = await Product.findById(req.params.id)

    if(product) {

        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

       if(alreadyReviewed) {

        res.status(400)
        throw new Error('Product already reviewed')
       }

       const review = {

        user: req.user._id,
        name: req.user.name,
        comment,
        rating: Number(rating)
       }

       product.reviews.push(review)

       product.numReviews = product.reviews.length

       product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

       await product.save()

       res.status(201).json({message: 'Review added successfully'})

    }else {

        res.status(404)
        throw new Error('Product not found')
    }

   
})

// Update Product
// PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {

    const {name, price, image, description, brand, category, countInStock} = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

     const updatedProduct = await product.save()
     res.status(201).json(updatedProduct)

    }else {

        res.status(404)
        throw new Error('Product not found')
    }


})


// Get top rated products
// GET /api/products/top
const getTopProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products);
})

// Delete Product
// DELETE /api/products/:id

const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);
    if(product) {
    await product.remove();

    res.json({message: 'Your Product removed successfully'});

    }else {

        res.json(404);
        throw new Error('Product not found');
    }
})


export { getProducts,
     getProductById,
      deleteProduct,
       createProduct,
        updateProduct,
         createProductReview,
         getTopProducts
         }