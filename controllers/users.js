const bcrypt = require('bcrypt');

const { generateToken } = require('../helpers/authService');
const model = require('../models/users');

const edit = async (request, response) => {
  const { id } = request.params;
  const { name, email, phone, password, confirmPassword, language } =
    request.body;

  try {
    const userExists = await model.findById(id);
    const emailExists = await model.findByEmail(email);
    let user = {};

    if (!userExists)
      return response.status(400).json({ message: 'Usuário não existe' });

    if (userExists.email !== email && emailExists)
      return response.status(400).json({
        message:
          'Por favor, utilize outro e-mail que não foi cadastrado na plataforma.',
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

    return response
      .status(200)
      .json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: 'Houve algum erro no servidor ao atualizar o usuário.',
      error: error.message,
    });
  }
};

const login = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await model.findByEmail(email);

    if (!user)
      return response.status(400).json({
        message: 'Não existe usuário cadastrado com esse e-mail.',
      });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return response.status(400).json({
        message: 'Senha inválida.',
      });

    const token = generateToken(user);

    return response.status(200).json({
      message: 'Autenticação realizada com sucesso!',
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
      message: 'Houve algum erro no servidor ao logar o usuário.',
      error: error.message,
    });
  }
};

const register = async (request, response) => {
  const { email, password } = request.body;

  try {
    const emailExists = await model.findByEmail(email);

    if (emailExists)
      return response.status(400).json({
        message:
          'Este e-mail já foi cadastrado, por favor utilize outro e-mail.',
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
      message: 'Autenticação realizada com sucesso!',
      token,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message:
        'Houve algum erro no servidor ao tentar cadastrar o usuário e realizar a sua respectiva autenticação.',
      error: error.message,
    });
  }
};

module.exports = { edit, login, register };
