export default class FormValidator {
  constructor(formElement, formObject) {
    //Форма, которая валидируется
    this.formElement = formElement;

    //Все классы формы
    this.formObject = formObject;

    // this._cardImage =
    // this._likeButton =
    // console.log(this._inputList);

    this.$inputList = Array.from(
      formElement.querySelectorAll(this.formObject.formInput)
    );

    this._$submitButton = this.formElement.querySelector(
      this.formObject.formSubmit
    );

    this._$form = formElement;
    //console.log(this._$form);
  }

  enableValidation() {
    //Удаляем все ошибвки в инпутах
    // console.log(this.$inputList);
    this.$inputList.forEach((input) => {
      this._hideInputError(this._$form, input, this.formObject);
    });
    // this._checkInputValidity(this.formElement, inputElement);

    this.$inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this.formElement, inputElement);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState(this.$inputList, this._$submitButton);
      });
    });
    this._toggleButtonState(this.$inputList, this._$submitButton);
  }

  // Если поле вадидно скрыть ошибку, иначе показать
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        this.formObject
      );
    } else {
      this._hideInputError(formElement, inputElement, this.formObject);
    }
  }

  // Включает/отключает кнопку в засисимоси от валидности всех полей
  _toggleButtonState(inputList, buttonElement) {
    // console.log(inputList);
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.formObject.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this.formObject.inactiveButtonClass);
    }
  }
  //Прверяем чтобы были заполнены все поля
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Показать ошибку в строке вваода
  _showInputError(formElement, inputElement, errorMessage, formObject) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formObject.errorActive);
  }

  // Скрыть ошибку в строке вваода
  _hideInputError(formElement, inputElement, formObject) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formObject.inputErrorClass);
    errorElement.classList.remove(formObject.errorActive);
    errorElement.textContent = "";
  }
}
//
