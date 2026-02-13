import axios from 'axios';

const API_URL = "https://6988b1ca780e8375a688f34b.mockapi.io/users";

export const loginSchema = {
    email: {
        label: "Email Address",
        placeholder: "e.g. name@example.com",
        rules: [
            { required: true, message: "Email is required to sign in!" },
            { type: "email", message: "Please enter a valid email format (e.g. user@mail.com)" }
        ]
    },
    password: {
        label: "Password",
        placeholder: "Enter your password",
        rules: [
            { required: true, message: "Password is required!" },
            { min: 6, message: "Security tip: Password must be at least 6 characters long" }
        ]
    },
    messages: {
        title: "Welcome Back",
        subtitle: "Please enter your details to access your account.",
        submit: "Login",
        forgotPass: "Forgot Password?",
        noAccount: "Don't have an account?",
        signUpLink: "Sign Up now",
        
        // Xəta və Uğur mesajları
        userNotFound: "No account found with this email. Please sign up first!",
        invalid: "Invalid email or password. Please try again!",
        welcome: "Welcome back",
        successLogin: "You have successfully logged in.",
    }
};

// API-da login yoxlaması edən funksiya
export const loginUserAPI = async (values) => {
    try {
        // MockAPI-dan həmin email-ə uyğun istifadəçini tapırıq
        const res = await axios.get(`${API_URL}?email=${values.email}`);
        
        // API email-ə görə filter etsə də, tam dəqiqlik üçün find edirik
        const user = res.data.find(u => u.email === values.email);

        if (!user) {
            throw new Error(loginSchema.messages.userNotFound);
        }

        // Şifrə yoxlaması (Normalda bu server tərəfdə olur, amma MockAPI-da biz edirik)
        if (user.password !== values.password) {
            throw new Error(loginSchema.messages.invalid);
        }

        return user; // Hər şey düzdürsə istifadəçini qaytarırıq
    } catch (error) {
        throw error.message || loginSchema.messages.invalid;
    }
};