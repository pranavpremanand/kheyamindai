import logo from "../assets/logo/logo.png";
import { ReactComponent as LogoSvg } from "../assets/logo/logo.svg";
import { ReactComponent as LogoSvgFooter } from "../assets/logo/logo-footer.svg";

// services icons (website)
import { ReactComponent as icon1 } from "../assets/svg/services/AI Chatbots.svg";
import { ReactComponent as icon2 } from "../assets/svg/services/AI Voice Bots.svg";
import { ReactComponent as icon3 } from "../assets/svg/services/Natural Language Processing (NLP).svg";
import { ReactComponent as icon4 } from "../assets/svg/services/Real-Time Data Analytics.svg";
import { ReactComponent as icon5 } from "../assets/svg/services/Secure IoT Solutions.svg";
import { ReactComponent as icon6 } from "../assets/svg/services/UIUX Design.svg";
import { ReactComponent as icon7 } from "../assets/svg/services/AI Development.svg";

// app development services icons
import { ReactComponent as appIcon1 } from "../assets/svg/services/iOS App Development.svg";
import { ReactComponent as appIcon2 } from "../assets/svg/services/Android.svg";
import { ReactComponent as appIcon3 } from "../assets/svg/services/Flutter.svg";
import { ReactComponent as appIcon4 } from "../assets/svg/services/Hybrid App Development.svg";

// web development services icons
import { ReactComponent as webIcon1 } from "../assets/svg/services/E-Commerce Development.svg";
import { ReactComponent as webIcon2 } from "../assets/svg/services/Social Media Websites.svg";
import { ReactComponent as webIcon3 } from "../assets/svg/services/Web Development.svg";
import { ReactComponent as webIcon4 } from "../assets/svg/services/UIUX Design.svg";

export { logo, LogoSvg, LogoSvgFooter };

export const companyDetails = {
  email: "hello@KheyaMind.ai",
  phone: "+91-9242049993",
  address: "Dhanbad, Jharkhand, India",
  linkedin: "https://linkedin.com/company/kheyamindai",
  instagram: "https://instagram.com/kheyamindai",
  facebook: "https://facebook.com/kheyamindai",
};

export const testimonials = [
  {
    name: "Rahul Sharma",
    designation: "Head of Customer Support, RetailCo",
    image: require("../assets/images/testimonial/2.jpg"),
    review:
      "The AI chatbot from KheyaMind  AI has revolutionized our customer service. It’s available 24/7, responds instantly, and handles complex queries with ease. Our team can now focus on higher-priority tasks, while the chatbot efficiently takes care of customer interactions. It’s been a tremendous asset to our customer support team!",
  },
  {
    name: "Sharmila Gupta",
    designation: "Vice President of Customer Experience, GlobalCom",
    image: require("../assets/images/testimonial/1.jpg"),
    review:
      "The voice bot solution implemented by KheyaMind  AI has made it incredibly easy for our clients to interact with our services. It’s accurate, responds naturally to spoken language, and is able to handle complex queries. The ability to support multiple languages has been a huge advantage for us in catering to a global customer base.",
  },
  {
    name: "Amit Kumar",
    designation: "CEO, Health360",
    image: require("../assets/images/testimonial/3.jpg"),
    review:
      "Developing a mobile app with KheyaMind  AI has been a fantastic experience. They helped us bring our ideas to life and created a high-quality app that works seamlessly. Our users love the clean design and smooth functionality, and we’ve seen increased user engagement since its launch.",
  },
  {
    name: "Sunil Kumar",
    designation: "CTO, CodeWorks Inc.",
    image: require("../assets/images/testimonial/4.jpg"),
    review:
      "The mobile app developed by KheyaMind  AI has exceeded our expectations. From the initial concept to the final product, their team was responsive and attentive to our needs. The app is fast, secure, and user-friendly, and it’s played a huge role in boosting our customer retention.",
  },
];

