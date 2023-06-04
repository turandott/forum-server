const db = require('../models');
const User = db.user;
const Post = db.post;
const Category = db.category;




exports.getCategories = (req, res, next) => {
    Category.findAll()
        .then(categories => {

            if (!categories) {
                return res.status(404).json({ message: 'categories not found' });
            }
            res.status(200).json({ categories: categories });
        })
        .catch(err => console.log(err));
}

exports.getCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findByPk(categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).json({ message: 'category no found' });

            }
            res.status(200).json({ category: category });
        })
        .catch(err => console.log(err));
}


exports.createCategory = (req, res, next) => {
    const name = req.body.name;



    Category.create({
        name: name,
    })
        .then(result => {
            res.status(201).json({
                message: 'category created successfully!',
                category: result
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'category creation failed!'
            });
        });
};


exports.updateCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    const updatedName = req.body.name;
    Category.findByPk(categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).json({ message: 'category not found!' });
            }
            category.name = updatedName;
            return category.save();
        })
        .then(result => {
            res.status(200).json({ message: 'category updated!', category: result });
        })
        .catch(err => console.log(err));
}




exports.deleteCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    Category.findByPk(categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).json({ message: 'category not found!' });
            }
            return Category.destroy({
                where: {
                    id: categoryId
                }
            });
        })
        .then(result => {
            res.status(200).json({ message: 'category deleted!' });
        })
        .catch(err => console.log(err));
}
