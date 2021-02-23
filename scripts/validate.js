// Показать ошибку в строке вваода
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

// Скрыть ошибку в строке вваода
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

// Если поле вадидно скрыть ошибку, иначе показать
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

// Слушатель событий на поля ввода. Также делает кнопку активной/не активной
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit');

    // чтобы проверить состояние кнопки в самом начале
    // toggleButtonState(inputList, buttonElement);


    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement);
            console.log()
        });
    });

};




// Проверка всех полей формы на валидность
function hasInvalidInput(inputList){
    return inputList.some((inputElement)=>{
        return !inputElement.validity.valid;

    })
}

// Включает/отключает кнопку в засисимоси от валидности всех полей
function toggleButtonState (inputList, buttonElement){
    if (hasInvalidInput(inputList)){
        buttonElement.classList.add('button_inactive');
    }else{
        buttonElement.classList.remove('button_inactive');
    }
}



// Устанавливаем слушать события для каждой формы
function enableValidation(){
    const formList = Array.from(document.querySelectorAll('.form'))
    formList.forEach((formElement)=>{
        formElement.addEventListener('submit', (evt)=>{
            evt.preventDefault();
        })
        setEventListeners(formElement);
    })
}

enableValidation ()



// const formElement = document.querySelector('.form');
// const formInput = formElement.querySelector('.form__input');
// const formError = formElement.querySelector(`.${formInput.id}-error`);

//Сделайте функцию enableValidation ответственной за включение валидации всех форм. Пусть она принимает как объект настроек все нужные функциям классы и селекторы элементов:
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
    // formSelector: 'popup',
    // inputSelector: 'form__input',
    // submitButtonSelector: 'form__submit',
    // inactiveButtonClass: 'button_inactive',
    // inputErrorClass: 'form__input-error',
    // errorClass: 'form__input-error_active'
});