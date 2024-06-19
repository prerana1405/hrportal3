const validateUserData = (data) => {
    const { fname, lname, email, password, mobile_no } = data;

    // Check if all required fields are present
    if (!fname || !lname || !email || !password || !mobile_no) {
        return { success: false, message: "All fields are required" };
    }

    // Validate first name and last name (alphabetic characters only)
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(fname) || !nameRegex.test(lname)) {
        return { success: false, message: "First name and last name must contain only alphabetic characters" };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: "Invalid email format" };
    }

    // Validate password strength (e.g., minimum length)
    if (password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters long" };
    }
    
    // If all validation checks pass, return success
    return { success: true, message: "Data is valid" };
};

module.exports = validateUserData;

