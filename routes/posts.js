const controller = require('../controllers/postController');
const router = require('express').Router();
const express=require('express');
// CRUD Routes /posts

/**
 * @swagger
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          format: int64
 *          example: 1
 *        title:
 *          type: string
 *          example: Большая статья
 *        text:
 *          type: string
 *          example: Ну очень большая статья
 *        userId:
 *          type: integer
 *          example: 1
 *        categoryId:
 *          type: integer
 *          example: 1
 *        
 */

/**
* @swagger
* definitions:
*  Post:
*    type: object
*    properties:
*      title: 
*        type: string
*      text:
*        type: string
*       category: 
*        type: string
*    required:
*      - title
*/





/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */




/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Returns a list of posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             
 *       500:
 *         description: Internal server error
 */

router.get('/', controller.getPosts); 


/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the post to get
 *     responses:
 *       200:
 *         description: A post object
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Post'
 * 
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */

router.get('/:postId', controller.getPost);

/**
 * @swagger
 * /users/{userId}/posts:
 *   get:
 *     summary: Get all posts from a user
 *     tags: [Posts]
 *     description: Retrieve all posts from the database that have a userId matching the provided userId.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user to retrieve posts for
 *     responses:
 *       '200':
 *         description: A list of posts from the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *       '404':
 *         description: No posts found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.get('/users/{userId}/posts', controller.getUsersPosts);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/', controller.createPost); 




/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schemas:
 *           type: integer
 *         required: true
 *         description: ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *       400:
 *         description: Invalid request body or Post ID
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */

router.put('/:postId', controller.updatePost); 



/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Post to delete
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */


router.delete('/:postId', controller.deletePost); 


module.exports = router;