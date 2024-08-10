const User = require('../db/models/User');
const { BadRequestError, NotFoundError } = require('../errors');

const getUserByAccountNumber = async (accountNumber) => {
  const user = await User.findOne({ accountNumber });
  return user;
};

const getUserByIdentityNumber = async (identityNumber) => {
  const user = await User.findOne({ identityNumber });
  return user;
};

const createUser = async (
  userName,
  accountNumber,
  emailAddress,
  identityNumber
) => {
  const checkUser = await User.findOne({
    $or: [{ accountNumber }, { identityNumber }],
  });

  if (checkUser) {
    throw new BadRequestError(
      'Another user with the same account number or identity number already exists'
    );
  }

  const newUser = new User({
    userName,
    accountNumber,
    emailAddress,
    identityNumber,
  });

  await newUser.save();
  return newUser;
};

const updateUser = async (
  id,
  userName,
  accountNumber,
  emailAddress,
  identityNumber
) => {
  const updates = {};
  if (userName) updates.userName = userName;
  if (accountNumber) updates.accountNumber = accountNumber;
  if (emailAddress) updates.emailAddress = emailAddress;
  if (identityNumber) updates.identityNumber = identityNumber;

  if (accountNumber || identityNumber) {
    const query = {
      _id: { $ne: id },
      $or: [],
    };
    if (accountNumber) query.$or.push({ accountNumber });
    if (identityNumber) query.$or.push({ identityNumber });

    const checkUser = await User.findOne(query);
    if (checkUser) {
      throw new BadRequestError(
        'Another user with the same account number or identity number already exists'
      );
    }
  }

  const updatedUser = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    throw new NotFoundError('User not found');
  }

  return updatedUser;
};

const removeUser = async (id) => {
  const user = await User.findOne({ id });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  await User.findByIdAndDelete(id);
  return user;
};

module.exports = {
  getUserByAccountNumber,
  getUserByIdentityNumber,
  createUser,
  updateUser,
  removeUser,
};
