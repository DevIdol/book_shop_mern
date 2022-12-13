const validateEmail = ({ email, setEmailError }) => {
  const emailRegular =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email && !email.match(emailRegular)
    ? setEmailError("Email is not valid!")
    : setEmailError("");
};

const validatePhone = ({ phone, setPhoneError }) => {
  var phoneRegular = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phone && !phone.match(phoneRegular)
    ? setPhoneError("Phone Number not valid")
    : setPhoneError("");
};

const validateName = ({ name, setNameError }) => {
  return name && name.length < 5
    ? setNameError("Name is too short!")
    : name && name.length > 50
    ? setNameError("Try to make short and meanfull!")
    : setNameError("");
};

const validateMessage = ({ message, setMessageError }) => {
  return message && message.length < 5
    ? setMessageError("Message is too short!")
    : message && message.length > 200
    ? setMessageError("Try to make short and meanfull!")
    : setMessageError("");
};

export { validateEmail, validateName, validateMessage, validatePhone };
