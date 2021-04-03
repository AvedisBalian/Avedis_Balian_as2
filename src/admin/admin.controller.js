const express = require("express");
const router = express.Router();
const users = require("../users/users.service");

const asyncHandler = require("express-async-handler");
const { Unauthorized, Locked } = require("http-errors");

router.patch(
    "/unlock-user/:id",
    asyncHandler(async (req, res) => {
        if (req.user.role !== "admin") throw new Unauthorized();

        const payload = { locked: false, counter: 0 };
        await users.update(req.params.id, payload);

        res.status(200).json({ message: "User has successfully been unlocked!" });
    })
);

router.patch(
    "/lock-user/:id",
    asyncHandler(async (req, res) => {
        if (req.user.role !== "admin") throw new Unauthorized();

        const payload = { locked: true };
        await users.update(req.params.id, payload);

        res.status(200).json({ message: "User has successfully been locked!" });
    })
);

module.exports = router;
