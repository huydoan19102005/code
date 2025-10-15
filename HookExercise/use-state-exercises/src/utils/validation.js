// src/utils/validation.js
export function isValidEmail(email) {
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return re.test(email);
}

export function isStrongPassword(pw) {
  if (!pw || pw.length < 8) return false;
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasDigit = /\d/.test(pw);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pw);
  return hasUpper && hasLower && hasDigit && hasSpecial;
}

export function isValidUsername(name) {
  if (!name) return false;
  const trimmed = name.trim();
  if (trimmed.length < 3) return false;
  // Letters, digits, underscore, dot
  return /^[A-Za-z0-9_.]+$/.test(trimmed);
}
