const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    orderItems: {
        type: Number,
        required: true

    }
})

