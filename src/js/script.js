import { isWebp } from "./libs/webpImg.js";
isWebp();

import { burger } from "./libs/burger.js";
burger("burger-content");

import { books } from "./books.js";

let basketProducts = [];

function searchBooks(
  val,
  items,
  correctitems,
  className,
  classWrapper,
  paginationCount = 6
) {
  if (val != "") {
    items.forEach((item) => {
      if (
        item
          .querySelector(`.${className}__content`)
          .querySelector(`.${className}__title`)
          .innerText.toLowerCase()
          .search(val) != -1
      ) {
        correctitems.push(item);
      } else {
      }
    });

    const lists = document.querySelectorAll(`.${className}__list`);
    lists.forEach((list) => {
      list.parentNode.removeChild(list);
    });

    const pageGroup = document.querySelector(".page-group");
    if (pageGroup != null) {
      pageGroup.parentNode.removeChild(pageGroup);
    }

    document.querySelector(
      `.${classWrapper}`
    ).innerHTML = `<ul class="${className}__list"></ul>`;
    for (let i = 0; i < correctitems.length; i++) {
      document.querySelector(`.${className}__list`).append(correctitems[i]);
    }
    pagination(`.${className}__list`, `.${className}__item`, paginationCount);
  } else {
    const lists = document.querySelectorAll(`.${className}__list`);
    lists.forEach((list) => {
      list.parentNode.removeChild(list);
    });

    const pageGroup = document.querySelector(".page-group");
    if (pageGroup != null) {
      pageGroup.parentNode.removeChild(pageGroup);
    }

    document.querySelector(
      `.${classWrapper}`
    ).innerHTML = `<ul class="${className}__list"></ul>`;
    for (let i = 0; i < items.length; i++) {
      document.querySelector(`.${className}__list`).append(items[i]);
    }
    pagination(`.${className}__list`, `.${className}__item`, paginationCount);
  }
}

// import "./libs/inputMask.js";
// const inputmask = window.Inputmask;

// import {formPopup} from "./libs/popupForm.js"
// formPopup(openBtns, fromBG, form, formBody);

import { blurElements } from "./libs/blurElements.js";
blurElements();

import { isMobile } from "./libs/isMobile.js";
if (isMobile.any()) {
  document.body.classList.add("_mobile");
} else {
  document.body.classList.add("_pc");
}

function openSelect(selectClass) {
  const select = document.querySelector(`.${selectClass}`);
  select.addEventListener("click", () => {
    select.classList.toggle(`${selectClass}--active`);
  });

  document.addEventListener("click", function (event) {
    if (!select.contains(event.target)) {
      select.classList.remove(`${selectClass}--active`);
    }
  });
}

function selectItem(selectableItem) {
  const allItemSelect = document.querySelectorAll(`.${selectableItem}`);
  allItemSelect[0].classList.add(`${selectableItem}--active`);
  for (let i = 0; i < allItemSelect.length; i++) {
    allItemSelect[i].setAttribute("order-attr", i);
    allItemSelect[i].addEventListener("click", () => {
      const clickItemAttr = allItemSelect[i].getAttribute("order-attr");
      const activeItem = document.querySelector(`.${selectableItem}--active`);
      activeItem.setAttribute("order-attr", clickItemAttr);
      activeItem.style.order = clickItemAttr;
      activeItem.classList.remove(`${selectableItem}--active`);
      allItemSelect[i].setAttribute("order-attr", 0);
      allItemSelect[i].style.order = 0;
      allItemSelect[i].classList.add(`${selectableItem}--active`);
    });
  }
}

import { pagination } from "./libs/pagination.js";

