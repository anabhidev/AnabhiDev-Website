// ================================================================
// AnabhiDev-WEB — AnabhiDev Vertical Showcase (SPA)
// Vanilla JS
// Development · Anabhi Dev
// Version   : 1.4 (Premium Lux)
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const mobileMenuTrigger = document.querySelector('.mobile-menu-trigger');
  const closeMenuTrigger = document.querySelector('.close-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  
  const container = document.getElementById('fullpage-container');
  const scenes = document.querySelectorAll('.scene');
  const dots = document.querySelectorAll('.dot');
  const header = document.querySelector('.site-header');
  const logo = document.getElementById('header-logo');
  
  const totalScenes = scenes.length;
  let currentScene = 0;
  let isAnimating = false;
  let startY = 0;
  let countersAnimated = false; // To ensure counting only happens once

  // Mobile Menu Logic
  if (mobileMenuTrigger && closeMenuTrigger && mobileOverlay) {
    mobileMenuTrigger.addEventListener('click', () => {
      mobileOverlay.classList.add('is-active');
    });

    closeMenuTrigger.addEventListener('click', () => {
      mobileOverlay.classList.remove('is-active');
    });
  }

  // Counter Animation Logic
  function animateCounters(scene) {
    if (scene.dataset.counted) return;
    
    const counters = scene.querySelectorAll('.counter');
    if (counters.length === 0) return;
    
    scene.dataset.counted = 'true';

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };
      
      // Delay counting to sync with fade-in
      setTimeout(() => {
        requestAnimationFrame(updateCount);
      }, 1600); 
    });
  }

  function updateScene(newIndex) {
    if (newIndex < 0) newIndex = totalScenes - 1;
    if (newIndex >= totalScenes) newIndex = 0;
    
    if (isAnimating) return;
    
    isAnimating = true;
    currentScene = newIndex;
    
    // Transform container
    container.style.transform = `translateY(-${currentScene * window.innerHeight}px)`;
    
    // Update active classes
    scenes.forEach((scene, i) => {
      if (i === currentScene) {
        scene.classList.add('active');
        
        // Header Theme & Logo Switching
        if (scene.classList.contains('scene-light')) {
          header.classList.add('header-light');
          if (logo) logo.src = 'https://anabhidev.com/logo-black.webp';
        } else {
          header.classList.remove('header-light');
          if (logo) logo.src = 'https://anabhidev.com/logo.webp';
        }

        // Trigger counters for this scene
        animateCounters(scene);

      } else {
        scene.classList.remove('active');
      }
    });

    // Update Dots
    dots.forEach((dot, i) => {
      if (i === currentScene) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Prevent rapid scrolling (matches new CSS transition duration)
    setTimeout(() => {
      isAnimating = false;
    }, 1200); 
  }

  // Mouse Wheel
  window.addEventListener('wheel', (e) => {
    if (mobileOverlay.classList.contains('is-active')) return;
    
    if (Math.abs(e.deltaY) > 20) {
      if (e.deltaY > 0) {
        updateScene(currentScene + 1);
      } else {
        updateScene(currentScene - 1);
      }
    }
  }, { passive: true });

  // Touch/Swipe
  window.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (mobileOverlay.classList.contains('is-active')) return;
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;

    if (Math.abs(diff) > 50) { 
      if (diff > 0) {
        updateScene(currentScene + 1);
      } else {
        updateScene(currentScene - 1);
      }
    }
  }, { passive: true });

  // Keyboard Arrows
  window.addEventListener('keydown', (e) => {
    if (mobileOverlay.classList.contains('is-active')) {
      if (e.key === 'Escape') mobileOverlay.classList.remove('is-active');
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      updateScene(currentScene + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      updateScene(currentScene - 1);
    }
  });

  // Dots click
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateScene(index);
    });
  });

  // Mobile Menu Links click
  const menuLinks = document.querySelectorAll('.mobile-nav-list a');
  menuLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetIndex = parseInt(link.getAttribute('data-index'));
      if (!isNaN(targetIndex)) {
        e.preventDefault();
        mobileOverlay.classList.remove('is-active');
        updateScene(targetIndex);
      }
    });
  });

  // Window Resize
  window.addEventListener('resize', () => {
    container.style.transform = `translateY(-${currentScene * window.innerHeight}px)`;
  });

  // Initial setup trigger
  updateScene(0);
});
