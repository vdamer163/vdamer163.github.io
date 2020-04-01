Добрый день,

Понимаю что с Api все хорошо, но давайте доделаем проект качественно в остальных аспектах.

## Надо исправить
- см. комментарии в UserInfo, script, Popup
- в UserInfo нужно добавить или метод, который возвращает данные пользователя, или геттер (на ваш выбор): https://learn.javascript.ru/private-protected-properties-methods -- это необходимо чтобы получать данные юзера из класса, потому что просто обращаться к переменной класса -- нехорошо, это нарушение инкапсуляции будет, мало ли кто захочет данные перезаписать так.

## Можно лучше (а еще лучше -- исправить)

Выполните этот код отдельно:

~~~
class Meth {
  constructor(arr) {
    this.arr = arr;
  }

  render() {
    console.log(this.arr);
  }
}

const myArr = [];
const meth = new Meth(myArr);

myArr.push(1);
myArr.push(5);

meth.render();
~~~

Отсюда видно, что в класс передается массив, но он передается по ссылке, 
т.е. вы можете передать пустой массив, но если до вызова render массив наполнится чем-то, 
то в render вы будуте иметь дело с массивом с данными. Я это к чему, вот ваш код:

~~~
let cardList;

api.loadCards()
  .then((result) => {
    const cards = [];
    for (const cardData of result) {
      card = new Card(cardData);
      card.init();
      cards.push(card.getElement())
    }
    cardList = new CardList(placeList, cards);
    cardList.render();
  })
  .catch(err => {

    throw err;
  });
~~~

Правильно он будет выглядеть так:

~~~
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
  .catch((err) => {
    throw err;
  });
~~~

Объекты передаются по ссылке!
