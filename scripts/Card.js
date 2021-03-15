// Создаём карточку со всеми методами для карточки
export function myFunc() {
  console.log("Я функция из модуля script-01.js");
}

export class Card {
  constructor(cardName, cardLink, elementTemplate) {
    this.cardName = cardName;
    this.cardLink = cardLink;
    this.elementTemplate = elementTemplate;
  }

  // создать карточку
  createCard() {
    const element = this.elementTemplate
      .querySelector(".element")
      .cloneNode(true);
    const elementImages = element.querySelector(".element__images");
    elementImages.setAttribute("src", this.cardLink);
    elementImages.setAttribute("alt", this.cardName);
    element.querySelector(".element__name").textContent = this.cardName;
    element
      .querySelector(".element__like")
      .addEventListener("click", this._funcLike);
    element
      .querySelector(".element__delete")
      .addEventListener("click", this._delCard);
    elementImages.addEventListener("click", fullSkreenImage);
    return element;
  }

  // Удалить карточку
  _delCard(evt) {
    evt.target.closest(".element").remove();
  }

  // Лайк карточки
  _funcLike(evt) {
    evt.target.classList.toggle("element__like_active");
  }
}
