import express from 'express';
const router = express.Router();
import {
  getCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
  deleteAllCountries,
  loadCountriesFromAPI,
} from '../controllers/countryController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getCountries).post(protect, createCountry).delete(protect, deleteAllCountries);
router.route('/load').post(protect, loadCountriesFromAPI);
router
  .route('/:id')
  .get(protect, getCountryById)
  .put(protect, updateCountry)
  .delete(protect, deleteCountry);

export default router;