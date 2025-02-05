const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?(?:9?\d{5}-?\d{4})$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
/*
  Password criteria:
    * Minimum 8 characters
    * At least one capital letter
    * At least one lowercase letter
    * At least one number
    * At least one special character
*/

const email = (email) => emailRegex.test(email);

const phone = (phone) => phoneRegex.test(phone);

const password = (password) => passwordRegex.test(password);

module.exports = {
  email,
  phone,
  password,
};