function catalogMenu() {
  const catalogBtn = document.querySelector(".catalog__btn");
  const leftMenu = document.querySelector(".left-menu");
  const catalogMenuSpans = document.querySelectorAll(".catalog__span");
  catalogBtn.addEventListener("click", () => {
    catalogBtn.classList.toggle("catalog__btn--active");
    catalogMenuSpans.forEach((element) => {
      element.classList.toggle("catalog__span--active");
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    leftMenu.classList.toggle("left-menu--active");
    document.body.classList.toggle("_lock");
  });
}

function paginationFilter(filtersLinks) {
  filtersLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const discountsListStart = document.querySelector(
        ".catalog-group-content__list"
      );
      const discountsWrapper = document.querySelector(".catalog-group-content");
      const discountsItems = document.querySelectorAll(
        ".catalog-group-content__item"
      );
      const discountLists = document.querySelectorAll(
        ".catalog-group-content__list"
      );
      discountLists.forEach((element) => {
        element.parentNode.removeChild(element);
      });
      const pageGroup = document.querySelector(".page-group");
      if (pageGroup != null) {
        pageGroup.parentNode.removeChild(pageGroup);
      }

      for (let i = 0; i < discountsItems.length; i++) {
        discountsListStart.append(discountsItems[i]);
      }

      discountsWrapper.append(discountsListStart);
      pagination(
        ".catalog-group-content__list",
        ".catalog-group-content__item",
        link.innerText
      );

      if (
        discountsListStart.classList.contains(
          "catalog-group-content__list_column"
        )
      ) {
        const temp = document.querySelectorAll(".catalog-group-content__list");
        temp.forEach((element) => {
          if (
            !element.classList.contains("catalog-group-content__list_column")
          ) {
            element.classList.add("catalog-group-content__list_column");
          }
        });
      }
    });
  });
}

function sortFilter(sortFiltersLink, books, view) {
  sortFiltersLink.forEach((link) => {
    link.addEventListener("click", () => {
      const discountsListStart = document.querySelector(
        ".catalog-group-content__list"
      );
      const discountsItems = document.querySelectorAll(
        ".catalog-group-content__item"
      );
      const newBooksGroup = sortBooks(link.innerText, books);
      const discountLists = document.querySelectorAll(
        ".catalog-group-content__list"
      );
      discountLists.forEach((element) => {
        element.parentNode.removeChild(element);
      });
      const pageGroup = document.querySelector(".page-group");
      if (pageGroup != null) {
        pageGroup.parentNode.removeChild(pageGroup);
      }

      for (let i = 0; i < discountsItems.length; i++) {
        discountsListStart.append(discountsItems[i]);
      }

      createbooksCatalog(newBooksGroup, "catalog-group-content", view);
      const itemFilterLink = document.querySelector(
        ".items-filters__item--active"
      );
      const itemFilterLinkValue = Number(
        itemFilterLink.querySelector(".items-filters__link").innerText
      );

      pagination(
        ".catalog-group-content__list",
        ".catalog-group-content__item",
        itemFilterLinkValue
      );

      if (
        discountsListStart.classList.contains(
          "catalog-group-content__list_column"
        )
      ) {
        const temp = document.querySelectorAll(".catalog-group-content__list");
        temp.forEach((element) => {
          if (
            !element.classList.contains("catalog-group-content__list_column")
          ) {
            element.classList.add("catalog-group-content__list_column");
          }
        });
      }
    });
  });
}

if (document.title == "Мир книг") {
  pagination(".world-of-books__list", ".world-of-books__item", 10);
  catalogMenu();
}

// Virtual — Модуль виртуальных слайдов
// Keyboard — Модуль управления клавиатурой
// Mousewheel — Модуль управления Mousewheel
// Navigation — Модуль навигации
// Pagination — Модуль разбивки на страницы
// Scrollbar — Модуль прокрутки
// Parallax — Модуль Parallax
// Zoom — Модуль масштабирования
// Lazy — ленивый модуль
// Controller — Модуль контроллера
// A11y — Модуль доступности
// History — История
// HashNavigation — Модуль навигации Hash
// Autoplay — Модуль автовоспроизведения
// EffectFade — Модуль Fade Effect
// EffectCube — Модуль эффектов куба
// EffectFlip — Модуль Flip Effect
// EffectCoverflow — Модуль эффектов Coverflow

import Swiper, { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);

import {
  getBooksCatalog,
  getPrice,
  createbooksCatalog,
  sortBooks,
} from "./books.js";

if (document.title == "Главная") {
  catalogMenu();

  new Swiper(".kniginya-main-slider", {
    speed: 800,
    spaceBetween: 100,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },

    autoplay: {
      delay: 2000,
    },

    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
  createbooksCatalog(books, "all-books", 1);
  pagination(".all-books__list", ".all-books__item", 6);

  new Swiper(".our-partners__slider", {
    speed: 500,
    spaceBetween: 20,

    navigation: {
      nextEl: ".swiper-button-next-partners",
      prevEl: ".swiper-button-prev-partners",
    },
    slidesPerView: 1,
    loop: true,
    loopPreventsSlide: 1,
    centeredSlides: true,

    breakpoints: {
      600: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 5,
      },
    },
  });

  const items = document.querySelectorAll(".all-books__item");
  document.querySelector(".search-box__input").oninput = function () {
    let val = this.value.trim().toLowerCase();
    let correctitems = [];
    searchBooks(val, items, correctitems, "all-books", "kniginya-main-catalog");
  };
}

