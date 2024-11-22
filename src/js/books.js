class Book {
    constructor(nameOfTheBook, caption, price, src, tags, catalogGroups, description, count, sale, publishingHouse) {
        this.nameOfTheBook = nameOfTheBook;
        this.caption = caption;
        this.price = price;
        this.src = src;
        this.tags = tags;
        this.catalogGroups = catalogGroups;
        this.description = description;
        this.count = count;
        this.sale = sale;
        this.publishingHouse = publishingHouse;
    }
}

export function getBooksCatalog(allBooks, catalogGroup) {
    let books = [];

    for (let i = 0; i < allBooks.length; i++) {
        const allCatalogGroups = allBooks[i].catalogGroups;

        for (let j = 0; j < allCatalogGroups.length; j++) {
            if (allCatalogGroups[j] == catalogGroup) {
                books.push(allBooks[i]);
            }
        }
    }
    return books;
}

export function getPrice(price, sale) {
    if (sale != 0) {
        const newPrice = price - (sale / 100 * price);
        return newPrice;
    } else { return price; }
}

export function createbooksCatalog(books, wrapper, view) {
    const booksWrapper = document.querySelector(`.${wrapper}`);
    const countItems = books.length;

    booksWrapper.innerHTML = `<ul class="${wrapper}__list"></ul>`;
    const booksList = document.querySelector(`.${wrapper}__list`);
    for (let i = 0; i < countItems; i++) {
        booksList.innerHTML += `<li class = "${wrapper}__item"></li>`;
    }

    const booksItem = document.querySelectorAll(`.${wrapper}__item`);

    if (view == 1 || view == 2) {
        for (let i = 0; i < countItems; i++) {
            booksItem[i].innerHTML += `<img class="${wrapper}__img" src="${books[i].src[0]}" alt="Изображение книги ${books[i].nameOfTheBook}">`;
            booksItem[i].innerHTML += `<div class="${wrapper}__content"></div>`;
            booksItem[i].querySelector(`.${wrapper}__content`).innerHTML += `<h4 class="${wrapper}__title">${books[i].nameOfTheBook}</h4>`;
            booksItem[i].querySelector(`.${wrapper}__content`).innerHTML += `<span class="${wrapper}__caption">${books[i].caption}</span>`;

            const price = getPrice(books[i].price, books[i].sale);
            booksItem[i].querySelector(`.${wrapper}__content`).innerHTML += `<span class="${wrapper}__price">${price} Br</span>`;
        }
    }

    if (view == 3) {
        booksWrapper.classList.add("sales");
        for (let i = 0; i < countItems; i++) {
            booksItem[i].innerHTML += `<img class="${wrapper}__img" src="${books[i].src[0]}" alt="Изображение книги ${books[i].nameOfTheBook}">`;
            booksItem[i].innerHTML += `<div class="${wrapper}__content"></div>`;
            booksItem[i].querySelector(`.${wrapper}__content`).innerHTML += `<h4 class="${wrapper}__title">${books[i].nameOfTheBook}</h4>`;
            booksItem[i].querySelector(`.${wrapper}__content`).innerHTML += `<p class="${wrapper}__text">${books[i].description[6]}</p>`;

            booksItem[i].innerHTML += `<div class="${wrapper}__main"></div>`;
            booksItem[i].querySelector(`.${wrapper}__main`).innerHTML += `<div class="${wrapper}__price-group"></div>`;

            const newPrice = getPrice(books[i].price, books[i].sale);
            booksItem[i].querySelector(`.${wrapper}__price-group`).innerHTML += `<span class="${wrapper}__price">${books[i].price} ₽</span><span class="${wrapper}__price">${newPrice} ₽</span>`;

            booksItem[i].querySelector(`.${wrapper}__main`).innerHTML += `<div class="${wrapper}__bottom"></div>`;  
        }
    }
    booksItem.forEach((item, index) => {
        item.addEventListener('click', () => {
            openBookDetails(books[index]);
        });
    });
}

function openBookDetails(book) {
    const url = `details.html?id=${book.nameOfTheBook.replace(/\s+/g, '_')}`;
    window.location.href = url;
}


