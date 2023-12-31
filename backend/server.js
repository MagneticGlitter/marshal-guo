require('dotenv').config();

const express = require('express');
const blogroutes = require('./routes/blogs');
const userroutes = require('./routes/users');
const mongoose = require('mongoose');
const cors = require('cors');

// express app
const app = express();

// middleware
app.use(express.json());    // attach body to req.body
app.use(express.urlencoded({extended: true}));

//============== CORS ==============
app.use(cors(
    {
        origin: ["https://marshal-guo.vercel.app", "http://localhost:3000"],
        methods: ["POST", "GET", "DELETE", "PATCH"],
        credentials: true
    }
));
//============== CORS ==============

app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
});

mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            // listen for requests
            app.listen(process.env.PORT, () => {
                console.log('Server is running on port ' + process.env.PORT);
            });
        })
        .catch(err => console.log(err));

// routes
app.use('/api/blogs', blogroutes);
app.use('/api/users', userroutes);

module.exports = app;


