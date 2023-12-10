
const {getMoviesFromIMDB} = require('../services/movieServices')
const {getResult} = require('../services/getResult')
const {movieFilter} = require('../services/filters/movieFilter')

exports.getMovies = async (req, res) => {
  
  res.status(200).json(await getResult(req,'Movie',movieFilter));

}

exports.getMoviesBygenre = async (req, res) => {

   //getting the genre and prepare the url
   const {genre } = req.body;
   const url = `https://www.imdb.com/search/keyword/?genres=${genre}&title_type=movie&ref_=kw_vw_adv&sort=user_rating,desc&mode=advanced`;
   
   // remove await if you dont want to wait :D
   await getMoviesFromIMDB(url);
   
   res.status(200).json({
        success:true,
    });

}