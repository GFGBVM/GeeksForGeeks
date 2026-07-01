export const validatePersonalDetails = (formData) => {
  const {
    fullName,
    email,
    phoneNumber,
    IdNumber,
    department,
    resumelink,
    year,
    cpi,
  } = formData;

  if (
    !fullName.trim() ||
    !email.trim() ||
    !phoneNumber.trim() ||
    !IdNumber.trim() ||
    !department || !resumelink ||
    !year ||
    cpi === ""
  ) {
    return "Please fill all the required fields.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(phoneNumber)) {
    return "Please enter a valid 10-digit phone number.";
  }

  const cpiValue = Number(cpi);

  if (isNaN(cpiValue) || cpiValue < 0 || cpiValue > 10) {
    return "CPI must be between 0 and 10.";
  }

  return null;
};

export const validatePreferences = (preferences) => {
  if (!Array.isArray(preferences) || preferences.length !== 3) {
    return "Please select all three preferences.";
  }

  if (preferences.some((preference) => preference === "")) {
    return "Please select all three preferences.";
  }

  if (new Set(preferences).size !== 3) {
    return "All three preferences must be different.";
  }

  return null;
};

export const validateForm = (formData) => {
  const personalError = validatePersonalDetails(formData);

  if (personalError) {
    return personalError;
  }

  const preferenceError = validatePreferences(
    formData.preferences
  );

  if (preferenceError) {
    return preferenceError;
  }

  return null;
};