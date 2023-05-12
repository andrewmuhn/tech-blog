const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');

router.use('/user', userRoutes);
router.use('/blogpost', blogPostRoutes);

module.exports = router;
