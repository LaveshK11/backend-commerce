const productModel = require("../../models/porducts");

exports.addProucts = async (req, res) => {
  let data = productModel(req.body);
  data.save(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ data: data });
      console.log(data);
    }
  });
};
