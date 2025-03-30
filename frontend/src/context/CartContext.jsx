import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create context
export const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false
};

// Actions
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_CART: 'TOGGLE_CART',
  CLOSE_CART: 'CLOSE_CART'
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity, selectedColor, selectedSize } = action.payload;
      
      // Check if item with same properties already exists
      const existingItemIndex = state.items.findIndex(
        item => 
          item.id === product.id && 
          item.selectedColor === selectedColor && 
          item.selectedSize === selectedSize
      );
      
      let updatedItems;
      
      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item
        updatedItems = [
          ...state.items,
          {
            ...product,
            quantity,
            selectedColor,
            selectedSize,
            cartItemId: `${product.id}-${selectedColor}-${selectedSize}-${Date.now()}`
          }
        ];
      }
      
      // Calculate new totals
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
        isOpen: true // Open cart when item is added
      };
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      const { cartItemId } = action.payload;
      const updatedItems = state.items.filter(item => item.cartItemId !== cartItemId);
      
      // Calculate new totals
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice
      };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { cartItemId, quantity } = action.payload;
      
      // Don't allow quantity to be less than 1
      if (quantity < 1) return state;
      
      const updatedItems = state.items.map(item => 
        item.cartItemId === cartItemId 
          ? { ...item, quantity } 
          : item
      );
      
      // Calculate new totals
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice
      };
    }
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...initialState,
        isOpen: state.isOpen
      };
    
    case CART_ACTIONS.TOGGLE_CART:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    
    case CART_ACTIONS.CLOSE_CART:
      return {
        ...state,
        isOpen: false
      };
    
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Replace entire state with saved cart
        Object.keys(parsedCart).forEach(key => {
          if (key !== 'isOpen') { // Don't restore isOpen state
            dispatch({
              type: 'RESTORE_CART_ITEM',
              payload: { key, value: parsedCart[key] }
            });
          }
        });
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartToSave = {
      items: state.items,
      totalItems: state.totalItems,
      totalPrice: state.totalPrice
    };
    localStorage.setItem('cart', JSON.stringify(cartToSave));
  }, [state.items, state.totalItems, state.totalPrice]);
  
  // Add item to cart
  const addToCart = (product, quantity, selectedColor, selectedSize) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, selectedColor, selectedSize }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (cartItemId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { cartItemId }
    });
  };
  
  // Update item quantity
  const updateQuantity = (cartItemId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { cartItemId, quantity }
    });
  };
  
  // Clear entire cart
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };
  
  // Toggle cart visibility
  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };
  
  // Close cart
  const closeCart = () => {
    dispatch({ type: CART_ACTIONS.CLOSE_CART });
  };
  
  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};