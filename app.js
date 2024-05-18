import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import path from 'node:path'; 
import hbs from 'hbs';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import loginRouter from './routes/login.js';

import { searchPopularAlbums } from './services/itunesApi.js';

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

// Middleware para cargar los álbumes populares antes de renderizar la vista index
app.use(async function(req, res, next) {
  try {
    const popularAlbums = await searchPopularAlbums();
    res.locals.popularAlbums = popularAlbums; // Haciendo que popularAlbums esté disponible en las vistas
    res.locals.title= 'Tridify';
    next();
  } catch (error) {
    console.error('Error al cargar los álbumes populares:', error);
    next(error); // Pasar el error al siguiente middleware de error
  }
});



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
  res.render('error', err);
});

// Helpers

hbs.registerHelper('truncateText', function(text, length) {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  } else {
    return text;
  }
});

hbs.registerHelper('changeImageUrl', function(url) {
  return url.replace("100x100bb", "1200x1200bb");
});




export default app;
