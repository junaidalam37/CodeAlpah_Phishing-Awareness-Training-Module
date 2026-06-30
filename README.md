# 🛡️ PhishGuard Training — Phishing Awareness Training Module

An interactive, browser-based cybersecurity awareness module built for **CodeAlpha's Cyber Security Internship — Task 2: Phishing Awareness Training**.

🔗 **Live Demo:** _add your GitHub Pages / hosted link here_

---

## 📖 Overview

PhishGuard Training is a single-page web application that teaches users how to recognize phishing emails, understand the social engineering tactics behind them, and test their knowledge through a real-world, scenario-based quiz. The project is built entirely with **HTML, CSS, and vanilla JavaScript** — no frameworks, no backend, no dependencies.

## ✨ Features

- **Welcome / Hero Section** — A clear, plain-language introduction to what phishing is and why it matters.
- **Understanding Social Engineering** — Four interactive cards explaining the core psychological triggers attackers exploit: **Urgency, Fear, Authority, and Scarcity**, each with a real example phrase.
- **Spot the Red Flags** — A realistic mock phishing email (a fake Netflix billing notice) with **four clickable/keyboard-accessible hotspots**. Clicking or hovering over a flagged element reveals a tooltip explaining exactly why it's suspicious:
  - Mismatched sender domain
  - Generic greeting
  - Urgent/threatening language
  - Suspicious call-to-action link
- **Defensive Checklist** — Four actionable best practices: verifying through a trusted channel, enabling MFA, inspecting links before clicking, and slowing down under pressure.
- **Interactive Phishing Quiz** — A 4-question, scenario-based quiz engine covering bank phishing, fake IT helpdesk emails, SMS smishing, and CEO fraud/BEC. Includes instant feedback, written explanations, a progress bar, scoring, and a dynamic completion badge (🏆 Certified Defender / 🛡️ Keep Learning / ⚠️ At Risk) with a retake option.
- **Fully Responsive** — Mobile-friendly navigation with a hamburger menu and responsive grid layouts for tablet/mobile breakpoints.
- **Accessible** — Keyboard-navigable hotspots (`tabindex`, `role="button"`, Enter/Space support) and semantic HTML structure.

## 🗂️ Project Structure

```
phishguard-training/
├── index.html      # Page structure, content, and email mockup/quiz markup
├── style.css       # Design system (CSS variables), layout, and responsive styles
├── script.js       # Navbar logic, red-flag tooltip engine, and quiz engine
└── README.md
```

## 🛠️ Built With

- **HTML5** — Semantic markup, `<template>` tags for tooltip content
- **CSS3** — Custom properties (CSS variables), Flexbox, Grid, media queries
- **Vanilla JavaScript (ES6+)** — DOM manipulation, `IntersectionObserver`, event delegation, no external libraries

## 🚀 Getting Started

No build step or installation required — this is a static site.

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/CodeAlpha_PhishingAwarenessTraining.git
   ```
2. Open `index.html` directly in your browser, **or** serve it locally:
   ```bash
   # Using Python
   python3 -m http.server 8000

   # Using VS Code
   Right-click index.html → "Open with Live Server"
   ```
3. Navigate to `http://localhost:8000` (if served) and explore the module.

## 🎯 How It Maps to the CodeAlpha Task Brief

| Task 2 Requirement | Where It's Covered |
|---|---|
| Online module focused on phishing attacks | Entire site (`index.html`) |
| Recognize phishing emails and fake websites | "Spot the Red Flags" email mockup |
| Educate about social engineering tactics | "Understanding Social Engineering" section |
| Best practices and tips | "Defensive Checklist" |
| Real-world examples and interactive quizzes | "Interactive Phishing Quiz" |

## 👤 Author

**Junaid Alam**
Cyber Security Intern @ [CodeAlpha](https://www.codealpha.tech)

## 📜 License

This project was built for educational purposes as part of the CodeAlpha Cyber Security Internship. Feel free to fork and adapt for learning purposes.

## 🙏 Acknowledgements

- [CodeAlpha](https://www.codealpha.tech) for the internship opportunity and task brief
- [Google Fonts](https://fonts.google.com) — Inter & JetBrains Mono typefaces
