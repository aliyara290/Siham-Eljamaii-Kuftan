// src/context/CartContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartService } from '../services/api';

// Create context
export const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
  loading: false,
  error: null
};

// Actions
export const CART_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_CART: 'SET_CART',
  SET_ERROR: 'SET_ERROR',
  TOGGLE_CART: 'TOGGLE_CART',
  CLOSE_CART: 'CLOSE_CART'
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
      
    case CART_ACTIONS.SET_CART:
      return {
        ...state,
        items: action.payload.items || [],
        totalItems: action.payload.totalItems || 0,
        totalPrice: action.payload.totalPrice || 0,
        loading: false,
        error: null
      };
      
    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
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
  
  // Fetch cart from API on initial render
  useEffect(() => {
    fetchCart();
  }, []);
  
  // Fetch cart data from API
  const fetchCart = async () => {
    if (!localStorage.getItem('auth_token')) {
      // If not logged in, use local cart
      loadLocalCart();
      return;
    }
    
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await CartService.getCart();
      
      dispatch({
        type: CART_ACTIONS.SET_CART,
        payload: {
          items: response.items || [],
          totalItems: response.totalItems || 0,
          totalPrice: response.totalPrice || 0
        }
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: 'Failed to load cart. Please try again.'
      });
      
      // Fall back to local cart if API fails
      loadLocalCart();
    }
  };
  
  // Load cart from localStorage (for non-authenticated users)
  const loadLocalCart = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        
        dispatch({
          type: CART_ACTIONS.SET_CART,
          payload: {
            items: parsedCart.items || [],
            totalItems: parsedCart.totalItems || 0,
            totalPrice: parsedCart.totalPrice || 0
          }
        });
      }
    } catch (error) {
      console.error('Failed to parse local cart:', error);
    }
  };
  
  // Save cart to localStorage (for non-authenticated users)
  const saveLocalCart = () => {
    const cartToSave = {
      items: state.items,
      totalItems: state.totalItems,
      totalPrice: state.totalPrice
    };
    
    localStorage.setItem('cart', JSON.stringify(cartToSave));
  };
  
  // Save cart whenever it changes (if not authenticated)
  useEffect(() => {
    if (!localStorage.getItem('auth_token') && !state.loading) {
      saveLocalCart();
    }
  }, [state.items, state.totalItems, state.totalPrice, state.loading]);
  
  // Add item to cart
  const addToCart = async (product, quantity, selectedColor, selectedSize) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    
    const productData = {
      product_id: product.id,
      quantity,
      color: selectedColor,
      size: selectedSize
    };
    
    try {
      if (localStorage.getItem('auth_token')) {
        // If authenticated, use API
        await CartService.addToCart(productData);
        await fetchCart(); // Refresh cart from API
      } else {
        // If not authenticated, update local cart
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
        
        dispatch({
          type: CART_ACTIONS.SET_CART,
          payload: {
            items: updatedItems,
            totalItems,
            totalPrice
          }
        });
      }
      
      // Open cart when item is added
      dispatch({ type: CART_ACTIONS.TOGGLE_CART });
    } catch (error) {
      console.error('Error adding to cart:', error);
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: 'Failed to add item to cart. Please try again.'
      });
    }
  };
  
  // Remove item from cart
  const removeFromCart = async (cartItemId) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    
    try {
      if (localStorage.getItem('auth_token')) {
        // If authenticated, use API
        await CartService.removeCartItem(cartItemId);
        await fetchCart(); // Refresh cart from API
      } else {
        // If not authenticated, update local cart
        const updatedItems = state.items.filter(item => item.cartItemId !== cartItemId);
        
        // Calculate new totals
        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        dispatch({
          type: CART_ACTIONS.SET_CART,
          payload: {
            items: updatedItems,
            totalItems,
            totalPrice
          }
        });
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: 'Failed to remove item from cart. Please try again.'
      });
    }
  };
  
  // Update item quantity
  const updateQuantity = async (cartItemId, quantity) => {
    // Don't allow quantity to be less than 1
    if (quantity < 1) return;
    
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    
    try {
      if (localStorage.getItem('auth_token')) {
        // If authenticated, use API
        await CartService.updateCartItem(cartItemId, quantity);
        await fetchCart(); // Refresh cart from API
      } else {
        // If not authenticated, update local cart
        const updatedItems = state.items.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity } 
            : item
        );
        
        // Calculate new totals
        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        dispatch({
          type: CART_ACTIONS.SET_CART,
          payload: {
            items: updatedItems,
            totalItems,
            totalPrice
          }
        });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: 'Failed to update cart. Please try again.'
      });
    }
  };
  
  // Clear entire cart
  const clearCart = async () => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    
    try {
      if (localStorage.getItem('auth_token')) {
        // If authenticated, use API
        await CartService.clearCart();
      }
      
      // Reset cart state
      dispatch({
        type: CART_ACTIONS.SET_CART,
        payload: {
          items: [],
          totalItems: 0,
          totalPrice: 0
        }
      });
      
      // Also clear local storage cart
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error clearing cart:', error);
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: 'Failed to clear cart. Please try again.'
      });
    }
  };
  
  // Toggle cart visibility
  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };
  
  // Close cart
  const closeCart = () => {
    dispatch({ type: CART_ACTIONS.CLOSE_CART });
  };
  
  // Sync local cart with API when user logs in
  const syncCartWithApi = async () => {
    // Only needed when user just logged in and has items in local cart
    const localCart = localStorage.getItem('cart');
    
    if (localCart) {
      try {
        const parsedCart = JSON.parse(localCart);
        
        if (parsedCart.items && parsedCart.items.length > 0) {
          dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
          
          // For each item in local cart, add to API cart
          for (const item of parsedCart.items) {
            await CartService.addToCart({
              product_id: item.id,
              quantity: item.quantity,
              color: item.selectedColor,
              size: item.selectedSize
            });
          }
          
          // Clear local cart
          localStorage.removeItem('cart');
          
          // Fetch updated cart from API
          await fetchCart();
        }
      } catch (error) {
        console.error('Error syncing cart with API:', error);
      }
    }
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
        closeCart,
        syncCartWithApi,
        refreshCart: fetchCart
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