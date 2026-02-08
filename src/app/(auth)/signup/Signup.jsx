"use client";

import { Modal, Form, Input, Button, Radio, App } from "antd"; 
import { useState, useEffect } from "react";
import { LockOutlined, UnlockOutlined, UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { login } from "@/app/redux/features/authSlice"; 
import { signupSchema } from "@/app/schema/signupSchema";

const Signup = ({ open, onClose, onLoginClick }) => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { message: messageApi } = App.useApp();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    try {
      // Qeydiyyat bazası (Yoxlama üçün)
      localStorage.setItem("registered_user", JSON.stringify(values));
      
      // Aktiv sessiya (Giriş üçün)
      dispatch(login(values));

      messageApi.success(signupSchema.messages.success);
      
      setTimeout(() => {
        form.resetFields(); 
        onClose();
      }, 1000);
    } catch (error) {
      messageApi.error("Qeydiyyat zamanı xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      styles={{
        body: {
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "40px",
          // ARXA FON ŞƏKLİ BURADA QAYTARILDI:
          backgroundImage: "linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('https://d1idiaqkpcnv43.cloudfront.net/website1.0/images/sign-up.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "20px",
        },
      }}
    >
      <div style={{ maxWidth: "450px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", fontWeight: "800", fontSize: "26px" }}>
          {signupSchema.messages.title}
        </h2>
        
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={onFinish} 
          requiredMark={false}
          validateTrigger="onBlur"
        >
          <Form.Item 
            label={signupSchema.nickname.label} 
            name="nickname" 
            rules={[{ required: true, message: signupSchema.nickname.requiredMsg }, signupSchema.nickname.existsRule]}
          >
            <Input prefix={<UserOutlined />} placeholder={signupSchema.nickname.placeholder} size="large" />
          </Form.Item>

          <div style={{ display: "flex", gap: "15px" }}>
            <Form.Item label={signupSchema.firstName.label} name="firstName" style={{ flex: 1 }} rules={[{ required: true, message: signupSchema.firstName.requiredMsg }]}>
              <Input placeholder={signupSchema.firstName.placeholder} size="large" />
            </Form.Item>
            <Form.Item label={signupSchema.lastName.label} name="lastName" style={{ flex: 1 }} rules={[{ required: true, message: signupSchema.lastName.requiredMsg }]}>
              <Input placeholder={signupSchema.lastName.placeholder} size="large" />
            </Form.Item>
          </div>

          <Form.Item label={signupSchema.gender.label} name="gender" initialValue="male">
            <Radio.Group>
              <Radio value="male">{signupSchema.gender.options.male}</Radio>
              <Radio value="female">{signupSchema.gender.options.female}</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item 
            label={signupSchema.email.label} 
            name="email" 
            rules={[
              { required: true, message: signupSchema.email.requiredMsg }, 
              { type: "email", message: signupSchema.email.typeMsg },
              signupSchema.email.existsRule
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder={signupSchema.email.placeholder} size="large" />
          </Form.Item>

          <Form.Item 
            label={signupSchema.phone.label} 
            name="phone" 
            rules={[
              { required: true, message: signupSchema.phone.requiredMsg }, 
              { pattern: /^[0-9]+$/, message: signupSchema.phone.patternMsg },
              signupSchema.phone.existsRule
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder={signupSchema.phone.placeholder} size="large" />
          </Form.Item>

          <Form.Item 
            label={signupSchema.password.label} 
            name="password" 
            rules={[{ required: true, message: signupSchema.password.requiredMsg }, { min: 6, message: signupSchema.password.minMsg }]}
          >
            <Input.Password 
              size="large"
              placeholder={signupSchema.password.placeholder}
              iconRender={(visible) => (visible ? <UnlockOutlined /> : <LockOutlined />)}
            />
          </Form.Item>

          <Button htmlType="submit" block loading={loading} style={{ background: "#000", color: "#fff", fontWeight: "bold", borderRadius: "10px", height: "50px", border: "none", fontSize: "16px", marginTop: "10px" }}>
            {signupSchema.messages.submit}
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          {signupSchema.messages.alreadyHaveAccount} {" "}
          <span 
            onClick={() => { onClose(); onLoginClick?.(); }}
            style={{ color: "#000", cursor: "pointer", fontWeight: "700", textDecoration: "underline" }}
          >
            {signupSchema.messages.loginLink}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default Signup;