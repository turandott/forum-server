const controller = require('../controllers/userController');
const router = require('express').Router();

// CRUD Routes /users


/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          format: int64
 *          example: 10
 *        firstName:
 *          type: string
 *          example: John
 *        lastName:
 *          type: string
 *          example: James
 *        email:
 *          type: string
 *          example: john@email.com
 *        password:
 *          type: string
 *          example: '12345'
 *        avatar:
 *          type: string
 *          example: 'http://12345'
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */




/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             
 *       500:
 *         description: Internal server error
 */

router.get('/', controller.getUsers); // /users


/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to get
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             parameters:
 *                $ref: '#/components/shemas/User'
 * 
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get('/:userId', controller.getUser); // /users/:userId

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/', controller.createUser); // /users


/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *       400:
 *         description: Invalid request body or user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.put('/:userId', controller.updateUser); // /users/:userId



/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */


router.delete('/:userId', controller.deleteUser); // /users/:userId


module.exports = router;