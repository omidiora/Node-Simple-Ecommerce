require('dotenv/config');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const proudctRoutes = require('./routers/products');
const categoryRoutes = require('./routers/categories');
const userRoutes = require('./routers/users');
const authJwt = require('./helpers/jwt');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(authJwt());
app.use((err, req, res, next) => {
    if (err) {
        console.log(err,'ldmaldmla')
        res.status(500).json({message: err})
    }
})
mongoose.set('debug', true);




const api = process.env.API_URL;
app.use(`${api}/products`, proudctRoutes);
app.use(`${api}/category`, categoryRoutes);
app.use(`${api}/users`, userRoutes);




mongoose.connect(process.env.CONNECTION_STRING).then(() => {

    console.log("Database connection is ready!!!");

}).catch((err) => {
    console.log('something went wrong!!')
    console.log(err, 'Something went wrong');

});
// mongoose.connect(
//     process.env.CONNECTION_STRING
//   )
//   .then(()=>console.log('connected'))
//   .catch(e=>console.log(e));

app.listen(3000, () => {

    console.log('server is running htpp://locahost:3000');

});


