const db = require('../models');
const User = db.user;
const Post = db.post;
const Comment = db.comment;
const Category = db.category;
const PostToCategory = db.post_category;





//get all posts in asc
exports.getPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => {

            if (!posts) {
                return res.status(404).json({ message: 'Posts not found' });
            }
            res.status(200).json({ posts: posts });
        })
        .catch(err => console.log(err));
}

//get post by id
exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findByPk(postId, {
        include: [{

            model: Comment,
            attributes: ['text']
        }
        ]
    })
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: 'Post no found' });

            }
            res.status(200).json({ post: post });
        })
        .catch(err => console.log(err));
}


exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const userId = req.body.userId;
    const categoryId = req.body.categoryId;
    const postId = req.body.postId;

    db.post.create({
        title: title,
        text: text,
        userId: userId,
    })
        .then((post) => {
            return post.addCategories(categoryId, postId);
        })
        
        .then((result) => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: result,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: 'Post creation failed!',
            });
        });
};


exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    const updatedText = req.body.text;
    const updatedTitle = req.body.title;
    Post.findByPk(postId)
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found!' });
            }
            post.text = updatedText;
            post.title = updatedTitle;
            return post.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Post updated!', post: result });
        })
        .catch(err => console.log(err));
}



exports.getUsersPosts = (req, res, next) => {

    Post.findAll()
        .then(posts => {

            if (!posts) {
                return res.status(404).json({ message: 'Posts not found' });
            }
            res.status(200).json({ posts: posts });
        })
        .catch(err => console.log(err));
    // const userId = req.params.userId;

    // Post.findAll({ where: { userId: userId } })
    //     .then(posts => {
    //         if (!posts || posts.length === 0) {
    //             return res.status(404).json({ message: 'No posts found for user' });
    //         }

    //         res.status(200).json({ posts: posts });
    //     })
    //     .catch(err => console.log(err));
};


exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findByPk(postId)
        .then(post => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found!' });
            }
            return Post.destroy({
                where: {
                    id: postId
                }
            });
        })
        .then(result => {
            res.status(200).json({ message: 'Post deleted!' });
        })
        .catch(err => console.log(err));
}

