const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OrderItem",
        required:true

    }]
})

