
const mongoose = require('mongoose');
// import bcryptjs
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'staff', 'student', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    // validate will only work on save or creating the user
    validate:{
      validator: function(pwd){
        return pwd === this.password;
      },
      message: " the password confirmation did not match"
  }
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now
  },
  passwordResetExpires: {
    type: Date,
    default: Date.now
  },
  active: {
    type: String,
    default: 'true',
    select: 'false'
  }
});


// add encrypting the password middleware
userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    return next;
  }
  // if new and modified

  this.password = await this.password; // how intensive the CPU will be
  this.passwordConfirm = undefined; // we dop not want to store in database
  next();
});


userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  console.log(candidatePassword)
  console.log(bcrypt.compare(candidatePassword, userPassword))
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
