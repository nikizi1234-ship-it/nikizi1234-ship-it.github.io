/**
 * ИНИЦИАЛИЗАЦИЯ ВСЕХ ИНТЕРАКТИВНЫХ ЭЛЕМЕНТОВ
 * Добавлены: модальные окна услуг, стопка проектов, исправлены опечатки.
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeServicesCarousel();
    initializeScrollAnimations();
    initializeMobileMenu();
    initializeBackToTop();
    initializeHeaderScroll();
    initMobileSkillsToggle();
    initScrollSpy();
    initializeParticles(); // ЗАДАЧА 4: запускаем анимированный фон с частицами
});

/* ==================== КАРУСЕЛЬ УСЛУГ ==================== */
let currentServiceIndex = 0;
const servicesTrack = document.getElementById('servicesTrack');
const serviceIndicators = document.getElementById('serviceIndicators');

function initializeServicesCarousel() {
    const items = servicesTrack.children;
    for (let i = 0; i < items.length; i++) {
        const indicator = document.createElement('button');
        indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
        indicator.setAttribute('aria-label', `Услуга ${i+1}`);
        indicator.onclick = () => moveToService(i);
        serviceIndicators.appendChild(indicator);
    }
    updateServicesCarousel();
}

function moveServiceCarousel(direction) {
    const items = servicesTrack.children;
    currentServiceIndex = (currentServiceIndex + direction + items.length) % items.length;
    updateServicesCarousel();
}

function moveToService(index) {
    currentServiceIndex = index;
    updateServicesCarousel();
}

function updateServicesCarousel() {
    const translateX = -currentServiceIndex * 100;
    servicesTrack.style.transform = `translateX(${translateX}%)`;
    const indicators = serviceIndicators.children;
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].className = `indicator ${i === currentServiceIndex ? 'active' : ''}`;
    }
}

/* ==================== МОБИЛЬНОЕ МЕНЮ ==================== */
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;

    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = !navLinks.classList.contains('active');
        navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        if (isOpen) {
            body.classList.add('menu-open');
        } else {
            body.classList.remove('menu-open');
        }
    });

    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            body.classList.remove('menu-open');
        });
    });
}

/* ==================== АНИМАЦИИ ПРИ СКРОЛЛЕ (fade-in) ==================== */
function initializeScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // анимируем только один раз
            }
        });
    }, { threshold: 0.15 });
    fadeElements.forEach(el => observer.observe(el));
}

/* ==================== SPY-НАВИГАЦИЯ (активная ссылка при скролле) ==================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    const active = link.dataset.section === entry.target.id;
                    link.classList.toggle('active', active);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => observer.observe(section));
}

/* ==================== КНОПКА «НАВЕРХ» ==================== */
function initializeBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.pageYOffset > 300);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ==================== ХЕДЕР ПРИ СКРОЛЛЕ ==================== */
function initializeHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.pageYOffset > 50);
    });
}

/* ==================== ПЛАВНЫЙ СКРОЛЛ К СЕКЦИИ ==================== */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ==================== МОДАЛЬНЫЕ ОКНА ПРОЕКТОВ ==================== */
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
let lastScrollPosition = 0;

