/**
 * Данные проектов — объект содержит описание, технологии, этапы и ссылки.
 * Используется для динамического наполнения модальных окон.
 */
const projectData = {
    roblox: {
        title: "Demon Legacy - Roblox RPG",
        subtitle: "Multiplayer игра с кастомной графикой и системой прокачки",
        description: "Разработал полноценную multiplayer RPG на платформе Roblox. Игра включает сложную экономическую систему, инвентарь, прокачку персонажа, 3-5 уникальных способностей и взаимодействие между игроками. Создал кастомную графику в Blender и реализовал продвинутую систему камер.",
        techStack: ["Lua", "Roblox Studio", "Blender", "Multiplayer", "Game Design", "UI/UX"],
        features: [
            { title: "Игровая механика", description: "Система квестов, боевка и интерактивное окружение" },
            { title: "Экономика", description: "Торговая система и внутриигровая валюта" },
            { title: "Multiplayer", description: "Синхронизация действий между игроками" },
            { title: "Графика", description: "Кастомные 3D модели из Blender" }
        ],
        achievements: ["Более 1000 активных игроков", "Рейтинг 4.8/5", "Положительные отзывы", "Полностью играбельный MVP"],
        hasSourceCode: true,
        githubUrl: "https://github.com/nikizi1234-ship-it/roblox-game",
        playUrl: "https://www.roblox.com/games/107962526921864/Demon-Legacy",
        developmentSteps: ["Проектирование игровой механики", "Создание 3D моделей", "Разработка на Lua", "Создание multiplayer", "Тестирование", "Публикация"],
        outcome: "Создал работающий MVP игры с полноценным геймплеем."
    },
    devnet: {
        title: "DevNet Messenger",
        subtitle: "Веб-мессенджер с реальным временем обмена сообщениями",
        description: "Разработал полнофункциональный веб-мессенджер с использованием FastAPI и WebSocket для мгновенной доставки сообщений. Система включает регистрацию пользователей, JWT аутентификацию, управление статусами онлайн/офлайн, историю сообщений и возможность удаления чатов. Проект временно приостановлен для работы над другими инициативами.",
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
        demoUrl: "https://devnetmessager-production.up.railway.app/",
        developmentSteps: ["Проектирование архитектуры", "FastAPI + WebSocket", "JWT авторизация", "Статусы пользователей", "Интеграция SQLite", "Деплой"],
        outcome: "Создал полнофункциональный мессенджер, демонстрирующий работу с real-time."
    },
    airflow: {
        title: "AF (Air Flow)",
        subtitle: "Автономный дрон-доставщик",
        description: "Инженерный эксперимент по созданию дрона...",
        techStack: ["C++ (STM32)", "Python (FastAPI)", "Raspberry Pi", "MAVLink", "nRF24L01+", "Kakute H7", "3D-печать", "Blender"],
        developmentStages: [
            { stage: "Земля1", description: "Стенд управления захватом (завершён)" },
            { stage: "Воздух1", description: "Сборка летающей платформы" },
            { stage: "Воздух2", description: "Интеграция компонентов" },
            { stage: "Воздух3", description: "Компьютерное зрение (перспектива)" }
        ],
        technicalRequirements: ["Приём HTTP команд", "Автоматическое построение маршрута", "Аварийная логика", "Телеметрия", "Управление захватом"],
        risks: ["Точность аварийной посадки", "Надёжность радиосвязи", "Энергопотребление", "Вибрации"],
        achievements: ["Прототип захвата", "Рама из PETG-CF", "Библиотека для TFT", "Наземная станция на Flask"],
        hasSourceCode: true,
        githubUrl: "https://github.com/nikizi1234-ship-it",
        developmentSteps: ["Проектирование клешни", "Система захвата на STM32", "Сборка платформы", "MAVLink связь", "Наземная станция", "Интеграция"],
        outcome: "Создана система «дрон + наземная станция» с открытым API."
    },
    taskmanager: {
        title: "Task Manager",
        subtitle: "FullStack приложение",
        description: "Веб-приложение для управления задачами...",
        techStack: ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "Railway"],
        features: [
            { title: "Управление задачами", description: "CRUD операции" },
            { title: "Аутентификация", description: "JWT токены" },
            { title: "Интерфейс", description: "Адаптивный React UI" },
            { title: "API", description: "REST API" }
        ],
        achievements: ["FullStack приложение", "Деплой на Railway", "PostgreSQL интеграция", "JWT аутентификация"],
        hasSourceCode: true,
        githubUrl: "https://github.com/nikizi1234-ship-it/task-manager/tree/main",
        demoUrl: "https://taskmanager0.up.railway.app/",
        developmentSteps: ["Проектирование", "FastAPI бэкенд", "React фронтенд", "Настройка БД", "Docker", "CI/CD"],
        outcome: "Создал полнофункциональное FullStack приложение."
    },
    telegram: {
        title: "Telegram бот для задач",
        subtitle: "Координация работы команды",
        description: "Разработал Telegram бота для управления задачами...",
        techStack: ["Python", "aiogram", "SQLite"],
        features: [
            { title: "Управление задачами", description: "Создание и назначение" },
            { title: "Уведомления", description: "Автоматические оповещения" }
        ],
        hasSourceCode: true,
        githubUrl: "https://github.com/nikizi1234-ship-it/task-manager-bot",
        developmentSteps: ["Проектирование архитектуры", "Система команд", "База данных SQLite", "Уведомления", "Тестирование"],
        outcome: "Бот используется для координации работы команды."
    }
};

