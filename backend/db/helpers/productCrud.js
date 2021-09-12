const { reject } = require("lodash");
const productModel = require("../schemas/product");

const productCrud = {
  getProductId(productid) {
    let promise = new Promise((resolve, reject) => {
      productModel
        .findById({ _id: productid })
        .populate("categoryModel")
        .exec((err, product) => {
          if (err || !product) {
            reject(new Error("no such product in DB"));
          }
          resolve(product);
        });
    });
    return promise;
  },
  addProduct(product) {
    let promise = productModel.create(product);
    return promise;
  },
  removeProduct(productid) {
    let promise = new Promise((resolve, reject) => {
      productModel.findByIdAndDelete({ _id: productid }, (err, product) => {
        if (err || !product) {
          reject(new Error("no such product found"));
        }
        resolve(product);
      });
    });
    return promise;
  },
  updateProduct(productid, product) {
    let promise = new Promise((resolve, reject) => {
      productModel.findByIdAndUpdate(
        { _id: productid },
        product,
        { new: true },
        (err, product) => {
          if (err || !product) {
            reject(new Error("no such product found"));
          }
          resolve(product);
        }
      );
    });
    return promise;
  },
  getAllProducts(limit, sortBy) {
    let promise = new Promise((resolve, reject) => {
      productModel
        .find()
        .select("-photo")
        .populate("categoryModel")
        .sort([[(sortBy, "asc")]])
        .limit(limit)
        .exec((err, products) => {
          if (err || !products) {
            reject(new Error("error fetching products!"));
          }
          resolve(products);
        });
    });
    return promise;
  },
  updateProductInventory(myOperations) {
    let promise = new Promise((resolve, reject) => {
      productModel.bulkWrite(myOperations, {}, (err, products) => {
        if (err || !products) {
          return reject(new Error("stock update failed!!"));
        }
        resolve(products);
      });
    });
    return promise;
  },
  getUniqueProductCategories() {
    let promise = new Promise((resolve, reject) => {
      productModel.distinct("category", {}, (err, products) => {
        if (err || !products) {
          reject(new Error("no suitable Product categories found"));
        }
        resolve(products);
      });
    });
    return promise;
  },
};

module.exports = productCrud;
