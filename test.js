const form = document.querySelector('.form');
const formInput = form.querySelector('.form__input');


const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {

    if (!formInput.validity.valid) {
        showInputError(formElement, inputElement, formInput.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

form.addEventListener('submit', function (evt) {
    evt.preventDefault();
});

formInput.addEventListener('input', function () {
    checkInputValidity(form, formInput);
});
