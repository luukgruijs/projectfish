const bcrypt = require("bcrypt");

module.exports = function User(mongoose) {
  var schema = new mongoose.Schema({
    email: {
      desc: "The users email address",
      format: "email",
      required: true,
      type: String,
      unique: true
    },
    name: {
      desc: "The name of the user",
      required: true,
      trim: true,
      type: String
    },
    password: {
      default: {},
      select: false,
      type: {
        hash: String,
        reset_token: String
      }
    },
    has_password: {
      default: false,
      type: Boolean,
      desc: "Check if user has already set his password"
    },
    role: {
      default: "user",
      desc: "A list of roles attached to the user",
      enum: ["admin", "user"],
      type: String
    },
    orders: {
      default: [],
      desc: "All the orders a user has done",
      type: [mongoose.Schema.Types.ObjectId]
    },
    disabled: {
      default: false,
      required: true,
      desc:
        "disabled state of user, we cannot delete the user. Else our orders will get corrupted",
      type: Boolean
    }
  });

  // schema the password before saving
  schema.pre("save", function(next) {
    var user = this;

    // hash password only if candidate is new or password is changed
    if (!user.isModified("password")) {
      return next();
    }

    // generate hash
    bcrypt.hash(user.password.hash, 10, function(err, hash) {
      if (err) {
        return next(err);
      }

      // changed password to hash version
      user.password.hash = hash;
      next();
    });
  });

  // method to compare a given password with the database hash
  schema.methods.comparePassword = function(password) {
    var user = this;

    return bcrypt
      .compare(password, user.password.hash)
      .then(
        valid =>
          valid
            ? user
            : Promise.reject(new Error("The credentials do not match."))
      );
  };

  return mongoose.model("User", schema);
};
