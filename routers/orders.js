const express = require('express');
const Order = require('../model/order');
const router = express.Router();



router.post('/', async (req, res) => {

    let order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user,
    });

    order = await order.save();

    if (!order) {
        return res.status(400).send("The category cannot be created");
    }

    res.status(201).json(order);

})