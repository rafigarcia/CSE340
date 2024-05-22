const utilities = require(".")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/*  **********************************
*  Add Classification Validation Rules
* ********************************* */

validate.addClassificationRules = () => {
  return [
    // classification is required and must be string
    body("classification_name")
     .trim()
     .escape()
     .notEmpty()
     .isLength({ min: 1 })
     .withMessage("Please provide a classification name.") // on error this message is sent.
     .custom(async (classification_name) => {
        const classExists = await invModel.checkClassificationExist(classification_name)
        if (classExists){
          throw new Error("This Classification already exists. Please provide a new Classification name")
        }
      }),
  ]}


/* ******************************
 * Check data and return errors or come back to Manangment view
* ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const classification_name = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/management", {
        errors,
        title: "Vehicle Management",
        nav,
        classification_name,
      })
      return
    }
    next()
}

/*  **********************************
*  Add Inventory Validation Rules
* ********************************* */

validate.addInventoryRules = () => {
  return [
    //Inventory Make rules
    body("inv_make")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Please provide a valid Make."), // on error this message is sent.
    
    body("inv_model")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Please provide a valid Model."), // on error this message is sent.
  
    body("inv_description")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Please provide a valid Description."), // on error this message is sent.
  
    body("inv_price")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Please provide a valid Price."), // on error this message is sent.
  
    body("inv_year")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Please provide a valid Year."), // on error this message is sent.
    
    body("inv_miles")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("Please provide a valid miles."), // on error this message is sent.

    body("inv_color")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Please provide a valid Color."), // on error this message is sent.
  ]
}

/* ******************************
 * Check Inventory data and return errors or return to Manangement view
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/management", {
      errors,
      title: "vehicle Management",
      nav,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
    return
  }
  next()
}

module.exports = validate