export function sortBooks(linkText, books) {
    let booksGroup = [];
    if (linkText == "По возраст. цены" || linkText == "По убыв. цены") {
        const booksPrice = [];
        for (let i = 0; i < books.length; i++) {
            booksPrice.push(getPrice(books[i].price, books[i].sale));
        }
        booksPrice.sort(function (a, b) {
            return a - b;
        });
        if (linkText == "По убыв. цены") {
            booksPrice.reverse();
        }
        for (let j = 0; j < booksPrice.length; j++) {
            for (let i = 0; i < books.length; i++) {
                if (getPrice(books[i].price, books[i].sale) == booksPrice[j]) {
                    booksGroup.push(books[i]);
                }
            }
        }
        return booksGroup;
    }
    if (linkText == "По умолчанию") {
        return books;
    }
    if (linkText == "По алфавиту") {
        const booksName = [];
        for (let i = 0; i < books.length; i++) {
            booksName.push(books[i].nameOfTheBook);
        }
        booksName.sort();
        for (let j = 0; j < booksName.length; j++) {
            for (let i = 0; i < books.length; i++) {
                if (books[i].nameOfTheBook == booksName[j]) {
                    booksGroup.push(books[i]);
                }
            }
        }
        return booksGroup;
    }
}


let masterAndMargarita, idiot, steppeWolf, aystaMarabuNightmares, lordOfTheFlies, process,
    theGirlWithTheDragonTattoo, toKillMockingbird, generationP, playingInBeads, introductionToPsychoanalysis,
    bibleOldandNewTestament, book1NarutoUzumaki, alexanderBlokCompleteWritingsinOneVolume, onPsychologyofUnconscious,
    completeCollectionofLyricsinOneVolume, siddhartha, deadSouls, chapaevandEmptiness, godAsAnIllusion, timeOfTroubles,
    artOfWar, hallucinations, tokyoGulBook1, fifthMountain, harryPotterAndthePrisonerofAzkaban;
