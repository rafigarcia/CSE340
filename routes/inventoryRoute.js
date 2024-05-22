//Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const regValidate = require("../utilities/inventory-validation")

/* ***********************************
 Deliver Mananger View
 *********************************** */
 router.get("/", invController.buildInventoryManager)

//Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId)

//Route to build vehicle information by inventory id view
router.get("/detail/:invId", invController.buildByInventoryId)

/* ***********************************
 Deliver Add Classification View
 *********************************** */
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))

/* ***********************************
    Process of Add Classification
 *********************************** */
router.post(
    "/add-classification",
    regValidate.addClassificationRules(),
    regValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
)

/* ***********************************
 Deliver Add Inventory View
 *********************************** */
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))


/* ***********************************
    Process Add Inventory
 *********************************** */
router.post(
    "/add-inventory",
    regValidate.addInventoryRules(),
    regValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
)


module.exports = router;