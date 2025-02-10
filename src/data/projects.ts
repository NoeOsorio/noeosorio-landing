import { Project } from '../types/portfolio'

export const projects: Project[] = [
  {
    id: 'osmind',
    title: "Osmind EHR",
    description: "Enhanced mental health data management and telemedicine app UX using React and Node.js.",
    role: "Software Engineer",
    company: "Osmind",
    companyLink: "https://www.osmind.org/",
    technologies: [
      { 
        name: "React", 
        icon: "FaReact",
        category: "frontend"
      },
      { 
        name: "Node.js", 
        icon: "FaNodeJs",
        category: "backend"
      },
      { 
        name: "Postgres", 
        icon: "FaDatabase",
        category: "database"
      },
      { 
        name: "AWS", 
        icon: "FaAws",
        category: "cloud"
      }
    ],
    images: [
      "https://assets-global.website-files.com/624378a4ca64f003be92dd58/6259f0cf05b044f05181fcbb_Logo.svg"
    ],
    backgroundColor: "#F5F5F5",
    keyPoints: [
      {
        title: "Web App Development",
        content: "Led the development of a provider-centric web app using React and TypeScript. Leveraged AWS serverless APIs to deliver a scalable, secure, and efficient solution for mental health professionals."
      },
      {
        title: "Mobile App Feature Lead",
        content: "Spearheaded the design and launch of a revolutionary self-scheduling feature using React Native, empowering users to manage their appointments directly from their mobile devices."
      },
      {
        title: "Regulatory Adherence",
        content: "Ensured strict HIPAA compliance in all aspects of development, safeguarding patient data and maintaining legal standards."
      },
      {
        title: "Financial Processing Enhancement",
        content: "Optimized financial processes by automating the generation of invoices and superbills, streamlining insurance claims for providers."
      }
    ],
    timeline: [
      {
        title: "Project Kickoff",
        description: "Started the backend development using Node.js and AWS, with a focus on scalability and security.",
        date: "July 2022"
      },
      {
        title: "Mobile App Self-scheduling Feature",
        description: "Led the launch of the mobile app self-scheduling feature, allowing users to book appointments easily.",
        date: "December 2022"
      }
    ],
    category: 'web',
    priority: 1,
    featured: true,
    links: {
      website: 'https://www.osmind.org',
      demo: 'https://demo.osmind.org'
    },
    confidential: true,
    resources: {
      logo: "https://assets-global.website-files.com/624378a4ca64f003be92dd58/6259f0cf05b044f05181fcbb_Logo.svg",
      testimonial: {
        quote: "Osmind has transformed how we deliver mental health care",
        author: "Dr. Sarah Johnson",
        role: "Chief Medical Officer"
      }
    }
  },
  {
    id: 'clip',
    title: "Logistics Team",
    description: "Integrated Amazon Seller API through microservices, focusing on automated builds and CI for scalability.",
    role: "Software Engineer",
    company: "Clip",
    companyLink: "https://www.clip.mx/",
    confidential: true,
    technologies: [
      { 
        name: "React", 
        icon: "FaReact",
        category: "frontend"
      },
      { 
        name: "Node.js", 
        icon: "FaNodeJs",
        category: "backend"
      },
      { 
        name: "Postgres", 
        icon: "FaDatabase",
        category: "database"
      },
      { 
        name: "AWS", 
        icon: "FaAws",
        category: "cloud"
      }
    ],
    images: [
      "https://firebasestorage.googleapis.com/v0/b/noeosorio-web.appspot.com/o/images%2Fclip.png?alt=media&token=52fdeb88-61d3-438c-8d42-f3df055632a0"
    ],
    backgroundColor: "#fc4c01",
    keyPoints: [
      {
        title: "Microservices Integration",
        content: "Developed and deployed microservices integrating the Amazon Seller API, enabling a more scalable and efficient logistics process."
      },
      {
        title: "Automated Build Pipelines",
        content: "Established continuous integration (CI) and continuous delivery (CD) pipelines using AWS services and Jenkins."
      },
      {
        title: "Cloud Infrastructure Management",
        content: "Utilized AWS CloudFormation to manage the entire infrastructure, ensuring smooth scalability."
      },
      {
        title: "TypeScript & Clean Architecture",
        content: "Implemented Clean Architecture principles using TypeScript, ensuring maintainability and modularity."
      }
    ],
    timeline: [
      {
        title: "Microservices Integration",
        description: "Completed integration of Amazon Seller API into Clip's logistics operations.",
        date: "January 2022"
      },
      {
        title: "Automated Deployment Pipeline",
        description: "Launched the automated build and deployment pipeline.",
        date: "April 2022"
      }
    ],
    category: 'web',
    priority: 2,
    featured: true,
    links: {
      website: 'https://www.clip.mx'
    },
    resources: {
      logo: "https://firebasestorage.googleapis.com/v0/b/noeosorio-web.appspot.com/o/images%2Fclip.png?alt=media&token=52fdeb88-61d3-438c-8d42-f3df055632a0"
    }
  },
  {
    id: 'fstack',
    title: "Frontend Department",
    description: "Led frontend development and mentoring at Fstack, optimizing team and project outcomes through Agile and React.js.",
    role: "Software Engineer",
    company: "Full/Stack",
    companyLink: "https://fstack.tech/index",
    technologies: [
      { 
        name: "React", 
        icon: "FaReact",
        category: "frontend"
      },
      { 
        name: "Node.js", 
        icon: "FaNodeJs",
        category: "backend"
      },
      { 
        name: "Flutter", 
        icon: "SiFlutter",
        category: "mobile"
      },
      { 
        name: "AWS", 
        icon: "FaAws",
        category: "cloud"
      }
    ],
    images: ["https://fstack.tech/_astro/logo_blanco.DxPX-sKd_Z2drN1k.svg"],
    backgroundColor: "#9E9E9E",
    keyPoints: [
      {
        title: "Optimized Web and Mobile Solutions",
        content: "Led the development of multiple web and mobile apps using React.js, Flutter, and Redux, significantly improving performance and scalability."
      },
      {
        title: "Mentorship and Cloud Training",
        content: "Mentored and trained interns on cloud technologies, system design, and clean architecture, boosting team productivity and technical skills."
      },
      {
        title: "Agile Performance Optimization",
        content: "Utilized Agile methodologies and KPIs to measure and optimize team performance, enhancing resource management and project delivery speed."
      },
      {
        title: "Cross-functional Collaboration",
        content: "Worked closely with backend developers and designers to ensure alignment between business requirements and frontend implementation, fostering a productive, transparent environment."
      }
    ],
    timeline: [
      {
        title: "Joined Fstack as Lead Developer",
        description: "Started leading the frontend team, focusing on optimization and scalable solutions.",
        date: "August 2021"
      },
      {
        title: "Development of Senior Care App",
        description: "Led the development of a senior care app using Flutter, focusing on mobile optimization.",
        date: "March 2022"
      }
    ],
    category: 'web',
    priority: 3,
    featured: true,
    links: {
      website: 'https://fstack.tech'
    },
    confidential: true,
    resources: {
      logo: "https://fstack.tech/_astro/logo_blanco.DxPX-sKd_Z2drN1k.svg",
      testimonial: {
        quote: "Exceptional leadership in modernizing our development practices",
        author: "Carlos Martinez",
        role: "CTO"
      }
    }
  },
  {
    id: 'finloop',
    title: "Web Admin",
    description: "Developed the frontend for Finloop, focusing on UI/UX for a lending and borrowing platform.",
    role: "Frontend Developer",
    company: "Finloop",
    companyLink: "https://finloop.com.mx",
    technologies: [
      { 
        name: "React", 
        icon: "FaReact",
        category: "frontend"
      },
      { 
        name: "Node.js", 
        icon: "FaNodeJs",
        category: "backend"
      },
      { 
        name: "MongoDB", 
        icon: "FaDatabase",
        category: "database"
      },
      { 
        name: "AWS", 
        icon: "FaAws",
        category: "cloud"
      }
    ],
    images: [
      "https://finloop.com.mx/_next/static/media/finloop.5623e2d2.svg"
    ],
    backgroundColor: "#492eb0",
    keyPoints: [
      {
        title: "Frontend Optimization",
        content: "Led the design and development of the user interface, improving user interaction and navigation across the platform. Employed best practices in React to ensure the app is responsive and accessible."
      },
      {
        title: "REST API Integration",
        content: "Worked closely with backend engineers to integrate RESTful APIs that connected users to real-time data. This enhanced the platform's capability for seamless financial transactions."
      },
      {
        title: "Modernized Codebases",
        content: "Refactored outdated code, bringing it up to modern standards with clean architecture principles. This increased performance and made future development more efficient."
      },
      {
        title: "Agile Development",
        content: "Collaborated in an Agile environment to quickly deliver high-quality updates, including new features and performance optimizations, reducing overall development time."
      }
    ],
    timeline: [
      {
        title: "Frontend Redesign",
        description: "Initiated a full redesign of the UI to improve user experience and increase engagement on the platform.",
        date: "October 2020"
      },
      {
        title: "Backend API Integration",
        description: "Successfully integrated multiple APIs for real-time financial data syncing, enhancing platform reliability.",
        date: "January 2021"
      }
    ],
    category: 'web',
    priority: 4,
    featured: false,
    links: {
      website: 'https://finloop.com.mx'
    },
    confidential: true,
    resources: {
      logo: "https://finloop.com.mx/_next/static/media/finloop.5623e2d2.svg"
    }
  },
  {
    id: 'voztour',
    title: "VozTour",
    description: "Developed an interactive tour guide app using Flutter and Firebase, improving performance and user experience.",
    role: "Project Leader",
    company: "SmartKode",
    companyLink: "https://www.smartkode.mx/",
    technologies: [
      { 
        name: "Flutter", 
        icon: "SiFlutter",
        category: "mobile"
      },
      { 
        name: "Firebase", 
        icon: "SiFirebase",
        category: "cloud"
      },
      { 
        name: "Node.js", 
        icon: "FaNodeJs",
        category: "backend"
      },
      { 
        name: "Google Cloud", 
        icon: "FaAws",
        category: "cloud"
      }
    ],
    images: [
      "https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/b2/89/9e/b2899e01-ca5c-3ac7-5152-faad7fe1eda9/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/230x0w.webp"
    ],
    backgroundColor: "#c850ad",
    keyPoints: [
      {
        title: "Interactive UX",
        content: "Led the design and development of the app's interactive tour features. Enhanced the user experience by making real-time data about each tour destination accessible at a touch."
      },
      {
        title: "Efficient Data Management",
        content: "Integrated Firebase to handle real-time data management, ensuring users received up-to-date information about tours and destinations. This improved the overall responsiveness of the app."
      },
      {
        title: "Cross-Platform Support",
        content: "Ensured smooth performance across iOS and Android platforms, offering a consistent experience for all users. Optimized the app for low-bandwidth environments, making it reliable even in remote areas."
      },
      {
        title: "Scalable Backend Solutions",
        content: "Leveraged Google Cloud for scalable backend processes, enabling the app to handle a growing number of users without compromising on performance."
      }
    ],
    timeline: [
      {
        title: "App Development Kickoff",
        description: "Started development on VozTour with a focus on interactive features and real-time data updates.",
        date: "October 2019"
      },
      {
        title: "App Launch",
        description: "Released the VozTour app, providing users with an engaging and informative tour guide experience.",
        date: "February 2020"
      }
    ],
    category: 'mobile',
    priority: 5,
    featured: false,
    links: {
      website: 'https://www.smartkode.mx',
      appStore: 'https://apps.apple.com/voztour',
      playStore: 'https://play.google.com/store/voztour'
    },
    confidential: true,
    resources: {
      logo: "https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/b2/89/9e/b2899e01-ca5c-3ac7-5152-faad7fe1eda9/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/230x0w.webp"
    }
  },
  {
    id: 'appgua',
    title: "Appgua",
    description: "Led the transition from Ionic to Flutter for Appgua, improving architecture for a water management system.",
    role: "Project Leader",
    company: "SmartKode",
    companyLink: "https://www.smartkode.mx/",
    technologies: [
      { 
        name: "Flutter", 
        icon: "SiFlutter",
        category: "mobile"
      },
      { 
        name: "Firebase", 
        icon: "SiFirebase",
        category: "cloud"
      },
      { 
        name: "Node.js", 
        icon: "FaNodeJs",
        category: "backend"
      },
      { 
        name: "Google Cloud", 
        icon: "FaAws",
        category: "cloud"
      }
    ],
    images: ["https://appgua.com.mx/logos/logo.webp"],
    backgroundColor: "#13AAE0",
    keyPoints: [
      {
        title: "Transition to Flutter for Speed and Efficiency",
        content: "Migrated the app from Ionic to Flutter, significantly improving development speed and UI performance."
      },
      {
        title: "Water Delivery App Success",
        content: "Developed a user-friendly app that simplified the process of buying water gallons, resulting in increased sales and customer engagement."
      },
      {
        title: "State Management with BloC Architecture",
        content: "Implemented the BloC architecture for smooth state management, ensuring the app performed efficiently even with complex animations."
      },
      {
        title: "Cloud Integration for Real-time Data",
        content: "Used Google Cloud services for real-time data syncing, integrating the backend with Alexa skills to enhance user experience."
      }
    ],
    timeline: [
      {
        title: "Migration from Ionic to Flutter",
        description: "Successfully transitioned the app to Flutter, improving UI/UX and reducing development time.",
        date: "February 2020"
      },
      {
        title: "Integration with Alexa Skills",
        description: "Enabled users to order water via Alexa skills by integrating Google Cloud Functions.",
        date: "June 2020"
      }
    ],
    category: 'mobile',
    priority: 6,
    featured: false,
    links: {
      website: 'https://appgua.com.mx',
      appStore: 'https://apps.apple.com/appgua',
      playStore: 'https://play.google.com/store/appgua'
    },
    confidential: true,
    resources: {
      logo: "https://appgua.com.mx/logos/logo.webp",
      testimonial: {
        quote: "Appgua revolutionized our water delivery service",
        author: "Luis Ramírez",
        role: "Operations Director"
      }
    }
  },
  {
    id: 'nihongoFlip',
    title: "Japanese Learning App",
    description: "A React Native app for learning languages using Anki-style flashcards, providing an interactive learning experience.",
    role: "Mobile Developer",
    company: "Personal",
    companyLink: "https://github.com/NoeOsorio/NihongoFlip",
    technologies: [
      { name: "React Native", icon: "FaReact", category: "mobile" },
      { name: "Firebase", icon: "SiFirebase", category: "cloud" },
      { name: "Expo", icon: "SiExpo", category: "mobile" }
    ],
    images: [
      "https://github.com/NoeOsorio/NihongoFlip/raw/main/assets/ss1.png",
      "https://github.com/NoeOsorio/NihongoFlip/raw/main/assets/ss3.png"
    ],
    backgroundColor: "#185463",
    keyPoints: [
      {
        title: "Optimized Flashcard System",
        content: "Developed a highly interactive flashcard-based learning system utilizing Anki-style spaced repetition, which improves retention and understanding of Japanese vocabulary. This innovative solution allows users to track their progress across different levels of difficulty, enhancing the learning experience."
      },
      {
        title: "Firebase Integration",
        content: "Seamlessly integrated Firebase Firestore to manage and synchronize user data, offering a reliable and scalable backend solution. This ensures real-time updates across devices, improving user engagement and data security while maintaining low latency for a smooth user experience."
      },
      {
        title: "Cross-platform Compatibility",
        content: "Leveraged Expo to deploy the app across both iOS and Android, ensuring consistent performance and UX. This cross-platform functionality expanded the app's reach, providing seamless updates and uniform experiences across different devices without compromising performance."
      },
      {
        title: "User Feedback Implementation",
        content: "Implemented direct feedback loops with users, iterating quickly to improve UX. Enhanced user navigation, responsiveness, and app stability by addressing common pain points identified through feedback, resulting in a higher user satisfaction rate and better app reviews."
      }
    ],
    timeline: [
      {
        title: "Project Kickoff",
        description: "Started the project by laying the foundation with React Native, Firebase, and Expo to ensure scalability and smooth performance.",
        date: "January 2021"
      },
      {
        title: "Beta Launch",
        description: "Released the beta version with core learning features, focusing on delivering interactive flashcards and tracking user progress.",
        date: "April 2021"
      }
    ],
    category: 'mobile',
    priority: 7,
    featured: false,
    links: {
      github: 'https://github.com/NoeOsorio/NihongoFlip'
    },
    resources: {
      logo: "https://github.com/NoeOsorio/NihongoFlip/raw/main/assets/icon.png",
      screenshots: [
        "https://github.com/NoeOsorio/NihongoFlip/raw/main/assets/ss1.png",
        "https://github.com/NoeOsorio/NihongoFlip/raw/main/assets/ss3.png"
      ]
    }
  },
  {
    id: 'drgravili',
    title: "Medical Appointment Manager",
    description: "A Flutter-based health appointment management app, focusing on improving reliability through BLoC architecture.",
    role: "Mobile Developer",
    company: "Personal",
    companyLink: "https://noeosorio.com/",
    technologies: [
      { name: "Flutter", icon: "SiFlutter", category: "mobile" },
      { name: "Firebase", icon: "SiFirebase", category: "cloud" },
      { name: "Node.js", icon: "FaNodeJs", category: "backend" },
      { name: "Google Cloud", icon: "FaAws", category: "cloud" }
    ],
    images: [
      "https://play-lh.googleusercontent.com/0eQVNR5fnbzfrXhcmb3mXQgwUj5TmLOXfbbJ8bygoM4mWp8fJp4_rRdDNqlEPwSsIw=s360-rw"
    ],
    backgroundColor: "#185463",
    keyPoints: [
      {
        title: "BLoC Architecture Implementation",
        content: "Applied BLoC (Business Logic Component) architecture to effectively manage app state, ensuring smooth scalability and high performance. This structure was crucial in enhancing the stability of appointment scheduling systems while reducing overall code complexity and improving maintainability."
      },
      {
        title: "Firebase Integration for Real-time Data",
        content: "Utilized Firebase Firestore to provide real-time synchronization for appointments, allowing both patients and doctors to interact with live data. This real-time system increased user engagement and streamlined the scheduling process, making appointment management more efficient."
      },
      {
        title: "Enhanced User Experience",
        content: "Focused on developing an intuitive user interface with easy navigation, ensuring that patients and medical staff can manage appointments with ease. The integration of user-friendly features like appointment reminders via push notifications greatly improved patient satisfaction."
      },
      {
        title: "Multi-platform Support",
        content: "Built the app to support both iOS and Android platforms seamlessly, leveraging Flutter's cross-platform capabilities. This allowed for cost-efficient development while maintaining a native-like performance across devices, ensuring a smooth and consistent user experience."
      }
    ],
    timeline: [
      {
        title: "Initial Development",
        description: "Designed the core features for the app using Flutter and Firebase for real-time data management.",
        date: "May 2020"
      },
      {
        title: "App Launch",
        description: "Launched the first version of the app, allowing patients to book, reschedule, and manage medical appointments with ease.",
        date: "September 2020"
      }
    ],
    category: 'mobile',
    priority: 8,
    featured: false,
    links: {
      website: 'https://noeosorio.com',
      playStore: 'https://play.google.com/store/apps/details?id=com.drgravili'
    },
    confidential: true,
    resources: {
      logo: "https://play-lh.googleusercontent.com/0eQVNR5fnbzfrXhcmb3mXQgwUj5TmLOXfbbJ8bygoM4mWp8fJp4_rRdDNqlEPwSsIw=s360-rw"
    }
  }
]

export const featuredProjects = projects.filter(p => p.featured).sort((a, b) => b.priority - a.priority)
export const workProjects = projects.filter(p => p.company !== 'Personal')
export const personalProjects = projects.filter(p => p.company === 'Personal')

export default projects 