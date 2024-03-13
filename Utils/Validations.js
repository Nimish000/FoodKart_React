export const validateLogin = (email, password) => {
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, errorMessage: 'Invalid email address' };
    }
  
    // Check if password is at least 6 characters long
    if (password.length < 6) {
      return { isValid: false, errorMessage: 'Password must be at least 6 characters long' };
    }
  
    // If both email and password pass validation
    return { isValid: true };
  };

  export const validateMobileNumber = (mobileNumber) => {
    // Simple validation: Check if the mobile number is exactly 10 digits
    const mob=/^\d{10}$/
    
    if(mob.test(mobileNumber)){
      return{isValid:true}
    }
    return {isValid:false,errorMessage: 'Invalid Mobile Number'}
  };

  export const getFormattedMobileNumber = (mobileNumber) => {
    // You can format the mobile number as needed
    return '+91 ' + mobileNumber;
  };