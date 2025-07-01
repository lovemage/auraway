import React, { useState, useEffect, useMemo } from 'react';
import './Checkout.css';

const Checkout = ({ cart, userId, userEmail, onOrderComplete, onBack }) => {
  const [step, setStep] = useState(1); // 1: 配送信息, 2: 付款方式, 3: 訂單確認
  const [loading, setLoading] = useState(false);
  
  // 配送信息
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    email: userEmail || '',
    address: '',
    city: '',
    postalCode: '',
    shippingMethod: '7-11付款取貨'
  });

  // 付款方式
  const [paymentMethod, setPaymentMethod] = useState('cod');
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
    const selectedOption = shippingOptions.find(option => option.value === shippingInfo.shippingMethod);
    setShippingFee(selectedOption ? selectedOption.fee : 0);
  }, [shippingInfo.shippingMethod, shippingOptions]);

  // 處理表單輸入
  const handleShippingChange = (field, value) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 驗證配送信息
  const validateShippingInfo = () => {
    const required = ['fullName', 'phone', 'email', 'address', 'city', 'postalCode'];
    return required.every(field => shippingInfo[field].trim() !== '');
  };

  // 提交訂單
  const submitOrder = async () => {
    setLoading(true);
    
    try {
      const orderData = {
        userId,
        userEmail,
        shippingAddress: {
          fullName: shippingInfo.fullName,
          phone: shippingInfo.phone,
          email: shippingInfo.email,
          address: shippingInfo.address,
          city: shippingInfo.city,
          postalCode: shippingInfo.postalCode,
          country: '台灣'
        },
        shippingMethod: shippingInfo.shippingMethod,
        paymentMethod,
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
        onOrderComplete(result.order);
      } else {
        const error = await response.json();
        alert(error.error || '訂單創建失敗');
      }
    } catch (error) {
      console.error('提交訂單失敗:', error);
      alert('訂單創建失敗');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = cart.total + shippingFee;

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button className="back-btn" onClick={onBack}>
          <span className="material-icons">arrow_back</span>
          返回購物車
        </button>
        <h2>結帳</h2>
      </div>

      <div className="checkout-content">
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">配送信息</span>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">付款方式</span>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">訂單確認</span>
          </div>
        </div>

        <div className="checkout-main">
          <div className="checkout-form">
            {step === 1 && (
              <div className="shipping-form">
                <h3>配送信息</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>收件人姓名 *</label>
                    <input
                      type="text"
                      value={shippingInfo.fullName}
                      onChange={(e) => handleShippingChange('fullName', e.target.value)}
                      placeholder="請輸入收件人姓名"
                    />
                  </div>
                  <div className="form-group">
                    <label>聯絡電話 *</label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => handleShippingChange('phone', e.target.value)}
                      placeholder="請輸入聯絡電話"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>電子郵件 *</label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleShippingChange('email', e.target.value)}
                      placeholder="請輸入電子郵件"
                    />
                  </div>
                  <div className="form-group">
                    <label>城市 *</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => handleShippingChange('city', e.target.value)}
                      placeholder="請輸入城市"
                    />
                  </div>
                  <div className="form-group">
                    <label>郵遞區號 *</label>
                    <input
                      type="text"
                      value={shippingInfo.postalCode}
                      onChange={(e) => handleShippingChange('postalCode', e.target.value)}
                      placeholder="請輸入郵遞區號"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>詳細地址 *</label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => handleShippingChange('address', e.target.value)}
                      placeholder="請輸入詳細地址"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>配送方式</label>
                    <select
                      value={shippingInfo.shippingMethod}
                      onChange={(e) => handleShippingChange('shippingMethod', e.target.value)}
                    >
                      {shippingOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label} {option.fee > 0 && `(+NT$ ${option.fee})`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="step-actions">
                  <button 
                    className="next-btn"
                    onClick={() => setStep(2)}
                    disabled={!validateShippingInfo()}
                  >
                    下一步
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="payment-form">
                <h3>付款方式</h3>
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-label">
                      <span className="material-icons">local_shipping</span>
                      貨到付款
                    </span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      value="credit_card"
                      checked={paymentMethod === 'credit_card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-label">
                      <span className="material-icons">credit_card</span>
                      信用卡付款
                    </span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="payment-label">
                      <span className="material-icons">account_balance</span>
                      銀行轉帳
                    </span>
                  </label>
                </div>
                
                <div className="form-group">
                  <label>備註 (可選)</label>
                  <textarea
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="有任何特殊需求請在此說明..."
                    rows="3"
                  />
                </div>

                <div className="step-actions">
                  <button className="prev-btn" onClick={() => setStep(1)}>
                    上一步
                  </button>
                  <button className="next-btn" onClick={() => setStep(3)}>
                    下一步
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="order-review">
                <h3>訂單確認</h3>
                
                <div className="review-section">
                  <h4>配送信息</h4>
                  <div className="review-content">
                    <p><strong>收件人：</strong>{shippingInfo.fullName}</p>
                    <p><strong>電話：</strong>{shippingInfo.phone}</p>
                    <p><strong>地址：</strong>{shippingInfo.city} {shippingInfo.postalCode} {shippingInfo.address}</p>
                    <p><strong>配送方式：</strong>{shippingInfo.shippingMethod}</p>
                  </div>
                </div>

                <div className="review-section">
                  <h4>付款方式</h4>
                  <div className="review-content">
                    <p>{paymentMethod === 'cod' ? '貨到付款' : 
                        paymentMethod === 'credit_card' ? '信用卡付款' : '銀行轉帳'}</p>
                  </div>
                </div>

                <div className="step-actions">
                  <button className="prev-btn" onClick={() => setStep(2)}>
                    上一步
                  </button>
                  <button 
                    className="submit-btn"
                    onClick={submitOrder}
                    disabled={loading}
                  >
                    {loading ? '處理中...' : '確認訂單'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 訂單摘要 */}
          <div className="order-summary">
            <h3>訂單摘要</h3>
            <div className="summary-items">
              {cart.items.map((item) => (
                <div key={item.product._id} className="summary-item">
                  <div className="item-info">
                    <span className="item-name">{item.product.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                  <span className="item-total">
                    NT$ {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="summary-totals">
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
              <div className="summary-row">
                <span>運費</span>
                <span>NT$ {shippingFee.toLocaleString()}</span>
              </div>
              <div className="summary-row total">
                <span>總計</span>
                <span>NT$ {totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
