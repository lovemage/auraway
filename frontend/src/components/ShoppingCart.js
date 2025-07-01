import React, { useState, useEffect, useCallback } from 'react';
import './ShoppingCart.css';

const ShoppingCart = ({ isOpen, onClose, userId, userEmail, onCheckout }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');

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

    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await fetch(`/api/cart/${userId}/items/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });

            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart.cart);
            }
        } catch (error) {
            console.error('更新數量失敗:', error);
        }
    };

    const removeItem = async (productId) => {
        try {
            const response = await fetch(`/api/cart/${userId}/items/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart.cart);
            }
        } catch (error) {
            console.error('移除商品失敗:', error);
        }
    };

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
                setCouponSuccess(`優惠券已套用！折扣 NT$${result.coupon.discount}`);
                setCouponCode('');
            } else {
                setCouponError(result.message);
            }
        } catch (error) {
            console.error('套用優惠券失敗:', error);
            setCouponError('套用優惠券失敗，請重試');
        }
    };

    const removeCoupon = async () => {
        
        try {
            const response = await fetch(`/api/cart/${userId}/coupon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ couponCode: '' }),
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

    const handleCheckout = () => {
        if (cart && cart.items.length > 0) {
            onCheckout(cart);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="cart-overlay" onClick={onClose}>
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>購物車</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
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
                                    <div key={item.productId} className="cart-item">
                                        <img 
                                            src={item.productImage} 
                                            alt={item.productName}
                                            className="cart-item-image"
                                        />
                                        <div className="cart-item-details">
                                            <h4>{item.productName}</h4>
                                            <p className="cart-item-price">NT${item.price}</p>
                                        </div>
                                        <div className="cart-item-controls">
                                            <div className="quantity-controls">
                                                <button 
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button 
                                                className="remove-btn"
                                                onClick={() => removeItem(item.productId)}
                                            >
                                                移除
                                            </button>
                                        </div>
                                        <div className="cart-item-subtotal">
                                            NT${item.subtotal}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-coupon">
                                <div className="coupon-input-group">
                                    <input
                                        type="text"
                                        placeholder="輸入優惠券代碼"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
                                    />
                                    <button onClick={applyCoupon}>套用</button>
                                </div>
                                {couponError && <p className="coupon-error">{couponError}</p>}
                                {couponSuccess && <p className="coupon-success">{couponSuccess}</p>}
                                {cart.couponCode && (
                                    <div className="applied-coupon">
                                        <span>已套用優惠券: {cart.couponCode}</span>
                                        <button onClick={removeCoupon}>移除</button>
                                    </div>
                                )}
                            </div>

                            <div className="cart-summary">
                                <div className="summary-row">
                                    <span>小計:</span>
                                    <span>NT${cart.totalAmount}</span>
                                </div>
                                {cart.couponDiscount > 0 && (
                                    <div className="summary-row discount">
                                        <span>優惠券折扣:</span>
                                        <span>-NT${cart.couponDiscount}</span>
                                    </div>
                                )}
                                <div className="summary-row total">
                                    <span>總計:</span>
                                    <span>NT${cart.finalAmount}</span>
                                </div>
                            </div>

                            <div className="cart-actions">
                                <button className="continue-shopping-btn" onClick={onClose}>
                                    繼續購物
                                </button>
                                <button 
                                    className="checkout-btn"
                                    onClick={handleCheckout}
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
