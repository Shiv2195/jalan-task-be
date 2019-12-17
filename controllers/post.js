const Post = require("../models/post");
const _ = require("lodash");

exports.getPosts = async (req, res) => {
    await Post.find()
        .populate("postedBy", "_id name")
        .select("_id title body created likes")
        .sort({ created: -1 })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => console.log(err));
};

exports.createPost = async (req, res, next) => {
    const post = await new Post(req.body);
    try {

        await post.save();
        res.status(200).json({ message: "Post Created Successfully! Check it out in Home Section" });
    }
    catch (err) {
        res.status(500).send(err);
    }
};

exports.like = (req, res) => {
    console.log(req.body)
    Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { likes: req.body.userId } },
        { new: true }
    ).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            res.json(result);
        }
    });
};




