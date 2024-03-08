const mongoose = require("mongoose");
const { Schema } = mongoose;
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide your name"],
			minLength: [5, "Name must be atleast 5 characters"],
			maxLength: [50, "Name must be less than 50 characters"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please provide your email"],
			unique: true,
			lowercase: true,
			unique: [true, "Already registered"],
		},
		password: {
			type: String,
			select: false,
		},
		originalPassword: {
			type: String,
		},
		forgotPasswordToken: {
			type: String,
		},
		forgotPasswordExpiryDate: {
			type: Date,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	this.password = await bcrypt.hash(this.password, 10);
	return next();
});

userSchema.methods = {
	jwtToken() {
		return JWT.sign({ 
            _id: this._id, 
            email: this.email 
        }, 
        process.env.SECRET, 
        { 
            expiresIn: "24h" 
        });
	},
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
