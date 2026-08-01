// A pool of symbols to generate (Hearts, Roses, Stars)
const particlePool = ["♥️", "🌸", "🌹", "💖", "✨", "❤️‍🔥"];

// 1. GENTLY FLOATING PARTICLES (on the envelope screen while waiting)
const envelope = document.getElementById('envelope');

function createFloatingParticle() {
    // Only add floating particles if the envelope is visible
    if (!envelope || envelope.style.display === 'none') return;

    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.innerHTML = particlePool[Math.floor(Math.random() * particlePool.length)];
    
    // Set random start position
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = (Math.random() * 50) + 100 + 'vh'; // Starts below the screen
    
    envelope.appendChild(particle);

    // Remove the element after its 10-second animation completes
    setTimeout(() => {
        particle.remove();
    }, 10000);
}

// Start creating floating particles every 600ms
const floatingInterval = setInterval(createFloatingParticle, 600);


// 2. THE EXPLOSION (on Click)
envelope.addEventListener('click', function(event) {
    
    // Stop the floating background particles
    clearInterval(floatingInterval);
    document.querySelectorAll('.floating-particle').forEach(p => p.remove());

    // Calculate click location relative to the screen
    const clickX = event.clientX;
    const clickY = event.clientY;

    // A loop to create 60 explosion particles (Hearts/Roses)
    for (let i = 0; i < 60; i++) {
        createExplosionParticle(clickX, clickY);
    }

    // --- Transition Timing (Synchronized with explosion) ---
    
    // Step A: Envelope starts fading immediately (1.5s CSS transition)
    this.style.opacity = '0';
    
    // Step B: Let the 1.2s explosion animation finish before revealing the letter
    setTimeout(() => {
        this.style.display = 'none'; // Completely hide envelope screen
        
        // Step C: Reveal the letter
        const letter = document.getElementById('letter');
        letter.classList.remove('hidden');
        letter.classList.add('fade-in');
    }, 1200); // 1.2 seconds: length of the explosion animation
});

// Helper function to generate an explosion particle at specific coordinates
function createExplosionParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle-burst';
    particle.innerHTML = particlePool[Math.floor(Math.random() * particlePool.length)];

    // Initial position at click location
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    // Set dynamic explosion trajectory and scale variables (CSS properties)
    const angle = Math.random() * Math.PI * 2; // Random direction (circle)
    const distance = 80 + Math.random() * 250; // Random explosion distance

    particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
    particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
    particle.style.setProperty('--s', 0.5 + Math.random() * 1.5); // Random dynamic scale

    envelope.appendChild(particle);

    // Remove the element after its 1.2-second burst completes
    setTimeout(() => {
        particle.remove();
    }, 1200);
}