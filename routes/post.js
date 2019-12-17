const express = require("express");
const {
    getPosts,
    createPost,
    like,
    // unlike,
    // comment,
    // uncomment
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { createPostValidator } = require("../validator");

const router = express.Router();

router.get("/posts", getPosts);

// like unlike
router.put("/post/like", requireSignin, like);


// comments


// post routes
router.post(
    "/post/new/:userId",
    requireSignin,
    createPost,
    createPostValidator
);




module.exports = router;