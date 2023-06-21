const express = require('express');
const router = express.Router();

//*Models
const Post = require('../models/Post');

//TODO: Post
router.post('/', (request, response) => {
	let addAppointment = new Post(request.body);
	addAppointment.save().then((result) => {
		response.status(200).send({ status: 'You added new Post' });
	});
});
//TODO: GET posts by postId
router.get('/:postId', (request, response) => {
	Post.findOne({ _id: request.params.postId }).then((result) => {
		if (typeof result === 'object') {
			response.status(202).send(result);
		}
	});
});

//TODO: GET all posts
router.get('/', (request, response) => {
	Post.find().then((result) => {
		if (typeof result === 'object') {
			response.send(result);
		}
	});
});

//TODOl: PATCH posts/:postId
router.patch('/:postId', (request, response) => {
	const addPostId = request.params.postId;
	Post.updateOne({ _id: addPostId }, { $set: { ...request.body } }).then(
		(result) => {
			if (result.modifiedCount === 1) {
				response.status(200).send({ status: 'success' });
			}
		},
	);
});

//TODO: DELETE post/:postId
router.delete('/:usersId', (request, response) => {
	Post.deleteOne({ usersId: request.params.usersId }).then((result) => {
		if (result.deletedCount === 1) {
			response.status(200).send({ status: 'Post removed' });
		} else {
			response.status(404).send({ status: 'This client is already deleted' });
			return;
		}
	});
});

module.exports = router;
