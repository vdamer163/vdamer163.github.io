class CardList {

  constructor(container, cards) {
    this.container = container;
    this.cards = cards;



  }


  addCard(card) {
    this.cards.push(card);

  }


  render() {
    // Надо исправить -- Так "чистить" родителя некорректно
    // Да и вообще зачем это? Кто сказал что необходимо каждый раз очищать контейнер карточек при добавлении новой?
    //this.container.innerHTML = '';
    // Надо исправить
    // Тут должен вызываться в цикле метод addCard, render сам ничего в DOM не добавляет
    // Дамер - зачем, если addCard это добаление карточек в массив, с которым мы потом работаем в методе render и он то как раз их и отрисовывает, если логика должеа быть другой прошу пояснить.

    for (const card of this.cards) {

      this.container.insertAdjacentElement('beforeend', card)
    }
  }


}