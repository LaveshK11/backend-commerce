const productModel = require("../../models/porducts");
const validator = require("../../helpers/validation");
const addToCart = require("../../models/addToCart");

/**
 * @desc    Moving porduct to cart
 * @route   POST /api/move-to-cart
 * @access  Private
 * @param   {productId , userEmail}
 */
exports.moveToCart = async (req, res) => {
  let result = await validator.checkValidation(req.body);
  try {
    if (result == 0) {
      addToCart.find(
        {
          productId: req.body.productId,
          userEmail: req.body.email,
        },
        function (err, data) {
          if (err) console.log(err);
          else if (data.length) {
            addToCart.findOneAndUpdate(
              {
                productId: req.body.productId,
                userEmail: req.body.email,
              },
              {
                $inc: { quantity: req.body.quantity },
              },
              { new: true },
              function (err, data) {
                if (err) console.log(err);
                else {
                  console.log(data);
                  if (data) {
                    res.status(200).send({
                      success: true,
                      message: "Cart Value updated successfully",
                      data: data,
                    });
                  }
                }
              }
            );
          } else {
            productModel.findOne(
              { productId: req.body.productId },
              function (err, data) {
                if (err) console.log(err);
                else {
                  if (data) {
                    let cartItem = {
                      userEmail: req.body.email,
                      quantity: req.body.quantity,
                      productId: req.body.productId,
                      price: data.offeringPrice,
                      productName: data.productName,
                    };
                    let cartData = addToCart(cartItem);
                    cartData.save(function (err, data) {
                      if (err) {
                        res.status(404).send({
                          success: false,
                          message: "Error while saving to cart",
                        });
                      } else {
                        res.status(200).send({
                          success: true,
                          message: "Porduct saved to card successfully ",
                        });
                      }
                    });
                  } else {
                    res.status(404).send({
                      success: false,
                      message: "No product found!",
                    });
                  }
                }
              }
            );
          }
        }
      );
    } else {
      res.status(404).send({
        success: false,
        message: "Please fill details correctly",
      });
    }
  } catch (error) {}
};
