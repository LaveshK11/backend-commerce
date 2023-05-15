const productModel = require("../../models/porducts");

/**
 * @desc   Searching product
 * @route  GET /api/products/search/parameter
 * @param  {product}
 * @access PUBLIC
 */
exports.searchProduct = async (req, res) => {
  productModel.find(
    { title: req.query.product },
    { skip: 1, limit: 0 },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        find({}, { _id: 0 })
          .skip((page - 1) * perPage)
          .limit(parseInt(perPage));
        res
          .status(200)
          .send({ product: data, total: data.length, skip: 0});
      }
    }
  );
};

/**
 * @desc   Searching category
 * @route  GET /api/products/category/serach?param
 * @param  {category}
 * @access PUBLIC
 */
exports.searchCategory = async (req, res) => {
  // { skip: 1, limit: 0 }
  productModel.find({ category: req.query.category }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res
        .status(200)
        .send({ product: data, total: data.length, skip: 0, limit: 0 });
    }
  });
};
