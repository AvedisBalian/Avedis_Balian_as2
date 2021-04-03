const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { DEFAULT_ROLE_VALUE, ROLE_VALUES } = require("../commons/util");

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minLength: 4,
        },

        password: {
            type: String,
            required: true,
        },

        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        role: {
            type: String,
            enum: ROLE_VALUES,
            default: DEFAULT_ROLE_VALUE,
        },

        counter: {
            type: Number,
            default: 0,
        },

        locked: {
            type: Boolean,
            default: false,
        },
    },
    { collection: "users" }
);

schema.pre("save", function (next) {
    if (this.isModified("password")) {
        const salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(this.password, salt);
    }

    next();
});

module.exports = mongoose.model("User", schema);
