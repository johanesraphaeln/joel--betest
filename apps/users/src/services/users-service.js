const User = require('../db/models/User');
const { BadRequestError, NotFoundError } = require('../errors');
const redisClient = require('./redis');

const getUserFromCacheOrDb = async (key, query) => {
  const cachedUser = await redisClient.get(key);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }

  const user = await User.findOne(query);
  if (user) {
    await redisClient.set(key, JSON.stringify(user));
  }
  return user;
};

const getUserByAccountNumber = async (accountNumber) => {
  const key = `user:accountNumber:${accountNumber}`;
  return await getUserFromCacheOrDb(key, { accountNumber });
};

const getUserByIdentityNumber = async (identityNumber) => {
  const key = `user:identityNumber:${identityNumber}`;
  return await getUserFromCacheOrDb(key, { identityNumber });
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