function createCatalog(catalogName) {
  catalogMenu();
  let catalogBooks = getBooksCatalog(books, catalogName);
  createbooksCatalog(catalogBooks, "catalog-group-content", 1);
  pagination(".catalog-group-content__list", ".catalog-group-content__item", 6);

  openSelect("sort-filters__list");
  selectItem("sort-filters__item");
  openSelect("items-filters__list");
  selectItem("items-filters__item");

  const filtersLinks = document.querySelectorAll(".items-filters__item");
  paginationFilter(filtersLinks);

  const sortFiltersLink = document.querySelectorAll(".sort-filters__link");
  sortFilter(sortFiltersLink, catalogBooks, 2);

  const items = document.querySelectorAll(".catalog-group-content__item");
  document.querySelector(".search-box__input").oninput = function () {
    let val = this.value.trim().toLowerCase();
    let correctitems = [];
    const paginationCount = document.querySelector(
      ".items-filters__item--active"
    );
    let paginationLink = paginationCount.querySelector(
      ".items-filters__link"
    ).innerText;
    paginationLink = Number(paginationLink);
    searchBooks(
      val,
      items,
      correctitems,
      "catalog-group-content",
      "catalog-group-content",
      paginationLink
    );
  };
  addProductsInBasket();
}


if (document.title == "Электронные аксессуары") {
  createCatalog("Электронные аксессуары");

  activeLeftMenuLink("Электронные аксессуары");
}
if (document.title == "Кальяны") {
  createCatalog("Кальяны");

  activeLeftMenuLink("Кальяны");
}
if (document.title == "Спорт и фитнес") {
  createCatalog("Спорт и фитнес");

  activeLeftMenuLink("Спорт и фитнес");
}
if (document.title == "Аудио и караоке") {
  createCatalog("Аудио и караоке");

  activeLeftMenuLink("Аудио и караоке");
}
if (document.title == "Игровые консоли и VR") {
  createCatalog("Игровые консоли и VR");

  activeLeftMenuLink("Игровые консоли и VR");
}

if (document.title == "Акции") {
  activeMenuLink("Акции");
  openSelect("sort-filters__list");
  selectItem("sort-filters__item");
  openSelect("items-filters__list");
  selectItem("items-filters__item");

  let salesBooks = [];
  for (let i = 0; i < books.length; i++) {
    if (books[i].sale != 0) {
      salesBooks.push(books[i]);
    }
  }

  createbooksCatalog(salesBooks, "catalog-group-content", 3);
  pagination(".catalog-group-content__list", ".catalog-group-content__item", 8);

  const filtersLinks = document.querySelectorAll(".items-filters__item");
  paginationFilter(filtersLinks);

  const filterBtns = document.querySelectorAll(".view-filters__btn");

  filterBtns[0].addEventListener("click", () => {
    const discountsListActive = document.querySelectorAll(
      ".catalog-group-content__list"
    );
    for (let i = 0; i < discountsListActive.length; i++) {
      discountsListActive[i].classList.add(
        "catalog-group-content__list_column"
      );
    }
  });

  filterBtns[1].addEventListener("click", () => {
    const discountsListActive = document.querySelectorAll(
      ".catalog-group-content__list"
    );
    for (let i = 0; i < discountsListActive.length; i++) {
      discountsListActive[i].classList.remove(
        "catalog-group-content__list_column"
      );
    }
  });

  const sortFiltersLink = document.querySelectorAll(".sort-filters__link");
  sortFilter(sortFiltersLink, salesBooks, 3);

  const items = document.querySelectorAll(".catalog-group-content__item");
  document.querySelector(".search-box__input").oninput = function () {
    let val = this.value.trim().toLowerCase();
    let correctitems = [];
    const paginationCount = document.querySelector(
      ".items-filters__item--active"
    );
    let paginationLink = paginationCount.querySelector(
      ".items-filters__link"
    ).innerText;
    paginationLink = Number(paginationLink);
    searchBooks(
      val,
      items,
      correctitems,
      "catalog-group-content",
      "catalog-group-content",
      paginationLink
    );
  };
}

