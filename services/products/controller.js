const Product = require('./model');

const getAll = (req, res, next) => {
	Product.find(req.query)
		.then((products) => {
			if (products != null) {
				res.status(200).send({ 'status': 'success', 'message': 'All Products', 'data' : { 'products': products } });

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'No products found!', 'data' : {'products': products}});
			}
		}, (err) => next(err));
};

const getById = (req, res, next) => {
	Product.findById(req.params.id)
		.then((product) => {
			if (product != null) {
				res.status(200).send({ 'status': 'success', 'message': 'Product with id '+req.params.id, 'data' : { 'product': product } });

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'Product not found!', 'data' : {'product': product}});
			}
		}, (err) => next(err));
};

const createNew = (req, res, next) => {
	Product.countDocuments({}).exec((err, count) => {
		if (err) {
			res.status(404).send({ 'status': 'error', 'message': 'Product couldn\'t be created!', 'data' : {'product': {}}});
		}

		Product.create(req.body)
			.then((product) => {
				if (product != null) {
					res.status(200).send({ 'status': 'success', 'message': 'Product created', 'data' : { 'product': product}});

				} else {
					res.status(404).send({ 'status': 'error', 'message': 'Product couldn\'t be created!', 'data' : {'product': product}});
				}
			}, (err) => next(err));
	});
};

const updateById = (req, res, next) => {
	Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
		.then((product) => {
			if (product != null) {
				res.status(200).send({ 'status': 'success', 'message': 'Product updated', 'data' : { 'product': product}});

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'Product couldn\'t be updated!', 'data' : {'product': product}});
			}
		}, (err) => next(err));
};

const search = (req, res, next) => {
	let { name } = req.query;
	let queryCondition = {
		$or: [{ 'name': { $regex: '.*' + name + '.*', $options:'i' }}] 
	};
	Product.find(queryCondition)
		.limit(20)
		.then((products) => {
			if (products != null) {
				res.status(200).send({ 'status': 'success', 'message': 'All Products', 'data' : { 'products': products } });

			} else {
				res.status(404).send({ 'status': 'error', 'message': 'No products found!', 'data' : {'products': products}});
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