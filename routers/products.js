const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const Category = require('../model/category');

router.get('/', async (req, res) => {
    let filter={};
    if(req.query.categories)
    {
        filter={category:req.query.categories.split(',')}
    }
    const product = await Product.find().populate('category');;
    if (!product) {

        res.status(500).json({ success: false })
    }
    res.send(product);
});


router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(404).send({
            success: false,
            message: "Invalid Category",
        });
    }
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        price: req.body.price,
        richDescription: req.body.richDescription,
        isFeatured: req.body.isFeatured,
        countInStock: req.body.countInStock,
        category: req.body.category,
        description: req.body.description



    });
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
    if (!savedProduct) {
        return res.status(500).send({
            success: false,
            message: "The product cannot be created!!!",
        });
    }

    return res.send(product);
    // product.save().then((createdProduct) => {
    //     res.status(201).json(createdProduct)
    // }).catch((error) => {
    //     return res.status(500).json({
    //         error: error,
    //         success: false
    //     });

    // })


    // console.log(newProduct)


});




router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
        res.status(500).json({ success: false })

    }
    res.send(product);
})



router.put('/:id', async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(404).send({
            success: false,
            message: "Invalid Category",
        });
    }
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        price: req.body.price,
        richDescription: req.body.richDescription,
        isFeatured: req.body.isFeatured,
        countInStock: req.body.countInStock,
        category: req.body.category,
        description: req.body.description


    }, { new: true });


    if (!product) {
        return res.status(500).send('The product cannot be updated!');
    }
    res.send(product);

});


router.delete('/:id', async (req, res) => {
    Product.findByIdAndDelete(req.params.id).then((category) => {
        if (category) {
            return res.status(200).send({
                success: false,
                message: "The category is deleted"
            });

        }
        else {
            return res.status(404).send({
                success: false,
                message: "The category not be found!"
            });

        }
    }).catch((err) => {
        return res.status(400).send({
            success: false,
            message: err
        });

    });
})

router.get('/get/featured/:count', async (req, res) => {
   

    const count = req.params.count ? req.params.count : 0


    const products = await Product.find({ isFeatured: true }).limit(count);
    if (!products) {
        res.status(500).json({ success: false });
    };
    res.send(products);
})


module.exports = router