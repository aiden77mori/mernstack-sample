const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
   .connect(db)
   .then(() => console.log('MongoDB Connected!'))
   .catch(err => console.log(err));

//app.get('/', (req, res) => res.send('Hello World!'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profiles);
app.use('/api/posts', posts);

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));