//   Создайте класс FormValidator, который настраивает валидацию полей формы:

//      принимает в конструктор объект настроек с селекторами и классами формы;
//      принимает вторым параметром элемент той формы, которая валидируется;
//      имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
//      имеет один публичный метод enableValidation, который включает валидацию формы.
//      Для каждой проверяемой формы создайте экземпляр класса FormValidator.

export default class FormValidator {
  constructor(formElement, formObject) {
    this.formElement = formElement;
    this.formObject = formObject;
    const $inputList = Array.from(
      formElement.querySelectorAll(this.formObject.formInput)
    );
    const buttonElement = this.formElement.querySelector(
      this.formObject.formSubmit
    );

    // чтобы проверить состояние кнопки в самом начале
    // toggleButtonState(inputList, buttonElement);

    $inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState($inputList, buttonElement);
      });
    });
    this._toggleButtonState($inputList, buttonElement);
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
