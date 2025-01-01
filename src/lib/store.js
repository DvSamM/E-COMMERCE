// import { create } from 'zustand'; // Import the zustand create function to create a store
// import { persist } from 'zustand/middleware'; // Import the persist middleware for persisting state in localStorage
// const initialProducts = [
//   {
//     id: 1,
//     name: "Wireless Headphones",
//     description: "Premium wireless headphones with noise cancellation",
//     price: 199.99,
//     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
//     details: [
//       "Active Noise Cancellation",
//       "40-hour battery life",
//       "Premium sound quality",
//       "Comfortable fit",
//     ],
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     description: "Feature-rich smartwatch with health tracking",
//     price: 299.99,
//     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
//     details: [
//       "Fitness Tracking",
//       "Built-in GPS",
//       "Water Resistance",
//       "Long Battery Life",
//       "Notifications & Alerts",
//       "Customizable Watch Faces",
//       "Music Control",
//       "Compatibility with iOS/Android",
//     ],
//   },
//   {
//     id: 3,
//     name: "Laptop Pro",
//     description: "Powerful laptop for professionals",
//     price: 1299.99,
//     image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
//     details: [
//       "Powerful Processor",
//       "High-Resolution Display",
//       "Ample Storage",
//       "Long Battery Life",
//       "Lightweight and Portable",
//       "Backlit Keyboard",
//       "Built-in Webcam & Microphone",
//       "Fast Charging",
//     ],
//   },
//   {
//     id: 4,
//     name: "Camera Kit",
//     description: "Professional camera with accessories",
//     price: 799.99,
//     image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
//     details: [
//       "High-Resolution Camera",
//       "Lens Variety",
//       "Tripod Included",
//       "Camera Bag",
//       "External Microphone",
//       "Remote Shutter",
//       "Battery Pack",
//       "Memory Cards",
//     ],
//   },
// ];

// // Create a store using Zustand with persist middleware to keep data in localStorage
// export const useStore = create(
//   persist(
//     (set) => ({
//       // Define the initial state of the store
//       cart: [], // The cart starts as an empty array, will hold the products added to the cart
//       products: initialProducts,
//       inventory: {
//         1: 3, // Camera with 3 units in stock
//         2: 10, // Smart Watch with 10 units in stock
//         3: 15, // Laptop Pro with 15 units in stock
//         4: 8, // Camera Kit with 8 units in stock
//       },
//       orders: [], // Orders will be stored here as an array of order objects

//         // Product CRUD operations
//         addProduct: (product) =>
//           set((state) => {
//             const newId = Math.max(...state.products.map(p => p.id), 0) + 1;
//             const newProduct = { ...product, id: newId };
//             return {
//               products: [...state.products, newProduct],
//               inventory: { ...state.inventory, [newId]: product.initialStock || 0 }
//             };
//           }),
          
//         updateProduct: (id, updates) =>
//           set((state) => ({
//             products: state.products.map(product =>
//               product.id === id ? { ...product, ...updates } : product
//             )
//           })),
          
//         deleteProduct: (id) =>
//           set((state) => ({
//             products: state.products.filter(product => product.id !== id),
//             inventory: Object.fromEntries(
//               Object.entries(state.inventory).filter(([key]) => Number(key) !== id)
//             )
//           })),

//       // Function to add a product to the cart
//       addToCart: (product) =>
//         set((state) => {
//           const currentStock = state.inventory[product.id]; // Get current stock for the product
//           if (currentStock <= 0) {
//             return state; // If out of stock, return the current state without changes
//           }

//           // Create a new inventory object with updated stock
//           const newInventory = {
//             ...state.inventory,
//             [product.id]: currentStock - 1, // Decrease the stock for the product added to the cart
//           };

//           const existingItem = state.cart.find((item) => item.id === product.id); // Check if the item is already in the cart

//           if (existingItem) {
//             // If the item already exists in the cart, update its quantity
//             return {
//               cart: state.cart.map((item) =>
//                 item.id === product.id
//                   ? { ...item, quantity: item.quantity + 1 } // Increment quantity by 1
//                   : item
//               ),
//               inventory: newInventory, // Update inventory with new stock
//             };
//           }
//           // If the item doesn't exist in the cart, add it with quantity 1
//           return {
//             cart: [...state.cart, { ...product, quantity: 1 }],
//             inventory: newInventory, // Update inventory with new stock
//           };
//         }),
      
//       // Function to remove an item from the cart by its ID
//       removeFromCart: (productId) =>
//         set((state) => {
//           const item = state.cart.find((i) => i.id === productId); // Find the item in the cart by ID
//           if (!item) return state; // If the item doesn't exist in the cart, return the current state

//           // Remove the item from the cart and restore the stock back to the inventory
//           return {
//             cart: state.cart.filter((item) => item.id !== productId), // Remove item from cart
//             inventory: {
//               ...state.inventory,
//               [productId]: state.inventory[productId] + item.quantity, // Restore stock based on removed quantity
//             },
//           };
//         }),

//       // Function to update the quantity of a product in the cart
//       updateQuantity: (productId, quantity) =>
//         set((state) => {
//           const item = state.cart.find((i) => i.id === productId); // Find the item in the cart by ID
//           if (!item) return state; // If item not found in the cart, return current state

//           const quantityDiff = quantity - item.quantity; // Calculate the difference in quantity
//           const newStock = state.inventory[productId] - quantityDiff; // Calculate the new stock after update

//           if (newStock < 0) return state; // If stock is insufficient (negative stock), do not update

//           // Update the quantity in the cart and the stock in the inventory
//           return {
//             cart: state.cart.map((item) =>
//               item.id === productId ? { ...item, quantity } : item // Update quantity of the specific item
//             ),
//             inventory: {
//               ...state.inventory,
//               [productId]: newStock, // Update the stock in the inventory
//             },
//           };
//         }),

//       // Function to clear the cart (remove all items)
//       clearCart: () => set({ cart: [] }),

    
//       addOrder: (order) =>
//         set((state) => ({
//           orders: [
//             ...state.orders,
//             {
//               ...order,
//               id: Date.now(),
//               status: 'pending',
//               date: new Date().toISOString(),
//               items: [...state.cart],
//             }
//           ],
//           cart: [],
//         })),

//       // Function to restock a specific product by its ID
//       restockProduct: (productId, quantity) =>
//         set((state) => ({
//           inventory: {
//             ...state.inventory,
//             [productId]: (state.inventory[productId] || 0) + quantity, // Add the restocked quantity to the current stock
//           },
//         })),

//       // Function to update the status of an order (e.g., "pending", "shipped", "delivered")
//       updateOrderStatus: (orderId, status) =>
//         set((state) => ({
//           orders: state.orders.map((order) =>
//             order.id === orderId ? { ...order, status } : order // Update the status of the order
//           ),
//         })),
//     }),
//     {
//       name: 'shopping-cart', // Persist the store's state to localStorage with the name 'shopping-cart'
//     }
//   )
// );
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCurrencySlice } from './slices/currencySlice';
import { createCartSlice } from './slices/cartSlice';
import { createProductSlice } from './slices/productSlice';
import { createOrderSlice } from './slices/orderSlice';

export const useStore = create(
  persist(
    (set, get) => ({
      ...createCurrencySlice(set, get),
      ...createCartSlice(set, get),
      ...createProductSlice(set, get),
      ...createOrderSlice(set, get),
    }),
    {
      name: 'shopping-cart',
    }
  )
);

// Initialize exchange rates when the store is created
if (typeof window !== 'undefined') {
  useStore.getState().fetchExchangeRates();
}
