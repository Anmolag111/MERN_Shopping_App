const productCrud = require("../db/helpers/productCrud");
const logger = require("../utils/logger");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const Product = require("../models/Product");

exports.getProductById = async (req, res, next, id) => {
  try {
    const product = await productCrud.getProductId(id);
    req.product = product;
  } catch (err) {
    logger.debug("error in getProductById", err);
    return res.status(400).json({
      error: "No such product",
    });
  }
  next();
};

exports.createProduct = (req, res) => {
  // get the form instance
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  // parse the form
  form.parse(req, (err, fields, file) => {
    if (err) {
      logger.debug("error in createPRoduct Route", err);
      return res.status(400).json({
        error: "Problem with image",
      });
    }
    //field restrictions here
    const { name, price, description, category, stock } = fields;
    if (!name || !price || !description || !category || !stock) {
      return res.status(400).json({ error: "Please fill all form fields" });
    }
    let product = new Product(name, description, price, category, stock);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "File Size too big!" });
      }
    }

    product.photo.data = fs.readFileSync(file.photo.path);
    product.photo.contentType = file.photo.type;

    // save to the DB
    let promise = productCrud.addProduct(product);
    promise
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((err) => {
        logger.debug("Caught error on create product Route", err);
        res.status(400).json({
          error: "Cannot add the product",
        });
      });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.status(200).json(req.product);
};

exports.deleteProduct = (req, res) => {
  let promise = productCrud.removeProduct(req.product._id);
  promise
    .then((product) => {
      res
        .status(200)
        .json({ message: "Product Deleted Successfully!", product });
    })
    .catch((err) => {
      logger.debug("error in delete product route", err);
      res.status(400).json({ error: "Error deleting product" });
    });
};

exports.updateProduct = (req, res) => {
  // get the form instance
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  // parse the form
  form.parse(req, (err, fields, file) => {
    if (err) {
      logger.debug("error in createPRoduct Route", err);
      return res.status(400).json({
        error: "Problem with image",
      });
    }
    let product = req.product;
    product = _.extend(product, fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "File Size too big!" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    

    // save to the DB
    let promise = productCrud.updateProduct(req.product._id, product);
    promise
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((err) => {
        logger.debug("Caught error on update product Route", err);
        res.status(400).json({
          error: "Cannot update the product",
        });
      });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 8;
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let promise = productCrud.getAllProducts(limit, sortBy);
  promise
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      logger.debug("error in get all products route!", err);
      res.status(400).json({ error: "no products are available" });
    });
};

exports.getAllUniqueProductCategories = (req, res) => {
  let promise = productCrud.getUniqueProductCategories();
  promise
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      logger.debug("error in getAllUniqueCategories route", err);
      res.status(400).json({
        error: "No category Found!",
      });
    });
};
