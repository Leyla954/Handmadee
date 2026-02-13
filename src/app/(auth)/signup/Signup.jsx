"use client";

import { Modal, Form, Input, Button, Radio, App } from "antd"; 
import { useState, useEffect } from "react";
import { LockOutlined, UnlockOutlined, UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "@/app/redux/features/authSlice"; 
import { signupSchema } from "@/app/schema/signupSchema";

const Signup = ({ open, onClose, onLoginClick }) => {
  const [mounted, setMounted] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { message: messageApi } = App.useApp();

  // Redux state-i
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onFinish = async (values) => {
    // API-ya POST sorğusu göndərilir
    const resultAction = await dispatch(signupUser(values));

    if (signupUser.fulfilled.match(resultAction)) {
      messageApi.success(signupSchema.messages.success);
      form.resetFields();
      onClose();
    } else {
      // API-dan qayıdan xəta mesajı
      messageApi.error(resultAction.payload || "Xəta baş verdi");
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
          backgroundImage: "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('https://d1idiaqkpcnv43.cloudfront.net/website1.0/images/sign-up.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "15px",
        },
      }}
    >
      <div style={{ maxWidth: "450px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", fontWeight: "800", fontSize: "26px", color: "#000" }}>
          {signupSchema.messages.title}
        </h2>
        
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={onFinish} 
          requiredMark={false}
          validateTrigger="onBlur" // Yazı yazarkən deyil, sahədən çıxanda API yoxlaması edir (performans üçün)
        >
          {/* Username */}
          <Form.Item 
            label={signupSchema.nickname.label} 
            name="nickname" 
            rules={[{ required: true, message: signupSchema.nickname.requiredMsg }, signupSchema.nickname.existsRule]}
          >
            <Input prefix={<UserOutlined />} placeholder={signupSchema.nickname.placeholder} size="large" />
          </Form.Item>

          {/* Ad və Soyad yan-yana */}
          <div className="flex gap-4">
            <Form.Item label={signupSchema.firstName.label} name="firstName" className="flex-1" rules={[{ required: true, message: signupSchema.firstName.requiredMsg }]}>
              <Input placeholder={signupSchema.firstName.placeholder} size="large" />
            </Form.Item>
            <Form.Item label={signupSchema.lastName.label} name="lastName" className="flex-1" rules={[{ required: true, message: signupSchema.lastName.requiredMsg }]}>
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
              { type: "email", message: "Invalid email format!" },
              signupSchema.email.existsRule
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder={signupSchema.email.placeholder} size="large" />
          </Form.Item>

          <Form.Item 
            label={signupSchema.phone.label} 
            name="phone" 
            rules={[{ required: true, message: signupSchema.phone.requiredMsg }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder={signupSchema.phone.placeholder} size="large" />
          </Form.Item>

          <Form.Item 
            label={signupSchema.password.label} 
            name="password" 
            rules={[
              { required: true, message: signupSchema.password.requiredMsg }, 
              { pattern: signupSchema.password.pattern, message: signupSchema.password.patternMsg }
            ]}
          >
            <Input.Password 
              size="large"
              placeholder="******"
              iconRender={(visible) => (visible ? <UnlockOutlined /> : <LockOutlined />)}
            />
          </Form.Item>

          <Button 
            htmlType="submit" 
            block 
            loading={loading}
            className="signup-submit-btn"
            style={{ 
              background: "#000", 
              color: "#fff", 
              height: "50px", 
              borderRadius: "10px", 
              marginTop: "10px",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            {signupSchema.messages.submit}
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span style={{ color: "#666" }}>{signupSchema.messages.alreadyHaveAccount}</span>
          <Button type="link" onClick={() => { onClose(); onLoginClick?.(); }} style={{ color: "#000", fontWeight: "700" }}>
            {signupSchema.messages.loginLink}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Signup;