function addProductsInBasket() {
  const basketBtns = document.querySelectorAll(".like-btn");
  basketBtns.forEach((basketBtn) => {
    basketBtn.addEventListener("click", () => {
      const bookName =
        basketBtn.parentElement.parentElement.parentElement.querySelector(
          ".catalog-group-content__title"
        ).innerText;
      for (let i = 0; i < books.length; i++) {
        let count = 0;
        if (bookName == books[i].nameOfTheBook) {
          for (let j = 0; j < basketProducts.length; j++) {
            if (basketProducts[j].nameOfTheBook == books[i].nameOfTheBook) {
              count = 1;
              document
                .querySelector(".popup-wrapper-repeat-product")
                .classList.add("popup-wrapper--active");
              setTimeout(
                () =>
                  document
                    .querySelector(".popup-wrapper-repeat-product")
                    .classList.remove("popup-wrapper--active"),
                1500
              );
            }
          }
          if (count == 0) {
            basketProducts.push(books[i]);
            document
              .querySelector(".popup-wrapper-add-product")
              .classList.add("popup-wrapper--active");
            setTimeout(
              () =>
                document
                  .querySelector(".popup-wrapper-add-product")
                  .classList.remove("popup-wrapper--active"),
              1500
            );
          }
        }
      }
      document.querySelector(".header-icons__span").innerText =
        basketProducts.length;
    });
  });
}

if (document.title == "Акции") {
  const basketBtns = document.querySelectorAll(".like-btn");
  basketBtns.forEach((basketBtn) => {
    basketBtn.addEventListener("click", () => {
      const bookName =
        basketBtn.parentElement.parentElement.parentElement.parentElement.querySelector(
          ".catalog-group-content__title"
        ).innerText;
      for (let i = 0; i < books.length; i++) {
        let count = 0;
        if (bookName == books[i].nameOfTheBook) {
          for (let j = 0; j < basketProducts.length; j++) {
            if (basketProducts[j].nameOfTheBook == books[i].nameOfTheBook) {
              count = 1;
              document
                .querySelector(".popup-wrapper-repeat-product")
                .classList.add("popup-wrapper--active");
              setTimeout(
                () =>
                  document
                    .querySelector(".popup-wrapper-repeat-product")
                    .classList.remove("popup-wrapper--active"),
                1500
              );
            }
          }
          if (count == 0) {
            basketProducts.push(books[i]);
            document
              .querySelector(".popup-wrapper-add-product")
              .classList.add("popup-wrapper--active");
            setTimeout(
              () =>
                document
                  .querySelector(".popup-wrapper-add-product")
                  .classList.remove("popup-wrapper--active"),
              1500
            );
          }
        }
      }
      document.querySelector(".header-icons__span").innerText =
        basketProducts.length;
    });
  });
}

