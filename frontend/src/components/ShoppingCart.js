import React, { useState, useEffect, useCallback } from 'react';
import './ShoppingCart.css';

const ShoppingCart = ({ isOpen, onClose, userId, userEmail, onCheckout }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // 載入購物車
  const loadCart = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/cart/${userId}?email=${userEmail || ''}`);
      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      }
    } catch (error) {
      console.error('載入購物車失敗:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, userEmail]);

  useEffect(() => {
    if (isOpen && userId) {
      loadCart();
    }
  }, [isOpen, userId, loadCart]);

  // 更新商品數量
  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch(`/api/cart/${userId}/items/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        const result = await response.json();
        setCart(result.cart);
      } else {
        const error = await response.json();
        alert(error.error || '更新失敗');
      }
    } catch (error) {
      console.error('更新數量失敗:', error);
      alert('更新失敗');
    }
  };

  // 移除商品
  const removeItem = async (productId) => {
    try {
      const response = await fetch(`/api/cart/${userId}/items/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const result = await response.json();
        setCart(result.cart);
      }
    } catch (error) {
      console.error('移除商品失敗:', error);
    }
  };

  // 應用優惠券
  const applyCoupon = async () => {
    if (!couponCode.trim()) return;

    setCouponError('');
    setCouponSuccess('');

    try {
      const response = await fetch(`/api/cart/${userId}/coupon?email=${userEmail || ''}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ couponCode: couponCode.trim() }),
      });

      const result = await response.json();

      if (response.ok) {
        setCart(result.cart);
        setCouponSuccess(`優惠券已應用！折扣 NT$ ${result.discount}`);
        setCouponCode('');
      } else {
        setCouponError(result.error || '優惠券應用失敗');
      }
    } catch (error) {
      console.error('應用優惠券失敗:', error);
      setCouponError('應用優惠券失敗');
    }
  };

  // 移除優惠券
  const removeCoupon = async () => {
    try {
      const response = await fetch(`/api/cart/${userId}/coupon`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const result = await response.json();
        setCart(result.cart);
        setCouponSuccess('');
        setCouponError('');
      }
    } catch (error) {
      console.error('移除優惠券失敗:', error);
    }
  };

  // 前往結帳
  const proceedToCheckout = () => {
    if (!cart || cart.items.length === 0) return;

    if (onCheckout) {
      onCheckout(cart);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="shopping-cart-overlay" onClick={onClose}>
      <div className="shopping-cart" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>購物車</h2>
          <button className="close-btn" onClick={onClose}>
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="cart-content">
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>載入中...</p>
            </div>
          ) : !cart || cart.items.length === 0 ? (
            <div className="empty-cart">
              <span className="material-icons">shopping_cart</span>
              <p>購物車是空的</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                繼續購物
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.items.map((item) => (
                  <div key={item.product._id} className="cart-item">
                    <div className="item-image">
                      <img 
                        src={item.product.images?.[0] || '/images/placeholder.jpg'} 
                        alt={item.product.name}
                      />
                    </div>
                    <div className="item-details">
                      <h4>{item.product.name}</h4>
                      <p className="item-price">NT$ {item.price.toLocaleString()}</p>
                    </div>
                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <span className="material-icons">remove</span>
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        >
                          <span className="material-icons">add</span>
                        </button>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeItem(item.product._id)}
                      >
                        <span className="material-icons">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 優惠券區域 */}
              <div className="coupon-section">
                <div className="coupon-input-group">
                  <input
                    type="text"
                    placeholder="輸入優惠券代碼"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
                  />
                  <button onClick={applyCoupon} disabled={!couponCode.trim()}>
                    應用
                  </button>
                </div>
                
                {couponError && <p className="coupon-error">{couponError}</p>}
                {couponSuccess && <p className="coupon-success">{couponSuccess}</p>}
                
                {cart.appliedCoupon?.code && (
                  <div className="applied-coupon">
                    <span>已應用優惠券: {cart.appliedCoupon.code}</span>
                    <button onClick={removeCoupon}>移除</button>
                  </div>
                )}
              </div>

              {/* 總計區域 */}
              <div className="cart-summary">
                <div className="summary-row">
                  <span>小計</span>
                  <span>NT$ {cart.subtotal.toLocaleString()}</span>
                </div>
                {cart.discountAmount > 0 && (
                  <div className="summary-row discount">
                    <span>優惠折扣</span>
                    <span>-NT$ {cart.discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>總計</span>
                  <span>NT$ {cart.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button className="continue-shopping-btn" onClick={onClose}>
                  繼續購物
                </button>
                <button 
                  className="checkout-btn"
                  onClick={proceedToCheckout}
                >
                  前往結帳
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
