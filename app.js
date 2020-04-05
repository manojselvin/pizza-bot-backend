require('custom-env').env('dev');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config/database/mongoose');
const routes = require('./config/routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Index Route - (Can be used for testing routing)
app.all('/', (req, res) => {
	res.status(200).send({'status': 'success', 'message': 'Index is hit', 'data': {
		'queryParams': req.query,
		'body': req.body
	}});
});

app.use(express.Router().use('/api', routes));

app.listen(process.env.PORT, () => {
	console.log(`Server running at ${process.env.PORT}`);
});

//global error handler
app.use((err, req, res,next) => {
	// set locals, only providing error in development
	res.locals.message = err.errmsg;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	console.log(err);
	res.send({ error: err.errmsg });
});

process.on('SIGTERM', () => { app.close(() => { console.log('Process terminated') }); });