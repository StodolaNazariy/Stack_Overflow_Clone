const express = require('express');
const cors = require('cors');

const { PORT } = require('./src/configs').Params;
const { checkConnect } = require('./src/database/database');

const { mainRouter } = require('./src/routers');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRouter);

app.use(_mainErrorHandler);

app.listen(PORT, () => {
	checkConnect();
	console.log(`Server has been started on ${PORT}`);
});

function _mainErrorHandler(err, req, res, next) {
	res.status(err.status || 500).json({ message: err.message });
}
