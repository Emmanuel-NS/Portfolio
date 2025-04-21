// DOM Elements
const mainContent = document.getElementById('main-content');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const footer = document.querySelector('.footer');

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
    
    const title = document.createElement('h2');
    title.textContent = 'Projects';
    section.appendChild(title);
  
    const container = document.createElement('div');
    container.className = 'projects-container';
  
    const slider = document.createElement('div');
    slider.className = 'projects-slider';
  
    // Create slide indicators
    const indicators = document.createElement('div');
    indicators.className = 'slide-indicators';
  
    resumeData.projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = `project-item ${index === 0 ? 'active' : ''}`;
        
        projectItem.innerHTML =  projectItem.innerHTML = `
            <h3 class="project-title">
              <a href="${project.link}" target="_blank" rel="noopener noreferrer">
                <span class="link-icon">🔗</span>
                ${project.title}
              </a>
            </h3>
            <p class="project-tech">Technologies: ${project.technologies.join(', ')}</p>
          `;
  
        const descriptionWrapper = createExpandableSection(
            project.shortDescription,
            project.fullDescription
        );
        
        projectItem.appendChild(descriptionWrapper);
        slider.appendChild(projectItem);
  
        // Add indicator dot
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
        indicators.appendChild(indicator);
    });
  
    const controls = document.createElement('div');
    controls.className = 'slider-controls';
    controls.innerHTML = `
        <button class="slider-btn prev-btn" disabled>Previous</button>
        <button class="slider-btn next-btn">Next</button>
    `;
  
    container.appendChild(slider);
    section.appendChild(container);
    section.appendChild(indicators);
    section.appendChild(controls);
  
    // Add slider functionality
    let currentSlide = 0;
    const totalSlides = resumeData.projects.length;
    const slides = slider.querySelectorAll('.project-item');
    const indicatorDots = indicators.querySelectorAll('.indicator');
  
    function updateSlider() {
        // Update slide position
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active states
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        indicatorDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
  
        // Update button states
        const prevBtn = controls.querySelector('.prev-btn');
        const nextBtn = controls.querySelector('.next-btn');
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
  
    // Add button event listeners
    const prevBtn = controls.querySelector('.prev-btn');
    const nextBtn = controls.querySelector('.next-btn');
  
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });
  
    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    });
  
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentSlide > 0) {
            currentSlide--;
            updateSlider();
        } else if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
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
function createEducationSection(){
    const section = document.createElement('section');
    section.id = 'education';
    
    const title = document.createElement('h2');
    title.textContent = 'Education';
    section.appendChild(title);
  
    resumeData.education.forEach(edu => {
        const eduItem = document.createElement('div');
        eduItem.className = 'education-item';
        
        eduItem.innerHTML = `
            <h3>${edu.school}</h3>
            <p><i>${edu.degree} <strong>|</strong> ${edu.period}<i></p>
        `;
  
        const descriptionWrapper = createExpandableSection(
            edu.shortDescription,
            edu.fullDescription
        );
        
        eduItem.appendChild(descriptionWrapper);
        section.appendChild(eduItem);
    });
return section;  
}


// Initialize Page
function initializePage() {
    buildNavigation();
    
    // Build all sections
    const sections = [
        createProfileSection(),
        createEducationSection(),
        createExperienceSection(),
        createProjectsSection(),
        createSkillsSection(),
        createContactSection()
    ];
    
    // Add sections to main content
    sections.forEach(section => mainContent.appendChild(section));
    
    // Add footer
    createFooter();
    
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
  
    const grid = document.createElement('div');
    grid.className = 'experience-grid';
  
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
        grid.appendChild(expItem);
    });
  
    section.appendChild(grid);
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
  
// Create Footer
function createFooter() {
    const footerContent = document.createElement('div');
    footerContent.className = 'footer-content';
    
    footerContent.innerHTML = `
        <div class="footer-info">
            <h3>${resumeData.profile.name}</h3>
            <p>${resumeData.profile.title}</p>
            <p>Email: ${resumeData.socialMedia.email}</p>
        </div>
        <div class="social-links">
            <a href="${resumeData.socialMedia.github}" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i>
            </a>
            <a href="${resumeData.socialMedia.linkedin}" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-linkedin"></i>
            </a>
            <a href="${resumeData.socialMedia.twitter}" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-twitter"></i>
            </a>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} ${resumeData.profile.name}. All rights reserved.</p>
        </div>
    `;
    
    footer.appendChild(footerContent);
}
 