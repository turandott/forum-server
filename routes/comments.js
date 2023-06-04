const controller = require('../controllers/commentController');
const router = require('express').Router();
const express = require('express');

/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      properties:
 *        text:
 *          type: string
 *          example: Ну очень классный комментарий
 *        userId:
 *          type: integer
 *          example: 1
 *        postId:
 *          type: integer
 *          example: 1 
 *        
 */

/**
* @swagger
* definitions:
*  Comment:
*    type: object
*    properties:
*      text:
*        type: string
*    required:
*      - text
*/





/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comments management
 */




/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Returns a list of comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             
 *       500:
 *         description: Internal server error
 */

router.get('/', controller.getComments);


/**
 * @swagger
 * /comments/{commentId}:
 *   get:
 *     summary: Get a Comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the comment to get
 *     responses:
 *       200:
 *         description: A comment object
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Comment'
 * 
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

router.get('/:commentId', controller.getComment);


/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/', controller.createComment);




/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schemas:
 *           type: integer
 *         required: true
 *         description: ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *       400:
 *         description: Invalid request body or Comment ID
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

router.put('/:commentId', controller.updateComment);



/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Delete a Comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Comment to delete
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */


router.delete('/:commentId', controller.deleteComment);


module.exports = router;