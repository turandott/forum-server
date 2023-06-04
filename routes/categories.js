const controller = require('../controllers/categoryController');
const router = require('express').Router();
const express = require('express');

/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          format: int64
 *          example: 1
 *        name:
 *          type: string
 *          example: Кино
 *        
 */

/**
* @swagger
* definitions:
*  Category:
*    type: object
*    properties:
*      name: 
*        type: string
*    required:
*      - name
*/





/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Categories management
 */




/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Returns a list of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             
 *       500:
 *         description: Internal server error
 */

router.get('/', controller.getCategories);


/**
 * @swagger
 * /categories/{categoryId}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to get
 *     responses:
 *       200:
 *         description: A category object
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Category'
 * 
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

router.get('/:categoryId', controller.getCategory);


/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/', controller.createCategory);




/**
 * @swagger
 * /categories/{categoryId}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schemas:
 *           type: integer
 *         required: true
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *       400:
 *         description: Invalid request body or category ID
 *       404:
 *         description: category not found
 *       500:
 *         description: Internal server error
 */

router.put('/:categoryId', controller.updateCategory);



/**
 * @swagger
 * /categories/{categoryId}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the category to delete
 *     responses:
 *       204:
 *         description: category deleted successfully
 *       404:
 *         description: category not found
 *       500:
 *         description: Internal server error
 */


router.delete('/:categoryId', controller.deleteCategory);


module.exports = router;