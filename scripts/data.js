// Resume Data
const resumeData = {
    navigation: [
        { id: 'about', text: 'About' },
        {id:'education', text:'Education'},
        { id: 'experience', text: 'Experience' },
        { id: 'projects', text: 'Projects' },
        { id: 'skills', text: 'Skills' },
        { id: 'contact', text: 'Contact' }
    ],
    education:[{
        school: 'African Leadership University (ALU)',
        degree: 'Bachelor of Science in Software Engineering',
        period: '2024 - Present',
        shortDescription: 'Specialized in Software Development and Cybersecurity',
        fullDescription: `• Engaged in hands-on software engineering projects
                          • Developing skills in cybersecurity operations
                          • Participating in industry-driven hackathons and competitions
                          • Collaborating on digital literacy initiatives`
    },
    {
        school: 'Forward Edge Consulting Ltd.',
        degree: 'Cybersecurity Certification',
        period: '2024',
        shortDescription: 'Advanced training in cybersecurity operations',
        fullDescription: `• Completed a rigorous cybersecurity bootcamp
                          • Received an elite recognition certificate
                          • Gained hands-on experience in penetration testing and risk management
                          • Worked on security governance frameworks`
    },
    {
        school: 'ES Sancta Maria Karambo',
        degree: 'A2 Diploma in Mathematics, Computer Science, and Economics',
        period: '2019 - 2023',
        shortDescription: 'High school diploma with a focus on technology and economics',
        fullDescription: `• Specialized in computer science and digital literacy
                          • Led coding initiatives and student IT projects
                          • Developed a strong foundation in mathematics and problem-solving`
    },
    {
        school: 'ES Sancta Maria Karambo',
        degree: 'O-Level Certificate',
        period: '2016 - 2019',
        shortDescription: 'General secondary education',
        fullDescription: `• Excelled in STEM subjects
                          • Built foundational knowledge in programming`
    },
    {
        school: 'Academy De La Salle Byumba',
        degree: 'Primary Education',
        period: '2010 - 2016',
        shortDescription: 'Primary education with a focus on foundational STEM skills',
        fullDescription: `• Developed early interest in technology and computing
                          • Built problem-solving and analytical thinking skills`
    }
],
    
    profile: {
        name: 'Emmanuel NSABAGASANI',
        title: 'Software Engineer | Cybersecurity Analyst | IT Educator',
        profileImage: 'images/profile.png',
        backgroundImage: 'images/bgprofile.jpg',
        shortBio: 'Software engineer and cybersecurity analyst passionate about building secure and scalable digital solutions.',
        fullBio: `I am a dedicated Software Engineer and Cybersecurity Analyst with a strong passion for building secure, scalable, and efficient digital solutions. 
                  With experience in full-stack development, cybersecurity operations, and ICT education, I have led projects that bridge the gap between theoretical 
                  and practical technology applications. As the founder of Coding with Digital Experience[CODE Club], I am committed to fostering 
                  digital literacy and innovation. My expertise spans web development, security operations, software architecture, and IT education, making me a 
                  versatile tech professional capable of delivering impactful solutions.`
    },
    
    experience: [
        {
            title: 'Security Analyst Intern',
            company: 'Forward Edge Consulting Ltd.',
            period: 'Sep 2024 - Mar 2025',
            shortDescription: 'Developing and securing digital systems through vulnerability assessments and software solutions.',
            fullDescription: `• Conducting vulnerability assessments and penetration testing on enterprise applications
                            • Developing secure software solutions to mitigate cybersecurity risks
                            • Implementing security best practices in software development
                            • Assisting in security operations, risk analysis, and compliance measures`
        },
        {
            title: 'IT & Computer Science Teacher',
            company: 'GS Byumba Inyange',
            period: '2024',
            shortDescription: 'Teaching Computer Science and ICT concepts to high school students.',
            fullDescription: `• Designing and delivering courses on programming and other computer science consepts
                            • Guiding students through hands-on projects in software development
                            • Guiding  S6 students to prepare and be ready for National Exams
                            • Organizing coding competitions and ICT awareness programs`
        },
        {
            title: 'Founder of CODE Club',
            company: 'CODE Club',
            period: '2024 - Present',
            shortDescription: 'Leading an initiative to enhance ICT education and digital literacy.',
            fullDescription: `
                            • Organizing coding and digital skills competitions
                            • Collaborating with stakeholders to improve ICT education in schools`
        },
       
        {
            title: 'Cybersecurity Bootcamp Team Leader',
            company: 'Forward Edge Cybersecurity Bootcamp',
            period: '2024',
            shortDescription: 'Led a cybersecurity group projects, gaining expertise in security operations and risk management.',
            fullDescription: `• Conducted penetration testing and security risk assessments
                            • Earned an exceptional certificate for outstanding leadership`
        }
    ],
    projects: [
  {
    title: 'Movie Streaming Website',
    shortDescription: 'A fully-responsive movie streaming UI built with vanilla HTML, CSS & JavaScript.',
    fullDescription: `• Crafted a dynamic hero banner and carousels without any frameworks  
• Implemented responsive layouts using CSS Grid & Flexbox  
• Built a custom slider, sticky header, and multi-page navigation purely in JS  
• Enhanced performance by lazy-loading images and optimizing DOM updates`,
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    link: 'https://emmanuel-ns.github.io/web_design/'
  },
  {
    title: 'Health Tracker System',
    shortDescription: 'I have Contributed to this Python menu-driven health tracker with user auth and MySQL integration.',
    fullDescription: `• Designed a CLI interface for user registration & login with data validation  
• Integrated MySQL to store user profiles, health logs, and doctor contacts  
• Provided health tips, appointment booking, and progress reports  
• Ensured security by hashing passwords and sanitizing inputs`,
    technologies: ['Python', 'MySQL'],
    link: 'https://github.com/Emmanuel-NS/Community-Health_Tracker-System'
  },
  {
    title: 'Emm3 URL Scanner',
    shortDescription: 'A web app leveraging the VirusTotal API to scan URLs for potential threats.',
    fullDescription: `• Integrated VirusTotal API to submit and retrieve scan reports  
• Built a clean, user-friendly interface with instant feedback  
• Parsed API responses to highlight risk indicators and domains  
• Configured and managed server deployment (NGINX/Node.js) with HTTPS encryption  
• Ensured high performance and reliability via load balancing and caching strategies  
• Learned best practices for RESTful API consumption, error handling, and web security`,
    technologies: [
      'JavaScript',
      'HTML',
      'CSS',
      'VirusTotal API',
      'Node.js',
      'NGINX',
      'HAproxy',
      'HTTPS/ certbot'
    ],
    link: 'http://www.emm3.tech/' 
  },
  {
    title: 'FARUMASI – E-Pharmacy Solution',
    shortDescription: 'A digital platform to improve rural access to medicine through online pharmacy services.',
    fullDescription: `• Collaborated in a team to design and implement an e-pharmacy platform  
• Developed system architecture focusing on scalability and security  
• Designed user flow for ordering, payment, and delivery tracking  
• Presented and pitched the solution in class projects and competitions  
• Focused on solving real community challenges through tech innovation`,
    technologies: ['Node.js', 'JavaScript', 'React', 'SQL', 'HTML/CSS'],
    link: 'https://farumasi.vercel.app/home'
  },
  {
    title: 'MoMo Dashboard',
    shortDescription: 'A functional mobile money transaction dashboard built with modern web technologies.',
    fullDescription: `• Recreated a responsive user dashboard for mobile money transactions  
• Designed clean UI components and implemented data-driven views  
• Integrated responsive design principles for multi-device compatibility  
• Practiced secure coding standards in handling sensitive transaction data  
• Gained deeper experience in Node.js, React, and state management`,
    technologies: ['Node.js', 'React', 'HTML', 'CSS', 'Tailwind CSS'],
    link: 'https://github.com/Emmanuel-NS/MoMo-Dashboard'
  }
],

skills: [
  'Software Development', 'Cybersecurity', 'Full-Stack Development', 'Threat Intelligence',
  'Penetration Testing', 'Secure Coding Practices', 'Risk Management', 'Linux',
  'GitHub & Version Control', 'Python', 'JavaScript', 'React', 
  'Node.js', 'Django', 'SQL & NoSQL Databases', 'Project Management'
],
    socialMedia: {
        github: 'https://github.com/',
        linkedin: 'https://linkedin.com/in/emmanuel-nsabagasani',
        twitter: 'https://x.com/ENsabagasa56660',
        email: 'e.nsabagasa@alustudent.com'
      }
    
  };