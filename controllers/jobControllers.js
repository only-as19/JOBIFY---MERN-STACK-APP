import Job from '../models/jobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import dayjs from 'dayjs';
const getAllJobs = async (req, res) => {
  console.log(req.query);
  const { search, jobStatus, jobType, sort } = req.query;
  console.log(req.query);
  console.log('jobStatus:', jobStatus);
  console.log('jobType:', jobType);
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * 10;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numberOfPages = Math.ceil(totalJobs / limit);
  res.status(StatusCodes.OK).json({ totalJobs,numberOfPages, currentPage:page, jobs });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
  const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ updateJob });
};

const deleteJob = async (req, res) => {
  const removeJob = await Job.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: 'job deleted', removeJob });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, cur) => {
    const { _id: title, count } = cur;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { month, year },
        count,
      } = item;
      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format('MMM YY');
      return { date, count };
    })
    .reverse();

  console.log(monthlyApplications);

  // const monthlyApplications = [
  //   {
  //     date: 'May 23',
  //     count: 12,
  //   },
  //   {
  //     date: 'Jun 23',
  //     count: 9,
  //   },
  //   {
  //     date: 'Jul 23',
  //     count: 3,
  //   },
  // ]
  res.status(StatusCodes.OK).send({ defaultStats, monthlyApplications });
};

export { getAllJobs, getJob, updateJob, createJob, deleteJob, showStats };
