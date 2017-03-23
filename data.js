var Faker = require('faker');
var _ = require('lodash');

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

var category = ['new-arrivals', 'shirts', 'tees', 'sweaters', 'bottoms']
var persons = ['men', 'women', 'children'];

function generateProducts() {
  var products = [];

  _.times(50, function(i) {
    let product = {
      id: i,
      category: random(category),
      person: random(persons),
      title: 'Item',
      price: Faker.commerce.price(),
    }
    products.push(product);
  })

  return { "products": products };
}

module.exports = generateProducts;