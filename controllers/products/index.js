const jwt = require('jsonwebtoken');

const translationFile = require('./translation');
const model = require('../../models/products');

const { DEFAULT_LANGUAGE, SECRET_JWT_TOKEN } = process.env;

const getAll = async (request, response) => {
  const { language, companyId } = request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];
  const token = request.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, SECRET_JWT_TOKEN);

  try {
    const products = await model.findAll(decodedToken.id, companyId);
    if (!products.length)
      return response
        .status(200)
        .json({ message: translation.emptyFindProducts, products: [] });

    return response.status(200).json({
      message: translation.successFindProducts,
      products: products.map((product) => ({
        ...product,
        price: Number(product.price.toFixed(2)),
      })),
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: translation.errorServerFindProducts,
      error: error.message,
    });
  }
};

const get = async (request, response) => {
  const { productId } = request.params;
  const { language, companyId } = request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];
  const token = request.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, SECRET_JWT_TOKEN);

  try {
    const product = await model.findById(decodedToken.id, productId, companyId);

    if (!product)
      return response
        .status(200)
        .json({ message: translation.emptyFindProduct, product: {} });

    return response.status(200).json({
      message: translation.successFindProduct,
      product: { ...product, price: Number(product.price.toFixed(2)) },
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: translation.errorServerFindProduct,
      error: error.message,
    });
  }
};

const register = async (request, response) => {
  const { userId, companyId, name, price, barcode, language } = request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];

  try {
    const userExists = await model.findUserById(userId);
    if (!userExists)
      return response.status(400).json({ message: translation.userNotExists });

    const companyExists = await model.findCompanyById(companyId, userId);
    if (!companyExists)
      return response
        .status(400)
        .json({ message: translation.companyNotExists });

    const productExists = await model.findByProductName(
      userId,
      companyId,
      name,
    );
    if (productExists)
      return response
        .status(400)
        .json({ message: translation.productAlreadyExists });

    const { insertId } = await model.register({
      userId,
      companyId,
      name,
      price,
      barcode,
    });
    const product = await model.findByProductId(userId, companyId, insertId);

    return response.status(200).json({
      message: translation.successProduct.replace('{name}', product.name),
      data: { ...product, price: Number(product.price.toFixed(2)) },
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: translation.errorServerRegisterProduct,
      error: error.message,
    });
  }
};

const edit = async (request, response) => {
  const { productId } = request.params;
  const { companyId, name, price, barcode, language } = request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];
  const token = request.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, SECRET_JWT_TOKEN);

  try {
    const userExists = await model.findUserById(decodedToken.id);
    if (!userExists)
      return response.status(400).json({ message: translation.userNotExists });

    const companyExists = await model.findCompanyById(
      companyId,
      decodedToken.id,
    );
    if (!companyExists)
      return response
        .status(400)
        .json({ message: translation.companyNotExists });

    const productExists = await model.findByProductName(
      decodedToken.id,
      companyId,
      name,
    );
    if (productExists)
      return response
        .status(400)
        .json({ message: translation.productAlreadyExists });

    await model.update(productId, companyId, decodedToken.id, {
      name,
      price,
      barcode,
    });

    return response.status(200).json({
      message: translation.successUpdate.replace('{name}', name),
      data: {
        id: Number(productId),
        userId: decodedToken.id,
        companyId,
        name,
        price,
        barcode,
      },
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: translation.errorServerUpdateProduct,
      error: error.message,
    });
  }
};

const deleteProduct = async (request, response) => {
  const { productId } = request.params;
  const { userId, companyId, language } = request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];

  try {
    const productExists = await model.findById(userId, productId, companyId);
    if (!productExists)
      return response
        .status(400)
        .json({ message: translation.productNotExists });

    await model.delete(Number(userId), Number(productId), Number(companyId));

    return response.status(204).json({});
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: translation.errorServerDeleteProduct,
      error: error.message,
    });
  }
};

module.exports = { getAll, get, register, edit, delete: deleteProduct };
