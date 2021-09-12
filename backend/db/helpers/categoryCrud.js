const categoryModel = require("../schemas/category");

const categoryCrud = {
  findCategoryById(categoryid) {
    let promise = new Promise((resolve, reject) => {
      categoryModel.findById({ _id: categoryid }).exec((err, category) => {
        if (err || !category) {
          reject(new Error("no such category in our DB"));
        }
        resolve(category);
      });
    });
    return promise;
  },
  createCategory(categoryName) {
    let promise = categoryModel.create({ name: categoryName });
    return promise;
  },
  getAllCategories() {
    let promise = new Promise((resolve, reject) => {
      categoryModel.find().exec((err, categories) => {
        if (err || !categories) {
          return reject(new Error("no categories available "));
        }
        resolve(categories);
      });
    });
    return promise;
  },
  updateCategory({ _id, name }) {
    let promise = new Promise((resolve, reject) => {
      categoryModel.findByIdAndUpdate(
        { _id },
        { name },
        { new: true },
        (err, doc) => {
          if (err || !doc) {
            return reject(new Error("no such category id found!"));
          }
          resolve(doc);
        }
      );
    });
    return promise;
  },
  removeCategory({ _id }) {
    let promise = new Promise((resolve, reject) => {
      categoryModel.findByIdAndDelete({ _id }, (err, doc) => {
        if (err || !doc) {
          reject(new Error("Failed to delete this category"));
        }
        resolve(doc);
      });
    });
    return promise;
  },
};

module.exports = categoryCrud;
