//* Express
const express = require('express');
const server = express();

//*Imports
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

//TODO: Database connection ( for the meantime )
mongoose.connect(process.env.MONGODB_URL);

//* Middleware
server.use(morgan('dev'));
server.use(cors());
server.use(bodyParser.json());
server.use(helmet());

//*Routes for files
const AuthRouter = require('./routes/auth');
const UserRouter = require('./routes/users');
const PostRouter = require('./routes/posts');

//* Routes
server.use('/api/v1/auth', AuthRouter);
server.use('/api/v1/users', UserRouter);
server.use('/api/v1/posts', PostRouter);

//*Server
server.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
