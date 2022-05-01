const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};

const { PORT } = require('./src/configs').Params;
const { checkConnect } = require('./src/database/database');

const { mainRouter, tagsRouter, questionRouter } = require('./src/routers');

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRouter);
app.use('/tags', tagsRouter);
app.use('/questions', questionRouter);

app.use(_mainErrorHandler);

app.listen(PORT, () => {
	checkConnect();
	console.log(`Server has been started on ${PORT}`);
});

function _mainErrorHandler(err, req, res, next) {
	res.status(err.status || 500).json({ message: err.message });
}
