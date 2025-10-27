// Функция для смены темы
function changeTheme() {
    const body = document.body;
    const currentTheme = body.className;

    // Переключаем тему
    if (currentTheme === 'light-theme') {
        body.className = 'dark-theme';
        localStorage.setItem('theme', 'dark-theme');
    } else {
        body.className = 'light-theme';
        localStorage.setItem('theme', 'light-theme');
    }
}

// Функция для загрузки сохраненной темы
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.className = savedTheme;
}

// Функция для отправки формы
function submitForm() {
    const form = document.getElementById('feedbackForm');
    const formData = new FormData(form);

    // Простая валидация
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Собираем данные формы
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        category: formData.get('category'),
        message: formData.get('message')
    };

    // В реальном приложении здесь был бы AJAX-запрос
    console.log('Данные формы:', data);

    // Показываем уведомление об успешной отправке
    alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');

    // Закрываем модальное окно
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        contactModal.close();
    }

    // Очищаем форму
    form.reset();
}

// Функция для инициализации модального окна
function initModal() {
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        // Закрытие модального окна по клику на фон
        contactModal.addEventListener('click', function(event) {
            if (event.target === this) {
                this.close();
            }
        });

        // Обработка нажатия Enter в форме
        const feedbackForm = document.getElementById('feedbackForm');
        if (feedbackForm) {
            feedbackForm.addEventListener('keypress', function(event) {
                if (event.key === 'Enter' && event.target.type !== 'textarea') {
                    event.preventDefault();
                }
            });
        }
    }
}

// Функция для добавления кнопки смены темы на все страницы
function addThemeButton() {
    const nav = document.querySelector('.nav');
    if (nav && !document.querySelector('.change-theme__button')) {
        const themeButton = document.createElement('button');
        themeButton.className = 'change-theme__button';
        themeButton.textContent = 'Сменить тему';
        themeButton.onclick = changeTheme;
        nav.appendChild(themeButton);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    initModal();
    addThemeButton();

    // Добавляем активный класс к текущей странице в навигации
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref.includes(currentPage) && currentPage !== '')) {
            link.parentElement.classList.add('nav__item--active');
        }
    });
});