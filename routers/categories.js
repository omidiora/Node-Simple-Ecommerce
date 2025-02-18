const Category = require("../model/category")
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const categoryList = await Category.find({});


    if (!categoryList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(categoryList);
})

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

    category = await category.save();
    if (!category) {
        return res.status(404).send("The category cannot be created");

    }
    res.send(category);
})


router.delete('/:categoryId', async (req, res) => {
    Category.findByIdAndDelete(req.params.id).then((category) => {
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

module.exports = router