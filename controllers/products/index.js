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

module.exports = { getAll };
