const bcrypt = require('bcryptjs');

exports.hashPassword = async (plain) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
};

exports.comparePassword = (plain, hashed) => bcrypt.compare(plain, hashed);