if (document.title == "Корзина") {
  createBasketProducts();

  const removeBts = document.querySelectorAll(".basket-content__close");

  removeBts.forEach((btn) => {
    btn.addEventListener("click", () => {
      const basketItems = document.querySelectorAll(".basket-content__item");
      if (basketItems.length == 1) {
        document.querySelector(".basket-content__list").remove();
        document.querySelector(".basket-content-bottom").remove();
        document.querySelector(".basket-content").innerHTML +=
          "<p class='basket-content__text'>Корзина пуста</p>";
        document.querySelector(".header-icons__span").innerText = 0;
      }

      let totalPrice = document.querySelector(
        ".basket-content-bottom__price"
      ).innerText;
      totalPrice = Number(totalPrice.replace(" ₽", ""));

      let itemPrice = btn.parentElement.parentElement.querySelector(
        ".basket-content__price"
      ).innerText;
      itemPrice = Number(itemPrice.replace(" ₽", ""));

      let newPrice = totalPrice - itemPrice;
      document.querySelector(
        ".basket-content-bottom__price"
      ).innerText = `${newPrice} ₽`;

      btn.parentElement.parentElement.parentNode.removeChild(
        btn.parentElement.parentElement
      );

      let productCount = document.querySelector(
        ".header-icons__span"
      ).innerText;
      productCount = Number(productCount);
      productCount--;
      document.querySelector(".header-icons__span").innerText = productCount;
    });
  });

  const incrBtns = document.querySelectorAll(".basket-content__incr");
  incrBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const bookName =
        btn.parentElement.parentElement.parentElement.querySelector(
          ".basket-content__subtitle"
        ).innerText;
      let bookCount = 0;
      let startPrice = 0;
      for (let i = 0; i < basketProducts.length; i++) {
        if (basketProducts[i].nameOfTheBook == bookName) {
          bookCount = basketProducts[i].count;
          startPrice = basketProducts[i].price;
        }
      }
      let currentBookCount =
        btn.parentElement.parentElement.parentElement.querySelector(
          ".basket-content__count"
        ).innerText;
      currentBookCount = Number(currentBookCount);
      if (currentBookCount < bookCount) {
        currentBookCount++;
        btn.parentElement.parentElement.parentElement.querySelector(
          ".basket-content__count"
        ).innerText = currentBookCount;
        let currentPrice =
          btn.parentElement.parentElement.parentElement.querySelector(
            ".basket-content__price"
          ).innerText;
        currentPrice = Number(currentPrice.replace(" ₽", ""));
        currentPrice += startPrice;
        btn.parentElement.parentElement.parentElement.querySelector(
          ".basket-content__price"
        ).innerText = `${currentPrice} ₽`;

        let totalPrice = document.querySelector(
          ".basket-content-bottom__price"
        ).innerText;
        totalPrice = Number(totalPrice.replace(" ₽", ""));
        totalPrice += startPrice;
        document.querySelector(
          ".basket-content-bottom__price"
        ).innerText = `${totalPrice} ₽`;
      } else {
        document
          .querySelector(".popup-wrapper-basket-product")
          .querySelector("span").innerText = bookCount;
        document
          .querySelector(".popup-wrapper-basket-product")
          .classList.add("popup-wrapper--active");
        setTimeout(
          () =>
            document
              .querySelector(".popup-wrapper-basket-product")
              .classList.remove("popup-wrapper--active"),
          1500
        );
      }
    });
  });

  const decrBtns = document.querySelectorAll(".basket-content__decr");
  decrBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const bookName =
        btn.parentElement.parentElement.parentElement.querySelector(
          ".basket-content__subtitle"
        ).innerText;
      let bookCount = 0;
      let startPrice = 0;
      for (let i = 0; i < basketProducts.length; i++) {
        if (basketProducts[i].nameOfTheBook == bookName) {
          bookCount = basketProducts[i].count;
          startPrice = basketProducts[i].price;
        }
      }
      let currentBookCount =
        btn.parentElement.parentElement.parentElement.querySelector(
          ".basket-content__count"
        ).innerText;
      currentBookCount = Number(currentBookCount);
      if (currentBookCount > 1) {
        currentBookCount--;
        btn.parentElement.parentElement.parentElement.querySelector(
          ".basket-content__count"
        ).innerText = currentBookCount;
        let currentPrice =
          btn.parentElement.parentElement.parentElement.querySelector(
            ".basket-content__price"
          ).innerText;
        currentPrice = Number(currentPrice.replace(" ₽", ""));
        currentPrice -= startPrice;
        btn.parentElement.parentElement.parentElement.querySelector(
          ".basket-content__price"
        ).innerText = `${currentPrice} ₽`;

        let totalPrice = document.querySelector(
          ".basket-content-bottom__price"
        ).innerText;
        totalPrice = Number(totalPrice.replace(" ₽", ""));
        totalPrice -= startPrice;
        document.querySelector(
          ".basket-content-bottom__price"
        ).innerText = `${totalPrice} ₽`;
      }
    });
  });
}

