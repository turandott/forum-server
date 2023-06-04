const db = require('../models');
const User = db.user;
const Post = db.post;
const Comment = db.comment;




exports.getComments = (req, res, next) => {
    Comment.findAll()
        .then(comments => {

            if (!comments) {
                return res.status(404).json({ message: 'Comments not found' });
            }
            res.status(200).json({ comments: comments });
        })
        .catch(err => console.log(err));
}

exports.getComment = (req, res, next) => {
    const commentId = req.params.commentId;
    Comment.findByPk(commentId)
        .then(comment => {
            if (!comment) {
                return res.status(404).json({ message: 'Comment no found' });

            }
            res.status(200).json({ comment: comment });
        })
        .catch(err => console.log(err));
}


exports.createComment = (req, res, next) => {
    const text = req.body.text;
    const userId = req.params.userId;
    const postId = req.params.postId;


    Comment.create({
        text: text,
        userId: userId,
        postId: postId,
    })
        .then(result => {
            res.status(201).json({
                message: 'comment created successfully!',
                comment: result
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'comment creation failed!'
            });
        });
};


exports.updateComment = (req, res, next) => {
    const commentId = req.params.commentId;
    const updatedText = req.body.text;
    Comment.findByPk(commentId)
        .then(comment => {
            if (!comment) {
                return res.status(404).json({ message: 'comment not found!' });
            }
            comment.text = updatedText;
            return comment.save();
        })
        .then(result => {
            res.status(200).json({ message: 'comment updated!', comment: result });
        })
        .catch(err => console.log(err));
}




exports.deleteComment = (req, res, next) => {
    const commentId = req.params.commentId;
    Comment.findByPk(commentId)
        .then(comment => {
            if (!comment) {
                return res.status(404).json({ message: 'comment not found!' });
            }
            return Comment.destroy({
                where: {
                    id: commentId
                }
            });
        })
        .then(result => {
            res.status(200).json({ message: 'comment deleted!' });
        })
        .catch(err => console.log(err));
}
