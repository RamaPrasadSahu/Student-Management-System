import {Router} from 'express'

import {
  AddStudent,
  SearchStudent,
  Getstudents,
  UpdateStudents,
  DeleteStudent
} from "../controllers/user.controller.js"
import {upload} from '../middlewares/multer.middleware.js'
const router = Router()
router.route('/register').post(AddStudent);
router.route('/search').post(SearchStudent);
router.route('/Get').get(Getstudents);
router.route('/Update').get(UpdateStudents);
router.route('/remove').get(DeleteStudent);
export default router