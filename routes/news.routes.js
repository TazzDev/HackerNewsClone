module.exports = (app) => {
    const news = require('../controllers/news.controller.js');

    // Create a new Note
    app.post('/news', news.create);

    // Retrieve all Notes
    app.get('/news', news.findAll);

    // Retrieve a single Note with noteId
    app.get('/news/:newsId', news.findOne);

    // Update a Note with noteId
    app.put('/news/:newsId', news.update);

    // Delete a Note with noteId
    app.delete('/news/:newsId', news.delete);
}