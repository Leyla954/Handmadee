"use client";

import { Modal, Form, Input, Button, App } from "antd"; 
import { useState, useEffect } from "react";
import { LockOutlined, MailOutlined, UnlockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { login } from "@/app/redux/features/authSlice"; 
import { loginSchema } from "@/app/schema/loginSchema";

const Login = ({ open, onClose, onSignUpClick }) => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const { message: messageApi, modal: modalApi } = App.useApp();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleForgotPassword = () => {
    modalApi.confirm({
      title: 'Reset Password',
      content: 'Choose how you want to reset your password:',
      okText: 'Email',
      cancelText: 'Phone',
      okButtonProps: { style: { background: '#000' } },
      onOk: () => messageApi.info("Reset link sent to your email!"),
      onCancel: () => messageApi.info("OTP code sent to your phone!")
    });
  };

  const onFinish = (values) => {
    setLoading(true);
    if (typeof window !== "undefined") {
      const registeredUser = JSON.parse(localStorage.getItem("registered_user"));

      if (!registeredUser) {
        messageApi.error(loginSchema.messages.userNotFound);
        setLoading(false);
        return;
      }

      if (values.email !== registeredUser.email || values.password !== registeredUser.password) {
        messageApi.error(loginSchema.messages.invalid);
        setLoading(false);
        return;
      }

      dispatch(login(registeredUser));
      messageApi.success(`${loginSchema.messages.welcome}, ${registeredUser.nickname || 'Dreamer'}!`);
      
      setLoading(false);
      onClose?.(); 
    }
  };

  if (!mounted) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
      styles={{
        body: {
          padding: "40px",
          // Şəkli və gradienti yenilədik
          backgroundImage: "linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('https://d1idiaqkpcnv43.cloudfront.net/website1.0/images/sign-up.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "20px",
        },
      }}
    >
      <div style={{ maxWidth: "350px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "#1a1a1a", fontWeight: "800", fontSize: "28px", margin: 0 }}>
            {loginSchema.messages.title}
          </h2>
          <p style={{ color: "#8c8c8c", marginTop: "8px" }}>
            {loginSchema.messages.subtitle}
          </p>
        </div>
        
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            label={loginSchema.email.label}
            name="email"
            rules={[
              { required: true, message: loginSchema.email.rules.required },
              { type: "email", message: loginSchema.email.rules.type },
            ]}
          >
            <Input 
              prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
              placeholder={loginSchema.email.placeholder} 
              size="large" 
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label={loginSchema.password.label}
            name="password"
            rules={[
              { required: true, message: loginSchema.password.rules.required },
              { min: 6, message: loginSchema.password.rules.min }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
              size="large"
              placeholder={loginSchema.password.placeholder}
              style={{ borderRadius: "8px" }}
              iconRender={(visible) => (visible ? <UnlockOutlined /> : <LockOutlined />)}
            />
          </Form.Item>

          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <span 
              onClick={handleForgotPassword}
              style={{ color: "#434343", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}
            >
              {loginSchema.messages.forgotPass}
            </span>
          </div>

          <Form.Item>
            <Button
              htmlType="submit"
              block
              loading={loading}
              style={{
                background: "linear-gradient(90deg, #1a1a1a, #434343)",
                color: "#fff",
                height: "50px",
                fontWeight: "bold",
                borderRadius: "10px",
                border: "none",
                fontSize: "16px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}
            >
              {loginSchema.messages.submit}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          {loginSchema.messages.noAccount} {" "}
          <span 
            onClick={() => { 
              onClose?.(); // Login bağlanır
              setTimeout(() => {
                onSignUpClick?.(); // 300ms sonra Signup açılır
              }, 300); 
            }} 
            style={{ color: "#000", cursor: "pointer", fontWeight: "700", textDecoration: "underline" }}
          >
            {loginSchema.messages.signUpLink}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default Login;