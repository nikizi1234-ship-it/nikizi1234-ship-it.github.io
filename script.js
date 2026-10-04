/**
 * ИНИЦИАЛИЗАЦИЯ ВСЕХ ИНТЕРАКТИВНЫХ ЭЛЕМЕНТОВ
 * + Эффект светлячков на карточках, оверлей мобильного меню,
 *   свайпы карусели, защита от ошибок при отсутствии элементов.
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeServicesCarousel();
    initializeScrollAnimations();
    initializeMobileMenu();
    initializeBackToTop();
    initializeHeaderScroll();
    initMobileSkillsToggle();
    initScrollSpy();
    initializeParticles();
    initCardFireflies();
});

/* ==================== КАРУСЕЛЬ УСЛУГ ==================== */
let currentServiceIndex = 0;
let serviceAutoScroll = null;
const servicesTrack = document.getElementById('servicesTrack');
const serviceIndicators = document.getElementById('serviceIndicators');

function initializeServicesCarousel() {
    if (!servicesTrack || !serviceIndicators) return;

    const items = servicesTrack.children;
    for (let i = 0; i < items.length; i++) {
        const indicator = document.createElement('button');
        indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
        indicator.setAttribute('aria-label', `Услуга ${i + 1}`);
        indicator.addEventListener('click', () => moveToService(i));
        serviceIndicators.appendChild(indicator);
    }
    updateServicesCarousel();

    // Автопрокрутка: пауза при наведении на карусель и на тач-ввод
    const carousel = servicesTrack.closest('.services-carousel') || servicesTrack;
    carousel.addEventListener('mouseenter', stopServiceAutoScroll);
    carousel.addEventListener('mouseleave', startServiceAutoScroll);

    // Свайпы на тач-устройствах
    let startX = 0;
    let currentX = 0;
    let dragging = false;

    servicesTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        currentX = startX;
        dragging = true;
        stopServiceAutoScroll();
    }, { passive: true });

    servicesTrack.addEventListener('touchmove', (e) => {
        if (dragging) currentX = e.touches[0].clientX;
    }, { passive: true });

    servicesTrack.addEventListener('touchend', () => {
        if (!dragging) return;
        dragging = false;
        const dx = currentX - startX;
        if (Math.abs(dx) > 40) {
            moveServiceCarousel(dx < 0 ? 1 : -1);
        }
        startServiceAutoScroll();
    });

    // Пауза, когда вкладка скрыта
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopServiceAutoScroll();
        else startServiceAutoScroll();
    });

    startServiceAutoScroll();
}

function startServiceAutoScroll() {
    stopServiceAutoScroll(); // защита от наложения интервалов
    if (!servicesTrack) return;
    serviceAutoScroll = setInterval(() => moveServiceCarousel(1), 5000);
}

function stopServiceAutoScroll() {
    if (serviceAutoScroll) {
        clearInterval(serviceAutoScroll);
        serviceAutoScroll = null;
    }
}

function moveServiceCarousel(direction) {
    if (!servicesTrack) return;
    const items = servicesTrack.children;
    currentServiceIndex = (currentServiceIndex + direction + items.length) % items.length;
    updateServicesCarousel();
}

function moveToService(index) {
    if (!servicesTrack) return;
    currentServiceIndex = index;
    updateServicesCarousel();
}

function updateServicesCarousel() {
    if (!servicesTrack || !serviceIndicators) return;
    servicesTrack.style.transform = `translateX(${-currentServiceIndex * 100}%)`;
    const indicators = serviceIndicators.children;
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.toggle('active', i === currentServiceIndex);
    }
}

/* ==================== МОБИЛЬНОЕ МЕНЮ ==================== */
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (!mobileMenuBtn || !navLinks) return;

    const body = document.body;

    // Затемняющий оверлей за меню (создаётся один раз)
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    body.appendChild(overlay);

    function setMenu(open) {
        navLinks.classList.toggle('active', open);
        overlay.classList.toggle('active', open);
        body.classList.toggle('menu-open', open);
        mobileMenuBtn.setAttribute('aria-expanded', String(open));
        mobileMenuBtn.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
        mobileMenuBtn.innerHTML = open ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    }

    mobileMenuBtn.addEventListener('click', function() {
        setMenu(!navLinks.classList.contains('active'));
    });

    overlay.addEventListener('click', () => setMenu(false));

    navLinks.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', () => setMenu(false));
    });

    // Escape закрывает меню
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) setMenu(false);
    });

    // При переходе на десктопную ширину меню сбрасывается
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) setMenu(false);
    });
}

