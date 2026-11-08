export const MOCK_CARTS = [
  {
    id: 1,
    userId: 1,
    totalProducts: 5,
    totalQuantity: 5,
    total: 1348.98,
    discountedTotal: 1224.90,
    products: [
      {
        id: 101,
        title: "Wireless Headphones",
        category: "Electrónica",
        price: 249.99,
        quantity: 1,
        discountPercentage: 10,
        discountedTotal: 224.99,
        thumbnail: "/thumb-headphones.png"
      },
      {
        id: 102,
        title: "Smartphone X",
        category: "Electrónica",
        price: 799.00,
        quantity: 1,
        discountPercentage: 12,
        discountedTotal: 703.12,
        thumbnail: "/thumb-smartphone.png"
      },
      {
        id: 103,
        title: "Smartwatch Pro",
        category: "Accesorios",
        price: 299.99,
        quantity: 1,
        discountPercentage: 5,
        discountedTotal: 284.99,
        thumbnail: "/thumb-smartwatch.png"
      }
    ]
  },
  {
    id: 2,
    userId: 2,
    totalProducts: 4,
    totalQuantity: 7,
    total: 3450.50,
    discountedTotal: 3105.45,
    products: [
      {
        id: 201,
        title: "Mechanical Keyboard",
        category: "Computadores",
        price: 129.99,
        quantity: 2,
        discountPercentage: 8,
        discountedTotal: 239.18,
        thumbnail: "/thumb-headphones.png"
      },
      {
        id: 202,
        title: "Gaming Mouse RGB",
        category: "Accesorios",
        price: 59.99,
        quantity: 1,
        discountPercentage: 10,
        discountedTotal: 53.99,
        thumbnail: "/thumb-smartwatch.png"
      }
    ]
  },
  {
    id: 3,
    userId: 3,
    totalProducts: 4,
    totalQuantity: 8,
    total: 4200.00,
    discountedTotal: 3780.00,
    products: [
      {
        id: 301,
        title: "Monitor 4K Ultra",
        category: "Pantallas",
        price: 499.99,
        quantity: 2,
        discountPercentage: 15,
        discountedTotal: 849.98,
        thumbnail: "/thumb-smartphone.png"
      }
    ]
  },
  {
    id: 4,
    userId: 4,
    totalProducts: 3,
    totalQuantity: 6,
    total: 2100.00,
    discountedTotal: 1890.00,
    products: [
      {
        id: 401,
        title: "Cámara Mirrorless 4K",
        category: "Fotografía",
        price: 899.00,
        quantity: 1,
        discountPercentage: 10,
        discountedTotal: 809.10,
        thumbnail: "/thumb-smartphone.png"
      }
    ]
  },
  { id: 5, userId: 5, totalProducts: 6, totalQuantity: 9, total: 5400.00, discountedTotal: 4860.00, products: [] },
  { id: 6, userId: 6, totalProducts: 8, totalQuantity: 12, total: 6800.00, discountedTotal: 6120.00, products: [] },
  { id: 7, userId: 1, totalProducts: 5, totalQuantity: 7, total: 3200.00, discountedTotal: 2880.00, products: [] },
  { id: 8, userId: 2, totalProducts: 7, totalQuantity: 10, total: 4900.00, discountedTotal: 4410.00, products: [] },
  { id: 9, userId: 3, totalProducts: 4, totalQuantity: 5, total: 2800.00, discountedTotal: 2520.00, products: [] },
  { id: 10, userId: 4, totalProducts: 9, totalQuantity: 14, total: 7200.00, discountedTotal: 6480.00, products: [] },
  { id: 11, userId: 5, totalProducts: 5, totalQuantity: 8, total: 3900.00, discountedTotal: 3510.00, products: [] },
  { id: 12, userId: 6, totalProducts: 6, totalQuantity: 9, total: 4100.00, discountedTotal: 3690.00, products: [] },
  { id: 13, userId: 1, totalProducts: 4, totalQuantity: 6, total: 2900.00, discountedTotal: 2610.00, products: [] },
  { id: 14, userId: 2, totalProducts: 8, totalQuantity: 11, total: 5600.00, discountedTotal: 5040.00, products: [] },
  { id: 15, userId: 3, totalProducts: 5, totalQuantity: 7, total: 3400.00, discountedTotal: 3060.00, products: [] },
  { id: 16, userId: 4, totalProducts: 7, totalQuantity: 10, total: 4800.00, discountedTotal: 4320.00, products: [] },
  { id: 17, userId: 5, totalProducts: 4, totalQuantity: 5, total: 2600.00, discountedTotal: 2340.00, products: [] },
  { id: 18, userId: 6, totalProducts: 9, totalQuantity: 13, total: 6900.00, discountedTotal: 6210.00, products: [] },
  { id: 19, userId: 1, totalProducts: 6, totalQuantity: 8, total: 4300.00, discountedTotal: 3870.00, products: [] },
  { id: 20, userId: 2, totalProducts: 5, totalQuantity: 7, total: 3600.00, discountedTotal: 3240.00, products: [] }
];

export const MOCK_STATS = {
  totalCarts: 20,
  totalProducts: 142,
  totalAmount: 70287.02,
  uniqueUsers: 6
};
