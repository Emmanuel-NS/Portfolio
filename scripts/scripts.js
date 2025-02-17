// DOM Elements
const mainContent = document.getElementById('main-content');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

// Build Navigation
function buildNavigation() {
    resumeData.navigation.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${item.id}`;
        a.textContent = item.text;
        li.appendChild(a);
        navLinks.appendChild(li);
    });
}


// Build Projects Section
function createProjectsSection() {
    const section = document.createElement('section');
    section.id = 'projects';
    
    section.innerHTML = `
        <h2>Projects</h2>
        ${resumeData.projects.map(project => `
            <div class="project-item">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p>Technologies: ${project.technologies.join(', ')}</p>
            </div>
        `).join('')}
    `;
    
    
    return section;
}
function createProjectsSection() {
  const section = document.createElement('section');
  section.id = 'projects';
  
  const title = document.createElement('h2');
  title.textContent = 'Projects';
  section.appendChild(title);

  resumeData.projects.forEach(project => {
      const projectItem = document.createElement('div');
      projectItem.className = 'project-item';
      
      projectItem.innerHTML = `
          <h3>${project.title}</h3>
          <p>Technologies: ${project.technologies.join(', ')}</p>
      `;

      const descriptionWrapper = createExpandableSection(
          project.shortDescription,
          project.fullDescription
      );
      
      projectItem.appendChild(descriptionWrapper);
      section.appendChild(projectItem);
  });

  return section;
}

// Build Skills Section
function createSkillsSection() {
    const section = document.createElement('section');
    section.id = 'skills';
    
    section.innerHTML = `
        <h2>Skills</h2>
        <div class="skills-grid">
            ${resumeData.skills.map(skill => `
                <div class="skill-item">${skill}</div>
            `).join('')}
        </div>
    `;
    
    return section;
}

// Build Contact Section
function createContactSection() {
    const section = document.createElement('section');
    section.id = 'contact';
    
    section.innerHTML = `
        <h2>Contact Me</h2>
        <form class="contact-form" id="contactForm">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" rows="4" required></textarea>
            </div>
            <button type="submit">Send Message</button>
        </form>
    `;
    
    return section;
}

// Initialize Page
function initializePage() {
    buildNavigation();
    
    // Build all sections
    const sections = [
        createProfileSection(),
        createExperienceSection(),
        createProjectsSection(),
        createSkillsSection(),
        createContactSection()
    ];
    
    // Add sections to main content
    sections.forEach(section => mainContent.appendChild(section));
    
    // Setup event listeners
    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        successModal.style.display = 'flex';
        contactForm.reset();
    });
    
    // Modal close
    window.onclick = function(event) {
        if (event.target == successModal) {
            successModal.style.display = 'none';
        }
    };
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Modal close function
function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}
// creating expandable section

function createExpandableSection(shortContent, fullContent) {
  const wrapper = document.createElement('div');
  wrapper.className = 'expandable';

  const shortSection = document.createElement('div');
  shortSection.className = 'content-short';
  shortSection.textContent = shortContent;

  const fullSection = document.createElement('div');
  fullSection.className = 'content-full';
  fullSection.innerHTML = fullContent.replace(/\n/g, '<br>');

  const expandBtn = document.createElement('button');
  expandBtn.className = 'expand-btn';
  expandBtn.textContent = 'Show more';

  expandBtn.addEventListener('click', () => {
      fullSection.classList.toggle('expanded');
      expandBtn.classList.toggle('expanded');
      expandBtn.textContent = fullSection.classList.contains('expanded') ? 'Show less' : 'Show more';
  });

  wrapper.appendChild(shortSection);
  wrapper.appendChild(fullSection);
  wrapper.appendChild(expandBtn);

  return wrapper;
}

// experience section creation
function createExperienceSection() {
  const section = document.createElement('section');
  section.id = 'experience';
  
  const title = document.createElement('h2');
  title.textContent = 'Experience';
  section.appendChild(title);

  resumeData.experience.forEach(exp => {
      const expItem = document.createElement('div');
      expItem.className = 'experience-item';
      
      expItem.innerHTML = `
          <h3>${exp.title}</h3>
          <p>${exp.company} | ${exp.period}</p>
      `;

      const descriptionWrapper = createExpandableSection(
          exp.shortDescription,
          exp.fullDescription
      );
      
      expItem.appendChild(descriptionWrapper);
      section.appendChild(expItem);
  });

  return section;
}


function createProfileSection() {
  const section = document.createElement('section');
  section.id = 'about';
  section.className = 'profile';

  // Creating header with background
  const header = document.createElement('div');
  header.className = 'profile-header';
  // Set background image from data
  header.style.backgroundImage = `url('${resumeData.profile.backgroundImage}')`;

  // Create profile image container
  const imageContainer = document.createElement('div');
  imageContainer.className = 'profile-image-container';
  
  const profileImage = document.createElement('img');
  profileImage.src = resumeData.profile.profileImage;
  profileImage.alt = 'Professional headshot';
  profileImage.className = 'profile-image';
  
  imageContainer.appendChild(profileImage);
  header.appendChild(imageContainer);

  // Create profile content
  const content = document.createElement('div');
  content.className = 'profile-content';
  content.innerHTML = `
      <h1>${resumeData.profile.name}</h1>
      <p>${resumeData.profile.title}</p>
  `;

  // Create bio with expandable section
  const bioWrapper = createExpandableSection(
      resumeData.profile.shortBio,
      resumeData.profile.fullBio
  );
  content.appendChild(bioWrapper);

  // Append all elements
  section.appendChild(header);
  section.appendChild(content);

  return section;
}