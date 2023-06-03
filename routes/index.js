const router = require('express').Router();
const userRoutes = require('./users');
const postRoutes = require('./posts');
var itemRouter = require('express').Router({ mergeParams: true }); 

// split up route handling
router.use('/users', userRoutes, itemRouter);
router.use('/posts', postRoutes);

module.exports = router;