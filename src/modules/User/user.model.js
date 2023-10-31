const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    userType: {
        type: String,
        required: true,
        enum: ['donar', 'organization', 'hospital', 'admin']
    },
    // is required for user types donar &  admin
    name: {
        type: String,
        required: function () {
            if (this.userType === 'admin' || this.userType === 'donar') {
                return false;
            }
        }
    },

    // is required for userType hospital 
    hospitalName: {
        type: String,
        required: true,
        required: function () {
            if (this.userType === 'hospital') {
                return true;
            }
            return false;
        }
    },

    // is required for userType organizer
    organizationName: {
        type: String,
        required: true,
        required: function () {
            if (this.userType === 'organization') {
                return true;
            }
            return false;
        }
    },

    // is for hospital organizer
    website: {
        type: String,
        required: function () {
            if (this.userType === 'organization' || this.userType === "hospital") {
                return true;
            }
            return false;
        }
    },
    address: {
        type: String,
        required: function () {
            if (this.userType === 'organization' || this.userType === "hospital") {
                return true;
            }
            return false;
        }
    },
    owner: {
        type: String,
        required: function () {
            if (this.userType === 'organization' || this.userType === "hospital") {
                return true;
            }
            return false;
        }
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
})


module.exports = mongoose.model('user', userSchema)