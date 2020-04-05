const User = require('./model');

const getAll = (req, res, next) => {
	User.find({})
		.then((users) => {
			if (users != null) {
				res.status(200).send({ 'status': 'success', 'message': 'All Users', 'data' : { 'users': users } });

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'No users found!', 'data' : {'users': users}});
			}
		}, (err) => next(err));
};

const getById = (req, res, next) => {
	User.findById(req.params.id)
		.then((user) => {
			if (user != null) {
				res.status(200).send({ 'status': 'success', 'message': 'User with id '+req.params.id, 'data' : { 'user': user } });

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'User not found!', 'data' : {'user': user}});
			}
		}, (err) => next(err));
};

const createNew = (req, res, next) => {
	User.countDocuments({}).exec((err, count) => {
		if (err) {
			res.status(404).send({ 'status': 'error', 'message': 'User couldn\'t be created!', 'data' : {'user': {}}});
		}
		
		User.create(req.body)
			.then((user) => {
				if (user != null) {
					res.status(200).send({ 'status': 'success', 'message': 'User created', 'data' : { 'user': user}});

				} else {
					res.status(404).send({ 'status': 'error', 'message': 'User couldn\'t be created!', 'data' : {'user': user}});
				}
			}, (err) => next(err));
	});
};

const updateById = (req, res, next) => {
	User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
		.then((user) => {
			if (user != null) {
				res.status(200).send({ 'status': 'success', 'message': 'User updated', 'data' : { 'user': user}});

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'User couldn\'t be updated!', 'data' : {'user': user}});
			}
		}, (err) => next(err));
};

const search = (req, res, next) => {
	let { name } = req.query;
	let queryCondition = {
		$or: [{ 'name': { $regex: '.*' + name + '.*', $options:'i' }}] 
	};
	User.find(queryCondition)
		.limit(20)
		.then((users) => {
			if (users != null) {
				res.status(200).send({ 'status': 'success', 'message': 'All Users', 'data' : { 'users': users } });

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'No users found!', 'data' : {'users': users}});
			}
		}, (err) => next(err));
};


module.exports = {
	getAll,
	getById,
	createNew,
	updateById,
	search
};