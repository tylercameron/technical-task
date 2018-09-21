const Movies = require('../models/Movie.js');

exports.getMovies = (req, res) => {

    const { query } = req;

    if (Object.entries(query).length) { // Check for Query
        const keys = Object.keys(query);

        if (keys.includes('start') && keys.includes('end')) {
            
            const { start, end } = query;

            // QUERY BELOW ASSUMES START AND END YEARS ARE NOT INCLUDED IN SEARCH
            Movies.query(`SELECT * FROM movies WHERE year > ${start} AND year < ${end}`, (err, rows) => {
                if (err) throw err;

                res.send(rows);
            });

        } else if (keys.includes('search')) {
            const { search } = query;

            // QUERY BELOW ASSUMES THE TEXT IN THE SEARCH QUERY CAN BE INCLUDED IN ANY PART OF THE MOVIE TITLE - EVEN IF IT'S PART OF A SINGLE WORD
            Movies.query(`SELECT * FROM movies WHERE title LIKE '%${search}%'`, (err, rows) => {
                if (err) throw err;

                res.send(rows);
            })
        }

    } else { // No Query, Show all movies

        Movies.query('SELECT * FROM movies', function (err, rows) {
            if (err) throw err;

            res.send(rows);
        });

    }

};

exports.addMovie = (req, res) => {

    const { title, year, director, genre } = req.body;
    
    Movies.query('INSERT INTO movies (title, year, director, genre) VALUES (?, ?, ?, ?);', [title, year, director, genre], (err, results, fields) => {
        if (err) throw err;
        
        const id = results.insertId;

        res.send([{ id, title, year, director, genre }]);
    });

}
