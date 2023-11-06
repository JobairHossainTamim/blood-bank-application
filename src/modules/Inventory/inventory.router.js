const router = require("express").Router();
const Inventory = require("./inventory.model");
const User = require("../User/user.model");
const authMiddleware = require("../../middlewares/authMiddleware");




// Add Inventory

router.post('/add', authMiddleware, async (req, res) => {
    try {
        // validate email and inventoryType
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error("Invalid Email");

        if (req.body.inventoryType === "in" && user.userType !== "donar") {
            throw new Error("This email is not registered as a donar");
        }

        if (req.body.inventoryType === "out" && user.userType !== "hospital") {
            throw new Error("This email is not registered as a hospital");
        }

        if (req.body.inventoryType === "out") {

            req.body.hospital = user._id

        }
        else {
            req.body.donar = user._id
        }
        // Add Inventory


        const inventory = new Inventory(req.body);

        await inventory.save();

        return res.send({ success: true, message: "Inventory Added successfully" });




    } catch (error) {
        return res.send({ success: false, message: error.message });

    }
});

module.exports = router;