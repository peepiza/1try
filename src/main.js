const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

// Открытие модалки
openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal();
    dlg.querySelector('input, select, textarea, button')?.focus();
});

// Закрытие модалки
closeBtn.addEventListener('click', () => dlg.close('cancel'));

// Закрытие по клику на backdrop
dlg.addEventListener('click', (e) => {
    if (e.target === dlg) {
        dlg.close('cancel');
    }
});

// Возврат фокуса после закрытия
dlg.addEventListener('close', () => {
    lastActive?.focus();
});

// Валидация формы
form?.addEventListener('submit', (e) => {
    // 1) Сброс кастомных сообщений
    [...form.elements].forEach(el => {
        if (el.setCustomValidity) {
            el.setCustomValidity('');
        }
    });
    
    // 2) Проверка встроенных ограничений
    if (!form.checkValidity()) {
        e.preventDefault();
        
        // Таргетированное сообщение для email
        const email = form.elements.email; 
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }
        
        form.reportValidity(); 
        
        // Подсветка проблемных полей
        [...form.elements].forEach(el => {
            if (el.willValidate) {
                el.toggleAttribute('aria-invalid', !el.checkValidity());
            }
        });
        return;
    } 
    
    // 3) Успешная отправка
    e.preventDefault();
    dlg.close('success'); 
    form.reset();
    
    // Сообщение об успехе
    alert('Сообщение отправлено успешно!');
});

// Улучшение доступности: ловушка фокуса внутри модалки
dlg.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusableElements = dlg.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});