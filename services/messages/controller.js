const Message = require('./model');

const getAll = (req, res, next) => {
	Message.find({})
		.then((messages) => {
			if (messages != null) {
				res.status(200).send({ 'status': 'success', 'message': 'All Messages', 'data' : { 'messages': messages } });

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'No messages found!', 'data' : {'messages': messages}});
			}
		}, (err) => next(err));
};

const getById = (req, res, next) => {
	Message.findById(req.params.id)
		.then((message) => {
			if (message != null) {
				res.status(200).send({ 'status': 'success', 'message': 'Message with id '+req.params.id, 'data' : { 'message': message } });

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'Message not found!', 'data' : {'message': message}});
			}
		}, (err) => next(err));
};

const createNew = (req, res, next) => {
	Message.countDocuments({}).exec((err, count) => {
		if (err) {
			res.status(404).send({ 'status': 'error', 'message': 'Message couldn\'t be created!', 'data' : {'message': {}}});
		}

		Message.create(req.body)
			.then((message) => {
				if (message != null) {
					res.status(200).send({ 'status': 'success', 'message': 'Message created', 'data' : { 'message': message}});

				} else {
					res.status(404).send({ 'status': 'error', 'message': 'Message couldn\'t be created!', 'data' : {'message': message}});
				}
			}, (err) => next(err));
	});
};

const updateById = (req, res, next) => {
	Message.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
		.then((message) => {
			if (message != null) {
				res.status(200).send({ 'status': 'success', 'message': 'Message updated', 'data' : { 'message': message}});

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'Message couldn\'t be updated!', 'data' : {'message': message}});
			}
		}, (err) => next(err));
};

const search = (req, res, next) => {
	let { name } = req.query;
	let queryCondition = {
		$or: [{ 'name': { $regex: '.*' + name + '.*', $options:'i' }}] 
	};
	Message.find(queryCondition)
		.limit(20)
		.then((messages) => {
			if (messages != null) {
				res.status(200).send({ 'status': 'success', 'message': 'All Messages', 'data' : { 'messages': messages } });

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'No messages found!', 'data' : {'messages': messages}});
			}
		}, (err) => next(err));
};

const saveAll = (req, res, next) => {
	console.log(req.body);
	Message.collection.insert(req.body)
	.then((message) => {
		if (message != null) {
			res.status(200).send({ 'status': 'success', 'message': 'Message created', 'data' : { 'message': message}});

		} else {
			res.status(404).send({ 'status': 'error', 'message': 'Message couldn\'t be created!', 'data' : {'message': message}});
		}
	}, (err) => next(err));
};

module.exports = {
	getAll,
	getById,
	createNew,
	updateById,
	saveAll,
	search
};