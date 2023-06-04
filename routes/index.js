const router = require('express').Router();
const userRoutes = require('./users');
const postRoutes = require('./posts');
const commentRoutes = require('./comments');
const categoryRoutes = require('./categories');

var itemRouter = require('express').Router({ mergeParams: true }); 

// split up route handling
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/categories', categoryRoutes);


module.exports = router;