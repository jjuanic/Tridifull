import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import path from 'node:path'; 
import hbs from 'hbs';

import indexRouter  from './routes/index.js';
import usersRouter  from './routes/users.js';
import loginRouter  from './routes/login.js';

const app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'hbs');
hbs.registerPartials('views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Middlewares para los nombres de las páginas





export default app;
