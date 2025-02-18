const express = require('express');
const User = require('../model/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const user = await User.find().select('-passwordHash');
    if (!user) {
        return res.status(500).send({ success: false });
    }

    res.send(user);
});


router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
        return res.status(500).send({ success: false, message: "User id does not exist" });
    }



    res.status(200).send(user);
});



router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });

    user = await user.save();
    if (!user) {
        return res.status(404).send("The category cannot be created");

    }
    res.send(user);
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const secret = process.env.secret;
    if (!user) {
        return res.status(400).send("The user cannot be found");

    }
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign({
            userId: user.id,
            isAdmin: user.isAdmin,
        }, secret, {
            expiresIn: '1d'
        })
        res.status(200).send({
            user: user.email,
            token: token
        });
    }
    else {
        res.status(400).send("Password is wrong!");

    }

});

router.get('/get/count', async (req, res) => {
    const userCount = await User.countDocuments();
    if (!userCount) {
        res.status(500).json({ success: false });
    };
    res.send({
        userCount: userCount
    })
})

module.exports = router