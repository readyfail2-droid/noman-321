/**
 * DR. SADAF SARWAR HOSPITAL — Interactive Logic & Clinical Data System
 * Author: Antigravity Healthcare Engineering
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initSeasonalHours();
  initServicesModal();
  initAppointmentForm();
  initModals();
  initDateConstraints();
});

/**
 * 1. Sticky Header with Scroll Effect
 */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 2. Mobile Drawer Navigation
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-nav-drawer');
  const navLinks = drawer ? drawer.querySelectorAll('.mobile-nav-item, .btn') : [];

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * 3. Seasonal Hours Detection
 * Automatically highlights the correct season based on month (Summer: April-October, Winter: Nov-March)
 */
function initSeasonalHours() {
  const currentMonth = new Date().getMonth(); // 0 = Jan, 9 = Oct, 10 = Nov
  const isSummer = currentMonth >= 3 && currentMonth <= 9; // April through October

  const summerCard = document.getElementById('card-summer');
  const winterCard = document.getElementById('card-winter');

  if (summerCard && winterCard) {
    if (isSummer) {
      summerCard.classList.add('active-season');
      winterCard.classList.remove('active-season');
    } else {
      winterCard.classList.add('active-season');
      summerCard.classList.remove('active-season');
    }
  }
}

/**
 * 4. Date Constraints: Prevent past date selection for appointments
 */
function initDateConstraints() {
  const dateInput = document.getElementById('appointment-date');
  if (!dateInput) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;

  dateInput.setAttribute('min', minDate);
  // Default to today or tomorrow
  dateInput.value = minDate;
}

/**
 * 5. Clinical Services Detail Data & Dynamic Drawer/Modal
 */
