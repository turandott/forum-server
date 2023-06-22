const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController');
const { check } = require("express-validator")
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

/**
* @swagger
* tags:
*   name: Authorization
*   description: User management
*/

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
 * 
 */

/**
* @swagger
* definitions:
*  User:
*    type: object
*    properties:
*      firstName: 
*        type: string
*      password:
*        type: string
*    required:
*      - firstName
*      - password
*  LoginCredentials:
*    type: object
*    properties:
*      firstName:
*        type: string
*      password:
*        type: string
*    required:
*      - firstName
*      - password
*/


/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: Create a new user account
 *     tags: 
 *       - Authorization
 *     requestBody:
 *       description: The user to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User created successfully.
 *       '400':
 *         description: Invalid request body.
 */

router.post('/registration', [
    check('email', "Почта пользователя не может быть пустой").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({ min: 4, max: 10 })
], controller.registration)

/**
* @swagger
* /auth/login:
 *   post:
 *     summary: Login as an existing user
 *     tags: 
 *       - Authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       '401':
 *         description: Invalid credentials.
 */

router.post('/login', controller.login)

/**
 * @swagger
 * /auth/current_user:
 *   get:
 *     summary: Get the current logged in user
 *     tags:
 *       - Authorization
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved the current user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       '401':
 *         description: Unauthorized access, user not authenticated.
 */
router.get('/current_user', authMiddleware, controller.getCurrentUser)


/**
* @swagger
* /auth/users:
 *   get:
 *     summary: Get the list of users(for admin only)
 *     description: Retrieve a list of all users(only for administarator) 
 *     tags: 
 *       - Authorization
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized access. Authentication required.
 *       '403':
 *         description: The authenticated user does not have the necessary permissions to access this resource.
 */
router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)



module.exports = router