// Инициализация всех интерактивных элементов после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeServicesCarousel();
    initializeScrollAnimations();
    initializeMobileMenu();
    initializeBackToTop();
    initializeHeaderScroll();
    initMobileSkillsToggle();   // раскрытие текста на мобильных
    // Запуск ротации веера навыков
    setInterval(rotateSkillsFan, 10000);
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
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
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
            body.classList.remove('menu-open');
        });
    });
}

/* ==================== АНИМАЦИИ ПРИ СКРОЛЛЕ ==================== */
function initializeScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => observer.observe(el));
}

/* ==================== КНОПКА "НАВЕРХ" ==================== */
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

/* ==================== НАВИГАЦИЯ ПО СЕКЦИЯМ ==================== */
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
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
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 1.1rem;">${project.subtitle}</p>
        <p style="line-height: 1.7; margin-bottom: 1.5rem;">${project.description}</p>
        <div class="tech-stack">
            ${project.techStack.map(tech => `<span class="tech-tag ${tech.includes('Инженерный') ? 'warning' : ''}">${tech}</span>`).join('')}
        </div>
        <div class="project-features">
            ${project.features ? project.features.map(f => `
                <div class="feature-card"><h3>${f.title}</h3><p>${f.description}</p></div>
            `).join('') : ''}
        </div>
    `;

    if (projectId === 'airflow') {
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
            ${project.hasSourceCode ? `<a href="${project.githubUrl}" class="project-button github" target="_blank">Исходный код</a>` : ''}
            ${project.demoUrl ? `<a href="${project.demoUrl}" class="project-button" target="_blank">Открыть приложение</a>` : ''}
            ${project.playUrl ? `<a href="${project.playUrl}" class="project-button play" target="_blank">Играть онлайн</a>` : ''}
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

/* ==================== АВТОПРОКРУТКА КАРУСЕЛИ ==================== */
let serviceAutoScroll = setInterval(() => moveServiceCarousel(1), 5000);
servicesTrack.addEventListener('mouseenter', () => clearInterval(serviceAutoScroll));
servicesTrack.addEventListener('mouseleave', () => {
    serviceAutoScroll = setInterval(() => moveServiceCarousel(1), 5000);
});

/* ==================== РОТАЦИЯ ВЕЕРА НАВЫКОВ ==================== */
function rotateSkillsFan() {
    const fan = document.querySelector('.skills-fan');
    if (!fan) return;
    const cards = Array.from(fan.querySelectorAll('.skill-card-fan'));
    if (cards.length === 0) return;
    const last = cards.pop();
    cards.unshift(last);
    cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
    // Перестраиваем DOM для корректного z-index
    cards.forEach(card => fan.appendChild(card));
}

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
