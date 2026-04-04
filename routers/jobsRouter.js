import express from 'express';
const router = express.Router();
import {
  validateJobInput,
  validateIdParams,
} from '../middleware/validationMiddleware.js';
import {
  getJob,
  getAllJobs,
  updateJob,
  deleteJob,
  createJob,
  showStats,
} from '../controllers/jobControllers.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';
router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, createJob);
router.route('/stats').get(showStats)
router
  .route('/:id')
  .get(validateIdParams, getJob)
  .patch(checkForTestUser, validateJobInput, updateJob)
  .delete(checkForTestUser, validateIdParams, deleteJob);

export default router;