// web development services
export const webDevelopmentServices = [
  {
    id: 1,
    title: "E-commerce Websites",
    icon: webIcon1,
    desc: "Empowering your online business with tailored ecommerce solutions. Our platforms boost customer engagement, streamline operations, and drive revenue growth. ",
  },
  {
    id: 2,
    title: "Social Media Websites",
    icon: webIcon2,
    desc: "Get custom social media websites that captivate and engage your audience, driving growth and brand loyalty effortlessly",
  },
  {
    id: 3,
    title: "Landing Websites",
    icon: webIcon3,
    desc: " Creating high-converting landing pages that capture attention and drive action. Tailored designs that showcase your brand’s message and maximize conversions.",
  },
  {
    id: 4,
    title: "Custom Websites",
    icon: webIcon4,
    desc: "Delivering tailor-made websites designed to meet your unique business needs. Our solutions blend creativity and functionality for an exceptional online experience.",
  },
];

// app development services
export const appDevelopmentServices = [
  {
    id: 1,
    title: "iOS App Development",
    icon: appIcon1,
    desc: "Our skilled developers work with both Swift and Objective-C to build robust and efficient apps. We optimize your app for performance, speed, and responsiveness.",
  },
  {
    id: 2,
    title: "Android App Development",
    icon: appIcon2,
    desc: "We design and develop tailor-made Android apps that align with your vision and business goals.Proficient in both Java and Kotlin, we build robust and efficient apps.",
  },
  {
    id: 3,
    title: "Flutter App Development",
    icon: appIcon3,
    desc: "Flutter allows you to build apps for both iOS and Android using a single codebase. While Flutter's default web app architecture presents challenges, we can overcome them with smart strategies. ",
  },
  {
    id: 4,
    title: "Hybrid App Development",
    icon: appIcon4,
    desc: "We build feature-rich hybrid apps tailored to your business needs. We create mobile-friendly apps that work seamlessly across iOS and Android devices.",
  },
];

// portfolio images (web development)
export const webPortfolio = [
  // {
  //   id: 1,
  //   img: require("../assets/images/portfolio/web-development/5ghomes.webp"),
  //   title: "5g Homes",
  //   link: "https://5ghighspeedinternet.co",
  // },
  {
    id: 2,
    img: require("../assets/images/portfolio/web-development/cold-creekcap.webp"),
    title: "Cold Creekcap",
    link: "https://www.coldcreekcap.com",
  },
  {
    id: 3,
    img: require("../assets/images/portfolio/web-development/think-reality.webp"),
    title: "Think Reality",
    link: "https://thinkrealty.ae",
  },
  {
    id: 4,
    img: require("../assets/images/portfolio/web-development/akash-mega-mart.webp"),
    title: "Akash Mega Mart",
    link: "https://akashmegamart.com/",
  },
  {
    id: 5,
    img: require("../assets/images/portfolio/web-development/midwam.webp"),
    title: "Midwam",
    link: "https://www.midwam.com/en/about",
  },
];

// portfolio images (app development)
export const appPortfolio = [
  {
    id: 1,
    img: require("../assets/images/portfolio/app-development/akash_mega_mart-app.webp"),
    title: "Akash Mega Mart Mobile App",
    link: "https://play.google.com/store/apps/details?id=com.app.akash_mega_mart",
  },
  {
    id: 2,
    img: require("../assets/images/portfolio/app-development/feelit_app.webp"),
    title: "Feel It Mobile App",
    link: "https://play.google.com/store/apps/details?id=com.feelit.feelit_app",
  },
  {
    id: 3,
    img: require("../assets/images/portfolio/app-development/klikomics.webp"),
    title: "Klikomics Mobile App",
    link: "https://play.google.com/store/apps/details?id=com.klikomics.android&pcampaignid=web_share",
  },
  {
    id: 4,
    img: require("../assets/images/portfolio/app-development/autosnap-app.webp"),
    title: "AutoSnap Mobile App",
    link: "https://play.google.com/store/apps/details?id=com.Zigna.AutoSnap&pcampaignid=web_share",
  },
  {
    id: 5,
    img: require("../assets/images/portfolio/app-development/rentop.webp"),
    title: "Rentop Bike and Car",
    link: "https://play.google.com/store/apps/details?id=com.rentop&pcampaignid=web_share",
  },
];

