export function validatePhone(value) {
  var phone = value;
  if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)) {
    return false;
  } else {
    return true;
  }
}
