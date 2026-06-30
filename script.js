/* =========================================================
   PHISHING AWARENESS TRAINING MODULE — SCRIPT.JS
   Modules: Navbar | Email Red-Flag Tooltips | Quiz Engine
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFlagTooltips();
  initQuiz();
});

/* ---------------------------------------------------------
   1. NAVBAR — mobile toggle + active link highlight
--------------------------------------------------------- */
function initNavbar() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu after clicking a link
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Highlight active section link on scroll
  const sections = document.querySelectorAll('section[id]');
  const linkMap = {};
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    linkMap[link.getAttribute('href').slice(1)] = link;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = linkMap[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) {
        Object.values(linkMap).forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

/* ---------------------------------------------------------
   2. EMAIL RED-FLAG TOOLTIPS
   Clicking (or pressing Enter on) a flagged element shows
   its explanation in the side panel, using <template> content.
--------------------------------------------------------- */
function initFlagTooltips() {
  const targets = document.querySelectorAll('.flag-target');
  const panelEmpty = document.getElementById('flagPanelEmpty');
  const panelContent = document.getElementById('flagPanelContent');
  const flagTitle = document.getElementById('flagTitle');
  const flagDesc = document.getElementById('flagDesc');

  function showFlag(target) {
    const flagId = target.getAttribute('data-flag');
    const template = document.getElementById(`tooltip-${flagId}`);
    if (!template) return;

    // Pull title/desc out of the template's markup
    const titleEl = template.content.querySelector('h4');
    const descEl = template.content.querySelector('p');

    flagTitle.textContent = titleEl ? titleEl.textContent : '';
    flagDesc.innerHTML = descEl ? descEl.innerHTML : '';

    panelEmpty.hidden = true;
    panelContent.hidden = false;

    // Visually mark the active target, clear others
    targets.forEach(t => t.classList.remove('flag-active'));
    target.classList.add('flag-active');
  }

  targets.forEach(target => {
    target.addEventListener('click', (e) => {
      e.preventDefault();
      showFlag(target);
    });
    target.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showFlag(target);
      }
    });
    // Optional hover preview on non-touch desktop devices
    target.addEventListener('mouseenter', () => showFlag(target));
  });
}

