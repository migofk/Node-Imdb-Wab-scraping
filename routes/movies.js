var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware')
const { getMoviesBygenre,getMovies } = require('../controllers/movieController')
/* GET movie listing. */
router.get('/', getMovies);

/* GET movies for imdb and save them in the database. */
router.post('/updateMoviesByGenre', /*authMiddleware,/*/ getMoviesBygenre);

module.exports = router;
