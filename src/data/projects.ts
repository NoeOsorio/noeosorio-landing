import { Project } from '../types/portfolio'

export const projects: { [key: string]: Project } = {
  osmind: {
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
    resources: {
      logo: "https://assets-global.website-files.com/624378a4ca64f003be92dd58/6259f0cf05b044f05181fcbb_Logo.svg",
      screenshots: [
        "https://placehold.co/1920x1080/2563eb/ffffff?text=Dashboard+View",
        "https://placehold.co/1920x1080/2563eb/ffffff?text=Patient+Records",
        "https://placehold.co/1920x1080/2563eb/ffffff?text=Scheduling+Interface"
      ],
      testimonial: {
        quote: "Osmind has transformed how we deliver mental health care",
        author: "Dr. Sarah Johnson",
        role: "Chief Medical Officer"
      }
    }
  },
  clip: {
    title: "Logistics Team",
    description: "Integrated Amazon Seller API through microservices, focusing on automated builds and CI for scalability.",
    role: "Software Engineer",
    company: "Clip",
    companyLink: "https://www.clip.mx/",
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
      logo: "https://firebasestorage.googleapis.com/v0/b/noeosorio-web.appspot.com/o/images%2Fclip.png?alt=media&token=52fdeb88-61d3-438c-8d42-f3df055632a0",
      screenshots: [
        "https://placehold.co/1920x1080/fc4c01/ffffff?text=Logistics+Dashboard",
        "https://placehold.co/1920x1080/fc4c01/ffffff?text=Order+Management",
        "https://placehold.co/1920x1080/fc4c01/ffffff?text=Analytics+View"
      ]
    }
  },
  fstack: {
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
    resources: {
      logo: "https://fstack.tech/_astro/logo_blanco.DxPX-sKd_Z2drN1k.svg",
      screenshots: [
        "https://example.com/fstack-projects.png"
      ],
      testimonial: {
        quote: "Exceptional leadership in modernizing our development practices",
        author: "Carlos Martinez",
        role: "CTO"
      }
    }
  },
  finloop: {
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
    featured: true,
    links: {
      website: 'https://finloop.com.mx'
    },
    resources: {
      logo: "https://finloop.com.mx/_next/static/media/finloop.5623e2d2.svg",
      screenshots: [
        "https://placehold.co/1920x1080/492eb0/ffffff?text=Financial+Dashboard",
        "https://placehold.co/1920x1080/492eb0/ffffff?text=Transaction+History",
        "https://placehold.co/1920x1080/492eb0/ffffff?text=User+Management"
      ]
    }
  },
  voztour: {
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
    featured: true,
    links: {
      website: 'https://www.smartkode.mx',
      appStore: 'https://apps.apple.com/voztour',
      playStore: 'https://play.google.com/store/voztour'
    },
    resources: {
      logo: "https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/b2/89/9e/b2899e01-ca5c-3ac7-5152-faad7fe1eda9/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/230x0w.webp",
      screenshots: [
        "https://example.com/voztour-app1.png",
        "https://example.com/voztour-app2.png"
      ],
      video: "https://example.com/voztour-demo.mp4"
    }
  },
  appgua: {
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
    featured: true,
    links: {
      website: 'https://appgua.com.mx',
      appStore: 'https://apps.apple.com/appgua',
      playStore: 'https://play.google.com/store/appgua'
    },
    resources: {
      logo: "https://appgua.com.mx/logos/logo.webp",
      screenshots: [
        "https://example.com/appgua-screens.png"
      ],
      testimonial: {
        quote: "Appgua revolutionized our water delivery service",
        author: "Luis Ramírez",
        role: "Operations Director"
      }
    }
  }
}

export const featuredProjects = [
  projects.osmind,
  projects.clip,
  projects.fstack,
  projects.finloop,
  projects.voztour,
  projects.appgua
]

export default projects 