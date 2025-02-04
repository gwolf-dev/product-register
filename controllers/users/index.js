const bcrypt = require('bcrypt');

const translationFile = require('./translation');
const { generateToken } = require('../../helpers/authService');
const model = require('../../models/users');

const edit = async (request, response) => {
  const { id } = request.params;
  const { name, email, phone, password, confirmPassword, language } =
    request.body;
  const translation = translationFile[language || 'pt-BR'];

  try {
    const userExists = await model.findById(id);
    const emailExists = await model.findByEmail(email);
    let user = {};

    if (!userExists)
      return response.status(400).json({ message: translation.userNotExists });

    if (userExists.email !== email && emailExists)
      return response.status(400).json({
        message: translation.emailExists,
      });

    if (password === confirmPassword && password !== null) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    user.email = email;
    user.name = name;
    user.phone = phone;
    user.language = language;
    await model.update(id, user);

    return response.status(200).json({ message: translation.updateSuccess });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: translation.errorServerUpdate,
      error: error.message,
    });
  }
};

const login = async (request, response) => {
  const { email, password, language } = request.body;
  const translation = translationFile[language || 'pt-BR'];

  try {
    const user = await model.findByEmail(email);

    if (!user)
      return response.status(400).json({
        message: translation.notEmailSystem,
      });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return response.status(400).json({
        message: translation.invalidPassword,
      });

    const token = generateToken(user);

    return response.status(200).json({
      message: translation.authSuccess,
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        language: user.language,
      },
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: translation.errorServerLogin,
      error: error.message,
    });
  }
};

const register = async (request, response) => {
  const { email, password, language } = request.body;
  const translation = translationFile[language || 'pt-BR'];

  try {
    const emailExists = await model.findByEmail(email);

    if (emailExists)
      return response.status(400).json({
        message: translation.emailExists,
      });

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await model.register({
      ...request.body,
      email,
      password: passwordHash,
    });

    const token = generateToken(user);

    return response.status(200).json({
      message: translation.authSuccess,
      token,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: translation.errorServerRegister,
      error: error.message,
    });
  }
};

module.exports = { edit, login, register };
