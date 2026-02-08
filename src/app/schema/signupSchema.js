const getRegisteredUser = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("registered_user");
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const signupSchema = {
  nickname: { 
    label: "Username", 
    placeholder: "e.g. dreams_user", 
    requiredMsg: "Username is required!",
    existsRule: {
      validator: (_, value) => {
        const user = getRegisteredUser();
        if (user && value && user.nickname === value) {
          return Promise.reject(new Error("This username is already taken!"));
        }
        return Promise.resolve();
      }
    }
  },
  firstName: { label: "First Name", placeholder: "Enter your first name", requiredMsg: "First name is required!" },
  lastName: { label: "Last Name", placeholder: "Enter your last name", requiredMsg: "Last name is required!" },
  email: { 
    label: "Email Address", 
    placeholder: "example@dreams.com", 
    requiredMsg: "Email is required!", 
    typeMsg: "Please enter a valid email format!",
    existsRule: {
      validator: (_, value) => {
        const user = getRegisteredUser();
        if (user && value && user.email === value) {
          return Promise.reject(new Error("This email is already registered!"));
        }
        return Promise.resolve();
      }
    }
  },
  phone: { 
    label: "Phone Number", 
    placeholder: "Numbers only", 
    requiredMsg: "Phone number is required!", 
    patternMsg: "Please enter only digits!",
    existsRule: {
      validator: (_, value) => {
        const user = getRegisteredUser();
        if (user && value && user.phone === value) {
          return Promise.reject(new Error("This phone number is already in use!"));
        }
        return Promise.resolve();
      }
    }
  },
  password: { 
    label: "Password", 
    placeholder: "At least 6 chars, letters & numbers", 
    requiredMsg: "Password is required!",
    minMsg: "Password must be at least 6 characters!",
    // YENİ: Hərf və rəqəm yoxlaması (Regex)
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    patternMsg: "Password must contain both letters and numbers!"
  },
  gender: { 
    label: "Gender", 
    requiredMsg: "Please select your gender!",
    options: { male: "Male", female: "Female" }
  },
  messages: {
    title: "Join Dreams",
    submit: "Complete Registration",
    success: "Congratulations! Your registration is complete.",
    alreadyHaveAccount: "Already have an account?",
    loginLink: "Login now"
  }
};