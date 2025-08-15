document.addEventListener('DOMContentLoaded', () => {
    const NAV = [
        { id: 'home', label: 'Home' }, { id: 'about', label: 'About' },
        { id: 'initiatives', label: 'Initiatives' }, { id: 'research', label: 'Research' },
        { id: 'skills', label: 'Skills' }, { id: 'achievements', label: 'Achievements' },
        { id: 'certifications', label: 'Certifications' }, { id: 'education', label: 'Education' },
        { id: 'contact', label: 'Contact' },
    ];

    const PROFILE = {
        name: 'Lohitaksha Koppada',
        tagline: 'An entrepreneur, author, and researcher navigating the intersection of technology, human potential, and innovation.',
        summary: 'I believe that the most meaningful progress comes from within. My work is a reflection of this belief...',
        email: 'lohitaksha.koppada123@gmail.com',
        social: { linkedin: 'https://lohitakshakoppada.wixsite.com/lohitakshaden', site: 'https://lohitakshakoppada.wixsite.com/lohitaksha-fiard' },
    };

    const createChip = text => `<span class="px-2 py-1 rounded-full border border-blue-500/50 text-xs opacity-80 bg-blue-500/10 text-blue-300">${text}</span>`;
    const createCard = content => `<div class="card-glass">${content}</div>`;
    const createAccordion = (title, content) => `
        <div class="card-glass overflow-hidden">
            <button class="accordion-trigger flex justify-between items-center w-full p-5 text-left">
                <span class="font-semibold">${title}</span>
                <svg class="accordion-arrow w-4 h-4 transition-transform transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div class="accordion-content">
                <div class="p-5 pt-0 opacity-90 text-sm">${content}</div>
            </div>
        </div>
    `;

    const renderNav = () => {
        const desktopNav = document.getElementById('desktop-nav');
        const mobileNavContainer = document.querySelector('#mobile-nav > div');
        const navHTML = NAV.map(n => `<a href="#${n.id}" class="opacity-80 hover:opacity-100">${n.label}</a>`).join('');
        desktopNav.innerHTML = navHTML;
        mobileNavContainer.innerHTML = navHTML;
    };

    const renderHero = () => {
        document.getElementById('hero-name').innerText = `I’m ${PROFILE.name}`;
        document.getElementById('hero-tagline').innerText = PROFILE.tagline;
        document.getElementById('hero-summary').innerText = PROFILE.summary;
        document.getElementById('hero-ctas').innerHTML = `
            <a href="mailto:${PROFILE.email}" class="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 hover:bg-white/10 transition">Email Me</a>
            <a href="${PROFILE.social.linkedin}" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 hover:bg-white/10 transition">LinkedIn</a>
            <a href="${PROFILE.social.site}" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 hover:bg-white/10 transition">FIARD</a>
        `;
    };

    const setupEventListeners = () => {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileNav = document.getElementById('mobile-nav');
        mobileMenuButton.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
            mobileMenuButton.textContent = mobileNav.classList.contains('hidden') ? '☰' : '✕';
        });

        document.body.addEventListener('click', e => {
            const trigger = e.target.closest('.accordion-trigger');
            if (!trigger) return;
            const content = trigger.nextElementSibling;
            trigger.classList.toggle('open');
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
        });
    };

    const runConstellation = () => {
        const canvas = document.getElementById('constellation-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [], mouse = { x: 0, y: 0 };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.vx = -this.vx;
                if (this.y > canvas.height || this.y < 0) this.vy = -this.vy;
                this.x += this.vx;
                this.y += this.vy;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const count = Math.floor((canvas.width * canvas.height) / 10000);
            for (let i = 0; i < count; i++) particles.push(new Particle());
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.update();
                p.draw();
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = p.x - particles[j].x, dy = p.y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 150})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', () => { resizeCanvas(); init(); });
        window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });

        resizeCanvas();
        init();
        animate();
    };

    const initApp = () => {
        renderNav();
        renderHero();
        setupEventListeners();
        runConstellation();
    };

    initApp();
});
