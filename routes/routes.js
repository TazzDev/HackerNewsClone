module.exports = (app) => {
    const news = require('../controllers/news.controller.js');
    const jobs = require('../controllers/jobs.controller.js');

    // Create a new Note
    app.post('/news/create', news.create);

    // Retrieve all Notes
    app.get('/news', news.findAll);

    // Retrieve a single Note with noteId
    app.get('/news/:newsId', news.findOne);

    // Update a Note with noteId
    app.put('/news/:newsId', news.update);

    // Delete a Note with noteId
    app.delete('/news/:newsId', news.delete);


    // Create a new Note
    app.post('/jobs/create', jobs.create);

    // Retrieve all Notes
    app.get('/jobs', jobs.findAll);

    // Retrieve a single Note with noteId
    app.get('/jobs/:jobId', jobs.findOne);

    // Update a Note with noteId
    app.put('/jobs/:jobId', jobs.update);

    // Delete a Note with noteId
    app.delete('/jobs/:jobId', jobs.delete);
}
