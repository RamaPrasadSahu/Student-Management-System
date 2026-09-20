import { Router } from 'express'
import {
  AddStudent,
  SearchStudent,
  Getstudents,
  UpdateStudents,
  DeleteStudent
} from "../controllers/user.controller.js"
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()
router.route('/register').post(AddStudent);
router.route('/search').post(SearchStudent);
router.route('/Get').get(Getstudents);
router.route('/Update').put(UpdateStudents);
router.route('/Update/:id').put(UpdateStudents);
router.route('/remove').delete(DeleteStudent);
router.route('/remove/:id').delete(DeleteStudent);
export default router