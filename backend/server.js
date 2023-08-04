require('dotenv').config();

const express = require('express');
const blogroutes = require('./routes/blogs');
const mongoose = require('mongoose');

// express app
const app = express();

// middleware
app.use(express.json());    // attach body to req.body
app.use(express.urlencoded({extended: true}));

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