function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    lastScrollPosition = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lastScrollPosition}px`;
    document.body.style.width = '100%';

    modalTitle.textContent = project.title;

    let content = `
        <p style="color: var(--clr-text-secondary); margin-bottom: 1.5rem; font-size: 1.1rem;">${project.subtitle}</p>
        <p style="line-height: 1.7; margin-bottom: 1.5rem;">${project.description}</p>
        <div class="tech-stack">
            ${project.techStack.map(tech => {
                const isWarning = tech.includes('Инженерный');
                return `<span class="tech-tag${isWarning ? ' warning' : ''}">${tech}</span>`;
            }).join('')}
        </div>
        <div class="project-features">
            ${project.features ? project.features.map(f => `
                <div class="feature-card"><h3>${f.title}</h3><p>${f.description}</p></div>
            `).join('') : ''}
        </div>
    `;

    // Специальная секция для AAF (бывший Air Flow)
    if (projectId === 'aaf') {
        content += `
            <h3>Этапы разработки</h3>
            <div class="development-steps">
                ${project.developmentStages.map(stage => `
                    <div class="step"><strong>${stage.stage}:</strong> ${stage.description}</div>
                `).join('')}
            </div>
            <h3>Технические требования</h3>
            <ul>${project.technicalRequirements.map(req => `<li>${req}</li>`).join('')}</ul>
            <div class="risk-list">
                <h3>Выявленные инженерные риски</h3>
                <ul>${project.risks.map(risk => `<li>${risk}</li>`).join('')}</ul>
            </div>
        `;
    }

    if (project.achievements) {
        content += `<h3>Достижения</h3><ul>${project.achievements.map(a => `<li>${a}</li>`).join('')}</ul>`;
    }

    content += `
        <div class="project-buttons">
            <button class="project-button" onclick="showProjectOutcome('${projectId}')">Итог проекта</button>
            ${project.hasSourceCode ? `<a href="${project.githubUrl}" class="project-button github" target="_blank" rel="noopener">Исходный код</a>` : ''}
            ${project.demoUrl ? `<a href="${project.demoUrl}" class="project-button" target="_blank" rel="noopener">Открыть приложение</a>` : ''}
            ${project.playUrl ? `<a href="${project.playUrl}" class="project-button play" target="_blank" rel="noopener">Играть онлайн</a>` : ''}
        </div>
    `;

    modalContent.innerHTML = content;
    modalOverlay.classList.add('active');
}

function showProjectOutcome(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    modalContent.innerHTML = `
        <h3>Этапы разработки</h3>
        <div class="development-steps">
            ${project.developmentSteps.map((step, index) => `
                <div class="step"><span class="step-number">${index + 1}.</span>${step}</div>
            `).join('')}
        </div>
        <h3>Итоговый результат</h3>
        <p style="line-height: 1.7;">${project.outcome}</p>
        <div style="margin-top: 2rem;">
            <button class="project-button" onclick="openModal('${projectId}')">Назад к описанию</button>
        </div>
    `;
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, lastScrollPosition);
}

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
});

/* ==================== МОДАЛЬНЫЕ ОКНА УСЛУГ ==================== */
function openServiceModal(serviceId) {
    const service = serviceData[serviceId];
    if (!service) return;

    lastScrollPosition = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lastScrollPosition}px`;
    document.body.style.width = '100%';

    modalTitle.textContent = service.title;

    let featuresHtml = '';
    if (service.features && service.features.length) {
        featuresHtml = `
            <h3>Технологии и навыки</h3>
            <div class="tech-stack">
                ${service.features.map(f => `<span class="tech-tag">${f}</span>`).join('')}
            </div>
        `;
    }

    const statusBadge = service.status
        ? `<span class="service-status" style="margin-left: 0.5rem;"><i class="fas fa-clock"></i> ${service.status}</span>`
        : '';

    modalContent.innerHTML = `
        <p style="color: var(--clr-text-secondary); margin-bottom: 1.5rem; font-size: 1.1rem; display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            ${service.description}
            ${statusBadge}
        </p>
        ${featuresHtml}
        <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(16,163,127,0.08); border-radius: var(--radius-md); border: 1px solid rgba(16,163,127,0.2);">
            <h3 style="margin-bottom: 0.75rem; font-size: 1.1rem; color: var(--clr-text);">Связаться для заказа</h3>
            <p style="margin: 0; color: var(--clr-text-secondary);">Напишите мне в Telegram для обсуждения деталей:</p>
            <a href="https://t.me/Set_ez" target="_blank" rel="noopener" class="project-button" style="margin-top: 1rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                <i class="fab fa-telegram"></i> ${service.contact}
            </a>
        </div>
    `;

    modalOverlay.classList.add('active');
}

