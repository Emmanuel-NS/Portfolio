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
                  and practical technology applications. As the founder and leader of Coding with Digital Experience[CODE Club], I am committed to fostering 
                  digital literacy and innovation. My expertise spans web development, security operations, software architecture, and IT education, making me a 
                  versatile tech professional capable of delivering impactful solutions.`
    },
    
    experience: [
        {
            title: 'Software Engineer & Security Analyst Intern',
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
            title: 'Founder & Lead Developer',
            company: 'CODE Club',
            period: '2024 - Present',
            shortDescription: 'Leading an initiative to enhance ICT education and digital literacy in Rwanda.',
            fullDescription: `• Developing software platforms to facilitate digital learning
                            • Organizing coding and digital skills competitions
                            • Collaborating with stakeholders to improve ICT education in schools`
        },
        {
            title: 'Software Engineer (Freelance)',
            company: 'Self-Employed',
            period: '2023 - Present',
            shortDescription: 'Developing web applications and software solutions for businesses and individuals.',
            fullDescription: `• Building scalable web applications using modern technologies
                            • Developing cybersecurity solutions for secure authentication and data protection
                            • Consulting on software design, database management, and UI/UX optimization`
        },
        {
            title: 'Cybersecurity Bootcamp Leader',
            company: 'Forward Edge Cybersecurity Bootcamp',
            period: '2024',
            shortDescription: 'Led a cybersecurity project, gaining expertise in security operations and risk management.',
            fullDescription: `• Conducted penetration testing and security risk assessments
                            • Developed a security governance framework for an enterprise
                            • Earned an exceptional certificate for outstanding leadership`
        }
    ],
    
    projects: [
        {
            title: 'CODE Club Platform',
            shortDescription: 'A digital platform enhancing ICT education and digital literacy in Rwanda.',
            fullDescription: `Developed an interactive platform that:
                            • Provides coding tutorials and hands-on practice exercises
                            • Hosts competitions to test students' digital skills
                            • Connects students with mentors in the tech industry`,
            technologies: ['React', 'Node.js', 'MongoDB', 'Python'],
            link: 'https://emmanuel-ns.github.io/Portfolio/'
        },
        {
            title: 'Secure E-commerce Platform',
            shortDescription: 'Developed and secured an online shopping platform.',
            fullDescription: `Built a full-stack e-commerce platform featuring:
                            • Secure authentication and data encryption
                            • Real-time inventory and payment gateway integration
                            • Optimized database for fast and scalable performance`,
            technologies: ['Django', 'React', 'PostgreSQL', 'Docker'],
            link: 'https://emmanuel-ns.github.io/Portfolio/'
        },
        {
            title: 'Cybersecurity Governance Framework',
            shortDescription: 'Developed a security program management plan for a government agency.',
            fullDescription: `Created a security governance framework covering:
                            • Risk management and compliance measures
                            • Security awareness training and third-party risk assessment
                            • Continuous monitoring strategies for threat detection`,
            technologies: ['Risk Analysis', 'ISO 27001', 'SOC 2 Compliance'],
            link: 'https://emmanuel-ns.github.io/Portfolio/'
        },
        {
            title: 'Automated Security Audit Tool',
            shortDescription: 'Built a tool to automate security assessments for enterprise applications.',
            fullDescription: `Developed a security audit tool that:
                            • Scans applications for vulnerabilities in real-time
                            • Generates security reports with risk-level classification
                            • Integrates with CI/CD pipelines for continuous security testing`,
            technologies: ['Python', 'Bash', 'OWASP ZAP', 'Docker'],
            link: 'https://emmanuel-ns.github.io/Portfolio/'
        }
    ],
    
    skills: [
        'Software Development', 'Cybersecurity', 'Full-Stack Development', 'Threat Intelligence',
        'Penetration Testing', 'Secure Coding Practices', 'Risk Management', 'Linux',
        'GitHub & Version Control', 'Incident Response', 'Python', 'JavaScript', 'React', 
        'Node.js', 'Django', 'SQL & NoSQL Databases', 'Cloud Security', 'Project Management'
    ],
    socialMedia: {
        github: 'https://github.com/',
        linkedin: 'https://linkedin.com/in/emmanuel-nsabagasani',
        twitter: 'https://x.com/ENsabagasa56660',
        email: 'e.nsabagasa@alustudent.com'
      }
    
  };