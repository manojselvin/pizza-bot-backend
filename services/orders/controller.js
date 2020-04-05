const Order = require('./model');

const getAll = (req, res, next) => {
	Order.find(req.query)
		.then((orders) => {
			if (orders != null) {
				res.status(200).send({ 'status': 'success', 'message': 'All Orders', 'data' : { 'orders': orders } });

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'No orders found!', 'data' : {'orders': orders}});
			}
		}, (err) => next(err));
};

const getById = (req, res, next) => {
	Order.findById(req.params.id)
		.then((order) => {
			if (order != null) {
				res.status(200).send({ 'status': 'success', 'message': 'Order with id '+req.params.id, 'data' : { 'order': order } });

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'Order not found!', 'data' : {'order': order}});
			}
		}, (err) => next(err));
};

const createNew = (req, res, next) => {
	Order.countDocuments({}).exec((err, count) => {
		if (err) {
			res.status(404).send({ 'status': 'error', 'message': 'Order couldn\'t be created!', 'data' : {'order': {}}});
		}

		// Field Name
		req.body.id = 'PX'+(count+1);

		Order.create(req.body)
			.then((order) => {
				if (order != null) {
					res.status(200).send({ 'status': 'success', 'message': 'Order created', 'data' : { 'order': order}});

				} else {
					res.status(404).send({ 'status': 'error', 'message': 'Order couldn\'t be created!', 'data' : {'order': order}});
				}
			}, (err) => next(err));
	});
};

const updateById = (req, res, next) => {
	Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
		.then((order) => {
			if (order != null) {
				res.status(200).send({ 'status': 'success', 'message': 'Order updated', 'data' : { 'order': order}});

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'Order couldn\'t be updated!', 'data' : {'order': order}});
			}
		}, (err) => next(err));
};

const search = (req, res, next) => {
	let { name } = req.query;
	let queryCondition = {
		$or: [{ 'name': { $regex: '.*' + name + '.*', $options:'i' }}] 
	};
	Order.find(queryCondition)
		.limit(20)
		.then((orders) => {
			if (orders != null) {
				res.status(200).send({ 'status': 'success', 'message': 'All Orders', 'data' : { 'orders': orders } });

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'No orders found!', 'data' : {'orders': orders}});
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