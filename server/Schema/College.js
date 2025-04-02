const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: true,
        required:true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        required:true,
    },
    collegeEmail:{
        type:String,
        lowercase:true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required:true,
    },
    collegeCode: {
        type: String,
    },
    address: {
        type: String,
    },
    state: {
        type: String,
    },
    district: {
        type: String,
    },
    city: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    adminName: {
        type: String,
    },
    adminEmail: {
        type: String,
    },
    adminContact: {
        type: String,
    },
    website: {
        type: String,
    },
    affiliation: {
        type: String,
    },
    accreditation: {
        type: String,
    },
    collegeLogo:{
        type:String,
    },
});

const College = mongoose.model("College", collegeSchema);

module.exports = College;
