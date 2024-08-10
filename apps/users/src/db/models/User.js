const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    identityNumber: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model('user', UserSchema);
