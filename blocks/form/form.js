// let content = document.querySelector('.content');
let popup = document.querySelector('.popup');
let editForm = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formSave = document.querySelector('.form__button-save');
let closeForm = document.querySelector('.form__button-close');



function openForm (){
    popup.classList.toggle('form_active');
    document.querySelector('#form-firstname').value = profileName.textContent;
    document.querySelector('#form-secondname').value = profileSubtitle.textContent;
    // content.setAttribute('style','opacity: .5');
}


function safeForm(){
    event.preventDefault();
    profileName.textContent = document.querySelector('#form-firstname').value;
    profileSubtitle.textContent = document.querySelector('#form-secondname').value;
    console.log(profileName.textContent)
    popup.classList.remove('form_active');
}


editForm.addEventListener('click', openForm);
formSave.addEventListener('click', safeForm);
closeForm.addEventListener('click', openForm);