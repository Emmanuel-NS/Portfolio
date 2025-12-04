import { ConsultingStatus, SocialLabel } from "../src/generated/prisma/enums";
import { disconnectPrisma, prisma } from "../src/prismaClient";
import { config } from "dotenv";
import bcrypt from "bcryptjs";

config();

const saltRounds = 12;

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be defined to seed admin settings`);
  }
  return value;
}

const slash = "/";
const doubleSlash = slash + slash;
const buildUrl = (scheme: "http" | "https", path: string) => `${scheme}:${doubleSlash}${path}`;

async function seed() {
  await prisma.adminSettings.deleteMany();
  await prisma.contactSocial.deleteMany();
  await prisma.contactInfo.deleteMany();
  await prisma.consultingProject.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.skillGroup.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experienceEntry.deleteMany();
  await prisma.educationEntry.deleteMany();
  await prisma.heroSpotlight.deleteMany();
  await prisma.heroHighlight.deleteMany();
  await prisma.heroContent.deleteMany();

  await prisma.heroContent.create({
    data: {
      id: 1,
      name: "Emmanuel NSABAGASANI",
      title: "Software Engineer · Cybersecurity Analyst · IT Educator · Digital Solutions Consultant",
      summary:
        "Rwandan builder who fuses secure engineering, cyber defense, ICT education, and board-level digital consulting to launch resilient products and advisory playbooks.",
      primaryCtaLabel: "Explore projects",
      primaryCtaHref: "#projects",
      secondaryCtaLabel: "Email me",
      secondaryCtaHref: "mailto:e.nsabagasa@alustudent.com",
    },
  });

  await prisma.heroHighlight.createMany({
    data: [
      { label: "Current Program", value: "ALU BSc 2024", sortOrder: 1 },
      { label: "Advisory", value: "Digital Solutions Consultant", sortOrder: 2 },
      { label: "Product Builds", value: "Cineranda · Sigasira", sortOrder: 3 },
    ],
  });

  await prisma.heroSpotlight.createMany({
    data: [
      {
        title: "Forward Edge Elite",
        stat: "Top 6 cohort",
        descriptor: "Awarded the elite cybersecurity certificate for 2024.",
        sortOrder: 1,
      },
      {
        title: "ICT Teaching Impact",
        stat: "National #1 results",
        descriptor: "Led GS Byumba courses to best exam performance in school history.",
        sortOrder: 2,
      },
      {
        title: "Consulting Delivery",
        stat: "Farmers system win",
        descriptor: "Afrifarmers Market adopted the digital solution proposal I led.",
        sortOrder: 3,
      },
    ],
  });

  await prisma.educationEntry.createMany({
    data: [
      {
        institution: "African Leadership University (ALU)",
        credential: "Bachelor of Science in Software Engineering",
        period: "2024 - Present",
        description: "Specialized in software development and cybersecurity.",
        sortOrder: 1,
      },
      {
        institution: "Forward Edge Consulting Ltd.",
        credential: "Cybersecurity Certification",
        period: "2024",
        description: "Advanced training in cybersecurity operations.",
        sortOrder: 2,
      },
      {
        institution: "ES Sancta Maria Karambo",
        credential: "A2 Diploma in Mathematics, Computer Science, and Economics",
        period: "2019 - 2023",
        description: "High school diploma with a focus on technology and economics.",
        sortOrder: 3,
      },
      {
        institution: "ES Sancta Maria Karambo",
        credential: "O-Level Certificate",
        period: "2016 - 2019",
        description: "General secondary education with strong STEM foundations.",
        sortOrder: 4,
      },
      {
        institution: "Academy De La Salle Byumba",
        credential: "Primary Education",
        period: "2010 - 2016",
        description: "Primary studies emphasizing foundational STEM skills.",
        sortOrder: 5,
      },
    ],
  });

  await prisma.experienceEntry.createMany({
    data: [
      {
        role: "Technology Consultant",
        organization: "Afrifarmers Market",
        period: "2025",
        summary: "Led a consultancy squad delivering the Farmers Management System proposal adopted by leadership.",
        sortOrder: 1,
      },
      {
        role: "Product Engineer",
        organization: "Cineranda (Stealth)",
        period: "2025",
        summary: "Building the streaming platform architecture for Rwanda’s upcoming movie hub.",
        sortOrder: 2,
      },
      {
        role: "Digital Solutions Engineer",
        organization: "Sigasira Amagara Ltd.",
        period: "2025",
        summary: "Crafting a commerce-forward web experience to showcase healthy natural meals.",
        sortOrder: 3,
      },
      {
        role: "Security Analyst Intern",
        organization: "Forward Edge Consulting Ltd.",
        period: "Sep 2024 - Feb 2025",
        summary: "Completed a 6-month engagement delivering vulnerability assessments and secure software solutions.",
        sortOrder: 4,
      },
      {
        role: "IT & Computer Science Teacher",
        organization: "GS Byumba Inyange",
        period: "2024",
        summary: "Teaching computer science and ICT concepts to high school students.",
        sortOrder: 5,
      },
      {
        role: "Founder",
        organization: "CODE Club",
        period: "2024 - Present",
        summary: "Leading an initiative to enhance ICT education and digital literacy.",
        sortOrder: 6,
      },
      {
        role: "Cybersecurity Bootcamp Team Leader",
        organization: "Forward Edge Cybersecurity Bootcamp",
        period: "2024",
        summary: "Led cybersecurity group projects, focusing on security operations and risk management.",
        sortOrder: 7,
      },
    ],
  });

  await prisma.project.createMany({
    data: [
      {
        title: "Cineranda Streaming Platform",
        description: "High-performance video experience for Rwanda’s cinematic catalog with focus on launch-readiness.",
        tech: ["React", "Node.js", "Tailwind CSS"],
        link: buildUrl("https", "user-frontend-8rgn.vercel.app/"),
        impact: "Owning the engineering foundations ahead of public release.",
        sortOrder: 1,
      },
      {
        title: "Sigasira Amagara Digital Marketplace",
        description: "Commerce site that highlights healthy natural meals and modernizes customer touchpoints.",
        tech: ["Next.js", "TypeScript", "Stripe"],
        link: buildUrl("https", "sigasira-amagara.vercel.app/"),
        impact: "Driving online visibility for the health-food brand.",
        sortOrder: 2,
      },
      {
        title: "Afrifarmers Farmers Management System",
        description: "Consulting blueprint covering farmer onboarding, inventory, and insights for Afrifarmers Market.",
        tech: ["Product Strategy", "Systems Design", "Figma", "Notion"],
        link: buildUrl("https", "5ujzp2sbrroou.ok.kimi.link/"),
        impact: "Client praised the clarity of the proposed digital solution.",
        sortOrder: 3,
      },
      {
        title: "Movie Streaming Website",
        description: "A fully responsive movie streaming UI built with vanilla HTML, CSS, and JavaScript.",
        tech: ["HTML5", "CSS3", "JavaScript"],
        link: buildUrl("https", "emmanuel-ns.github.io/web_design/"),
        impact: "Delivered a cinematic experience with clean navigation.",
        sortOrder: 4,
      },
      {
        title: "Health Tracker System",
        description: "Menu-driven health tracker with user authentication and MySQL integration.",
        tech: ["Python", "MySQL"],
        link: buildUrl("https", "github.com/Emmanuel-NS/Community-Health_Tracker-System"),
        impact: "Improved community health reporting workflows.",
        sortOrder: 5,
      },
      {
        title: "Emm3 URL Scanner",
        description: "Web app leveraging the VirusTotal API to scan URLs for potential threats.",
        tech: ["JavaScript", "Node.js", "VirusTotal API", "NGINX"],
        link: buildUrl("http", "www.emm3.tech/"),
        impact: "Gives instant visibility into malicious links.",
        sortOrder: 6,
      },
      {
        title: "FARUMASI E-Pharmacy Solution",
        description: "Digital platform improving rural access to medicine through an online pharmacy.",
        tech: ["React", "Node.js", "SQL", "Tailwind CSS"],
        link: buildUrl("https", "farumasi.vercel.app/home"),
        impact: "Streamlines pharmacy operations for remote communities.",
        sortOrder: 7,
      },
      {
        title: "MoMo Dashboard",
        description: "Functional mobile money transaction dashboard built with modern web technologies.",
        tech: ["Node.js", "React", "Tailwind CSS"],
        link: buildUrl("https", "github.com/Emmanuel-NS/MoMo-Dashboard"),
        impact: "Surfaces real-time transaction insights for operators.",
        sortOrder: 8,
      },
      {
        title: "Smart Farm Marketplace",
        description:
          "Full-stack marketplace where farmers publish produce, receive agronomist guidance, and surface weather insights while buyers browse, filter, and reach out directly.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
        link: buildUrl("https", "smart-farm-market.vercel.app/"),
        impact: "Connects farmers, experts, and buyers with real-time advice, discovery, and communication loops.",
        sortOrder: 9,
      },
    ],
  });

  await prisma.skillGroup.createMany({
    data: [
      {
        title: "Secure Engineering",
        items: ["Cybersecurity", "Threat Intelligence", "Penetration Testing", "Secure Coding Practices", "Risk Management"],
        sortOrder: 1,
      },
      {
        title: "Build & Ship",
        items: ["Software Development", "Full-Stack Development", "Project Management", "GitHub & Version Control"],
        sortOrder: 2,
      },
      {
        title: "Stacks & Tools",
        items: ["Python", "JavaScript", "React", "Node.js", "Django", "SQL & NoSQL Databases", "Linux"],
        sortOrder: 3,
      },
    ],
  });

  await prisma.achievement.createMany({
    data: [
      {
        title: "Forward Edge Elite Certificate",
        context: "Cybersecurity Bootcamp 2024",
        detail: "Named among the top 6 elite students across the entire cohort.",
        sortOrder: 1,
      },
      {
        title: "ICT & CS Excellence",
        context: "GS Byumba Inyange",
        detail: "Course achieved best national exam results in school history under my instruction.",
        sortOrder: 2,
      },
      {
        title: "Afrifarmers Digital Solution",
        context: "Consultancy Team Lead",
        detail: "Delivered the Farmers Management System concept the client celebrated.",
        sortOrder: 3,
      },
    ],
  });

  await prisma.consultingProject.createMany({
    data: [
      {
        client: "Afrifarmers Market",
        focus: "Farmers Management System",
        description: "Consulted on a digital product to manage farmer data, inventory, and reporting.",
        status: ConsultingStatus.DELIVERED,
        sortOrder: 1,
      },
      {
        client: "Cineranda",
        focus: "Rwanda Movie Streaming Platform",
        description: "Currently building product foundations pre-launch.",
        status: ConsultingStatus.IN_PROGRESS,
        sortOrder: 2,
      },
      {
        client: "Sigasira Amagara Ltd.",
        focus: "Digital Marketplace & Brand Site",
        description: "Creating the online home to showcase healthy natural meals and commerce funnels.",
        status: ConsultingStatus.IN_PROGRESS,
        sortOrder: 3,
      },
    ],
  });

  await prisma.contactInfo.create({
    data: {
      id: 1,
      name: "Emmanuel NSABAGASANI",
      tagline: "Software Engineer | Cybersecurity Analyst | IT Educator | Digital Solutions Consultant",
      summary:
        "Open to building resilient software, advising on cybersecurity programs, mentoring ICT teams, and consulting on end-to-end digital transformation.",
      email: "e.nsabagasa@alustudent.com",
      whatsappNumber: "+250790160172",
      whatsappLink: buildUrl(
        "https",
        "wa.me/250790160172?text=Hi%20Emmanuel%2C%20I%20found%20your%20portfolio%20and%20would%20love%20to%20connect."
      ),
      whatsappAvailability: "Fastest real-time response via WhatsApp—update this number if needed.",
      socials: {
        create: [
          { label: SocialLabel.GITHUB, href: buildUrl("https", "github.com/Emmanuel-NS"), sortOrder: 1 },
          { label: SocialLabel.LINKEDIN, href: buildUrl("https", "linkedin.com/in/emmanuel-nsabagasani"), sortOrder: 2 },
          { label: SocialLabel.X, href: buildUrl("https", "x.com/ENsabagasa56660"), sortOrder: 3 },
        ],
      },
    },
  });

  const adminPasscode = requireEnv("ADMIN_PASSCODE");
  const adminTotpSecret = requireEnv("ADMIN_TOTP_SECRET");

  await prisma.adminSettings.create({
    data: {
      id: 1,
      passcodeHash: await bcrypt.hash(adminPasscode, saltRounds),
      totpSecret: adminTotpSecret,
      twoFactorEnabled: false,
    },
  });
}

seed()
  .catch((error) => {
    console.error("Error seeding database", error);
    process.exit(1);
  })
  .finally(async () => {
    await disconnectPrisma();
  });
