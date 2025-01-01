import { api } from '../api';

export const createOrderSlice = (set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const orders = await api.fetchOrders();
      set({ orders, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addOrder: async (order) => {
    set({ isLoading: true, error: null });
    try {
      const newOrder = await api.addOrder({
        ...order,
        id: Date.now(),
        status: 'pending',
        date: new Date().toISOString(),
      });
      
      set(state => ({
        orders: [...state.orders, newOrder],
        isLoading: false
      }));
      
      // Clear the cart after successful order
      get().clearCart();
      
      return newOrder;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    set({ isLoading: true, error: null });
    try {
      const updatedOrder = await api.updateOrderStatus(orderId, status);
      set(state => ({
        orders: state.orders.map(order =>
          order.id === orderId ? { ...order, status } : order
        ),
        isLoading: false
      }));
      return updatedOrder;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
});