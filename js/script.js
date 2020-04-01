const placeList = document.querySelector('.places-list');



let card;

const api = new Api('https://praktikum.tk/cohort9', '70e31515-82b2-430b-b7f8-a03e9f3e31de');

const userInfo = new UserInfo();


api.getUserInfo()
  .then((result) => {
    const { name, about, avatar } = result;
    userInfo.setUserInfo(name, about, avatar, api);
    userInfo.updateUserInfo();

  })
  .catch(err => {

    throw err;
  });


const cards = [];
const cardList = new CardList(placeList, cards);

api.loadCards()
  .then((result) => {
    for (const cardData of result) {
      card = new Card(cardData);
      card.init();
      cards.push(card.getElement())
    }
    cardList.render();
  })
  .catch(err => {

    throw err;
  });

const popupElem = document.querySelector('.popup');
const userInfoButton = document.querySelector('.user-info__button');
const popupCloser = document.querySelector('.popup__close');
const cardPopup = new Popup(popupElem, userInfoButton, popupCloser);
cardPopup.init();


const addButton = document.getElementById('add');

const form = document.forms.new;

function addNewCard(event) {
  event.preventDefault();
  // Можно лучше
  // Деструктуризация
  const name = form.elements.name;
  const link = form.elements.link;
  const object =
  {
    name: name.value,
    link: link.value
  };

  const card = new Card(object);
  card.init();
  cardList.addCard(card.getElement());
  cardList.render();

  form.reset();
  addButton.classList.remove('popup__button_active');
  cardPopup.hide();
}

form.addEventListener('submit', addNewCard);

const edit = document.getElementById('edit');
const editForm = document.forms.edit;
const username = editForm.elements.username;
const job = editForm.elements.job;

function openEdit() {
    const dataUser = userInfo.savedUserInfo();
      username.value = dataUser.name;
      job.value = dataUser.about;
  document.getElementById('error-username').textContent = '';
  document.getElementById('error-job').textContent = '';

}

const userInfoEdit = document.querySelector('.user-info__edit');
const editClose = document.getElementById('edit__close');
const editPopupElem = document.getElementById('edit');
const editPopup = new Popup(editPopupElem, userInfoEdit, editClose);


editPopup.init();

userInfoEdit.addEventListener('click', openEdit);


function editUserInfo(event) {

  event.preventDefault();
  const name = username.value;
  const about = job.value;
  return api.sendUserInfo(name, about)
    .then(() => {
      userInfo.setUserInfo(name, about);
      userInfo.updateUserInfo();
      editForm.reset();
      editPopup.hide();
    });

}

editForm.addEventListener('submit', editUserInfo);


const picPopup = new PicPopup();


const pictureClose = document.getElementById('picture__close');
placeList.addEventListener('click', picPopup.show);
pictureClose.addEventListener('click', picPopup.hide);


const editValidator = new EditFormValidator(editForm);
const formValidator = new AddFormValidator(form);
editValidator.setEventListeners();
formValidator.setEventListeners();

document.addEventListener('keyup', function (e) {
  // Можно лучше -- Зачем 3 условия когда все равно они одинаковые?
  if (e.which === 27) {
    editPopup.hide();
    picPopup.hide();
    cardPopup.hide();
  }
});

/**
 * Здравствуйте.
 * Вы молодцы, что распределили код по классам, у каждого класса должна быть своя
 * обязанность. Класс должен отвечать за одно действие
 *
 * Можно лучше: Старайтесь задавать переменным более понятные названия, чтобы по названию было понятно
 * за что отвечает та или иная переменная, это важно для понимания того за что отвечает переменная.
 *
 * ====================
 *
 * Сейчас у вас добавился новый класс(модуль), неважно, и ваша задача не создавать жесткую связь с другими классами внутри классов
 * Соответственно вам надо пулучать новые карточки, а получать вы можете только передавая сам класс в другие классы, как некое хранилице
 * о котором ничего другие классы не знают.
 * Как пример не более:
 *
 * // Объявляете новый класс
 * const card = new Card(); // это для того чтобы вызывая методы лайка, дизлайка
 *
 *  при инициализации класса CardList вы передаёте в качестве параметров класс card
 *  const cardList = new CardList(document.querySelector(".places-list"), card); // это для того чтобы вызывая методы добавления карточек
 *
 *  Тоже самое с классом Popup, но там только при изменении профиля, функционал добавления  карточки через Popup остаётся
 *  при условии использования класса Card
 *
 * Что надо исправить:
 *
 * - Убрать жесткую связь между классами. Объявление одного класса в другом классе является плохой практикой
 *   программирование. Такие классы тяжело поддерживать. Нельзя удалить и заменить один класс на другой не изменив
 *   часть архитектуры.
 *   Представьте, что ваш класс(CardList) допустим принтер, который печатает бумагу. Вы берёте какие то заготовленные рисунки ( initialCards)
 *   и хотите их нанести на бумагу класс (Card). Вы можете поменять принтер, можете поменять и вставить другую бумагу или какой либо другой рисунок.
 *   Принтер(CardList), бумага(Card) и рисунки( initialCards) ничего не знают друг о друге. Можно поменять любое компонент и ничего не должно поломаться
 *   По такому принципу должен работать любой класс.
 *
 Надо исправить : Нельзя вызывать или создавать реализацию в конструторе класса
 Вызывая реализацию в конструторе класса, при наследовании, вы не сможите вызвать другой метод не вызвав реализацию в конструкторе
 Если Вам необходимо будет вызвать конструктор родителя при наследовании в одном из классов
 так же, вы заведомо делаете класс не тестируемым, так как всегда при инициализации будет вызываться конструктор класса


 В целом работа очень хорошая
 *
 * Важный момент :
 * работа принимается только при исправлении всех "Надо исправить" и полностью рабочем функционале
 * Перед тем как отправить работу на приёмку, проверьте на ошибки в консоли, и весь функционал
 *
 *
 */


/**
 * Здравствуйте.
 * Хорошая работа, работа принимается
 *
 */