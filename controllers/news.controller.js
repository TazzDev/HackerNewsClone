const News = require('../models/news.model.js');

const Jobs = require('../models/news.model.js');


// Create and Save a new news item
exports.create = (req, res) => {

        // Validate request
        if(!req.body.title) {
            return res.status(400).send({
                message: "News title can not be empty"
            });
        }
    
        // Create a News Item
        const news = new News({
            title: req.body.title || "Untitled News", 
            by: req.body.by || 'Anon',
            url: req.body.url,
            score: req.body.score || 0,
            deleted: req.body.deleted || false,
        });
    
        // Save News Item in the database
        news.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the News Item."
            });
        });
};

// Retrieve and return all news from the database.
exports.findAll = (req, res) => {
    News.find()
    .then(news => {
        res.send(news);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving news."
        });
    });

};

// Find a single news with a newsId
exports.findOne = (req, res) => {
    News.findById(req.params.newsId)
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "news not found with id " + req.params.newsId
            });            
        }
        res.send(news);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "news not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving news with id " + req.params.newsId
        });
    });

};

// Update a news identified by the newsId in the request
exports.update = (req, res) => {

     // Validate Request
     if(!req.body.title) {
        return res.status(400).send({
            message: "News content can not be empty"
        });
    }

    // Find news and update it with the request body
    News.findByIdAndUpdate(req.params.newsId, {
            title: req.body.title || "Untitled News", 
            by: req.body.by || 'Anon',
            score: req.body.score || 0,
            deleted: req.body.deleted || false,
            url: req.body.url,
    }, {new: true})
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "News not found with id " + req.params.newsId
            });
        }
        res.send(news);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "news not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Error updating news with id " + req.params.newsId
        });
    });
};

// Delete a news with the specified newsId in the request
exports.delete = (req, res) => {

    News.findByIdAndRemove(req.params.newsId)
    .then(news => {
        if(!news) {
            return res.status(404).send({
                message: "news not found with id " + req.params.newsId
            });
        }
        res.send({message: "news deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "news not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete news with id " + req.params.newsId
        });
    });

};
