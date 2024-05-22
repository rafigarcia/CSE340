const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build View of Vehicles by Inventory Id
 * ************************** */

invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getVehicleByInventoryId(inv_id)
  const grid = await utilities.buildByInventoryId(data)
  let nav = await utilities.getNav()
  const vehicleName = data[0].inv_year + " " + data[0].inv_make + " " + data[0].inv_model
  
  res.render("./inventory/vehicle", {
  title: vehicleName,
  nav,
  grid
  })
}

/* ***********************************
 Deliver Inventory Mananger view
 *********************************** */
invCont.buildInventoryManager = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  })
}

/* ***********************************
 Deliver Add Classification view
 *********************************** */
 invCont.buildAddClassification = async function (req, res, next){
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/****************************
 * Process Add classification
 * ******************* */
invCont.addClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body
  const addClassResult = await invModel.registerClassification(classification_name)
  if (addClassResult) {
    req.flash("notice", `Registration successful. ${classification_name}, Has been registered.`)
    res.status(201).render("inv", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("inv/add-classification", {
      title: "Add Classification",
      nav,
      error: null,
    })
  }
}

/* ***********************************
 Deliver Add Inventory View
 *********************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    errors: null,
  })
}

/* ***********************************
    Process Add Inventory
 *********************************** */
invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav()
  const { inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id } = req.body
  const addInvResult = await invModel.registerInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id)
  if (addInvResult) {
      req.flash("notice", `Registration successful! ${inv_model} - ${inv_make}`)
      res.status(201).render("inventory/management", {
        title: "Vehicle Management",
        nav,
        errors: null,
      })
    } else {
      req.flash("notice", "Sorry, the registration failed.")
      res.status(501).render("inventory/management", {
        title: "Vehicle Management",
        nav,
        error: null,
      })
    }
}

module.exports = invCont