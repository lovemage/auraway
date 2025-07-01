import React, { useState, useEffect, useMemo } from 'react';
import './Checkout.css';

const Checkout = ({ cart, onClose, onOrderComplete, userId, userEmail }) => {
    const [loading, setLoading] = useState(false);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        phone: '',
        email: '',
        lineId: '',
        shippingMethod: '7-11付款取貨',
        address: '',
        storeName: '',
        storeAddress: ''
    });
    const [customerNote, setCustomerNote] = useState('');
    const [shippingFee, setShippingFee] = useState(0);

    const shippingOptions = useMemo(() => [
        { value: '7-11付款取貨', label: '7-11付款取貨 (預設)', fee: 0 },
        { value: '先付款-店到店7-11', label: '先付款-店到店7-11', fee: 0 },
        { value: '先付款-店到店-全家', label: '先付款-店到店-全家', fee: 0 },
        { value: '先付款-外島7-11', label: '先付款-外島7-11', fee: 140 },
        { value: '先付款-宅配', label: '先付款-宅配', fee: 80 }
    ], []);

    useEffect(() => {
        if (userEmail) {
            setShippingInfo(prev => ({
                ...prev,
                email: userEmail
            }));
        }
    }, [userEmail]);

    useEffect(() => {
        const selectedOption = shippingOptions.find(option => option.value === shippingInfo.shippingMethod);
        setShippingFee(selectedOption ? selectedOption.fee : 0);
    }, [shippingInfo.shippingMethod, shippingOptions]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!shippingInfo.name.trim()) {
            alert('請填寫姓名');
            return false;
        }
        if (!shippingInfo.phone.trim()) {
            alert('請填寫電話');
            return false;
        }
        
        // 驗證電話格式
        const phoneRegex = /^09\d{8}$|^\d{2,3}-\d{7,8}$/;
        if (!phoneRegex.test(shippingInfo.phone.replace(/\s/g, ''))) {
            alert('請填寫正確的電話格式');
            return false;
        }

        // 如果選擇宅配，需要地址
        if (shippingInfo.shippingMethod === '先付款-宅配' && !shippingInfo.address.trim()) {
            alert('選擇宅配時請填寫收件地址');
            return false;
        }

        // 如果選擇店到店，需要店家資訊
        if (shippingInfo.shippingMethod.includes('店到店') && !shippingInfo.storeName.trim()) {
            alert('選擇店到店時請填寫取貨店家名稱');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        
        try {
            const orderData = {
                userId: userId || 'guest',
                shippingInfo: {
                    ...shippingInfo,
                    shippingFee
                },
                customerNote
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(`訂單建立成功！訂單編號：${result.orderNumber}`);
                onOrderComplete(result.order);
                onClose();
            } else {
                const error = await response.json();
                alert(`訂單建立失敗：${error.message}`);
            }
        } catch (error) {
            console.error('建立訂單失敗:', error);
            alert('建立訂單失敗，請重試');
        } finally {
            setLoading(false);
        }
    };

    const totalAmount = cart.finalAmount + shippingFee;

    return (
        <div className="checkout-overlay" onClick={onClose}>
            <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
                <div className="checkout-header">
                    <h2>結帳</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="checkout-content">
                    <form onSubmit={handleSubmit}>
                        {/* 訂單摘要 */}
                        <div className="checkout-section">
                            <h3>訂單摘要</h3>
                            <div className="order-summary">
                                {cart.items.map((item) => (
                                    <div key={item.productId} className="order-item">
                                        <img src={item.productImage} alt={item.productName} />
                                        <div className="item-details">
                                            <span className="item-name">{item.productName}</span>
                                            <span className="item-quantity">x{item.quantity}</span>
                                        </div>
                                        <span className="item-price">NT${item.subtotal}</span>
                                    </div>
                                ))}
                                
                                <div className="order-totals">
                                    <div className="total-row">
                                        <span>商品小計:</span>
                                        <span>NT${cart.totalAmount}</span>
                                    </div>
                                    {cart.couponDiscount > 0 && (
                                        <div className="total-row discount">
                                            <span>優惠券折扣:</span>
                                            <span>-NT${cart.couponDiscount}</span>
                                        </div>
                                    )}
                                    <div className="total-row">
                                        <span>運費:</span>
                                        <span>NT${shippingFee}</span>
                                    </div>
                                    <div className="total-row final">
                                        <span>總計:</span>
                                        <span>NT${totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 收件資訊 */}
                        <div className="checkout-section">
                            <h3>收件資訊</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>姓名 *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={shippingInfo.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="請輸入收件人姓名"
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label>電話 *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={shippingInfo.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="09xxxxxxxx 或 02-xxxxxxxx"
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label>Email (選填)</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={shippingInfo.email}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label>Line ID (選填)</label>
                                    <input
                                        type="text"
                                        name="lineId"
                                        value={shippingInfo.lineId}
                                        onChange={handleInputChange}
                                        placeholder="您的 Line ID"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 配送方式 */}
                        <div className="checkout-section">
                            <h3>配送方式</h3>
                            <div className="shipping-options">
                                {shippingOptions.map((option) => (
                                    <label key={option.value} className="shipping-option">
                                        <input
                                            type="radio"
                                            name="shippingMethod"
                                            value={option.value}
                                            checked={shippingInfo.shippingMethod === option.value}
                                            onChange={handleInputChange}
                                        />
                                        <span className="option-label">
                                            {option.label}
                                            {option.fee > 0 && <span className="shipping-fee"> (+NT${option.fee})</span>}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {/* 條件性顯示額外欄位 */}
                            {shippingInfo.shippingMethod === '先付款-宅配' && (
                                <div className="form-group">
                                    <label>收件地址 *</label>
                                    <textarea
                                        name="address"
                                        value={shippingInfo.address}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="請輸入完整收件地址"
                                        rows="3"
                                    />
                                </div>
                            )}

                            {shippingInfo.shippingMethod.includes('店到店') && (
                                <>
                                    <div className="form-group">
                                        <label>取貨店家名稱 *</label>
                                        <input
                                            type="text"
                                            name="storeName"
                                            value={shippingInfo.storeName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="請輸入取貨店家名稱"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>店家地址</label>
                                        <input
                                            type="text"
                                            name="storeAddress"
                                            value={shippingInfo.storeAddress}
                                            onChange={handleInputChange}
                                            placeholder="請輸入店家地址"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* 備註 */}
                        <div className="checkout-section">
                            <h3>訂單備註</h3>
                            <textarea
                                value={customerNote}
                                onChange={(e) => setCustomerNote(e.target.value)}
                                placeholder="有任何特殊需求或備註請在此填寫..."
                                rows="3"
                            />
                        </div>

                        {/* 提交按鈕 */}
                        <div className="checkout-actions">
                            <button type="button" className="cancel-btn" onClick={onClose}>
                                取消
                            </button>
                            <button 
                                type="submit" 
                                className="submit-btn"
                                disabled={loading}
                            >
                                {loading ? '處理中...' : '確認訂單'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