/* ==================== АНИМАЦИИ ПРИ СКРОЛЛЕ ==================== */
function initializeScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    if (!fadeElements.length) return;

    if (!('IntersectionObserver' in window)) {
        fadeElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    fadeElements.forEach(el => observer.observe(el));
}

/* ==================== SPY-НАВИГАЦИЯ ==================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');
    if (!sections.length || !navLinks.length) return;
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    const active = link.dataset.section === entry.target.id;
                    link.classList.toggle('active', active);
                    if (active) link.setAttribute('aria-current', 'true');
                    else link.removeAttribute('aria-current');
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => observer.observe(section));
}

/* ==================== КНОПКА «НАВЕРХ» ==================== */
function initializeBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                btn.classList.toggle('visible', window.pageYOffset > 300);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ==================== ХЕДЕР ПРИ СКРОЛЛЕ ==================== */
function initializeHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.pageYOffset > 50);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ==================== ПЛАВНЫЙ СКРОЛЛ К СЕКЦИИ ==================== */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ==================== ДАННЫЕ УСЛУГ ==================== */
const serviceData = {
    ml: {
        title: "Data Science Модели",
        description: "Подготовка датасетов и обучение нейросетей под конкретные задачи. Работа с компьютерным зрением (YOLO, CNN) и развертывание тяжелых моделей на облачных мощностях (Tesla T4, Vast.ai).",
        features: ["YOLO Fine-tuning", "VLM", "Vast.ai / T4", "Сбор датасетов"],
        contact: "@Set_ez"
    },
    hardware: {
        title: "Hardware & Прошивки",
        description: "Проектирование логики для встраиваемых систем. Написание прошивок (C++/Rust) для микроконтроллеров STM32 и скриптов-оркестраторов для Raspberry Pi. Интеграция датчиков по шинам I2C/SPI.",
        features: ["С++ / Rust", "STM32 / RPi", "I2C / SPI", "MAVLink"],
        contact: "@Set_ez"
    },
    '3d-models': {
        title: "САПР Инженерия и 3D-моделирование",
        description: "Проектирование твердотельных механизмов и корпусов в КОМПАС-3D. Полный цикл подготовки к FDM-печати сложными инженерными пластиками. Создание PBR-рендеров в Blender.",
        features: ["КОМПАС-3D", "Blender 3D", "Bambu Lab", "PETG-CF / ABS"],
        contact: "@Set_ez"
    }
};

/* ==================== ДАННЫЕ ПРОЕКТОВ ==================== */
const projectData = {
    'nda-project': {
        title: "AegisEmber Core (R&D Hardware)",
        subtitle: "Закрытый инженерный проект по разработке Edge-вычислительного узла для БПЛА.",
        description: "Проект полного цикла: от проектирования PBR-оболочки до написания логики обработки видеопотока. Модуль объединяет в себе микрокомпьютер и ПЛИС для аппаратного ускорения алгоритмов машинного зрения (Data Science). Узел полностью автономен.",
        techStack: ["Edge Computing", "САПР", "Raspberry Pi", "FPGA", "VLM / YOLO"],
        features: [
            { title: "Гетерогенная Архитектура", description: "Интеграция процессора и ПЛИС для пространственного анализа кадра." },
            { title: "Термодинамика корпуса", description: "Проектирование герметичного корпуса с отводом тепла через фрезерованные радиаторы." },
            { title: "Автономная Навигация", description: "Встроенный Оркестратор на Python/C++ для чтения MAVLink-телеметрии." }
        ],
        hasSourceCode: false
    },
    'demon-legacy': {
        title: "Demon Legacy RPG",
        subtitle: "Высоконагруженная Multiplayer RPG на платформе Roblox",
        description: "Разработал масштабный игровой проект с клиент-серверной архитектурой. Реализована сложная экономическая математика, система инвентаря, прокачка персонажа и боевые механики. Для проекта были с нуля созданы PBR 3D-модели в Blender.",
        techStack: ["Lua", "Roblox Studio", "Blender", "Multiplayer", "Game Design"],
        features: [
            { title: "Игровая Экономика", description: "Сбалансированная торговая система и алгоритмы генерации лута." },
            { title: "Multiplayer Синхронизация", description: "Оптимизация сетевых пакетов для плавной синхронизации действий игроков." }
        ],
        hasSourceCode: true,
        githubUrl: "https://www.roblox.com/games/107962526921864/Demon-Legacy"
    },
    'dev-net': {
        title: "Dev Net Messenger",
        subtitle: "Веб‑мессенджер с real-time архитектурой",
        description: "Backend-ориентированный проект мессенджера. Серверная часть построена на асинхронном фреймворке FastAPI. Для мгновенной доставки сообщений без polling-задержек реализовано постоянное двунаправленное соединение по протоколу WebSocket.",
        techStack: ["Python", "FastAPI", "WebSocket", "JWT Security", "SQL"],
        features: [
            { title: "WebSocket Транспорт", description: "Реализация комнат (rooms) и мгновенного бродкаста сообщений." },
            { title: "Безопасность API", description: "Защита эндпоинтов с помощью JWT-токенов." }
        ],
        hasSourceCode: true,
        githubUrl: "https://github.com/nikizi1234-ship-it/DevNetMessager/tree/main"
    }
};

