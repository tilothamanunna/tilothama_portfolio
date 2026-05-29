document.addEventListener('DOMContentLoaded', () => {

  /* ── THEME TOGGLE ── */
  const themeBtn = document.getElementById('theme-btn');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  html.setAttribute('data-theme', savedTheme);
  
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const newTheme = current === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  /* ── HAMBURGER MENU ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });
    
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });
  }

  /* ── RESUME GATE ── */
  const resumeFormEl = document.getElementById('resume-form-element');
  const resumeForm = document.getElementById('resume-form');
  const resumeContent = document.getElementById('resume-content');
  
  if (resumeFormEl && resumeForm && resumeContent) {
    if (localStorage.getItem('resumeAccess') === 'true') {
      resumeForm.style.display = 'none';
      resumeContent.style.display = 'block';
    }
    
    resumeFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('res-name')?.value.trim();
      const email = document.getElementById('res-email')?.value.trim();
      const submitBtn = resumeFormEl.querySelector('button');
      
      if (!name || !email || !email.includes('@')) {
        alert('Please enter valid name and email');
        return;
      }
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Verifying...';
      
      setTimeout(() => {
        localStorage.setItem('resumeAccess', 'true');
        localStorage.setItem('viewerInfo', JSON.stringify({ name, email }));
        resumeForm.style.display = 'none';
        resumeContent.style.display = 'block';
      }, 500);
    });
  }

  /* ── CONTACT FORM ── */
  const contactForm = document.querySelector('form[action*="formspree"]');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          contactForm.reset();
          submitBtn.innerHTML = '✓ Sent!';
          submitBtn.style.opacity = '0.7';
          
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
          }, 2000);
        } else {
          throw new Error('Failed');
        }
      } catch (err) {
        submitBtn.innerHTML = '✗ Error';
        submitBtn.style.opacity = '0.7';
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.opacity = '1';
          submitBtn.disabled = false;
        }, 2000);
      }
    });
  }

});