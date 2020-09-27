const Jobs = require('../models/jobs.model.js');


// Create and Save a new Job
exports.create = (req, res) => {

        // Validate request
        if(!req.body.title) {
            return res.status(400).send({
                message: "Job title can not be empty"
            });
        }
    
        // Create a Job
        const jobs = new Jobs({
            title: req.body.title || "Untitled Position", 
            expired: req.body.expired || false,
            url: req.body.url,
        });
    
        // Save Job in the database
        jobs.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Job."
            });
        });
};

// Retrieve and return all jobs from the database.
exports.findAll = (req, res) => {
    Jobs.find()
    .then(jobs => {
        res.send(jobs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving jobs."
        });
    });

};

// Find a single jobs with a jobsId
exports.findOne = (req, res) => {
    Jobs.findById(req.params.jobId)
    .then(jobs => {
        if(!jobs) {
            return res.status(404).send({
                message: "Jobs not found with id " + req.params.jobId
            });            
        }
        res.send(jobs);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "jobs not found with id " + req.params.jobId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving jobs with id " + req.params.jobId
        });
    });

};

// Update a job identified by the jobId in the request
exports.update = (req, res) => {

     // Validate Request
     if(!req.body.title) {
        return res.status(400).send({
            message: "Job description can not be empty"
        });
    }

    // Find job and update it with the request body
    Jobs.findByIdAndUpdate(req.params.jobId, {
            title: req.body.title || "Untitled Position", 
            expired: req.body.expired || false,
            url: req.body.url,
    }, {new: true})
    .then(jobs => {
        if(!jobs) {
            return res.status(404).send({
                message: "jobs not found with id " + req.params.jobId
            });
        }
        res.send(jobs);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Job not found with id " + req.params.jobId
            });                
        }
        return res.status(500).send({
            message: "Error updating job with id " + req.params.jobId
        });
    });
};

// Delete a jobs with the specified jobId in the request
exports.delete = (req, res) => {

    Jobs.findByIdAndRemove(req.params.jobId)
    .then(jobs => {
        if(!jobs) {
            return res.status(404).send({
                message: "jobs not found with id " + req.params.jobId
            });
        }
        res.send({message: "jobs deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "jobs not found with id " + req.params.jobId
            });                
        }
        return res.status(500).send({
            message: "Could not delete job with id " + req.params.jobId 
        });
    });

};
