export const menu = {
  categories: [
    {
      name: "Burger & Sandwiches",
      dishes: [
        {
          name: "Classic Cheeseburger",
          price: 12.5,
          description:
            "Rindfleischpatty, Cheddar, Salat",
          id: 0,
          image: "../assets/img/burger1.jpg"
        },
        {
          name: "BBQ Bacon Burger",
          price: 14.9,
          description:
            "Rindfleischpatty, knuspriger Bacon, Cheddar",
          id: 1,
          image: "../assets/img/burger2.jpg"
        },
        {
          name: "Crispy Chicken Sandwich",
          price: 11.9,
          description:
            "Paniertes Hähnchenbrustfilet, Eisbergsalat",
          id: 2,
          image: "../assets/img/burger3.jpg"
        },
        {
          name: "Veggie Halloumi Burger",
          price: 13.5,
          description: "Grillkäse, Grillgemüse, Rucola",
          id: 3,
          image: "../assets/img/burger4.jpg"
        },
      ],
    },
    {
      name: "Pizza (30cm)",
      dishes: [
        {
          name: "Pizza Margherita",
          price: 9.5,
          description: "Tomatensauce, Mozzarella, frisches Basilikum",
          id: 4,
          image: "../assets/img/pizza1.jpg"
        },
        {
          name: "Pizza Salami",
          price: 11.0,
          description: "Tomatensauce, Mozzarella, italienische Salami",
          id: 5,
          image: "../assets/img/pizza2.jpg"
        },
        {
          name: "Pizza Diavolo",
          price: 12.5,
          description:
            "Tomatensauce, Mozzarella, scharfe Salami",
          id: 6,
          image: "../assets/img/pizza3.jpg"
        },
        {
          name: "Pizza Tonno e Cipolla",
          price: 12.0,
          description: "Tomatensauce, Mozzarella, Thunfisch",
          id: 7,
          image: "../assets/img/pizza4.jpg"
        },
      ],
    },
    {
      name: "Salat",
      dishes: [
        {
          name: "Caesar Salad",
          price: 10.5,
          description: "Römersalat, Parmesan, Croutons",
          id: 8,
          image: "../assets/img/salat1.jpg"
        },
        {
          name: "Caesar Salad mit Hähnchen",
          price: 14.5,
          description:
            "Römersalat, gebratene Hähnchenbruststreifen",
          id: 9,
          image: "../assets/img/salat2.jpg"
        },
        {
          name: "Griechischer Bauernsalat",
          price: 11.9,
          description:
            "Tomaten, Gurken, rote Zwiebeln, Paprika",
          id: 10,
          image: "../assets/img/salat3.jpg"
        },
        {
          name: "Caprese Salat",
          price: 9.9,
          description:
            "Tomatenscheiben, frischer Mozzarella",
          id: 11,
          image: "../assets/img/salat4.jpg"
        },
      ],
    },
  ],
  side: [
    {
      name: "Pommes Frites",
      price: 4.5,
      description: "Kartoffelstäbchen, Meersalz, Ketchup",
      id: 12,
    },
    {
      name: "Süßkartoffel-Pommes",
      price: 5.5,
      description: "Süßkartoffeln, Meersalz, Sour Cream Dip",
      id: 13,
    },
    {
      name: "Onion Rings",
      price: 5.0,
      description: "Frittierte Zwiebelringe im Bierteigmantel",
      id: 14,
    },
    {
      name: "Knoblauchbrot",
      price: 4.0,
      description: "Geröstetes Ciabatta, Knoblauchbutter",
      id: 15,
    },
  ],
};

export let basket = {
  dishes: [],
  fee: 4.99,
}