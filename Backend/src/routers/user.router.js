import {Router} from 'express'

import {
  AddStudent,
  SearchStudent,
  Getstudents
} from "../controllers/user.controller.js"
import {upload} from '../middlewares/multer.middleware.js'
const router = Router()
router.route('/register').post(AddStudent);
router.route('/search').post(SearchStudent);
router.route('/Get').get(Getstudents)
export default router