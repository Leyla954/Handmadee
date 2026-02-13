import axios from 'axios';

const API_URL = "https://6988b1ca780e8375a688f34b.mockapi.io/users";

// Təkrarçılığın qarşısını almaq üçün ümumi yoxlama funksiyası
const checkAvailability = async (field, value, errorMsg) => {
  if (!value || value.length < 3) return Promise.resolve();
  try {
    // MockAPI-da spesifik sahəyə görə axtarış
    const res = await axios.get(`${API_URL}?${field}=${value}`);
    
    // API bəzən oxşar nəticələri də qaytarır, dəqiq yoxlama aparırıq
    const exists = res.data.some(user => user[field] === value);
    
    if (exists) {
      return Promise.reject(new Error(errorMsg));
    }
    return Promise.resolve();
  } catch (error) {
    // API xətası olarsa (məsələn 404), deməli istifadəçi tapılmadı, keçid veririk
    return Promise.resolve();
  }
};

export const signupSchema = {
  nickname: { 
    label: "Username", 
    placeholder: "e.g. dreams_user", 
    requiredMsg: "Username is required!",
    existsRule: {
      validator: (_, value) => checkAvailability('nickname', value, "This username is already taken!")
    }
  },
  firstName: { 
    label: "First Name", 
    placeholder: "Enter your first name", 
    requiredMsg: "Required!" 
  },
  lastName: { 
    label: "Last Name", 
    placeholder: "Enter your last name", 
    requiredMsg: "Required!" 
  },
  email: { 
    label: "Email Address", 
    placeholder: "example@dreams.com", 
    requiredMsg: "Email is required!", 
    existsRule: {
      validator: (_, value) => checkAvailability('email', value, "Email already registered!")
    }
  },
  phone: { 
    label: "Phone", 
    placeholder: "Digits only", 
    requiredMsg: "Required!" 
  },
  password: { 
    label: "Password", 
    requiredMsg: "Required!",
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    patternMsg: "Minimum 6 characters, must contain letters and numbers!"
  },
  gender: { 
    label: "Gender", 
    requiredMsg: "Required!", 
    options: { male: "Male", female: "Female" } 
  },
  messages: {
    title: "Join Dreams",
    submit: "Complete Registration",
    success: "Success! Your account has been created.",
    alreadyHaveAccount: "Already have an account?",
    loginLink: "Login now"
  }
};