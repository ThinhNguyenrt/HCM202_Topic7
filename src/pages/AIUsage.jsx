import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageCircle, CheckCircle, AlertCircle, XCircle, Zap, Heart } from 'lucide-react';

function AIUsage() {
  const [activeStep, setActiveStep] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      boxShadow: '0 20px 40px rgba(153, 27, 27, 0.15)',
      transition: { duration: 0.3 },
    },
  };

  const aiTools = [
    {
      name: 'Claude Sonnet 4.5',
      icon: Brain,
      role: 'Styling & Animation',
      description: 'Hỗ trợ thiết kế giao diện, hiệu ứng chuyển động và tối ưu hóa trải nghiệm người dùng.',
      color: 'from-red-600 to-red-700',
      accentColor: 'text-yellow-600',
    },
    {
      name: 'ChatGPT & Gemini',
      icon: MessageCircle,
      role: 'Layout & Content',
      description: 'Gợi ý bố cục trang, cấu trúc nội dung và tham khảo các ý tưởng thiết kế.',
      color: 'from-orange-600 to-red-600',
      accentColor: 'text-yellow-500',
    },
  ];

  const workflowSteps = [
    {
      number: 1,
      title: 'Ghi nhận Thông tin AI',
      description: 'Tiếp nhận các gợi ý và thông tin từ các công cụ AI như Claude Sonnet, ChatGPT, Gemini.',
      icon: Zap,
    },
    {
      number: 2,
      title: 'Đối chiếu với Giáo trình',
      description: 'So sánh thông tin nhận được với Giáo trình Tư tưởng Hồ Chí Minh chính thống.',
      icon: CheckCircle,
    },
    {
      number: 3,
      title: 'Phân loại Nội dung',
      description: 'Xếp loại nội dung thành: Chính xác, Chưa đủ căn cứ, hoặc Sai.',
      icon: AlertCircle,
    },
    {
      number: 4,
      title: 'Chốt Nội dung Cuối',
      description: 'Nhóm chịu trách nhiệm phê duyệt và xác nhận nội dung cuối cùng.',
      icon: CheckCircle,
    },
  ];

  const commitmentItems = [
    'Không lạm dụng AI',
    'Ưu tiên Nguồn Chính thống',
    'Đánh dấu Rõ ràng',
    'Loại bỏ Thông tin Không truy vết',
    'Xác thực Chặt chẽ',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-orange-500 py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-10 md:p-12 group cursor-pointer hover:border-red-400 transition-all duration-500">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Zap className="w-12 h-12 text-red-600" />
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
                Sử dụng AI & Cam kết Liêm chính
              </h1>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
            >
              Công cụ hỗ trợ thông minh được sử dụng có trách nhiệm và minh bạch để phục vụ nghiên cứu Tư tưởng Hồ Chí Minh
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="h-1 w-24 bg-red-600 mx-auto rounded-full"
            ></motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="mb-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-gray-800 mb-12 text-center flex items-center justify-center gap-3"
            >
              <Brain className="w-10 h-10 text-red-600" />
              Công cụ AI được sử dụng
            </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {aiTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <motion.div
                    variants={cardHoverVariants}
                    className={`bg-gradient-to-br ${tool.color} p-8 rounded-xl text-white shadow-lg h-full flex flex-col`}
                  >
                    <div className="flex items-center mb-4">
                      <IconComponent className="w-12 h-12 mr-4" />
                      <div>
                        <h3 className="text-2xl font-bold">{tool.name}</h3>
                        <p className={`${tool.accentColor} font-semibold`}>{tool.role}</p>
                      </div>
                    </div>
                    <p className="text-white/90 leading-relaxed">{tool.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="mb-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-red-900 mb-12 text-center flex items-center justify-center gap-3"
          >
            <CheckCircle className="w-10 h-10 text-red-600" />
            Quy trình Kiểm chứng Nội dung
          </motion.h2>

          <div className="space-y-0">
            {workflowSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isLastStep = index === workflowSteps.length - 1;
              
              return (
                <div key={index}>
                  {/* Connector line before box */}
                  {index > 0 && (
                    <div className="hidden md:flex justify-center h-8">
                      <div className="w-1 bg-gradient-to-b from-red-900 to-yellow-600"></div>
                    </div>
                  )}

                  <motion.div
                    variants={itemVariants}
                    whileInView="visible"
                    initial="hidden"
                    viewport={{ once: true }}
                    className={`flex flex-col md:flex-row ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } items-center gap-8`}
                  >
                    {/* Content */}
                    <motion.div
                      className="flex-1"
                      whileHover={{ x: index % 2 === 0 ? 8 : -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="bg-white border-l-4 border-red-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        whileHover={{ boxShadow: '0 10px 30px rgba(153, 27, 27, 0.15)' }}
                      >
                        <h3 className="text-xl font-bold text-red-900 mb-2">
                          Bước {step.number}: {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </motion.div>
                    </motion.div>

                    {/* Step number circle */}
                    <motion.div
                      animate={activeStep === index ? { scale: 1.2 } : { scale: 1 }}
                      onHoverStart={() => setActiveStep(index)}
                      onHoverEnd={() => setActiveStep(null)}
                      className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-red-900 to-yellow-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                    >
                      <div className="text-center">
                        <StepIcon className="w-8 h-8 mx-auto" />
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Connector line after box */}
                  {!isLastStep && (
                    <div className="hidden md:flex justify-center h-8">
                      <div className="w-1 bg-gradient-to-b from-red-900 to-yellow-600"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="mb-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-red-900 mb-12 text-center flex items-center justify-center gap-3"
          >
            <Heart className="w-10 h-10 text-red-600" />
            Cam kết Liêm chính
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 p-12 rounded-2xl text-white shadow-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500"
          >
            <p className="text-lg mb-8 leading-relaxed drop-shadow-md">
              Chúng tôi cam kết sử dụng công nghệ AI một cách có trách nhiệm, minh bạch và liêm chính. AI là công cụ hỗ trợ, không thay thế con người. Mọi nội dung được cung cấp đều trải qua quá trình kiểm duyệt kỹ lưỡng và đối chiếu với các tài liệu chính gốc.
            </p>

            <div className="space-y-4">
              {commitmentItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-white/15 p-4 rounded-lg backdrop-blur-sm hover:bg-white/25 hover:translate-x-2 transition-all duration-300 group cursor-pointer"
                >
                  <span className="text-2xl font-bold text-yellow-300 flex-shrink-0 group-hover:scale-125 transition-transform">✓</span>
                  <p className="text-white/95 font-semibold group-hover:text-yellow-200 transition-colors">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        </div>
      </section>

      {/* Reference Section */}
      <section className="mb-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-yellow-50 to-red-50 border-2 border-red-600 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 group cursor-pointer"
          >
            <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-3">
              <span className="text-3xl group-hover:animate-bounce">📚</span>
              Tài liệu Tham khảo Chính
            </h3>
            <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors">
              Tất cả nội dung trên trang web này được kiểm duyệt và so sánh với{' '}
              <span className="font-bold text-red-600 bg-red-100 px-2 py-1 rounded group-hover:bg-red-200 transition-colors">
                Giáo trình Tư tưởng Hồ Chí Minh
              </span>{' '}
              để đảm bảo độ chính xác và tính liêm chính của nội dung
            </p>
          </motion.div>
        </motion.div>
        </div>
      </section>
    </div>
  );
}

export default AIUsage;