function createBasketProducts() {
  basketProducts = [books[2], books[5], books[7]];

  document.querySelector(".header-icons__span").innerText =
    basketProducts.length;
  if (basketProducts.length != 0) {
    document.querySelector(".basket-content").innerHTML =
      "<ul class='basket-content__list'></ul>";

    for (let i = 0; i < basketProducts.length; i++) {
      document.querySelector(".basket-content__list").innerHTML +=
        "<li class='basket-content__item'></li>";
    }

    const basketContentItems = document.querySelectorAll(
      ".basket-content__item"
    );
    let allPrice = 0;
    for (let i = 0; i < basketContentItems.length; i++) {
      basketContentItems[
        i
      ].innerHTML += `<img class="basket-content__img" src="${basketProducts[i].src[0]}" alt="Изображение книги ${basketProducts[i].nameOfTheBook}">`;
      basketContentItems[
        i
      ].innerHTML += `<h4 class="basket-content__subtitle">${basketProducts[i].nameOfTheBook}</h4>`;
      basketContentItems[i].innerHTML +=
        "<div class='basket-content__main'></div>";
      basketContentItems[i].querySelector(".basket-content__main").innerHTML +=
        "<div class='basket-content__count-group'></div>";

      basketContentItems[i].querySelector(
        ".basket-content__count-group"
      ).innerHTML += "<button class='basket-content__decr'>-</button>";
      basketContentItems[i].querySelector(
        ".basket-content__count-group"
      ).innerHTML += "<span class='basket-content__count'>1</span>";
      basketContentItems[i].querySelector(
        ".basket-content__count-group"
      ).innerHTML += "<button class='basket-content__incr'>+</button>";

      basketContentItems[i].querySelector(
        ".basket-content__main"
      ).innerHTML += `<span class='basket-content__price'>${getPrice(
        basketProducts[i].price,
        basketProducts[i].sale
      )} ₽</span>`;
      basketContentItems[i].querySelector(".basket-content__main").innerHTML +=
        "<span class='basket-content__close'></span>";
      allPrice += getPrice(basketProducts[i].price, basketProducts[i].sale);
    }

    document.querySelector(".basket-content").innerHTML +=
      "<div class='basket-content-bottom'></div>";
    document.querySelector(".basket-content-bottom").innerHTML +=
      "<div class='basket-content-bottom__price-group'></div>";
    document.querySelector(".basket-content-bottom__price-group").innerHTML +=
      "<span class='basket-content-bottom__caption'>Итого:</span>";
    document.querySelector(
      ".basket-content-bottom__price-group"
    ).innerHTML += `<span class='basket-content-bottom__price'>${allPrice} ₽</span>`;
    document.querySelector(".basket-content-bottom").innerHTML +=
      "<button class='basket-content-bottom__btn'>Оформить заказ</button>";
  } else {
    document.querySelector(".basket-content").innerHTML +=
      "<p class='basket-content__text'>Корзина пуста</p>";
  }
}

if (document.title == "О нас") {
  activeMenuLink("О нас");
}

if (document.title == "Контакты") {
  activeMenuLink("Контакты");
}

if (document.title == "Оплата и доставка") {
  activeMenuLink("Оплата и доставка");
}

function activeMenuLink(title) {
  const menuLinks = document.querySelectorAll(".menu__link");
  menuLinks.forEach((link) => {
    if (link.innerText == title) {
      if (document.body.classList.contains("_pc")) {
        link.style.color = "#FF8A50";
        link.style.pointerEvents = "none";
      } else {
        link.style.color = "black";
        link.style.pointerEvents = "none";
      }
    }
  });
}

function activeLeftMenuLink(title) {
  const leftMenuLinks = document.querySelectorAll(".left-menu__link");
  leftMenuLinks.forEach((link) => {
    if (link.innerText == title) {
      if (document.body.classList.contains("_pc")) {
        link.style.color = "white";
        const svgPath = link.querySelectorAll("path");
        svgPath.forEach((element) => {
          element.style.fill = "white";
        });
        link.parentElement.style.backgroundColor = "#FF8A50";
        link.style.paddingRight = "10px";
      } else {
        link.style.paddingRight = "10px";
        link.parentElement.style.display = "inline-flex";
        link.parentElement.style.backgroundColor = "black";
      }
    }
  });
}

class RentalItem {
  constructor(name, description, pricing, src, components, terms) {
    this.name = name;
    this.description = description;
    this.pricing = pricing;
    this.src = src;
    this.components = components;
    this.terms = terms;
  }
}

const urlParams = new URLSearchParams(window.location.search);
const rentalItemId = decodeURIComponent(urlParams.get("id")).replace(/_/g, " ");
console.log(rentalItemId);

