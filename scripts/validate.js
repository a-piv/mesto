//   Создайте класс FormValidator, который настраивает валидацию полей формы:

//      принимает в конструктор объект настроек с селекторами и классами формы;
//      принимает вторым параметром элемент той формы, которая валидируется;
//      имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
//      имеет один публичный метод enableValidation, который включает валидацию формы.
//      Для каждой проверяемой формы создайте экземпляр класса FormValidator.

const validationForm = {
    formList: ".form",
    formInput: ".form__input",
    formSubmit: ".form__submit",
    inactiveButtonClass: "button_inactive",
    inputErrorClass: "form__input_type_error",
    errorActive: "form__input-error_active",
};

class FormValidator{
        constructor(formElement, formObject) {
            this.formElement = formElement;
            this.formObject = formObject;
            // console.log(formObject.formInput);
            const $inputList = Array.from(
                formElement.querySelectorAll(this.formObject.formInput)
            );
            const buttonElement = this.formElement.querySelector(this.formObject.formSubmit);
            this._toggleButtonState($inputList, buttonElement);

            // чтобы проверить состояние кнопки в самом начале
            // toggleButtonState(inputList, buttonElement);

            $inputList.forEach((inputElement) => {
                inputElement.addEventListener("input", () => {
                    this._checkInputValidity(formElement, inputElement);
                    // чтобы проверять его при изменении любого из полей
                    this._toggleButtonState($inputList, buttonElement);
                });
            });
        };


    // Если поле вадидно скрыть ошибку, иначе показать
     _checkInputValidity(formElement, inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, validationForm );
        } else {
            this._hideInputError(formElement, inputElement, validationForm);
        }
    };

// Включает/отключает кнопку в засисимоси от валидности всех полей
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(validationForm.inactiveButtonClass);
        } else {
            buttonElement.classList.remove(validationForm.inactiveButtonClass);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }


    // Показать ошибку в строке вваода
    _showInputError (formElement, inputElement, errorMessage, formObject) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(formObject.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(formObject.errorActive);
    };


    // Скрыть ошибку в строке вваода
    _hideInputError (formElement, inputElement, formObject) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(formObject.inputErrorClass);
        errorElement.classList.remove(formObject.errorActive);
        errorElement.textContent = "";
    };

}




// // Показать ошибку в строке вваода
// const showInputError = (formElement, inputElement, errorMessage, formObject) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(formObject.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(formObject.errorActive);
// };

// // Скрыть ошибку в строке вваода
// const hideInputError = (formElement, inputElement, formObject) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(formObject.inputErrorClass);
//     errorElement.classList.remove(formObject.errorActive);
//     errorElement.textContent = "";
// };



// Проверка всех полей формы на валидность
// function hasInvalidInput(inputList) {
//     return inputList.some((inputElement) => {
//         return !inputElement.validity.valid;
//     });
// }


// function toggleButtonState(inputList, buttonElement) {
//     console.log('toggleButtonState')
//     if (hasInvalidInput(inputList)) {
//         buttonElement.classList.add(validationForm.inactiveButtonClass);
//     } else {
//         buttonElement.classList.remove(validationForm.inactiveButtonClass);
//     }
// }


// Устанавливаем слушать события для каждой формы
function enableValidation(formObject) {
    const formList = Array.from(document.querySelectorAll(formObject.formList));
    // const formList = Array.from(document.querySelectorAll('.form'))
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        new FormValidator(formElement, formObject);
    });
}
enableValidation(validationForm);