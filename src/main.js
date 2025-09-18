const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
    [...form.elements].forEach(el => el.setCustomValidity?.(''));
    if (!form.checkValidity()) {
        e.preventDefault();
        const email = form.elements.email; 
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
}
form.reportValidity(); 

[...form.elements].forEach(el => {
    if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
});
return;
} 
e.preventDefault();
document.getElementById('contactDialog')?.close('success'); 
form.reset();
});
