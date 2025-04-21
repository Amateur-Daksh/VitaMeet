// Toggle popups
document.querySelectorAll('.quick-option').forEach(option => {
    option.addEventListener('click', () => {
      const popupId = option.dataset.popup;
      document.getElementById(popupId).classList.add('active');
    });
  });
  
  // Close popups
  document.querySelectorAll('.popup-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.popup-overlay').classList.remove('active');
    });
  });
  function togglePopup(popupId) {
    document.getElementById(popupId).classList.toggle('active');
  }
  
  // Close popups when clicking outside
  document.querySelectorAll('.popup-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if(e.target === this) togglePopup(this.id);
    });
  });

  // Symptom Wizard Functionality
let currentStep = 1;
let selectedSymptoms = [];

document.querySelectorAll('.symptom-chip').forEach(btn => {
  btn.addEventListener('click', function() {
    this.classList.toggle('selected');
    const symptom = this.dataset.symptom;
    
    if(this.classList.contains('selected')) {
      selectedSymptoms.push(symptom);
    } else {
      selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
    }
  });
});

document.querySelectorAll('.severity-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.severity-btn').forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');
    
    // Simple triage logic
    const severity = parseInt(this.dataset.level);
    let recommendation = "General Physician";
    
    if(selectedSymptoms.includes('fever') && severity > 2) {
      recommendation = "Urgent Care";
    } else if(selectedSymptoms.includes('chest-pain')) {
      recommendation = "Emergency";
    }
    
    document.querySelector('.recommendation h4').textContent = `👉 Consult a ${recommendation}`;
    goToStep(3);
  });
});

function goToStep(step) {
  document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
  document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
  currentStep = step;
}

// Emergency Functions
function callEmergency() {
  // For web: Show emergency numbers
  // For mobile: Initiate phone call
  window.location.href = "tel:112"; // Universal emergency number
  logEmergencyEvent('called_services');
}

function connectDoctor() {
  // Start immediate video consultation
  showPopup('videoCallPopup');
  logEmergencyEvent('video_doctor');
  
  // Add your video call implementation here
}

function logEmergencyEvent(eventType) {
  // Send to analytics/backend
  fetch('/log-emergency', {
    method: 'POST',
    body: JSON.stringify({ event: eventType })
  });
}