// complete service and details
export const services = [
  {
    id: 1,
    title: "AI Chatbots",
    icon: icon1,
    desc: "Automate customer support and sales with intelligent text-based chatbots that deliver 24/7 instant responses across digital channels.",
    slug: "ai-chatbots",
    seo: {
      title:
        "AI Chatbots for Business | 24/7 Customer Support Automation | KheyaMind AI",
      description:
        "Automate customer support with intelligent AI chatbots. Handle queries, generate leads, and enhance customer experience 24/7. Get your AI chatbot today.",
      keywords:
        "AI chatbots, customer support automation, chatbot development, business chatbots, conversational AI",
      canonicalUrl: "https://www.kheyamind.ai/services/ai-chatbots",
    },
    detailsPage: {
      banner: require("../assets/images/banners/ai-chatbot.webp"),
      img1: require("../assets/images/service-details/chatbot1.webp"),
      img2: require("../assets/images/service-details/chatbot2.webp"),
      img3: require("../assets/images/service-details/chatbot3.webp"),
      firstSection: `
        <div class="space-y-6">
          <div class="space-y-4">
            <h1 class="text-2xl font-bold">
              Intelligent Text-Based Chatbot Solutions
            </h1>
            <p>
              <span class="font-bold text-secondary">KheyaMind AI</span> develops advanced AI chatbots that understand natural language, maintain conversation context, and integrate seamlessly with your existing business systems.
            </p>
            <p>
              Our chatbots reduce response times from hours to seconds while cutting customer service costs by up to 40% through intelligent automation of repetitive inquiries.
            </p>
          </div>
        </div>`,
      secondSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              Key Chatbot Capabilities
            </h2>
            <ul class="space-y-5 list-decimal pl-6">
              <li>
                <h3 class="font-bold mb-2">Multi-Channel Deployment</h3>
                <p>
                  Deploy the same chatbot across websites, mobile apps, WhatsApp, Facebook Messenger, and other platforms with consistent branding and knowledge
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Visual Conversation Builder</h3>
                <p>
                  Drag-and-drop interface for creating complex dialog flows with conditional logic and rich media support (images, buttons, carousels)
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Seamless Human Handoff</h3>
                <p>
                  Automatic escalation to live agents with full conversation history when needed
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Continuous Learning</h3>
                <p>
                  Machine learning algorithms that improve responses based on user interactions and feedback
                </p>
              </li>
            </ul>
          </div>
        </div>`,
      thirdSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              Implementation Process
            </h2>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3 class="font-bold mb-3">Core Features</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>Natural Language Understanding (NLU)</li>
                  <li>Sentiment analysis</li>
                  <li>Multi-language support</li>
                  <li>CRM/Helpdesk integrations</li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold mb-3">Use Cases</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>Customer service automation</li>
                  <li>E-commerce product recommendations</li>
                  <li>Lead qualification</li>
                  <li>IT helpdesk support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>`,
    },
  },
  {
    id: 2,
    title: "Voice AI Agents",
    icon: icon2,
    desc: "Transform call center operations with human-like voice assistants that handle customer calls, appointments, and telemarketing 24/7.",
    slug: "voice-ai-agents",
    seo: {
      title:
        "Voice AI Agents | AI-Powered Sales & Call Center Solutions | KheyaMind AI",
      description:
        "Transform call center operations with human-like voice AI agents. Automate sales calls, customer support, and lead qualification with advanced voice AI.",
      keywords:
        "voice AI agents, AI voice assistants, call center automation, sales automation, voice AI technology",
      canonicalUrl: "https://www.kheyamind.ai/services/voice-ai-agents",
    },
    detailsPage: {
      banner: require("../assets/images/banners/ai-voice-call.webp"),
      img1: require("../assets/images/service-details/ai-voice-call1.webp"),
      img2: require("../assets/images/service-details/ai-voice-call2.webp"),
      img3: require("../assets/images/service-details/ai-voice-call3.webp"),
      firstSection: `
        <div class="space-y-6">
          <div class="space-y-4">
            <h1 class="text-2xl font-bold">
              Natural Voice Conversation Automation
            </h1>
            <p>
              <span class="font-bold text-secondary">KheyaMind AI</span> develops voice AI agents that deliver human-like telephone interactions for customer service, sales, and support operations.
            </p>
            <p>
              Our solutions reduce call center costs by up to 60% while maintaining or improving customer satisfaction scores through 24/7 availability and consistent service quality.
            </p>
          </div>
        </div>`,
      secondSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              Voice Agent Capabilities
            </h2>
            <ul class="space-y-5 list-decimal pl-6">
              <li>
                <h3 class="font-bold mb-2">Natural Conversation Flow</h3>
                <p>
                  Human-like dialog with appropriate pauses, interruptions, and contextual understanding
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Emotion Detection</h3>
                <p>
                  Recognizes caller frustration, urgency, or satisfaction to adjust responses accordingly
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Accent & Noise Tolerance</h3>
                <p>
                  Advanced speech recognition that works with regional accents and background noise
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Payment Processing</h3>
                <p>
                  Secure PCI-compliant payment collection via voice commands
                </p>
              </li>
            </ul>
          </div>
        </div>`,
      thirdSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              Technical Implementation
            </h2>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3 class="font-bold mb-3">Core Components</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>Neural Text-to-Speech (TTS)</li>
                  <li>Automatic Speech Recognition (ASR)</li>
                  <li>Call recording and analytics</li>
                  <li>Telephony system integration</li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold mb-3">Primary Applications</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>Customer service call handling</li>
                  <li>Appointment scheduling</li>
                  <li>Payment reminders</li>
                  <li>Outbound telemarketing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>`,
    },
  },
  {
    id: 3,
    title: "NLP & Custom GPT Solutions",
    icon: icon3,
    desc: "Build domain-specific language AI for semantic search, knowledge management, and intelligent document processing.",
    slug: "nlp-custom-gpt-solutions",
    seo: {
      title:
        "Custom GPT Development | NLP Solutions | Enterprise AI | KheyaMind AI",
      description:
        "Build domain-specific AI with custom GPT solutions. Advanced NLP for document processing, content generation, and intelligent business automation.",
      keywords:
        "custom GPT development, NLP solutions, natural language processing, enterprise AI, document AI, content AI",
      canonicalUrl:
        "https://www.kheyamind.ai/services/nlp-custom-gpt-solutions",
    },
    detailsPage: {
      banner: require("../assets/images/banners/nlp.webp"),
      img1: require("../assets/images/service-details/nlp1.webp"),
      img2: require("../assets/images/service-details/nlp2.webp"),
      img3: require("../assets/images/service-details/nlp3.webp"),
      firstSection: `
        <div class="space-y-6">
          <div class="space-y-4">
            <h1 class="text-2xl font-bold">
              Custom Language AI for Your Business Domain
            </h1>
            <p>
              <span class="font-bold text-secondary">KheyaMind AI</span> develops specialized NLP models and GPT solutions trained on your proprietary data to understand industry-specific terminology and workflows.
            </p>
            <p>
              Our solutions deliver 90%+ accuracy in information retrieval and analysis, transforming unstructured data into actionable business intelligence.
            </p>
          </div>
        </div>`,
      secondSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              NLP & GPT Applications
            </h2>
            <ul class="space-y-5 list-decimal pl-6">
              <li>
                <h3 class="font-bold mb-2">Semantic Search</h3>
                <p>
                  Enterprise search that understands meaning rather than keywords across documents, databases, and APIs
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Knowledge Management</h3>
                <p>
                  AI assistants that answer complex questions by analyzing manuals, SOPs, and historical data
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Document Intelligence</h3>
                <p>
                  Automatic classification, summarization, and data extraction from contracts and reports
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Prompt Engineering</h3>
                <p>
                  Custom interfaces and tools to optimize interactions with foundation models
                </p>
              </li>
            </ul>
          </div>
        </div>`,
      thirdSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              Implementation Approach
            </h2>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3 class="font-bold mb-3">Data Processing</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>Secure data ingestion pipeline</li>
                  <li>Domain-specific vocabulary development</li>
                  <li>Knowledge graph construction</li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold mb-3">Model Features</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>Fine-tuned transformer architectures</li>
                  <li>Explainability layers</li>
                  <li>Continuous learning framework</li>
                </ul>
              </div>
            </div>
          </div>
        </div>`,
    },
  },
  {
    id: 4,
    title: "AI-Powered ERP Tools",
    icon: icon4,
    desc: "Enhance enterprise systems with custom AI modules for demand forecasting, automated procurement, and process optimization.",
    slug: "ai-powered-erp-tools",
    seo: {
      title:
        "AI-Powered ERP Systems | Smart Enterprise Resource Planning | KheyaMind AI",
      description:
        "Enhance enterprise systems with AI-powered ERP tools. Automate procurement, demand forecasting, and process optimization for maximum efficiency.",
      keywords:
        "AI ERP systems, enterprise resource planning, ERP automation, intelligent ERP, business process automation",
      canonicalUrl: "https://www.kheyamind.ai/services/ai-powered-erp-tools",
    },
    detailsPage: {
      banner: require("../assets/images/banners/ai-powered-erp.webp"),
      img1: require("../assets/images/service-details/ai-powered-erp1.webp"),
      img2: require("../assets/images/service-details/ai-powered-erp2.webp"),
      img3: require("../assets/images/service-details/ai-powered-erp3.webp"),
      firstSection: `
        <div class="space-y-6">
          <div class="space-y-4">
            <h1 class="text-2xl font-bold">
              Intelligent Automation for Enterprise Systems
            </h1>
            <p>
              <span class="font-bold text-secondary">KheyaMind AI</span> integrates custom AI modules with your ERP platform to automate complex decision-making and optimize operations.
            </p>
            <p>
              Our solutions deliver measurable efficiency gains within 3-6 months, with typical ROI of 3-5x through reduced costs and improved productivity.
            </p>
          </div>
        </div>`,
      secondSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              AI-ERP Applications
            </h2>
            <ul class="space-y-5 list-decimal pl-6">
              <li>
                <h3 class="font-bold mb-2">Predictive Demand Forecasting</h3>
                <p>
                  Machine learning models that analyze 50+ variables to predict inventory needs with 95% accuracy
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Intelligent Procurement</h3>
                <p>
                  Automated purchase order generation based on consumption patterns and supplier performance
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Anomaly Detection</h3>
                <p>
                  Real-time monitoring of transactions to flag potential errors or fraud
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Process Optimization</h3>
                <p>
                  AI-driven analysis of ERP logs to identify bottlenecks and improvement opportunities
                </p>
              </li>
            </ul>
          </div>
        </div>`,
      thirdSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              Integration Process
            </h2>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3 class="font-bold mb-3">Supported Platforms</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>SAP</li>
                  <li>Oracle</li>
                  <li>Microsoft Dynamics</li>
                  <li>NetSuite</li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold mb-3">Key Features</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>Real-time data pipelines</li>
                  <li>Explainable AI dashboards</li>
                  <li>Role-based access controls</li>
                </ul>
              </div>
            </div>
          </div>
        </div>`,
    },
  },
  {
    id: 5,
    title: "Cloud & DevOps AI",
    icon: icon5,
    desc: "AI-optimized cloud infrastructure and intelligent deployment pipelines for automated scaling and cost efficiency.",
    slug: "cloud-devops-ai",
    seo: {
      title:
        "AI-Optimized Cloud Infrastructure | DevOps Automation | KheyaMind AI",
      description:
        "Deploy AI-optimized cloud infrastructure with intelligent DevOps automation. Streamline deployment pipelines and reduce operational costs efficiently.",
      keywords:
        "cloud DevOps AI, infrastructure automation, cloud optimization, DevOps consulting, AI deployment, cloud migration",
      canonicalUrl: "https://www.kheyamind.ai/services/cloud-devops-ai",
    },
    detailsPage: {
      banner: require("../assets/images/banners/cloud-and-devops.webp"),
      img1: require("../assets/images/service-details/cloud-and-devops1.webp"),
      img2: require("../assets/images/service-details/cloud-and-devops2.webp"),
      img3: require("../assets/images/service-details/cloud-and-devops3.webp"),
      firstSection: `
        <div class="space-y-6">
          <div class="space-y-4">
            <h1 class="text-2xl font-bold">
              Intelligent Cloud Infrastructure
            </h1>
            <p>
              <span class="font-bold text-secondary">KheyaMind AI</span> implements machine learning-powered cloud solutions that automatically optimize performance, security, and costs across your infrastructure.
            </p>
            <p>
              Our AI-enhanced platform reduces cloud costs by 30-60% while improving system reliability and performance across AWS, Azure, and Google Cloud.
            </p>
          </div>
        </div>`,
      secondSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              AI Cloud Management Features
            </h2>
            <ul class="space-y-5 list-decimal pl-6">
              <li>
                <h3 class="font-bold mb-2">Predictive Scaling</h3>
                <p>
                  Anticipate traffic spikes based on historical patterns and real-time monitoring
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Cost Optimization</h3>
                <p>
                  Continuous analysis of cloud spending with automated rightsizing recommendations
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Intelligent CI/CD</h3>
                <p>
                  Self-learning deployment pipelines that optimize test coverage and rollback strategies
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Security Automation</h3>
                <p>
                  AI-powered threat detection across your entire infrastructure
                </p>
              </li>
            </ul>
          </div>
        </div>`,
      thirdSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              Technical Implementation
            </h2>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3 class="font-bold mb-3">Core Technologies</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>Kubernetes with AI-driven autoscaling</li>
                  <li>Infrastructure as Code (Terraform)</li>
                  <li>ML-powered monitoring</li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold mb-3">Key Benefits</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>60-90% faster deployments</li>
                  <li>40-70% reduced cloud waste</li>
                  <li>99.99% uptime SLA</li>
                </ul>
              </div>
            </div>
          </div>
        </div>`,
    },
  },
  {
    id: 6,
    title: "AI Interface Design",
    icon: icon6,
    desc: "Specialized UI/UX for AI applications that makes complex systems intuitive and actionable for end-users.",
    slug: "ai-interface-design",
    seo: {
      title:
        "AI Interface Design | Intelligent UI/UX for AI Applications | KheyaMind AI",
      description:
        "Create intuitive AI interfaces with specialized UI/UX design. Build user-friendly AI applications that deliver exceptional user experiences.",
      keywords:
        "AI interface design, AI UX design, intelligent UI, AI application design, user experience AI, conversational UI",
      canonicalUrl: "https://www.kheyamind.ai/services/ai-interface-design",
    },
    detailsPage: {
      banner: require("../assets/images/banners/uiux.webp"),
      img1: require("../assets/images/service-details/uiux1.webp"),
      img2: require("../assets/images/service-details/uiux2.webp"),
      img3: require("../assets/images/service-details/uiux3.webp"),
      firstSection: `
        <div class="space-y-6">
          <div class="space-y-4">
            <h1 class="text-2xl font-bold">
              Human-Centered Design for AI Systems
            </h1>
            <p>
              <span class="font-bold text-secondary">KheyaMind AI</span> creates intuitive interfaces that bridge the gap between complex AI functionality and user-friendly experiences.
            </p>
            <p>
              Our designs achieve 85%+ user adoption rates by making advanced AI accessible to non-technical users while maintaining system power.
            </p>
          </div>
        </div>`,
      secondSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              Design Principles
            </h2>
            <ul class="space-y-5 list-decimal pl-6">
              <li>
                <h3 class="font-bold mb-2">Explainable AI</h3>
                <p>
                  Visualizations that show how the AI reached its conclusions to build trust
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Controlled Automation</h3>
                <p>
                  Clear boundaries between AI suggestions and human decisions
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Progressive Disclosure</h3>
                <p>
                  Surface complexity only when needed, with beginner/advanced modes
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Feedback Loops</h3>
                <p>
                  Mechanisms for users to correct AI mistakes and improve accuracy
                </p>
              </li>
            </ul>
          </div>
        </div>`,
      thirdSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              Deliverables
            </h2>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3 class="font-bold mb-3">Design Assets</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>AI interaction pattern library</li>
                  <li>High-fidelity prototypes</li>
                  <li>User journey maps</li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold mb-3">Specializations</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>Data visualization for ML outputs</li>
                  <li>Uncertainty communication</li>
                  <li>Bias mitigation interfaces</li>
                </ul>
              </div>
            </div>
          </div>
        </div>`,
    },
  },
  {
    id: 7,
    title: "Mobile App Development",
    icon: icon7,
    desc: "Build cross-platform mobile applications with embedded AI for real estate, HR, and productivity solutions.",
    slug: "mobile-app-development",
    seo: {
      title:
        "AI-Powered Mobile App Development | iOS & Android Apps | KheyaMind AI",
      description:
        "Build intelligent mobile applications with embedded AI. Custom iOS and Android apps for real estate, HR, and productivity solutions with AI features.",
      keywords:
        "AI mobile app development, intelligent mobile apps, iOS app development, Android app development, AI-powered apps",
      canonicalUrl: "https://www.kheyamind.ai/services/mobile-app-development",
    },
    detailsPage: {
      banner: require("../assets/images/banners/app-development.webp"),
      img1: require("../assets/images/service-details/app-dev-1.webp"),
      img2: require("../assets/images/service-details/app-dev-2.webp"),
      img3: require("../assets/images/service-details/app-dev-3.webp"),
      firstSection: `
        <div class="space-y-6">
          <div class="space-y-4">
            <h1 class="text-2xl font-bold">
              On-Device AI for Mobile Experiences
            </h1>
            <p>
              <span class="font-bold text-secondary">KheyaMind AI</span> develops cross-platform mobile apps with embedded machine learning that delivers fast, private, and responsive AI experiences.
            </p>
            <p>
              Our solutions leverage Flutter framework and native ML tools to create apps that are 60% smaller and 3x faster than typical AI-powered mobile applications.
            </p>
          </div>
        </div>`,
      secondSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              Mobile AI Applications
            </h2>
            <ul class="space-y-5 list-decimal pl-6">
              <li>
                <h3 class="font-bold mb-2">Real Estate Vision</h3>
                <p>
                  Property valuation via camera scan and virtual staging with computer vision
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">HR Assistants</h3>
                <p>
                  AI-powered candidate screening and employee onboarding tools
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Productivity Boosters</h3>
                <p>
                  Smart task prioritization and meeting note summarization
                </p>
              </li>
              <li>
                <h3 class="font-bold mb-2">Offline Capabilities</h3>
                <p>
                  Core AI functions work without internet connectivity
                </p>
              </li>
            </ul>
          </div>
        </div>`,
      thirdSection: `
        <div class="py-6">
          <div class="space-y-6">
            <h2 class="text-xl font-bold">
              Technical Implementation
            </h2>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3 class="font-bold mb-3">Core Stack</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>Flutter for cross-platform development</li>
                  <li>TensorFlow Lite and Core ML</li>
                  <li>Custom model optimization</li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold mb-3">Performance Features</h3>
                <ul class="space-y-3 list-disc pl-6">
                  <li>Adaptive model downloading</li>
                  <li>Battery-efficient processing</li>
                  <li>Hardware acceleration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>`,
    },
  },
];
