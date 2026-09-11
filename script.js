// Refined & Understated Script for Zhuoli Yang's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // ==================== 1. DARK MODE TOGGLE ====================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (themeIconSun) themeIconSun.classList.remove('hidden');
      if (themeIconMoon) themeIconMoon.classList.add('hidden');
      localStorage.setItem('zy_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      if (themeIconSun) themeIconSun.classList.add('hidden');
      if (themeIconMoon) themeIconMoon.classList.remove('hidden');
      localStorage.setItem('zy_theme', 'light');
    }
  }

  const savedTheme = localStorage.getItem('zy_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      applyTheme(!document.documentElement.classList.contains('dark'));
    });
  }

  // ==================== 2. READING PROGRESS BAR & BACK TO TOP ====================
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }

    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==================== 3. NUMBER COUNTING ANIMATION (Runs Once) ====================
  const countElements = document.querySelectorAll('[data-counter-target]');
  let hasAnimatedCounters = false;

  function runCounters() {
    countElements.forEach(el => {
      const target = parseFloat(el.getAttribute('data-counter-target'));
      const isFloat = el.getAttribute('data-counter-target').includes('.');
      const duration = 1200;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = ease * target;

        el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = isFloat ? target.toFixed(1) : target;
        }
      }

      requestAnimationFrame(update);
    });
  }

  const statsRibbon = document.getElementById('stats-ribbon');
  if (statsRibbon) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimatedCounters) {
        hasAnimatedCounters = true;
        runCounters();
        counterObserver.disconnect();
      }
    }, { threshold: 0.25 });
    counterObserver.observe(statsRibbon);
  }

  // ==================== 4. SCROLL REVEAL ANIMATIONS ====================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==================== 5. INTERACTIVE ARTICULATION STEPPER ====================
  const stepBtns = document.querySelectorAll('.stepper-btn');
  const stepInfo = document.getElementById('stepper-info');

  const stepData = [
    {
      title: 'Phase 1: Soft Tissue Clearance',
      desc: 'Careful mechanical dissection preserving micro-articular condyles and delicate fin rays.'
    },
    {
      title: 'Phase 2: NaOH Lipid Saponification (Carp Trial)',
      desc: 'Empirically tested serial dilutions of sodium hydroxide on Carassius carassius to safely strip fats without dissolving sutures.'
    },
    {
      title: 'Phase 3: Mild H2O2 Oxidation & Bleaching',
      desc: 'Controlled bath preventing surface chalking while neutralizing remaining organic compounds.'
    },
    {
      title: 'Phase 4: Kinematic Articulation & Assembly',
      desc: 'Topological reconstruction matching unfamiliar joints against adjacent functional motion constraints.'
    }
  ];

  stepBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      stepBtns.forEach(b => {
        b.classList.remove('bg-emerald-600', 'text-white', 'shadow-xs');
        b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      });
      
      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      btn.classList.add('bg-emerald-600', 'text-white', 'shadow-xs');

      if (stepInfo) {
        stepInfo.style.opacity = '0';
        setTimeout(() => {
          stepInfo.innerHTML = `<strong>${stepData[index].title}:</strong> ${stepData[index].desc}`;
          stepInfo.style.opacity = '1';
        }, 120);
      }
    });
  });

  // ==================== 6. MOBILE MENU TOGGLE ====================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ==================== 7. PROJECT FILTER BUTTONS ====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-emerald-600', 'text-white'));
      btn.classList.add('active', 'bg-emerald-600', 'text-white');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==================== 8. MODAL DEEP DIVE SYSTEM ====================
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalContent = document.getElementById('modal-body');
  const closeModalBtn = document.getElementById('modal-close-btn');

  const projectDetails = {
    'tigerfish': {
      title: 'Hydrocynus goliath: Skeletal Articulation & Biomechanical Analysis',
      category: 'Comparative Anatomy & Osteology',
      content: `
        <div class="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <p><strong>Methodological Premise:</strong> Articulating a delicate fish skeleton forgives no guesswork. While video demonstrations suggested sodium hydroxide (NaOH) for lipid stripping, they omit critical concentration and duration parameters. An overtreatment would dissolve delicate osteological landmarks.</p>
          
          <div class="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <h4 class="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">Preliminary Controlled Trial</h4>
            <p class="text-xs">Prior to working on the primary <em>Hydrocynus goliath</em> specimen, a controlled trial was conducted on a common crucian carp (<em>Carassius carassius</em>). By testing serial dilutions of NaOH and soaking intervals, an optimal threshold was calibrated to effectively saponify remaining fats without compromising bone density or suture integrity.</p>
          </div>

          <p><strong>Kinematics & Articulation:</strong> Once soft tissues were cleaned, individual bones had lost their original relative coordinates. By cross-referencing adjacent known articular facets (analogous to topological induction in mathematics), each unfamiliar vertebra was reconstructed based on the specific degree of motion it permits.</p>

          <p><strong>Key Insight:</strong> The transition from descriptive taxonomy to functional morphology: examining not merely the appearance of bones, but their mechanical adaptation to predatory apex kinematics in torrential river systems.</p>
        </div>
      `
    },
    'vivarium': {
      title: 'Long-Term Vivarium Ecology & Differential Pathology',
      category: 'Husbandry & Applied Ethology',
      content: `
        <div class="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <p><strong>Ecosystem Management:</strong> Maintained controlled closed habitats over multiple years spanning reptiles, arachnids, scorpions, and aquatic fauna. Inspired by classical naturalists including J.-H. Fabre (<em>Souvenirs Entomologiques</em>).</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
            <div class="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
              <span class="text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">Parasitic Presentation (e.g. Ichthyophthirius)</span>
              <p class="text-xs">Identified by cutaneous white trophonts; triggered by acute thermal shifts or unquarantined vectors. Addressed via stepwise thermal escalation (accelerating parasite lifecycle) and targeted water treatment.</p>
            </div>
            <div class="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
              <span class="text-xs font-bold text-rose-600 dark:text-rose-400 block mb-1">Bacterial & Metabolic Ailments</span>
              <p class="text-xs">Characterized by sluggish motility and abdominal distension; tied to nitrate accumulation or feed spoilage. Treated through feed restriction, bio-filtration renewal, and substrate siphon flushing rather than chemical shock.</p>
            </div>
          </div>

          <p><strong>Literature Synthesis:</strong> Cross-referenced academic husbandry literature and veterinary care guides in both English and Chinese to establish rigorous quarantine and biological safety protocols.</p>
        </div>
      `
    },
    'biomechanics': {
      title: 'Orthopteran Saltatorial Biomechanics & Elastic Energy Storage',
      category: 'Biomechanics & Molecular Curiosity',
      content: `
        <div class="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <p><strong>Core Scientific Question:</strong> How does an organism jump tens of times its body length without shattering micro-skeletal junctions? The power output of an orthopteran jump vastly exceeds direct muscle contraction velocity, necessitating elastic mechanical storage (semi-lunar processes and resilin proteins).</p>
          <p><strong>Bridging Micro to Macro:</strong> Exploring how physical resilience is encoded at the molecular level: the arrangement of chitin fibrils, the structural elasticity of proteins, and how mutations in these macromolecules propagate into macroscopic mechanical failures.</p>
          <p><strong>Aspirations:</strong> Looking forward to applying advanced biophysical and molecular assays (e.g., cryo-EM, mass spectrometry, CRISPR mutagenesis) during undergraduate studies to quantitatively probe these structure-function relationships.</p>
        </div>
      `
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      const details = projectDetails[id];
      if (details && modal) {
        modalTitle.textContent = details.title;
        modalCategory.textContent = details.category;
        modalContent.innerHTML = details.content;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ==================== 9. COPY EMAIL TOAST ====================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('copy-toast');

  if (copyEmailBtn && toast) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'yangzhuoli2009@163.com';
      navigator.clipboard.writeText(email).then(() => {
        toast.classList.remove('opacity-0', 'pointer-events-none');
        toast.classList.add('opacity-100');
        setTimeout(() => {
          toast.classList.remove('opacity-100');
          toast.classList.add('opacity-0', 'pointer-events-none');
        }, 2000);
      });
    });
  }

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
