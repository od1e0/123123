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
  const rentalItemId = decodeURIComponent(urlParams.get("id")).replace(
    /_/g,
    " "
  );
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
      "./images/vr/metaQuest2.png",
      "Игровая консоль; Комплект необходимых кабелей; 2 геймпада; Более 400 игр.",
      [
        "Аренда производится по договору проката.",
        "На момент предоставления услуги клиенту должно быть не менее 18 лет.",
        "Обязательно наличие паспорта Республики Беларусь.",
        "Мы вправе отказать в аренде без объяснения причины.",
      ]
    ),
    
    // Другие товары добавляются аналогично
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
  } else {
    alert("Услуга не найдена");
  }
