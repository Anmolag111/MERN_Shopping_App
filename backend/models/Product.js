class Product {
  constructor(name, description, price, category, stock) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.stock = stock;
    this.photo = {};
  }
}

module.exports = Product;
