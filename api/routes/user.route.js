import express from "express";
const route = express.Router();
import { UserController } from "../networks/controller/index.js";
import verifyToken from "../middleware/verifyauth.js";

// /**
//  *
//  * @swagger
//  * /api/user/register:
//  *   post:
//  *     summary: Register a new user
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               username:
//  *                 type: string
//  *                 example: "JohnDoe"
//  *               email:
//  *                 type: string
//  *                 example: "johndoe@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password123"
//  *     responses:
//  *       201:
//  *         description: User registered successfully
//  *       400:
//  *         description: Invalid input
//  */
route.post("/register", UserController.createUser);

// /**
//  * @swagger
//  * /api/user/usersall:
//  *   get:
//  *     summary: Get all users
//  *     responses:
//  *       200:
//  *         description: List of all users
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  */
route.get("/usersall", UserController.getAllUser);

// /**
//  *
//  * @swagger
//  * /api/user/getuser/{id}:
//  *   get:
//  *     summary: Get a user by ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: The user ID
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: User retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: integer
//  *                 username:
//  *                   type: string
//  *                 email:
//  *                   type: string
//  *       404:
//  *         description: User not found
//  *       401:
//  *         description: Unauthorized - Invalid or missing token
//  */
route.get("/getuser/:id", verifyToken, UserController.getUserById);

// /**
//  * @swagger
//  * /api/user/updateuser/{id}:
//  *   put:
//  *     summary: Update a user
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: The user ID
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               username:
//  *                 type: string
//  *                 example: "JohnDoe"
//  *               email:
//  *                 type: string
//  *                 example: "johndoe@example.com"
//  *     responses:
//  *       200:
//  *         description: User updated successfully
//  *       404:
//  *         description: User not found
//  *       401:
//  *         description: Unauthorized - Invalid or missing token
//  */
route.put("/updateuser/:id", verifyToken, UserController.updateUser);

// /**
//  * @swagger
//  * /api/user/deleteuser/{id}:
//  *   delete:
//  *     summary: Delete a user
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: The user ID
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: User deleted successfully
//  *       404:
//  *         description: User not found
//  *       401:
//  *         description: Unauthorized - Invalid or missing token
//  */
route.delete("/deleteuser/:id", verifyToken, UserController.deleteUser);

// /**
//  * @swagger
//  * /api/user/login:
//  *   post:
//  *     summary: User login
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "johndoe@example.com"
//  *               password:
//  *                 type: string
//  *                 example: "password123"
//  *     responses:
//  *       200:
//  *         description: Login successful
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 token:
//  *                   type: string
//  *                   example: "token_here"
//  *       401:
//  *         description: Invalid email or password
//  *       500:
//  *         description: Internal server error
//  */
route.post("/login", UserController.Login);

export default route;
    