/* ==================== АВТОПРОКРУТКА КАРУСЕЛИ ==================== */
let serviceAutoScroll = setInterval(() => moveServiceCarousel(1), 5000);
servicesTrack.addEventListener('mouseenter', () => clearInterval(serviceAutoScroll));
servicesTrack.addEventListener('mouseleave', () => {
    serviceAutoScroll = setInterval(() => moveServiceCarousel(1), 5000);
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

/* ==================== ЗАДАЧА 4: АНИМИРОВАННЫЙ ФОН С ЧАСТИЦАМИ ==================== */
function initializeParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);

    // Цвета частиц из палитры сайта
    const colors = [
        'var(--clr-primary)',
        'var(--clr-blue)',
        'var(--clr-accent)',
        '#ffffff'
    ];

    const particleCount = 70; // оптимальное количество для производительности

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('span');
        p.className = 'particle';

        const size = Math.random() * 4 + 2;          // 2–6 px
        const left = Math.random() * 100;            // 0–100%
        const top = Math.random() * 100;             // 0–100%
        const duration = Math.random() * 6 + 4;      // 4–10 s
        const delay = Math.random() * 10;            // 0–10 s
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.4 + 0.2;     // 0.2–0.6
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

/* ==================== ДАННЫЕ УСЛУГ ==================== */
const serviceData = {
    backend: {
        title: "Backend Разработка",
        description: "Создаю производительные backend‑системы на Python/FastAPI. Проектирую REST API, работаю с реляционными базами данных, настраиваю JWT‑аутентификацию и деплой на облачных платформах. Архитектура масштабируема и готова к росту нагрузки.",
        features: ["FastAPI", "REST API", "PostgreSQL / SQLite", "JWT Auth", "Деплой на Railway", "Docker"],
        contact: "@Set_ez"
    },
    '3d-models': {
        title: "3D‑модели для печати",
        description: "Разрабатываю 3D‑модели с точностью до 0.01 мм в FreeCAD и Kompas 3D. Оптимизирую под Bambu Lab, настраиваю профили в Bambu Studio, работаю с многоцветной печатью через AMS. Полный цикл: от чертежа до готовой детали.",
        features: ["FreeCAD", "Kompas 3D", "Bambu Lab", "AMS", "PETG‑CF / ABS", "3D‑печать"],
        contact: "@Set_ez"
    },
    microcontrollers: {
        title: "Программирование микроконтроллеров",
        description: "Пишу прошивки на Rust и C++ для STM32, Arduino и ESP32. Низкие накладные расходы, высокая надёжность, связка через cxx/FFI. От прототипа до рабочего устройства.",
        features: ["C++", "Rust", "STM32", "ESP32", "cxx/FFI"],
        status: "Скоро",
        contact: "@Set_ez"
    }
};

/* ==================== ДАННЫЕ ПРОЕКТОВ ==================== */
const projectData = {
    'demon-legacy': {
        title: "Demon Legacy — Roblox RPG",
        subtitle: "Multiplayer игра с кастомной графикой и системой прокачки",
        description: "Разработал полноценную multiplayer RPG на платформе Roblox. Игра включает сложную экономическую систему, инвентарь, прокачку персонажа, 3–5 уникальных способностей и взаимодействие между игроками. Создал кастомную графику в Blender и реализовал продвинутую систему камер.",
        techStack: ["Lua", "Roblox Studio", "Blender", "Multiplayer", "Game Design", "UI/UX"],
        features: [
            { title: "Игровая механика", description: "Система квестов, боевка и интерактивное окружение" },
            { title: "Экономика", description: "Торговая система и внутриигровая валюта" },
            { title: "Multiplayer", description: "Синхронизация действий между игроками" },
            { title: "Графика", description: "Кастомные 3D модели из Blender" }
        ],
        achievements: ["Более 100 активных игроков", "Рейтинг 4.8/5", "Положительные отзывы", "Играбельный MVP"],
        hasSourceCode: true,
        githubUrl: "https://github.com/nikizi1234-ship-it/roblox-game",
        playUrl: "https://www.roblox.com/games/107962526921864/Demon-Legacy",
        developmentSteps: ["Проектирование игровой механики", "Создание 3D моделей", "Разработка на Lua", "Создание multiplayer", "Тестирование", "Публикация"],
        outcome: "Создал работающий MVP игры с полноценным геймплеем."
    },
    'dev-net': {
        title: "Dev Net",
        subtitle: "Веб‑мессенджер с реальным временем обмена сообщениями",
        description: "Разработал полнофункциональный веб‑мессенджер с использованием FastAPI и WebSocket для мгновенной доставки сообщений. Система включает регистрацию пользователей, JWT аутентификацию, управление статусами онлайн/офлайн, историю сообщений и возможность удаления чатов. Проект временно приостановлен для работы над другими инициативами.",
        techStack: ["Python", "FastAPI", "WebSocket", "SQLAlchemy", "JWT Auth", "SQLite", "Railway"],
        features: [
            { title: "Real-time сообщения", description: "Мгновенная доставка через WebSocket" },
            { title: "Аутентификация", description: "JWT токены для безопасного доступа" },
            { title: "Статусы пользователей", description: "Отображение онлайн/офлайн" },
            { title: "История сообщений", description: "Полная история переписки" }
        ],
        achievements: ["Работающий мессенджер", "Деплой на Railway", "JWT аутентификация", "WebSocket интеграция"],
        hasSourceCode: true,
        githubUrl: "https://github.com/nikizi1234-ship-it/DevNetMessager/tree/main",
        // demoUrl убран — хостинг недоступен
        developmentSteps: ["Проектирование архитектуры", "FastAPI + WebSocket", "JWT авторизация", "Статусы пользователей", "Интеграция SQLite", "Деплой"],
        outcome: "Создал полнофункциональный мессенджер, демонстрирующий работу с real-time коммуникациями."
    },
    'aaf': {
        title: "AAF (Automatic Air Flow)",
        subtitle: "Автономный дрон‑доставщик",
        description: "Инженерный эксперимент по созданию автономного дрона‑доставщика. Проект объединяет встраиваемую электронику на базе STM32, наземную станцию управления на Python и интеграцию с полётным контроллером Kakute H7 через MAVLink.",
        techStack: ["C++ (STM32)", "Python (FastAPI и Flask)", "Raspberry Pi 5", "MAVLink", "nRF24L01+", "Kakute H7", "3D‑печать", "Blender", "FreeCAD", "Rust (cxx/FFI)"],
        developmentStages: [
            { stage: "Земля1", description: "Стенд управления захватом (завершён)" },
            { stage: "Воздух1", description: "Сборка летающей платформы (в процессе)" },
            { stage: "Воздух2", description: "Интеграция компонентов" },
            { stage: "Воздух3", description: "Компьютерное зрение (перспектива)" }
        ],
        technicalRequirements: ["Приём HTTP команд", "Автоматическое построение маршрута", "Аварийная логика", "Телеметрия", "Управление захватом"],
        risks: ["Точность аварийной посадки", "Надёжность радиосвязи", "Энергопотребление", "Вибрации"],
        achievements: ["Прототип захвата", "Рама из PETG-CF", "Библиотека для TFT", "Наземная станция на Flask"],
        hasSourceCode: false,
        githubUrl: "https://github.com/nikizi1234-ship-it",
        developmentSteps: ["Проектирование клешни", "Система захвата на STM32", "Сборка платформы", "MAVLink связь", "Наземная станция", "Интеграция"],
        outcome: "Создана система «дрон + наземная станция» с частным API для управления полётом и захватом."
    }
};