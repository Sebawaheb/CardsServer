const auth = require('../../auth/authService');
const { handleError } = require('../../utils/handleErrors');
const { registerUser, getUser, loginUser, updateUser, patchBusinessStatus, getUsers, deleteUser } = require('../models/userAccessDataService');
const express = require('express');
const validateLogin = require('../validation/joi/loginValidation');
const validateRegistration = require('../validation/joi/registerValidation');
const validateUpdate = require('../validation/joi/updateValidation');
const { normalizeUser } = require('../helpers/normalize');
const router = express.Router();

// register
router.post("/", async (req, res) => {
    try {
        const validateErrorMessage = validateRegistration(req.body);
        if (validateErrorMessage !== "") {
            return handleError(res, 400, "Validation Error: " + validateErrorMessage);
        }
        let user = await normalizeUser(req.body);
        user = await registerUser(user);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

// get all users
router.get("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        console.log(userInfo.isAdmin);
        if (!userInfo.isAdmin) {
            handleError(res, 403, "Authorization Error: You are not authorized to access this information");
        }
        users = await getUsers();
        res.send(users);
    }
    catch (error) {
        handleError(res, error.status || 400, error.message);
    }
})

// login
router.post("/login", async (req, res) => {
    try {
        const validateErrorMessage = validateLogin(req.body);
        if (validateErrorMessage !== "") {
            return handleError(res, 400, "Validation Error: " + validateErrorMessage);
        }
        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

// get user by id
router.get("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        let { id } = req.params;
        if (userInfo._id != id && !userInfo.isAdmin) {
            handleError(res, 403, "Authorization Error: Access denied.");
        }
        let user = await getUser(id);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

// update user
router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = req.body;
        const userInfo = req.user;
        if (id !== userInfo._id) {
            return handleError(res, 403, "Authorization Error: You can only edit your own profile");
        }
        const valErrorMessage = validateUpdate(updatedUser);
        if (valErrorMessage !== "") {
            return handleError(res, 400, "Validation Error: " + valErrorMessage);
        }
        let user = await normalizeUser(updatedUser);
        user = await updateUser(id, updatedUser);
        res.send(user);
    }
    catch (err) {
        return handleError(res, 400, err.message);
    }
})

// patch business status
router.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (id !== userInfo._id) {
            return handleError(res, 403, "Authorization Error: You can only edit your own profile");
        }
        let user = await patchBusinessStatus(id);
        res.send(user)
    }
    catch (err) {
        return handleError(res, 400, err.message);
    }
})

// delete user
router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (id !== userInfo._id && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only an admin or the user can delete this profile");
        }
        const user = await deleteUser(id);
        res.send(user);
    }
    catch (err) {
        return handleError(res, 400, err.message);
    }

})

module.exports = router;