/* ---------------------------------------------------------
   3. INTERACTIVE QUIZ ENGINE
--------------------------------------------------------- */
function initQuiz() {

  // --- Quiz Data: 4 scenario-based phishing questions ---
  const quizData = [
    {
      scenario: "You receive an email claiming to be from your bank, stating: 'Your account has been locked due to suspicious activity. Click below to verify your identity within 1 hour.'",
      question: "What is the SAFEST first action to take?",
      options: [
        "Click the link immediately to avoid losing access to your account",
        "Reply to the email asking if it's legitimate",
        "Independently navigate to your bank's official website or call their verified phone number to check your account status",
        "Forward the email to a friend for a second opinion"
      ],
      correctIndex: 2,
      explanation: "Always verify suspicious account alerts through a channel YOU initiate — like typing the bank's known URL directly or calling the number on the back of your card. Never trust links or contact info provided in an unsolicited, urgent email."
    },
    {
      scenario: "An email from 'IT-Support@yourcompany-helpdesk.net' asks you to 'urgently reset your password using the attached link' before your account is disabled at the end of the day.",
      question: "Which detail is the BIGGEST red flag here?",
      options: [
        "The email was sent during business hours",
        "The sender's domain ('yourcompany-helpdesk.net') doesn't match your actual company domain",
        "The email includes the word 'urgently'",
        "The email is addressed to you directly"
      ],
      correctIndex: 1,
      explanation: "A mismatched or look-alike domain is one of the strongest indicators of phishing. Internal IT communications should come from your organization's official, verified domain — not a similar-looking external one. Always check the full domain after the '@' symbol."
    },
    {
      scenario: "You get a text message: 'Your package could not be delivered. Pay a $1.50 redelivery fee here: bit.ly/4xPkg-Fee.' You weren't expecting any package.",
      question: "What should you do?",
      options: [
        "Pay the small fee since it's not much money",
        "Click the link to see what carrier it's from",
        "Ignore and delete the message, or verify directly through the carrier's official app/site if you ARE expecting a package",
        "Reply 'STOP' to the number"
      ],
      correctIndex: 2,
      explanation: "This is a classic 'smishing' (SMS phishing) scam using scarcity and small payment amounts to seem low-risk. Shortened links (like bit.ly) hide the real destination. Always verify deliveries through the official carrier app or website, never a link in an unsolicited text."
    },
    {
      scenario: "Your CEO emails you (from an unfamiliar personal Gmail address) asking you to urgently purchase $500 in gift cards and send the codes because they're 'in a meeting and can't talk.'",
      question: "What does this scenario primarily exploit?",
      options: [
        "Scarcity — limited gift cards available",
        "Authority and urgency — impersonating a senior leader and demanding immediate, unverifiable action",
        "Fear — threatening to fire you",
        "Curiosity — wanting to know what the meeting is about"
      ],
      correctIndex: 1,
      explanation: "This is a classic 'CEO Fraud' / Business Email Compromise (BEC) attack. It exploits authority (impersonating leadership) and urgency (demanding fast action while 'unreachable' for verification). Always verify unusual financial requests through a separate, known communication channel — like calling the person directly."
    }
  ];

  // --- State ---
  let currentIndex = 0;
  let score = 0;
  let answered = false;

  // --- DOM References ---
  const quizCard = document.getElementById('quizCard');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const quizComplete = document.getElementById('quizComplete');
  const quizWrapperProgress = document.querySelector('.quiz-progress');
  const badgeResult = document.getElementById('badgeResult');
  const completeScore = document.getElementById('completeScore');
  const statusBadge = document.getElementById('statusBadge');
  const restartBtn = document.getElementById('restartQuiz');

  renderQuestion();

  /** Renders the current question into the quiz card */
  function renderQuestion() {
    answered = false;
    const q = quizData[currentIndex];

    progressFill.style.width = `${((currentIndex) / quizData.length) * 100}%`;
    progressText.textContent = `Question ${currentIndex + 1} of ${quizData.length}`;

    quizCard.innerHTML = `
      <div class="quiz-scenario">📧 "${q.scenario}"</div>
      <div class="quiz-question">${q.question}</div>
      <div class="quiz-options" id="optionsList">
        ${q.options.map((opt, i) => `
          <label class="quiz-option" data-index="${i}">
            <input type="radio" name="quizOption" value="${i}">
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quizFeedback"></div>
      <div class="quiz-actions">
        <button class="btn-submit" id="submitBtn" disabled>Submit Answer</button>
        <button class="btn-next" id="nextBtn">
          ${currentIndex === quizData.length - 1 ? 'See Results →' : 'Next Question →'}
        </button>
      </div>
    `;

    const optionEls = quizCard.querySelectorAll('.quiz-option');
    const submitBtn = quizCard.querySelector('#submitBtn');
    const nextBtn = quizCard.querySelector('#nextBtn');

    // Enable submit once an option is selected
    optionEls.forEach(opt => {
      opt.addEventListener('click', () => {
        if (answered) return;
        optionEls.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        submitBtn.disabled = false;
      });
    });

    submitBtn.addEventListener('click', () => handleSubmit(q, optionEls, submitBtn, nextBtn));
    nextBtn.addEventListener('click', () => handleNext());
  }

  /** Handles answer submission: scoring, visual feedback, explanation */
  function handleSubmit(q, optionEls, submitBtn, nextBtn) {
    const selected = quizCard.querySelector('input[name="quizOption"]:checked');
    if (!selected) return;

    answered = true;
    const selectedIndex = parseInt(selected.value, 10);
    const isCorrect = selectedIndex === q.correctIndex;
    if (isCorrect) score++;

    // Lock options & apply correct/incorrect styling
    optionEls.forEach((opt, i) => {
      opt.querySelector('input').disabled = true;
      if (i === q.correctIndex) {
        opt.classList.add('correct-answer');
      } else if (i === selectedIndex && !isCorrect) {
        opt.classList.add('wrong-answer');
      }
    });

    // Show educational explanation
    const feedback = document.getElementById('quizFeedback');
    feedback.classList.add('show', isCorrect ? 'correct' : 'incorrect');
    feedback.innerHTML = `
      <strong>${isCorrect ? '✅ Correct!' : '❌ Not quite.'}</strong>
      ${q.explanation}
    `;

    submitBtn.style.display = 'none';
    nextBtn.classList.add('show');
  }

  /** Advances to next question or shows completion screen */
  function handleNext() {
    currentIndex++;
    if (currentIndex < quizData.length) {
      renderQuestion();
    } else {
      showResults();
    }
  }

  /** Displays final score and dynamic awareness badge */
  function showResults() {
    quizCard.hidden = true;
    quizWrapperProgress.hidden = true;
    quizComplete.hidden = false;

    progressFill.style.width = '100%';

    const total = quizData.length;
    completeScore.textContent = `You scored ${score} out of ${total}.`;

    let badgeClass, badgeText, badgeEmoji;
    if (score === total) {
      badgeClass = 'gold';
      badgeText = '🏆 Certified Defender — Perfect Score!';
      badgeEmoji = '🏆';
    } else if (score >= Math.ceil(total * 0.5)) {
      badgeClass = 'improve';
      badgeText = '🛡️ Keep Learning — Solid Foundation';
      badgeEmoji = '🛡️';
    } else {
      badgeClass = 'risk';
      badgeText = '⚠️ At Risk — Review the Material Again';
      badgeEmoji = '⚠️';
    }

    badgeResult.textContent = badgeEmoji;
    statusBadge.textContent = badgeText;
    statusBadge.className = `status-badge ${badgeClass}`;
  }

  /** Resets quiz state for a retake */
  restartBtn.addEventListener('click', () => {
    currentIndex = 0;
    score = 0;
    quizCard.hidden = false;
    quizWrapperProgress.hidden = false;
    quizComplete.hidden = true;
    renderQuestion();
  });
}
