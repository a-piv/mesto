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

    // const $inputList = Array.from(
    //   все элементы , которые используются в нескольких разных методах Классов (или поиск которых осуществляется при каждом срабатывании метода),
    // нужно найти 1 раз и объявить их Классовыми переменными с this..
    // Чаще всего это удобно сделать в Конструкторе и тогда эти переменные будут доступны по всему коду класса.
    // Это позволит сэкономить время на повторный поиск элементов, так как они 1 раз были найдены. И не надо будет их больше передавать в вызовы методов.
    //   Эти элементы обычно this._inputList, this._submitButton, this._form, this._cardImage, this._likeButton
    // this._inputList = formElement.querySelectorAll(".form__input");
    //this._submitButton = formElement.querySelector(".form__button-save");
    // this._form = formElement.querySelector;
    // this._cardImage =
    // this._likeButton =
    // console.log(this._inputList);
    console.log(formElement);

    this.$inputList = Array.from(
      formElement.querySelectorAll(this.formObject.formInput)
    );

    this._$submitButton = this.formElement.querySelector(
      this.formObject.formSubmit
    );

    this._$form = formElement;

    this.cccs = document.querySelector("#form-card-name");
    // console.log(formElement);
    // чтобы проверить состояние кнопки в самом начале
    // toggleButtonState(inputList, buttonElement);
  }

  enableValidation() {
    //Удаляем все ошибвки в инпутах
    this.$inputList.forEach((input) => {
      this._hideInputError(this._$form, input, this.formObject);
    });
    // this._checkInputValidity(this.formElement, inputElement);
    // this._hideInputError(this._$form, this.cccs, this.formObject);

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
