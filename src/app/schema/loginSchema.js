export const loginSchema = {
    email: {
        label: "Email Address",
        placeholder: "e.g. name@example.com",
        rules: {
            required: "Email is required to sign in!",
            type: "Please enter a valid email format (e.g. user@mail.com)"
        }
    },
    password: {
        label: "Password",
        placeholder: "Enter your password",
        rules: {
            required: "Password is required!",
            min: "Security tip: Password must be at least 6 characters long"
        }
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
        alreadyExists: "This email is already registered. Please login instead!", // Signup üçün lazım olacaq
        welcome: "Welcome back",
        successLogin: "You have successfully logged in.",
        successSignup: "Registration successful! You can now login."
    }
};