const clinicalServicesData = {
  maternal: {
    eyebrow: "ANTENATAL & PERINATAL MEDICINE",
    title: "Maternal & Pregnancy Care",
    badge: "Core Specialty",
    lead: "Comprehensive, nurturing antenatal journeys guided personally by District Gynecologist Dr. Sadaf Sarwar.",
    features: [
      "Early fetal viability scans and precise gestational age assessment",
      "High-risk pregnancy monitoring (gestational diabetes, hypertension, pre-eclampsia)",
      "Maternal nutritional plans and tailored supplementation",
      "Gentle fetal heartbeat monitoring and Doppler ultrasound assessments",
      "Compassionate birth planning and personalized labor preparation"
    ],
    doctorNote: "We believe in calm, dignified pregnancy care where mothers are treated with gentleness and clinical diligence at every checkup."
  },
  gynecology: {
    eyebrow: "WOMEN'S REPRODUCTIVE HEALTH",
    title: "Gynecology & Hormonal Well-being",
    badge: "Diagnostic & Surgical",
    lead: "Specialized diagnostics and surgical interventions for conditions affecting women across all life stages.",
    features: [
      "PCOS (Polycystic Ovary Syndrome) and metabolic-hormonal regulation",
      "Menstrual disorders, irregular cycles, and heavy bleeding management",
      "Uterine fibroids, ovarian cysts, and endometriosis treatments",
      "Surgical competence: Laparotomy, Hysterectomy, and D&C",
      "Pelvic pain evaluation and gentle peri-menopausal guidance"
    ],
    doctorNote: "Dr. Sadaf Sarwar brings 19+ years of surgical and clinical mastery to ensure conservative management whenever possible."
  },
  infertility: {
    eyebrow: "ADVANCED REPRODUCTIVE CLINIC",
    title: "Infertility & Fertility Care",
    badge: "ACRM Certified",
    lead: "Scientific, empathetic fertility evaluations and treatment protocols tailored for couples seeking parenthood.",
    features: [
      "Comprehensive couple fertility screening and hormonal profiling",
      "Follicular tracking via high-resolution ultrasound in-clinic",
      "Ovulation induction regimens with meticulous clinical monitoring",
      "Tubal patency assessment and uterine cavity evaluations",
      "Personalized lifestyle, nutritional, and medicinal protocols"
    ],
    doctorNote: "Infertility requires both scientific precision and emotional warmth. We guide you step by step with transparency."
  },
  obstetrics: {
    eyebrow: "LABOR & DELIVERY SUITES",
    title: "Obstetrics & Delivery Care",
    badge: "Surgical Mastery",
    lead: "Safe, sterile and patient-centered delivery management backed by experienced maternal surgeons.",
    features: [
      "Normal vaginal deliveries conducted in sterile, calm suites",
      "Expert instrumental deliveries for complicated vertex presentations",
      "Planned elective and urgent emergency Cesarean Sections (C-Section)",
      "Continuous fetal cardiotocography (CTG) monitoring during labor",
      "Postpartum maternal care, pelvic healing, and breastfeeding guidance"
    ],
    doctorNote: "Over 19 years of hands-on delivery experience across public teaching hospitals and private practice."
  },
  ultrasound: {
    eyebrow: "ON-SITE SONOGRAPHY",
    title: "Ultrasound & Diagnostics",
    badge: "Real-time Scans",
    lead: "Immediate diagnostic imaging conducted directly during your consultation for seamless medical decisions.",
    features: [
      "Obstetric sonography: dating, nuchal translucency, and growth scans",
      "Detailed fetal anomaly assessment and amniotic fluid index (AFI)",
      "Transvaginal (TVS) and pelvic ultrasound for uterine and ovarian pathology",
      "Serial follicular tracking during fertility treatment cycles",
      "Immediate reporting without third-party laboratory delays"
    ],
    doctorNote: "Direct in-consultation scans allow Dr. Sadaf to discuss findings with you immediately, saving vital time and multiple clinic visits."
  },
  lab: {
    eyebrow: "DIAGNOSTIC PATHOLOGY",
    title: "Laboratory Services",
    badge: "Rapid Turnaround",
    lead: "On-site diagnostic blood testing, hormonal profiling, and antenatal screening.",
    features: [
      "Complete Blood Count (CBC), Blood Group & Rh Factor",
      "Comprehensive hormonal panels: AMH, LH, FSH, Prolactin, Thyroid (TSH)",
      "Viral markers: Hepatitis B, Hepatitis C, HIV screening",
      "Blood sugar fasting / random, HbA1c, and Oral Glucose Tolerance Tests",
      "Complete urine examination and microscopic culture analysis"
    ],
    doctorNote: "Strict laboratory calibration ensures accurate, dependable results essential for high-risk maternal decisions."
  },
  pharmacy: {
    eyebrow: "INTERNAL DISPENSARY",
    title: "Pharmacy Services",
    badge: "100% Genuine Medication",
    lead: "Temperature-controlled internal pharmacy dispensing verified obstetric and gynecological pharmaceuticals.",
    features: [
      "Authentic prenatal vitamins, iron infusions, and calcium supplements",
      "Specialized fertility medications and hormonal support therapies",
      "Emergency post-delivery medicines and uterotonics",
      "Cold-chain maintained vaccines and temperature-sensitive injections",
      "Registered pharmacist consultation regarding dosages and interactions"
    ],
    doctorNote: "Direct internal dispensary eliminates the risk of counterfeit medications and ensures immediate patient convenience."
  },
  cosmetic: {
    eyebrow: "RESTORATIVE PROCEDURES",
    title: "Cosmetic Gynecology",
    badge: "Sub-Specialty Focus",
    lead: "Discreet, advanced aesthetic and functional pelvic restoration procedures.",
    features: [
      "Vaginal wall tightening and restorative repair procedures",
      "Perineal tear revision and post-delivery scar rehabilitation",
      "Pelvic floor functional restoration for improved comfort and confidence",
      "Treatment for stress urinary incontinence associated with pelvic laxity",
      "Private, confidential consultation with complete female dignity"
    ],
    doctorNote: "Cosmetic gynecology restores both physiological comfort and personal confidence in a safe surgical environment."
  }
};