//название книги, заголовок, цена, изображения, метки, группы, описание, количество книг, скидка, издательство
export let books = [
    masterAndMargarita = new Book(
        "Vr-очки Meta Quest 2",
        '«…гарнитура VR предлагает уникальный опыт развлечений…»',
        38,

        [
            "images/vr/metaQuest2.png",
        ],

        [
            "лучшие мировые книги",
            "бестселлер",
            "подарочная книга",
            "русская литература",
            "кожаный переплет",
            "топ художественной литературы"
        ],

        [
            "Игровые консоли и VR",
        ],

        ["Автор:  Михаил Афанасьевич Булгаков",
            "Жанр: Роман",
            "Страничность: 480",
            "Переплет: Твердый",
            "Формат: 84х108/32 (130х205 мм, стандартный)",
            "Вес: 370 г",
            "Мастер и Маргарита М. А. Булгакова – самое удивительное и загадочное произведение ХХ века. Опубликованный в середине 1960-х, этот роман поразил читателей необычностью замысла, красочностью и фантастичностью действия, объединяющего героев разных эпох и культур. Автор создал роман в романе, где сплетены воедино религиозно-историческая мистерия, восходящая к легенде о распятом Христе, московская 'буффонада' и сверхъестественные сцены с персонажами, воплощающими некую темную силу, которая однако 'вечно хочет зла и вечно совершает благо'. Есть в этой книге какая-то безрасчетность, какая-то предсмертная ослепительность большого таланта... – писал Константин Симонов в своем предисловии к первой публикации романа, открывшей всему миру большого художника, подлинного Мастера слова."
        ],

        10,
        0,
        "Facebook Technologies"
    ),

    idiot = new Book(
        "Xbox Series S",
        '«…стильная консоль предлагает мощную производительность…»',
        28,

        [
            "images/consoles/xboxs.png",
        ],

        [
            "лучшие мировые книги",
            "бестселлер",
            "подарочная книга",
            "русская литература",
            "кожаный переплет",
            "топ художественной литературы"
        ],

        [
            "Игровые консоли и VR",
        ],

        ["Автор:  Михаил Афанасьевич Булгаков",
            "Жанр: Роман",
            "Страничность: 480",
            "Переплет: Твердый",
            "Формат: 84х108/32 (130х205 мм, стандартный)",
            "Вес: 370 г",
            "Мастер и Маргарита М. А. Булгакова – самое удивительное и загадочное произведение ХХ века. Опубликованный в середине 1960-х, этот роман поразил читателей необычностью замысла, красочностью и фантастичностью действия, объединяющего героев разных эпох и культур. Автор создал роман в романе, где сплетены воедино религиозно-историческая мистерия, восходящая к легенде о распятом Христе, московская 'буффонада' и сверхъестественные сцены с персонажами, воплощающими некую темную силу, которая однако 'вечно хочет зла и вечно совершает благо'. Есть в этой книге какая-то безрасчетность, какая-то предсмертная ослепительность большого таланта... – писал Константин Симонов в своем предисловии к первой публикации романа, открывшей всему миру большого художника, подлинного Мастера слова."
        ],

        10,
        0,
        "Facebook Technologies"
    ),

    steppeWolf = new Book(
        "PlayStation 4 Slim",
        '«…невероятное качество графики и захватывающий геймплей…»',
        24,

        [
            "images/consoles/ps4slim.png",
        ],

        [
            "Игровые консоли и VR"
        ],

        [
            "Игровые консоли и VR"
        ],

        ["Автор:  Михаил Афанасьевич Булгаков",
            "Жанр: Роман",
            "Страничность: 480",
            "Переплет: Твердый",
            "Формат: 84х108/32 (130х205 мм, стандартный)",
            "Вес: 370 г",
            "Мастер и Маргарита М. А. Булгакова – самое удивительное и загадочное произведение ХХ века. Опубликованный в середине 1960-х, этот роман поразил читателей необычностью замысла, красочностью и фантастичностью действия, объединяющего героев разных эпох и культур. Автор создал роман в романе, где сплетены воедино религиозно-историческая мистерия, восходящая к легенде о распятом Христе, московская 'буффонада' и сверхъестественные сцены с персонажами, воплощающими некую темную силу, которая однако 'вечно хочет зла и вечно совершает благо'. Есть в этой книге какая-то безрасчетность, какая-то предсмертная ослепительность большого таланта... – писал Константин Симонов в своем предисловии к первой публикации романа, открывшей всему миру большого художника, подлинного Мастера слова."
        ],

        10,
        0,
        "Facebook Technologies"
    ),

    aystaMarabuNightmares = new Book(
        "Караоке-колонки Mivo MD-803",
        '«…портативная караоке-колонка с 7 режимами RGB-подсветки…»',
        24,

        [
            "images/karaoke/mivomd.png",
        ],

        [
            "Аудио и караоке",
        ],

        [
            "Аудио и караоке",
        ],

        ["Автор:  Михаил Афанасьевич Булгаков",
            "Жанр: Роман",
            "Страничность: 480",
            "Переплет: Твердый",
            "Формат: 84х108/32 (130х205 мм, стандартный)",
            "Вес: 370 г",
            "Мастер и Маргарита М. А. Булгакова – самое удивительное и загадочное произведение ХХ века. Опубликованный в середине 1960-х, этот роман поразил читателей необычностью замысла, красочностью и фантастичностью действия, объединяющего героев разных эпох и культур. Автор создал роман в романе, где сплетены воедино религиозно-историческая мистерия, восходящая к легенде о распятом Христе, московская 'буффонада' и сверхъестественные сцены с персонажами, воплощающими некую темную силу, которая однако 'вечно хочет зла и вечно совершает благо'. Есть в этой книге какая-то безрасчетность, какая-то предсмертная ослепительность большого таланта... – писал Константин Симонов в своем предисловии к первой публикации романа, открывшей всему миру большого художника, подлинного Мастера слова."
        ],

        10,
        0,
        "Facebook Technologies"
    ),

    lordOfTheFlies = new Book(
        "Микронаушник Agger Pro",
        '«Габариты 10.5 x 4.5 x 4.5. Время работы 6 часов»',
        11,

        [
            "images/electronics/agger.png",
        ],

        [
            "лучшие мировые книги",
            "бестселлер",
            "подарочная книга",
            "русская литература",
            "кожаный переплет",
            "топ художественной литературы"
        ],

        [
            "Электронные аксессуары",
        ],

        ["Автор:  Михаил Афанасьевич Булгаков",
            "Жанр: Роман",
            "Страничность: 480",
            "Переплет: Твердый",
            "Формат: 84х108/32 (130х205 мм, стандартный)",
            "Вес: 370 г",
            "Мастер и Маргарита М. А. Булгакова – самое удивительное и загадочное произведение ХХ века. Опубликованный в середине 1960-х, этот роман поразил читателей необычностью замысла, красочностью и фантастичностью действия, объединяющего героев разных эпох и культур. Автор создал роман в романе, где сплетены воедино религиозно-историческая мистерия, восходящая к легенде о распятом Христе, московская 'буффонада' и сверхъестественные сцены с персонажами, воплощающими некую темную силу, которая однако 'вечно хочет зла и вечно совершает благо'. Есть в этой книге какая-то безрасчетность, какая-то предсмертная ослепительность большого таланта... – писал Константин Симонов в своем предисловии к первой публикации романа, открывшей всему миру большого художника, подлинного Мастера слова."
        ],

        10,
        0,
        "Facebook Technologies"
    ),

    process = new Book(
        "Микронаушник ML15",
        '«…магнитных наушников с беспроводной гарнитурой Plantronics…»',
        9,

        [
            "images/electronics/ml15.png",
        ],

        [
            "лучшие мировые книги",
            "бестселлер",
            "подарочная книга",
            "русская литература",
            "кожаный переплет",
            "топ художественной литературы"
        ],

        [
            "Электронные аксессуары",
        ],

        ["Автор:  Михаил Афанасьевич Булгаков",
            "Жанр: Роман",
            "Страничность: 480",
            "Переплет: Твердый",
            "Формат: 84х108/32 (130х205 мм, стандартный)",
            "Вес: 370 г",
            "Мастер и Маргарита М. А. Булгакова – самое удивительное и загадочное произведение ХХ века. Опубликованный в середине 1960-х, этот роман поразил читателей необычностью замысла, красочностью и фантастичностью действия, объединяющего героев разных эпох и культур. Автор создал роман в романе, где сплетены воедино религиозно-историческая мистерия, восходящая к легенде о распятом Христе, московская 'буффонада' и сверхъестественные сцены с персонажами, воплощающими некую темную силу, которая однако 'вечно хочет зла и вечно совершает благо'. Есть в этой книге какая-то безрасчетность, какая-то предсмертная ослепительность большого таланта... – писал Константин Симонов в своем предисловии к первой публикации романа, открывшей всему миру большого художника, подлинного Мастера слова."
        ],

        10,
        0,
        "Facebook Technologies"
    ),

    theGirlWithTheDragonTattoo = new Book(
        "Велотренажёр Body Style TC545",
        '«…надежный и стильный тренажер предлагает идеальное сочетание…»',
        39,

        [
            "images/sport/tc545.png",
        ],

        [
            "лучшие мировые книги",
            "бестселлер",
            "подарочная книга",
            "русская литература",
            "кожаный переплет",
            "топ художественной литературы"
        ],

        [
            "Спорт и фитнес",
        ],

        ["Автор:  Михаил Афанасьевич Булгаков",
            "Жанр: Роман",
            "Страничность: 480",
            "Переплет: Твердый",
            "Формат: 84х108/32 (130х205 мм, стандартный)",
            "Вес: 370 г",
            "Мастер и Маргарита М. А. Булгакова – самое удивительное и загадочное произведение ХХ века. Опубликованный в середине 1960-х, этот роман поразил читателей необычностью замысла, красочностью и фантастичностью действия, объединяющего героев разных эпох и культур. Автор создал роман в романе, где сплетены воедино религиозно-историческая мистерия, восходящая к легенде о распятом Христе, московская 'буффонада' и сверхъестественные сцены с персонажами, воплощающими некую темную силу, которая однако 'вечно хочет зла и вечно совершает благо'. Есть в этой книге какая-то безрасчетность, какая-то предсмертная ослепительность большого таланта... – писал Константин Симонов в своем предисловии к первой публикации романа, открывшей всему миру большого художника, подлинного Мастера слова."
        ],

        10,
        0,
        "Facebook Technologies"
    ),


    generationP = new Book(
        "Кальяны брендов: Mamay customs, HOOB, Alpha Hookan",
        '«…целая культура, наполненная особенностями и ритуалами…»',
        29,

        [
            "images/hookah/hookah.png",
        ],

        [
            "лучшие мировые книги",
            "бестселлер",
            "подарочная книга",
            "русская литература",
            "кожаный переплет",
            "топ художественной литературы"
        ],

        [
            "Кальяны",
        ],

        ["Автор:  Михаил Афанасьевич Булгаков",
            "Жанр: Роман",
            "Страничность: 480",
            "Переплет: Твердый",
            "Формат: 84х108/32 (130х205 мм, стандартный)",
            "Вес: 370 г",
            "Мастер и Маргарита М. А. Булгакова – самое удивительное и загадочное произведение ХХ века. Опубликованный в середине 1960-х, этот роман поразил читателей необычностью замысла, красочностью и фантастичностью действия, объединяющего героев разных эпох и культур. Автор создал роман в романе, где сплетены воедино религиозно-историческая мистерия, восходящая к легенде о распятом Христе, московская 'буффонада' и сверхъестественные сцены с персонажами, воплощающими некую темную силу, которая однако 'вечно хочет зла и вечно совершает благо'. Есть в этой книге какая-то безрасчетность, какая-то предсмертная ослепительность большого таланта... – писал Константин Симонов в своем предисловии к первой публикации романа, открывшей всему миру большого художника, подлинного Мастера слова."
        ],

        10,
        0,
        "Facebook Technologies"
    )
];