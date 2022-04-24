const registerInputValidate = (
  firstname,
  lastname,
  username,
  phone,
  email,
  password,
  confirmPassword,
) => {
  const errors = {};
  if (firstname.trim() === "") {
    errors.firstname = "Please supply your firstname";
  }
  if (lastname.trim() === "") {
    errors.lastname = "Please supply your lastname";
  }
  if (username.trim() === "") {
    errors.username = "Please supply a username";
  }
  if (phone.trim() === "") {
    errors.phone = "Please supply your phone number";
  }
  if (email.trim() === "") {
    errors.email = "Please supply your email";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Please supply a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Please supply a password";
  } else {
    const regEx = /^(.{0,6}|[^0-9]*|[^A-Z]*|[a-zA-Z0-9]*)$/;
    if (!password.match(regEx)) {
      errors.password =
        "Your password must include at least one upper case, one special character and it must me more than 5 characters.";
    }
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = "Password and confirm password don't match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
const editInputValidate = (
  firstname,
  lastname,
  username,
  phone
) => {
  const errors = {};
  if (firstname && firstname.trim() === "") {
    errors.firstname = "Please supply your firstname";
  }
  if (lastname && lastname.trim() === "") {
    errors.lastname = "Please supply your lastname";
  }
  if (username && username.trim() === "") {
    errors.username = "Please supply a username";
  }
  if (phone && phone.trim() === "") {
    errors.phone = "Please supply your phone number";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = { registerInputValidate, editInputValidate };
