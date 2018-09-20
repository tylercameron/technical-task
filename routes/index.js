const movieController = require('../controllers/movieController');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.send('Welcome to the Movie DB!!');
    });

    app.get('/movies', movieController.getMovies);

    app.post('/movies', movieController.addMovie);

};