function initServicesModal() {
  const serviceCards = document.querySelectorAll('.service-card[data-service-id]');
  const modal = document.getElementById('service-detail-modal');
  const modalEyebrow = document.getElementById('service-modal-eyebrow');
  const modalTitle = document.getElementById('service-modal-title');
  const modalContent = document.getElementById('service-modal-content');
  const serviceBookCta = document.getElementById('service-book-cta');

  if (!modal || !modalContent) return;

  serviceCards.forEach(card => {
    const handleTrigger = () => {
      const serviceId = card.getAttribute('data-service-id');
      const data = clinicalServicesData[serviceId];
      if (!data) return;

      modalEyebrow.textContent = data.eyebrow;
      modalTitle.textContent = data.title;

      let html = `
        <div class="service-modal-badge">${data.badge}</div>
        <p class="service-modal-lead">${data.lead}</p>
        <div class="service-modal-features">
          <h4>Clinical Scope &amp; Procedures:</h4>
          <ul>
            ${data.features.map(item => `<li><span class="check-bullet">✓</span> ${item}</li>`).join('')}
          </ul>
        </div>
        <div class="service-modal-quote">
          <em>“${data.doctorNote}”</em>
        </div>
      `;

      modalContent.innerHTML = html;

      // Update CTA to pre-select this service in the appointment form
      if (serviceBookCta) {
        serviceBookCta.onclick = () => {
          modal.classList.remove('open');
          const serviceSelect = document.getElementById('service-select');
          if (serviceSelect) {
            // Find option matching or close to title
            for (let i = 0; i < serviceSelect.options.length; i++) {
              if (serviceSelect.options[i].text.toLowerCase().includes(data.title.toLowerCase().split(' ')[0])) {
                serviceSelect.selectedIndex = i;
                break;
              }
            }
          }
        };
      }

      openModal(modal);
    };

    card.addEventListener('click', handleTrigger);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTrigger();
      }
    });
  });
}

/**
 * 6. Interactive Appointment Booking Form
 */
function initAppointmentForm() {
  const form = document.getElementById('appointment-booking-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('patient-name');
    const phoneInput = document.getElementById('patient-phone');
    const dateInput = document.getElementById('appointment-date');
    const timeInput = document.getElementById('preferred-time');
    const serviceInput = document.getElementById('service-select');
    const messageInput = document.getElementById('patient-message');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
      setError(nameInput, true);
      isValid = false;
    } else {
      setError(nameInput, false);
    }

    // Validate Phone (At least 10 digits)
    const phoneVal = phoneInput.value.trim().replace(/[\s-]/g, '');
    if (!phoneVal || phoneVal.length < 10) {
      setError(phoneInput, true);
      isValid = false;
    } else {
      setError(phoneInput, false);
    }

    // Validate Date
    if (!dateInput.value) {
      setError(dateInput, true);
      isValid = false;
    } else {
      setError(dateInput, false);
    }

    // Validate Time
    if (!timeInput.value) {
      setError(timeInput, true);
      isValid = false;
    } else {
      setError(timeInput, false);
    }

    // Validate Service
    if (!serviceInput.value) {
      setError(serviceInput, true);
      isValid = false;
    } else {
      setError(serviceInput, false);
    }

    if (!isValid) return;

    // Construct WhatsApp pre-filled message
    const patientName = nameInput.value.trim();
    const patientPhone = phoneInput.value.trim();
    const aptDate = dateInput.value;
    const aptTime = timeInput.value;
    const aptService = serviceInput.value;
    const aptNotes = messageInput.value.trim();

    const waText = encodeURIComponent(
      `Assalam o Alaikum Dr. Sadaf Sarwar Hospital,\n` +
      `I would like to book an appointment with Dr. Sadaf Sarwar.\n\n` +
      `*Patient Name:* ${patientName}\n` +
      `*Contact:* ${patientPhone}\n` +
      `*Preferred Date:* ${aptDate}\n` +
      `*Time Slot:* ${aptTime}\n` +
      `*Clinical Service:* ${aptService}\n` +
      (aptNotes ? `*Notes:* ${aptNotes}\n\n` : `\n`) +
      `Please confirm my token. Thank you.`
    );

    const waUrl = `https://wa.me/923345061057?text=${waText}`;

    // Show Confirmation Toast
    showToast(
      "Appointment Reserved",
      `Thank you, ${patientName}. Opening hospital WhatsApp to confirm token instantly...`
    );

    // Reset Form
    form.reset();
    initDateConstraints();

    // Automatically trigger WhatsApp in new tab after 1.2 seconds for best UX
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  });

  function setError(inputElem, hasError) {
    const parent = inputElem.closest('.form-group');
    if (!parent) return;
    if (hasError) {
      parent.classList.add('has-error');
    } else {
      parent.classList.remove('has-error');
    }
  }
}

