const edit = async (request, response, next) => {
  const { name, email, password, confirmPassword, phone, language } =
    request.body;

  if (!name)
    return response
      .status(400)
      .json({ message: 'O campo "nome" é obrigatório!' });

  if (!email)
    return response
      .status(400)
      .json({ message: 'O campo "e-mail" é obrigatório!' });

  if (!phone)
    return response
      .status(400)
      .json({ message: 'O campo "telefone" é obrigatório!' });

  if (!language)
    return response
      .status(400)
      .json({ message: 'O campo "linguagem" é obrigatório!' });

  if (!password)
    return response
      .status(400)
      .json({ message: 'O campo "senha" é obrigatório!' });

  if (!confirmPassword)
    return response
      .status(400)
      .json({ message: 'O campo "confirmar senha" é obrigatório!' });

  if (password.length < 0 || password.length > 128)
    return response.status(400).json({
      message: 'A senha deve ser maior que 0 e menor que 128 caracteres.',
    });

  if (password !== confirmPassword)
    return response.status(400).json({
      message:
        'As senhas devem ser iguais! Verifique novamente os campos de senha e confirmar senha.',
    });

  next();
};

const login = (request, response, next) => {
  const { email, password } = request.body;

  if (!email)
    return response
      .status(400)
      .json({ message: 'O campo "e-mail" é obrigatório!' });

  if (!password)
    return response
      .status(400)
      .json({ message: 'O campo "senha" é obrigatório!' });

  next();
};

const register = async (request, response, next) => {
  const { name, email, password, confirmPassword, phone, language } =
    request.body;

  if (!name)
    return response
      .status(400)
      .json({ message: 'O campo "nome" é obrigatório!' });

  if (!email)
    return response
      .status(400)
      .json({ message: 'O campo "e-mail" é obrigatório!' });

  if (!phone)
    return response
      .status(400)
      .json({ message: 'O campo "telefone" é obrigatório!' });

  if (!language)
    return response
      .status(400)
      .json({ message: 'O campo "linguagem" é obrigatório!' });

  if (!password)
    return response
      .status(400)
      .json({ message: 'O campo "senha" é obrigatório!' });

  if (!confirmPassword)
    return response
      .status(400)
      .json({ message: 'O campo "confirmar senha" é obrigatório!' });

  if (password.length < 0 || password.length > 128)
    return response.status(400).json({
      message: 'A senha deve ser maior que 0 e menor que 128 caracteres.',
    });

  if (password !== confirmPassword)
    return response.status(400).json({
      message:
        'As senhas devem ser iguais! Verifique novamente os campos de senha e confirmar senha.',
    });

  next();
};

module.exports = { edit, login, register };
