const categoryCrud = require("../db/helpers/categoryCrud");
const logger = require("../utils/logger");

exports.getCategoryById = async (req, res, next, id) => {
  try {
    const category = await categoryCrud.findCategoryById(id);
    req.category = category;
  } catch (err) {
    logger.debug("error in category id extraction", err);
    res.status(400).json({ error: "Category nont found in DB" });
  }
  next();
};

exports.createCategory = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ error: "You are required to add name of category!" });
  }
  let promise = categoryCrud.createCategory(name);
  promise
    .then(({ name }) => {
      return res.status(201).json({ success: `${name} added to DB!` });
    })
    .catch((err) => {
      logger.debug("error in category Create Route", err);
      return res.status(400).json({
        error: "Not Able to add category to DB",
      });
    });
};

exports.getCategory = (req, res) => {
  return res.status(200).json(req.category);
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryCrud.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    logger.debug("error in getAllCategory", err);
    res.status(400).json({ error: "no Categories Available" });
  }
};

exports.updateCategory = async (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  try {
    const updatedCategory = await categoryCrud.updateCategory(category);
    res.status(200).json(updatedCategory);
  } catch (err) {
    logger.debug("error in update category Route", err);
    res.status(400).json({ error: "error in updating category" });
  }
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  let promise = categoryCrud.removeCategory(category);
  promise
    .then((category) => {
      res.status(200).json({
        message: `Successfully Deleted Category ${category.name}`,
      });
    })
    .catch((err) => {
      logger.debug("error in remove category route", err);
      res
        .status(400)
        .json({ error: `error removing category ${category.name}` });
    });
};
