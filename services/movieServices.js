const cheerio = require('cheerio');
const axios = require('axios');
const models = require('../models'); // loads index.js
const Movie = models.Movie; 

exports.getMoviesFromIMDB = async (url, page = 1) => {
    let lastPage = 1;
    await axios.get(url+'&page=1').then((response) => { 
        const $ =  cheerio.load(response.data);
        lastPage = $(".lister-current-last-item").text()
    });
    console.log(lastPage);
    console.log(lastPage);
    let limitPages;
    lastPage > 3 ? limitPages = 3 : limitPages = lastPage;

    while(page <= limitPages){
     await axios.get(url+'&page='+page).then((response) => {
            
        const $ =  cheerio.load(response.data);

        $(".lister-item").each((i, el) => {
            const $movie = $(el);

            const name = $movie.find("h3>a").text();
            const GetPartAndYear = $movie.find(".lister-item-year").text();
            
            let regex = /\(\w+\)/;
            let match = GetPartAndYear.match(regex);
            const part = match[1];
            part? name = `${name} ${part}` : '';
            console.log(part);
            regex = /\d+/;
            match = GetPartAndYear.match(regex);
            const year = match[0];

            const genre = $movie.find(".genre").text();
            const rate = $movie.find(".ratings-imdb-rating strong").text();
            const certificate = $movie.find(".certificate").text();
            const runtime = $movie.find(".runtime").text().replace(' min','');
            const description = $movie.find(".lister-item-content>p:nth-of-type(2)").text();
            const cast = $movie.find(".lister-item-content>p:nth-of-type(3)").text();
            const vote = $movie.find(".lister-item-content>p:nth-of-type(4)>span:nth-of-type(2)").text();
            const gross = $movie.find(".lister-item-content>p:nth-of-type(4)>span:nth-of-type(5)").text();
            
            // console.log(vote,gross,'\n');

            const movie =  Movie.findOrCreate({ 
            where: { name: name },
                defaults: {
                name: name,
                year: year,
                genre: genre,
                rate: rate,
                certificate: certificate,
                runtime:Number(runtime) ,
                description: description,
                cast: cast,
                vote: !isNaN(Number(vote)) ? Number(vote): null,
                gross: gross,
            }
            });

        });
        });
        page++;
    }
    console.log('done');
}