/**
 * 7. Generic Modal Manager (Video consultation, Careers, Expansion)
 */
function initModals() {
  const videoModal = document.getElementById('video-consultation-modal');
  const videoBtn = document.getElementById('hero-video-btn');
  const videoForm = document.getElementById('video-consultation-form');

  if (videoBtn && videoModal) {
    videoBtn.addEventListener('click', () => openModal(videoModal));
  }

  if (videoForm) {
    videoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const vName = document.getElementById('video-patient-name').value;
      const vPhone = document.getElementById('video-patient-phone').value;
      const vConcern = document.getElementById('video-concern').value;

      closeModal(videoModal);
      showToast("Video Consultation Requested", `We will message ${vName} at ${vPhone} with the video link.`);

      const waText = encodeURIComponent(
        `Assalam o Alaikum,\nVideo Consultation Request for Dr. Sadaf Sarwar:\n` +
        `Patient: ${vName}\nPhone: ${vPhone}\nConcern: ${vConcern}`
      );
      setTimeout(() => {
        window.open(`https://wa.me/923345061057?text=${waText}`, '_blank');
      }, 1000);
    });
  }

  // Careers Modal
  const careerModal = document.getElementById('career-application-modal');
  const careerBtn = document.getElementById('open-career-modal-btn');
  const careerRoleBtns = document.querySelectorAll('.role-apply-btn');
  const roleSelect = document.getElementById('applicant-role');
  const careerForm = document.getElementById('career-form');

  if (careerBtn && careerModal) {
    careerBtn.addEventListener('click', () => openModal(careerModal));
  }

  careerRoleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-role');
      if (roleSelect && role) {
        // Attempt to match or select
        for (let i = 0; i < roleSelect.options.length; i++) {
          if (roleSelect.options[i].text.includes(role) || role.includes(roleSelect.options[i].value)) {
            roleSelect.selectedIndex = i;
            break;
          }
        }
      }
      openModal(careerModal);
    });
  });

  if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const applicantName = document.getElementById('applicant-name').value;
      closeModal(careerModal);
      showToast("Application Submitted", `Thank you, ${applicantName}. Our administrative medical director will review your details.`);
      careerForm.reset();
    });
  }

  // Expansion Modal
  const expansionModal = document.getElementById('expansion-modal');
  const expansionBtn = document.getElementById('expansion-learn-more-btn');
  if (expansionBtn && expansionModal) {
    expansionBtn.addEventListener('click', () => openModal(expansionModal));
  }

  // Close handlers on all close buttons & backgrounds
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) closeModal(modal);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m));
    }
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/**
 * 8. Toast Notifications
 */
let toastTimeout;
function showToast(title, message) {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');
  const toastClose = document.getElementById('toast-close-btn');

  if (!toast) return;

  if (toastTitle) toastTitle.textContent = title;
  if (toastMessage) toastMessage.textContent = message;

  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 6000);

  if (toastClose) {
    toastClose.onclick = () => {
      toast.classList.remove('show');
    };
  }
}
