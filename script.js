// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Pause marquee on hover
const track = document.querySelector('.rolling-bar-track');
if (track) {
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

// ===== Solutions Tab Navigation =====
(function() {
  const items = document.querySelectorAll('.sol-bar-item');
  const cards = document.querySelectorAll('.sol-card');
  if (!items.length) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const idx = item.dataset.index;
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      cards.forEach(c => c.classList.remove('visible'));
      const target = document.querySelector('.sol-card[data-card="' + idx + '"]');
      if (target) {
        target.style.animation = 'none';
        target.offsetHeight;
        target.style.animation = '';
        target.classList.add('visible');
      }
    });
  });
})();

// ===== Count-Up Animation (integers) =====
(function() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const duration = 1800;

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ===== 9M Decimal Counter =====
(function() {
  const el = document.getElementById('hstat-counter');
  if (!el) return;
  let animated = false;
  const duration = 1800;
  const target = 9.0;

  function animate() {
    if (animated) return;
    animated = true;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = (ease * target).toFixed(1);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) animate(); });
  }, { threshold: 0.3 });

  observer.observe(el);
})();

// ===== Policyholder Journey Quiz =====
(function() {
  const quizRoot = document.querySelector('.cta-quiz');
  if (!quizRoot) return;

  const stages = [
    { id: 'acquisition', label: 'Acquisition', icon: '🛡️' },
    { id: 'servicing',   label: 'Servicing',   icon: '📋' },
    { id: 'claims',      label: 'Claims',      icon: '⚡' },
    { id: 'retention',   label: 'Retention',   icon: '🔄' },
    { id: 'compliance',  label: 'Compliance',  icon: '✅' }
  ];

  const questions = [
    {
      stage: 'Acquisition & Onboarding',
      text: 'Where does your acquisition operation lose the most ground?',
      options: [
        { friction: 'speed',      label: 'Slow cycle times',      text: 'Slow quote-to-bind timelines are losing conversions before they close' },
        { friction: 'compliance', label: 'Audit exposure',        text: 'Compliance risk on every interaction — licensing gaps, script violations' },
        { friction: 'knowledge',  label: 'Agent capability gaps', text: 'Agents lack the product knowledge to handle complex lines confidently' },
        { friction: 'experience', label: 'Policyholder friction', text: 'Policyholders find the onboarding process confusing and drop off' },
        { friction: 'cost',       label: 'Rising cost to serve',  text: 'Acquisition cost per policy is too high to justify the volume' }
      ]
    },
    {
      stage: 'Policy Servicing',
      text: 'Where does policy servicing create the most friction?',
      options: [
        { friction: 'speed',      label: 'Slow cycle times',      text: 'Routine requests take too long — policyholders wait, agents get stuck' },
        { friction: 'compliance', label: 'Audit exposure',        text: "Every servicing interaction carries compliance risk we can't fully monitor" },
        { friction: 'knowledge',  label: 'Agent capability gaps', text: 'Agents struggle with endorsement complexity and billing disputes' },
        { friction: 'experience', label: 'Policyholder friction', text: 'Policyholders call back multiple times to resolve the same issue' },
        { friction: 'cost',       label: 'Rising cost to serve',  text: 'Too much agent time spent on low-value, easily automated requests' }
      ]
    },
    {
      stage: 'Claims',
      text: 'Where does your claims operation fall short?',
      options: [
        { friction: 'speed',      label: 'Slow cycle times',      text: 'FNOL handling is slow — cycle times are too long and policyholders notice' },
        { friction: 'compliance', label: 'Audit exposure',        text: 'Claims interactions are hard to audit — compliance gaps create exposure' },
        { friction: 'knowledge',  label: 'Agent capability gaps', text: 'Agents lack training to handle complex or emotionally charged claims' },
        { friction: 'experience', label: 'Policyholder friction', text: 'Policyholders feel unheard — empathy is inconsistent across the team' },
        { friction: 'cost',       label: 'Rising cost to serve',  text: 'Claims handling cost is rising without a clear path to reduce it' }
      ]
    },
    {
      stage: 'Retention & Renewal',
      text: 'Where do you lose policyholders at renewal?',
      options: [
        { friction: 'speed',      label: 'Slow cycle times',      text: 'Save desk response is too slow — policyholders churn before we intervene' },
        { friction: 'compliance', label: 'Audit exposure',        text: 'Retention calls carry compliance risk, especially on vulnerable customers' },
        { friction: 'knowledge',  label: 'Agent capability gaps', text: "Agents don't have the right data to make a compelling save case" },
        { friction: 'experience', label: 'Policyholder friction', text: "Policyholders don't feel valued — renewal feels transactional, not personal" },
        { friction: 'cost',       label: 'Rising cost to serve',  text: 'Save desk costs are high relative to policies actually retained' }
      ]
    },
    {
      stage: 'Compliance & Audit',
      text: 'Where does compliance create the most operational pressure?',
      options: [
        { friction: 'speed',      label: 'Slow cycle times',      text: 'Audit prep is a major effort every time — it disrupts the whole operation' },
        { friction: 'compliance', label: 'Audit exposure',        text: "We can't guarantee 100% compliance across every interaction" },
        { friction: 'knowledge',  label: 'Agent capability gaps', text: "Teams aren't consistently trained on the latest regulatory requirements" },
        { friction: 'experience', label: 'Policyholder friction', text: "Financial crime and fraud risks aren't caught early enough" },
        { friction: 'cost',       label: 'Rising cost to serve',  text: 'Compliance overhead is adding cost without clear return' }
      ]
    }
  ];

  const recommendations = {
    acquisition: {
      speed:      'Real-time conversion assist and AI guided quote-to-bind workflows — closing faster without cutting compliance corners.',
      compliance: 'Licensed agent hiring, appointing, and 100% interaction QA — every acquisition interaction audit ready from day one.',
      knowledge:  'AI sales simulations and product knowledge training built for complex lines — so agents convert with confidence.',
      experience: 'Omnichannel onboarding with licensed specialists guiding policyholders from quote to bind — reducing drop-off.',
      cost:       'Elastic specialist teams deployed at speed — pay for outcomes, not overhead.'
    },
    servicing: {
      speed:      'AI deflects low-complexity calls so licensed agents focus on endorsements, billing, and the interactions that matter.',
      compliance: '100% compliance QA and full interaction recording across every servicing touchpoint — audit ready by default.',
      knowledge:  'Licensed servicing agents with embedded knowledge tools and real-time assist to handle complex requests first contact.',
      experience: 'First contact resolution on endorsements and billing disputes — reducing repeat calls and improving effort scores.',
      cost:       'AI absorbs routine volume. Licensed agents handle the interactions that protect policyholder lifetime value.'
    },
    claims: {
      speed:      'FNOL simulation training and accuracy focused agent assist to reduce cycle times without sacrificing empathy.',
      compliance: '100% compliance audit and full interaction recording across every claims touchpoint — always audit ready.',
      knowledge:  'Empathy trained, licensed claims specialists built for complex and emotionally charged interactions at scale.',
      experience: 'Licensed agents backed by human judgment — delivering the accuracy and empathy policyholders need most.',
      cost:       'Claims trend insights and AI powered workflows to reduce handling time, reduce leakage, and protect your loss ratio.'
    },
    retention: {
      speed:      'Retention and save desk with real-time AI assist — intervening before policyholders decide to leave.',
      compliance: 'Compliant retention programs with every save call recorded and monitored — protecting policyholders and your audit position.',
      knowledge:  'Specialist retention teams trained on your policy lines, equipped with data and save desk playbooks.',
      experience: 'NPS tracking and proactive outreach that turns renewal from a transaction into a loyalty moment.',
      cost:       'AI handles low-risk renewals. Specialist save desk agents focus on the policyholders worth fighting for.'
    },
    compliance: {
      speed:      'Embedded QA frameworks that run continuously — not just when an audit is coming.',
      compliance: 'Compliance specialist training, financial crime detection, AML monitoring, and full interaction recording built into every workflow.',
      knowledge:  'Specialist compliance teams trained to the latest regulatory requirements — and a QA framework that keeps every agent current.',
      experience: 'Full interaction recording and embedded QA that protects policyholders by default — not as an afterthought.',
      cost:       'Continuous compliance monitoring replaces expensive periodic reviews — reducing the cost of staying compliant.'
    }
  };

  const gapClass = {
    speed:      'cqz-gap-speed',
    compliance: 'cqz-gap-compliance',
    knowledge:  'cqz-gap-knowledge',
    experience: 'cqz-gap-experience',
    cost:       'cqz-gap-cost'
  };

  const frictionNames = {
    speed: 'handling speed',
    compliance: 'compliance exposure',
    knowledge: 'agent capability',
    experience: 'policyholder experience',
    cost: 'cost to serve'
  };

  let currentQ = 0;
  let answers = Array(questions.length).fill(null);

  function showScreen(id) {
    quizRoot.querySelectorAll('.cqz-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  function renderStageBar() {
    const bar = document.getElementById('cqz-stage-bar');
    bar.innerHTML = stages.map((s, i) => {
      const cls = i < currentQ ? 'done' : i === currentQ ? 'current' : '';
      return '<div class="cqz-stage-pip ' + cls + '" title="' + s.label + '"></div>';
    }).join('');
  }

  function renderQuestion() {
    renderStageBar();
    const q = questions[currentQ];
    const container = document.getElementById('cqz-question-container');
    const nextBtn = document.getElementById('cqz-btn-next');
    const backBtn = document.getElementById('cqz-btn-back');

    nextBtn.disabled = answers[currentQ] === null;
    nextBtn.innerHTML = (currentQ === questions.length - 1 ? 'See my gap map' : 'Next') + ' <span class="arrow">&rarr;</span>';
    backBtn.style.display = currentQ === 0 ? 'none' : 'inline-flex';

    let html = '<div class="cqz-stage-label">' + stages[currentQ].icon + ' Stage ' + (currentQ + 1) + ' of 5 — ' + stages[currentQ].label + '</div>';
    html += '<div class="cqz-stage-name">' + q.text + '</div>';
    html += '<div class="cqz-options">';
    q.options.forEach(opt => {
      const sel = answers[currentQ] === opt.friction ? ' selected' : '';
      html += '<div class="cqz-option' + sel + '" data-friction="' + opt.friction + '">';
      html +=   '<div class="cqz-option-radio"><div class="cqz-option-radio-dot"></div></div>';
      html +=   '<div class="cqz-option-text">' + opt.text + '</div>';
      html += '</div>';
    });
    html += '</div>';
    container.innerHTML = html;

    container.querySelectorAll('.cqz-option').forEach(el => {
      el.addEventListener('click', () => {
        const friction = el.getAttribute('data-friction');
        answers[currentQ] = friction;
        container.querySelectorAll('.cqz-option').forEach(e => e.classList.remove('selected'));
        el.classList.add('selected');
        nextBtn.disabled = false;
      });
    });
  }

  function startQuiz() {
    currentQ = 0;
    answers = Array(questions.length).fill(null);
    showScreen('cqz-screen-questions');
    renderQuestion();
  }

  function nextQ() {
    if (answers[currentQ] === null) return;
    if (currentQ < questions.length - 1) {
      currentQ++;
      renderQuestion();
    } else {
      showResults();
    }
  }

  function prevQ() {
    if (currentQ > 0) { currentQ--; renderQuestion(); }
  }

  function showResults() {
    let mapHTML = '';
    let recHTML = '';

    stages.forEach((stage, i) => {
      const friction = answers[i];
      const opt = questions[i].options.find(o => o.friction === friction);
      const cls = gapClass[friction];

      mapHTML += '<div class="cqz-map-stage">';
      mapHTML +=   '<div class="cqz-map-node">' + stage.icon + '</div>';
      mapHTML +=   '<div class="cqz-map-stage-name">' + stage.label + '</div>';
      mapHTML +=   '<div class="cqz-map-gap-pill ' + cls + '">' + opt.label + '</div>';
      mapHTML += '</div>';

      recHTML += '<div class="cqz-rec-card">';
      recHTML +=   '<div class="cqz-rec-card-label">' + stage.label + '</div>';
      recHTML +=   '<div class="cqz-rec-card-text">' + recommendations[stage.id][friction] + '</div>';
      recHTML += '</div>';
    });

    document.getElementById('cqz-journey-map').innerHTML = mapHTML;
    document.getElementById('cqz-rec-cards').innerHTML = recHTML;

    const counts = {};
    answers.forEach(f => { counts[f] = (counts[f] || 0) + 1; });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    document.getElementById('cqz-summary-text').innerHTML =
      'Your biggest recurring gap is <strong>' + frictionNames[top] + '</strong> — it shows up across multiple stages of your journey. The recommendations above prioritise the highest-impact fixes first.';

    showScreen('cqz-screen-results');
  }

  function scrollToEmail() {
    const sec = document.getElementById('cqz-email-section');
    sec.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('cqz-email-input').focus();
  }

  function sendResults() {
    const email = document.getElementById('cqz-email-input').value;
    if (!email || !email.includes('@')) return;
    const btn = document.getElementById('cqz-email-btn');
    btn.innerHTML = 'Map sent ✓';
    btn.style.background = '#22c55e';
    btn.disabled = true;
  }

  function restart() {
    currentQ = 0;
    answers = Array(questions.length).fill(null);
    showScreen('cqz-screen-intro');
  }

  // Event delegation for all data-action buttons within the quiz
  quizRoot.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    const action = target.getAttribute('data-action');
    if (action === 'start') startQuiz();
    else if (action === 'next') nextQ();
    else if (action === 'back') prevQ();
    else if (action === 'restart') restart();
    else if (action === 'scrollToEmail') scrollToEmail();
    else if (action === 'sendResults') sendResults();
  });
})();
