const express = require('express');
const router = express.Router();

//*Models
const User = require('../models/User');

//TODO: GET users/:userId
router.get('/all/:userId', (request, response) => {
	User.findOne(
		{ _id: request.params.userId },
		{
			password: 0,
		},
	).then((result) => {
		if (typeof result === 'object') {
			response.status(202).send(result);
		}
	});
});

//TODO: GET username
router.get('/', (request, response) => {
	User.find().then((result) => {
		if (typeof result === 'object') {
			response.send(result);
		}
	});
});

//TODO: Get post of a user
router.get('/:id/posts', (request, response) => {
	User.find({ _id: request.params.id }, { postId: 1 })
		.populate('postId', '-userId -__v')
		.exec((error, result) => {
			if (typeof result === 'object') {
				response.status(200).send(result);
			}
		});
});

//TODO: add post in the user
router.put('/:userId/posts/:postsId', (request, response) => {
	User.updateOne(
		{ _id: request.params.userId },
		{ $push: { postId: request.params.postsId } },
	).then((result) => {
		if (result.modifiedCount === 1) {
			response.status(202).send({ status: 'Post has been added to User' });
		}
	});
});

//TODOl: PATCH users/:userId
router.patch('/:userId', (request, response) => {
	const addUserId = request.params.userId;
	User.updateOne({ _id: addUserId }, { $set: { ...request.body } }).then(
		(result) => {
			if (result.modifiedCount === 1) {
				response.status(200).send({ status: 'User has been updated' });
			}
		},
	);
});

module.exports = router;