/* ==================== МОДАЛЬНЫЕ ОКНА ==================== */
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
let lastScrollPosition = 0;
let lastFocusedElement = null;
let isModalOpen = false;

function lockBodyScroll() {
    lastScrollPosition = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lastScrollPosition}px`;
    document.body.style.width = '100%';
}

function unlockBodyScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, lastScrollPosition);
}

function openModal(projectId) {
    const project = projectData[projectId];
    if (!project || !modalOverlay || !modalTitle || !modalContent) return;

    lastFocusedElement = document.activeElement;
    lockBodyScroll();
    stopServiceAutoScroll();

    modalTitle.textContent = project.title;

    let content = `
        <p style="color: var(--clr-text-secondary); margin-bottom: 1.5rem; font-size: 1.1rem;">${project.subtitle}</p>
        <p style="line-height: 1.7; margin-bottom: 1.5rem;">${project.description}</p>
        <div class="tech-stack">
            ${project.techStack.map(tech => {
                const isWarning = tech.includes('Hardware') || tech.includes('Edge');
                return `<span class="tech-tag${isWarning ? ' warning' : ''}">${tech}</span>`;
            }).join(' ')}
        </div>
        <div class="project-features">
            ${project.features ? project.features.map(f => `
                <div class="feature-card"><h3>${f.title}</h3><p>${f.description}</p></div>
            `).join('') : ''}
        </div>
    `;

    content += `
        <div class="project-buttons">
            ${project.hasSourceCode ? `<a href="${project.githubUrl}" class="project-button github" target="_blank" rel="noopener">${project.githubUrl.includes('roblox') ? 'Играть онлайн' : 'Исходный код'}</a>` : ''}
        </div>
    `;

    modalContent.innerHTML = content;
    modalContent.scrollTop = 0;
    modalOverlay.classList.add('active');
    isModalOpen = true;

    const closeBtn = modalOverlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
}

function openServiceModal(serviceId) {
    const service = serviceData[serviceId];
    if (!service || !modalOverlay || !modalTitle || !modalContent) return;

    lastFocusedElement = document.activeElement;
    lockBodyScroll();
    stopServiceAutoScroll();

    modalTitle.textContent = service.title;

    let featuresHtml = '';
    if (service.features && service.features.length) {
        featuresHtml = `
            <h3>Технологии и навыки</h3>
            <div class="tech-stack">
                ${service.features.map(f => `<span class="tech-tag">${f}</span>`).join(' ')}
            </div>
        `;
    }

    modalContent.innerHTML = `
        <p style="color: var(--clr-text-secondary); margin-bottom: 1.5rem; font-size: 1.1rem;">
            ${service.description}
        </p>
        ${featuresHtml}
        <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(16,163,127,0.08); border-radius: var(--radius-md); border: 1px solid rgba(16,163,127,0.2);">
            <h3 style="margin-bottom: 0.75rem; font-size: 1.1rem; color: var(--clr-text);">Связаться для обсуждения</h3>
            <p style="margin: 0; color: var(--clr-text-secondary);">Напишите мне в Telegram:</p>
            <a href="https://t.me/Set_ez" target="_blank" rel="noopener" class="project-button" style="margin-top: 1rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                <i class="fab fa-telegram"></i> ${service.contact}
            </a>
        </div>
    `;

    modalContent.scrollTop = 0;
    modalOverlay.classList.add('active');
    isModalOpen = true;

    const closeBtn = modalOverlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
}

function closeModal() {
    if (!modalOverlay || !isModalOpen) return;
    modalOverlay.classList.remove('active');
    isModalOpen = false;
    unlockBodyScroll();
    startServiceAutoScroll();
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
    }
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalOpen) closeModal();
});

/* ==================== РАСКРЫТИЕ ТЕКСТА НА МОБИЛЬНЫХ НАВЫКАХ ==================== */
function initMobileSkillsToggle() {
    const grid = document.querySelector('.skills-grid-mobile');
    if (!grid) return;
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.skill-card');
        if (!card) return;
        card.classList.toggle('expanded');
    });
}

/* ==================== АНИМИРОВАННЫЙ ФОН С ЧАСТИЦАМИ ==================== */
function initializeParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);

    const colors = [
        'var(--clr-primary)',
        'var(--clr-blue)',
        'var(--clr-accent)',
        '#ffffff'
    ];

    // На мобильных меньше частиц — экономим ресурсы
    const particleCount = window.innerWidth < 768 ? 35 : 70;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('span');
        p.className = 'particle';

        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.4 + 0.2;
        const tx = (Math.random() - 0.5) * 60 + 'px';
        const ty = (Math.random() - 0.5) * 60 + 'px';

        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = left + '%';
        p.style.top = top + '%';
        p.style.background = color;
        p.style.opacity = opacity;
        p.style.animationDuration = duration + 's';
        p.style.animationDelay = delay + 's';
        p.style.setProperty('--tx', tx);
        p.style.setProperty('--ty', ty);

        container.appendChild(p);
    }
}

/* ==================== СВЕТЛЯЧКИ НА КАРТОЧКАХ (HOVER) ====================
 * Один слой с постоянными частицами живёт всё время наведения.
 * Появление и исчезновение управляются только opacity слоя, поэтому
 * частицы не пересоздаются и не сбрасывают анимацию во время hover.
 * Слой pointer-events: none и обрезан border-radius карточки.
 * На тач-устройствах и при prefers-reduced-motion эффект отключён.
 */
function initCardFireflies() {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reducedMotion) return;

    const COLORS = ['#10a37f', '#1e90ff', '#ffd700', '#ffffff'];
    const FADE_OUT_MS = 500;

    document.querySelectorAll('.premium-hover-effect').forEach(card => {
        let layer = null;
        let removeTimer = null;

        function createFirefliesLayer() {
            const newLayer = document.createElement('div');
            newLayer.className = 'card-fireflies-layer';
            newLayer.setAttribute('aria-hidden', 'true');

            const count = 14 + Math.floor(Math.random() * 5); // 14–18 частиц
            for (let i = 0; i < count; i++) {
                const f = document.createElement('span');
                f.className = 'card-firefly';

                const size = (Math.random() * 4 + 2).toFixed(1); // 2–6 px
                const color = COLORS[Math.floor(Math.random() * COLORS.length)];
                const duration = Math.random() * 2.5 + 2;

                f.style.width = size + 'px';
                f.style.height = size + 'px';
                f.style.left = (Math.random() * 94 + 3) + '%';
                f.style.top = (Math.random() * 90 + 5) + '%';
                f.style.background = color;
                f.style.boxShadow = `0 0 ${4 + Number(size)}px 1px ${color}`;
                f.style.setProperty('--fo', (Math.random() * 0.5 + 0.4).toFixed(2));
                f.style.setProperty('--tx', ((Math.random() - 0.5) * 50).toFixed(0) + 'px');
                f.style.setProperty('--ty', ((Math.random() - 0.5) * 50).toFixed(0) + 'px');
                f.style.animationDuration = duration.toFixed(2) + 's';
                // Отрицательная задержка сразу распределяет частицы по разным фазам:
                // нет синхронного старта, паузы перед первым циклом или резкого «включения».
                f.style.animationDelay = (-Math.random() * duration).toFixed(2) + 's';

                newLayer.appendChild(f);
            }

            return newLayer;
        }

        card.addEventListener('mouseenter', () => {
            if (removeTimer) {
                clearTimeout(removeTimer);
                removeTimer = null;
            }

            if (!layer || !layer.isConnected) {
                layer = createFirefliesLayer();
                card.appendChild(layer);

                // Двойной rAF — гарантия, что transition opacity сработает
                // для только что добавленного слоя.
                const currentLayer = layer;
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        if (currentLayer.isConnected) currentLayer.classList.add('active');
                    });
                });
                return;
            }

            // Повторный вход до завершения fade-out использует тот же слой
            // и те же частицы — без пересоздания и сброса анимации.
            layer.classList.add('active');
        });

        card.addEventListener('mouseleave', () => {
            if (!layer) return;

            if (removeTimer) clearTimeout(removeTimer);
            const fadingLayer = layer;
            fadingLayer.classList.remove('active'); // плавное затухание через CSS

            removeTimer = setTimeout(() => {
                // Удаляем слой только после полного затухания и только если
                // курсор не вернулся на карточку.
                if (!fadingLayer.classList.contains('active')) {
                    fadingLayer.remove();
                    if (layer === fadingLayer) layer = null;
                }
                removeTimer = null;
            }, FADE_OUT_MS);
        });
    });
}