const rentalItems = [
  new RentalItem(
    "Vr-очки Meta Quest 2",
    "Погрузитесь в мир виртуальной реальности с Oculus Quest 2! Эта беспроводная гарнитура VR предлагает уникальный опыт развлечений, игр и обучения прямо у вас дома. Удобный дизайн и легкость использования позволяют вам наслаждаться впечатляющей графикой и захватывающими игровыми мирами без лишних проводов. Более 200 игр и приложений, включая захватывающие приключения и immersive опыты, делают каждый сеанс незабываемым. Благодаря высокой четкости изображения и простоте настройки, Oculus Quest 2 подходит как новичкам, так и опытным пользователям. Исследуйте новые горизонты и откройте для себя бесконечные возможности виртуальной реальности с Oculus Quest 2!",
    [
      "1 сутки - 38 руб.",
      "2 суток - 68 руб.",
      "3 суток - 91 руб.",
      "4 суток - 111 руб.",
      "5 суток - 129 руб.",
      "6 суток - 144 руб.",
      "7 суток - в подарок",
    ],
    "images/vr/metaQuest2.png",
    "Шлем виртуальной реальности; 2 контроллера движения; Кабель для подключения к ПК; Дополнительные крепления; Более 60 игр.",
    [
      "Аренда производится по договору проката.",
      "На момент предоставления услуги клиенту должно быть не менее 18 лет.",
      "Обязательно наличие паспорта Республики Беларусь.",
      "Мы вправе отказать в аренде без объяснения причины.",
    ]
  ),
  new RentalItem(
    "Xbox Series S",
    "Погрузитесь в мир игр нового поколения с Xbox Series S! Эта компактная и стильная консоль предлагает мощную производительность, позволяя вам наслаждаться играми в разрешении до 1440p и максимальной частотой кадров до 120 FPS. С 512 ГБ быстрого SSD-накопителя вы забудете о долгих загрузках! Xbox Series S ждет вас! Играй, открывай и переживай незабываемые приключения!",
    [
      "1 сутки - 28 руб.",
      "2 суток - 48 руб.",
      "3 суток - 67 руб.",
      "4 суток - 83 руб.",
      "5 суток - 97 руб.",
      "6 суток - 106 руб.",
      "7 суток - в подарок",
    ],
    "images/consoles/xboxs.png",
    "Игровая консоль; Комплект необходимых кабелей; 2 геймпада; Более 400 игр.",
    [
      "Аренда производится по договору проката.",
      "На момент предоставления услуги клиенту должно быть не менее 18 лет.",
      "Обязательно наличие паспорта Республики Беларусь.",
      "Мы вправе отказать в аренде без объяснения причины.",
    ]
  ),
  new RentalItem(
    "PlayStation 4 Slim",
    "Откройте мир игровых приключений с PlayStation 4! Эта мощная консоль предлагает невероятное качество графики и захватывающий геймплей, позволяя вам погрузиться в любимые игры. С богатой библиотекой эксклюзивов и доступом к многообразным онлайн-форматам, вы всегда найдете что-то интересное. Возможность общения с друзьями и участия в многопользовательских сессиях делает каждую игру еще увлекательнее. Будь то захватывающие приключения, динамичные боевики или глубокие RPG — PlayStation 4 станет вашим верным спутником в мире развлечений. Играй, исследуй и наслаждайся каждым моментом!",
    [
      "1 сутки - 24 руб.",
      "2 суток - 38 руб.",
      "3 суток - 53 руб.",
      "4 суток - 62 руб.",
      "5 суток - 72 руб.",
      "6 суток - 83 руб.",
      "7 суток - в подарок",
    ],
    "images/consoles/ps4slim.png",
    "Игровая консоль; Комплект необходимых кабелей; 2 геймпада; Более 400 игр.",
    [
      "Аренда производится по договору проката.",
      "На момент предоставления услуги клиенту должно быть не менее 18 лет.",
      "Обязательно наличие паспорта Республики Беларусь.",
      "Мы вправе отказать в аренде без объяснения причины.",
    ]
  ),
  new RentalItem(
    "Караоке-колонки Mivo MD-803",
    "Mivo MD-803 -это большая портативная караоке-колонка с 7 режимами RGB-подсветки. Она способна выдавать максимально громкий звук благодаря мощности в 1100 Вт (РМРО). Колонка оснащена двумя сабвуферами и одним твиттером с мощнейшим басом, но, в тоже время, кристально чистыми и прозрачными средними и высокими частотами.",
    [
      "1 сутки - 24 руб.",
      "2 суток - 41 руб.",
      "3 суток - 58 руб.",
      "4 суток - 72 руб.",
      "5 суток - 86 руб.",
      "6 суток - 102 руб.",
      "7 суток - в подарок",
    ],
    "images/karaoke/mivomd.png",
    "Колонка Mivo MD-803; 2 беспроводных микрофона для караоке; Пульт дистанционного управления; Зарядное устройство; Инструкция по эксплуатации.",
    [
      "Аренда производится по договору проката.",
      "На момент предоставления услуги клиенту должно быть не менее 18 лет.",
      "Обязательно наличие паспорта Республики Беларусь.",
      "Мы вправе отказать в аренде без объяснения причины.",
    ]
  ),
  new RentalItem(
    "Микронаушник Agger Pro",
    "Габариты 10.5 x 4.5 x 4.5. Время работы 6 часов",
    [
      "1 сутки - 11 руб.",
    ],
    "images/electronics/agger.png",
    "Беспроводной микронаушник Agger; Гарнитура с индуктивной петлей Bluetooth; Зарядное устройство к гарнитуре Bluetooth; Батарейки AG0 (Camelion LR 521); Гвоздик-извлекатель батарейки; Руководство по эксплуатации",
    [
      "Аренда производится по договору проката.",
      "На момент предоставления услуги клиенту должно быть не менее 18 лет.",
      "Обязательно наличие паспорта Республики Беларусь.",
      "Мы вправе отказать в аренде без объяснения причины.",
    ]
  ),
  new RentalItem(
    "Микронаушник ML15",
    "Комплект магнитных наушников с беспроводной гарнитурой Plantronics ML15. Есть модификация с кнопкой-пищалкой. Самым лучшим и безопасным вариантом являются шарики, их проще всего забросить, проще всего достать, и в них лучше всего слышно. Беспроводная гарнитура ML15 подключается к любому телефону через Bluetooth.",
    [
      "1 сутки - 9 руб.",
    ],
    "images/electronics/ml15.png",
    "Беспроводной микронаушник ML15; Гарнитура с индуктивной петлей Bluetooth; Зарядное устройство к гарнитуре Bluetooth; Извлекатель",
    [
      "Аренда производится по договору проката.",
      "На момент предоставления услуги клиенту должно быть не менее 18 лет.",
      "Обязательно наличие паспорта Республики Беларусь.",
      "Мы вправе отказать в аренде без объяснения причины.",
    ]
  ),
  new RentalItem(
    "Велотренажёр Body Style TC545",
    "Комплект магнитных наушников с беспроводной гарнитурой Plantronics ML15. Есть модификация с кнопкой-пищалкой. Самым лучшим и безопасным вариантом являются шарики, их проще всего забросить, проще всего достать, и в них лучше всего слышно. Беспроводная гарнитура ML15 подключается к любому телефону через Bluetooth. С встроенным монитором вы сможете отслеживать ваш прогресс, включая время, расстояние, скорость и количество сожженных калорий. Компактный дизайн и возможность транспортировки делают Body Style TC545 идеальным выбором для любого помещения. Тренируйтесь с удовольствием и достигайте новых вершин с велотренажером Body Style TC545!",
    [
      "1 месяц - 39 руб.",
    ],
    "images/sport/tc545.png",
    "Велотренажёр; Дополнительные батарейки ",
    [
      "Аренда производится по договору проката.",
      "На момент предоставления услуги клиенту должно быть не менее 18 лет.",
      "Обязательно наличие паспорта Республики Беларусь.",
      "Мы вправе отказать в аренде без объяснения причины.",
    ]
  ),
  new RentalItem(
    "Кальяны брендов: Mamay customs, HOOB, Alpha Hookan",
    "Курение кальяна — это не просто процесс, это целая культура, наполненная особенностями и ритуалами. Оно символизирует атмосферу общения и расслабления. В дыме кальяна прячутся ароматы экзотических фруктов и благовоний, создавая неповторимую атмосферу уюта и спокойствия.",
    [
      "1 сутки - 29 руб.",
    ],
    "images/hookah/hookah.png",
    "Кальян в сборе (только топовые модели); Устройство,заменяющее фольгу-Kaloud( упрощающее процесс приготовления кальяна); Натуральный кокосовый уголь; Одноразовые мундштуки; Щипцы; Доска для переноски устройства Kaloud; Плита для розжига углей; Первое приготовление кальяна и инструктаж от профессионального кальянщика. ",
    [
      "Аренда производится по договору проката.",
      "На момент предоставления услуги клиенту должно быть не менее 18 лет.",
      "Обязательно наличие паспорта Республики Беларусь.",
      "Мы вправе отказать в аренде без объяснения причины.",
    ]
  )
];

const rentalData = rentalItems.find((item) => item.name === rentalItemId);

if (rentalData) {
  document.getElementById("productImage").src =
    rentalData.src || "images/default.jpg";
  document.getElementById("productTitle").textContent = rentalData.name;
  document.getElementById("productDescription").textContent =
    rentalData.description;
  document.getElementById("productPricing").innerHTML = rentalData.pricing
    .map((price) => `<li>${price}</li>`)
    .join("");
  document.getElementById("productComponents").textContent =
    rentalData.components;
  document.getElementById("productTerms").innerHTML = rentalData.terms
    .map((term) => `<li>${term}</li>`)
    .join("");
}
