const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,

    },
    color: {
        type: String,
    }
})

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category; 