# Emmanuel NSABAGASANI • Portfolio Website

A **dynamic**, **data‑driven**, single‑page portfolio site showcasing my profile, education, experience, projects, skills, and a contact form—built with **vanilla HTML**, **CSS**, and **JavaScript**. This repo powers the live site at:  
🔗 https://emmanuel-ns.github.io/Portfolio/

---

## 📖 Table of Contents

1. [Overview](#overview)  
2. [Demo](#demo)  
3. [Features](#features)  
4. [Tech Stack](#tech-stack)  
5. [Project Structure](#project-structure)  
6. [Data Model](#data-model)  
7. [Getting Started](#getting-started)  
8. [Customization](#customization)  
9. [Deployment](#deployment)  
10. [Contributing](#contributing)  
11. [License](#license)  

---

## 🧐 Overview

This is my personal portfolio site—**DevConnect Portfolio**—designed to be:

- **Modular**: All content (navigation, profile, education, experience, projects, skills, contact) is defined in a single `data.js` file.  
- **Responsive**: Built with modern CSS grid/flex and media queries to look great on any device.  
- **Interactive**: Projects slider, expandable descriptions, smooth scrolling, and a “thank you” modal on form submit.  

---

## 🔗 Demo

View it in action:  
**https://emmanuel-ns.github.io/Portfolio/**

---

## ✨ Features

- **Dynamic Navigation**: Auto‑generates menu items from `resumeData.navigation`.  
- **Profile Section**: Background banner, circular headshot, expandable bio.  
- **Education & Experience**: Card layouts with “Show more / Show less” for details.  
- **Projects Slider**: Horizontal carousel with prev/next controls, indicators, and clickable titles (with hover animation).  
- **Skills Grid**: Responsive badges for each skill.  
- **Contact Form**: Inline form with validation, success modal, and smooth-scrolling anchors.  
- **Sticky Hamburger Menu**: Mobile‑friendly toggle.  

---

## 🚀 Tech Stack

- **HTML5** & **Semantic Elements**  
- **CSS3** (Grid, Flexbox, Variables, Transitions)  
- **JavaScript (ES6+)**  
- **Font Awesome** (for social icons)  
- **No external frameworks**—all vanilla code  

---

## 📂 Project Structure

portfolio/ ├── public/ │ └── posts.json # (if using for blog; optional) ├── images/ # headshot & background │ ├── profile.png │ └── bgprofile.jpg ├── scripts/ │ ├── data.js # All content lives here │ └── scripts.js # DOM generation & interactivity ├── styles/ │ └── styles.css # Global & component styles ├── index.html # Entry point └── README.md # This documentation


---

## 🗃️ Data Model

All site content is stored in `scripts/data.js` under the global `resumeData` object:

- **navigation**: Array of `{ id, text }` for menu links  
- **profile**: `{ name, title, images, shortBio, fullBio }`  
- **education**: Array of `{ school, degree, period, shortDescription, fullDescription }`  
- **experience**: Array of `{ title, company, period, shortDescription, fullDescription }`  
- **projects**: Array of `{ title, shortDescription, fullDescription, technologies, link }`  
- **skills**: Array of skill names  
- **socialMedia**: URLs for GitHub, LinkedIn, Twitter, etc.  

The site’s JavaScript reads this data to build each section dynamically.

---

## 🛠️ Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Emmanuel-NS/Portfolio.git
   cd Portfolio
Serve locally

Option A: Open index.html directly in your browser.

Option B: Use a simple HTTP server (for module/fetch safety):

# Python 3
python -m http.server 8000
# then visit http://localhost:8000
Explore & develop

Edit scripts/data.js to update your profile, projects, etc.

Tweak styles in styles/styles.css.

Modify interactivity in scripts/scripts.js.

⚙️ Customization
Add/Remove Sections: Update the resumeData.navigation array in data.js.

Change Content: Edit the corresponding array/object in data.js.

Styling: Override or extend rules in styles/styles.css.

Icons: Swap the Unicode 🔗 or use Font Awesome by including its CDN in index.html.

📤 Deployment
This is a static site—perfect for GitHub Pages:

Push your final code to a gh-pages branch or the main branch with Pages enabled.

In your repository’s Settings → Pages, set the source to / (root) on main or gh-pages.

Visit https://emmanuel-ns.github.io/Portfolio/ within a few minutes.

🤝 Contributing
Feel free to fork this repo if you’d like to adapt it for your own portfolio. Pull requests are welcome for:

Bug fixes

Performance improvements

New interactive features

Please open an issue first to discuss major changes.

📄 License
This project is released under the MIT License — see LICENSE for details.

“Learning by building is the best way to master a technology.”
— Emmanuel NSABAGASANI