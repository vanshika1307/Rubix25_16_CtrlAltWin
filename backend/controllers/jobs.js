const Job = require("../models/Job");
const {NotFoundError, BadRequestError} = require("../errors");
const {StatusCodes} = require("http-status-codes");

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy : req.user.userId}).sort("createdAt");
    res.json({count : jobs.length, jobs , });
};

const getJob = async (req, res) => {
    const {user : {userId} , params : {id : jobId}} = req;
    const job = await Job.find({
        _id : jobId,
        createdBy : userId
    });

    if(!job) {
        throw new NotFoundError("No Job found with id : ", jobId);
    }

    res.status(StatusCodes.OK).json({job});
};

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.json({user : req.user, job});
};

const editJob = async (req, res) => {
    const {
        params : {id : jobId},
        user : {userId},
        body : {company, position}
    } = req;

    if(!company || !position) {
        throw new BadRequestError("Company and position must be provided");
    }

    const job = await Job.findOneAndUpdate({_id : jobId, createdBy : userId}, req.body, {new : true, runValidators : true});
    res.status(StatusCodes.OK).json({job});

};

const deleteJob = async (req, res) => {
    const {
        user : {userId},
        params : {id : jobId}
    } = req;

    const job = await Job.findOneAndRemove({_id : jobId, createdBy : userId});
    if(!job)
    {
        throw new NotFoundError("No job found with id : ", jobId);
    }

    res.status(StatusCodes.OK).send()
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    editJob,
    deleteJob,
};