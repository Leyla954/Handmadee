"use client";
import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, App } from "antd"; // message yerinə App əlavə edildi
import { useSelector } from "react-redux";

const { TextArea } = Input;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  
  // Ant Design message hook-u
  const { message: messageApi } = App.useApp();
  
  // Redux state integration
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Modal açılanda istifadəçi daxil olubsa, "Your Identity" hissəsini avtomatik doldurur
  useEffect(() => {
    if (isModalOpen && isAuthenticated && user) {
      form.setFieldsValue({ 
        author: user.nickname || user.firstName 
      });
    }
  }, [isModalOpen, isAuthenticated, user, form]);

  const showModal = () => setIsModalOpen(true);
  
  const handleCancel = () => {
    setIsModalOpen(false);
    // Əgər istifadəçi daxil olmayıbsa formanı tam sıfırla, daxil olubsa adı saxla
    if (!isAuthenticated) {
        form.resetFields();
    } else {
        form.setFieldsValue({ message: "" });
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const { author, message: msg } = values;

      // Filter Logic
      const inappropriateWords = ["badword1", "spam", "offensive"]; 
      const allowedPattern = /^[a-zA-Z0-9\səıöğçşüƏIÖĞÇŞÜ]+$/; // Azərbaycan şriftləri də əlavə edildi

      if (inappropriateWords.some((w) => author.toLowerCase().includes(w) || msg.toLowerCase().includes(w))) {
        return messageApi.error("Inappropriate language is not allowed!");
      }
      
      if (!allowedPattern.test(author)) {
        return messageApi.error("Name can only contain letters and numbers!");
      }

      console.log("Dream Sent:", values);
      messageApi.success("Your dream has been sent to the clouds! 💌");
      
      form.setFieldsValue({ message: "" }); // Mesajı silirik
      setIsModalOpen(false);
    } catch (error) {
      messageApi.error("Please fill in the fields correctly!");
    }
  };

  return (
    <header
      className="text-center p-4 shadow-sm z-40 relative bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('http://planeteando.org/wp-content/uploads/2020/07/our-waves-2.png')",
        backgroundSize: "100%",
        backgroundPosition: "center 55%",
      }}
    >
      <h1
        className="text-[6rem] md:text-[10rem] font-extrabold text-black cursor-pointer drop-shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        style={{ fontFamily: "'Edwardian Script ITC', cursive" }}
        onClick={showModal}
      >
        Tell me your dreams
        <img
          src="https://png.pngtree.com/png-clipart/20240321/original/pngtree-woman-silhouette-wallpaper-image-with-transperent-background-png-image_14645873.png"
          alt="Dreams"
          className="ml-4 w-[60px] md:w-[100px] h-auto animate-pulse mix-blend-multiply"
        />
      </h1>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={850}
        centered
        styles={{ body: { padding: 0, overflow: "hidden", borderRadius: "20px" } }}
      >
        <div className="flex flex-col md:flex-row w-full min-h-[450px]">
          {/* Left Side: Form */}
          <div className="flex-1 p-10 bg-white">
            <h2 className="text-3xl font-bold mb-2 text-gray-800" style={{ fontFamily: "cursive" }}>
              Share your dream...
            </h2>
            <p className="text-gray-500 mb-8 italic">Let your thoughts fly to the sky.</p>

            <Form form={form} layout="vertical" requiredMark={false}>
              <Form.Item
                name="author"
                label="Your Identity"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input 
                  placeholder="Your Name or Nickname" 
                  className="rounded-lg border-gray-300 h-12 focus:border-black transition-all"
                  disabled={isAuthenticated} // Giriş edibsə adı dəyişə bilməsin (istəyə bağlıdır)
                />
              </Form.Item>

              <Form.Item
                name="message"
                label="Your Dream"
                rules={[{ required: true, message: "Please share your dream!" }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Type your dream here..."
                  className="rounded-lg border-gray-300 focus:border-black transition-all"
                />
              </Form.Item>

              <Button
                type="primary"
                onClick={handleOk}
                block
                className="mt-4"
                style={{
                  background: "linear-gradient(90deg, #1a1a1a, #434343)",
                  border: "none",
                  height: "55px",
                  borderRadius: "12px",
                  fontSize: "18px",
                  fontWeight: "600",
                  letterSpacing: "1px"
                }}
              >
                SEND TO CLOUDS 🚀
              </Button>
            </Form>
          </div>

          {/* Right Side: Illustration */}
          <div className="flex-1 bg-gray-50 flex items-center justify-center p-8 border-l border-gray-100">
            <img
              src="https://img.freepik.com/premium-vector/chatting-messaging-man-woman-chatting-smartphone-hand-holding-mobile-phone-with-text-messages_136162-238.jpg"
              alt="Dreams Illustration"
              className="max-w-full h-auto object-contain mix-blend-multiply hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Header;