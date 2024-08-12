const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  identityNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.index({ accountNumber: 1 });
UserSchema.index({ identityNumber: 1 });

module.exports = User = mongoose.model('user', UserSchema);
