import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './ProductPage.css';

const DynamicProductPage = ({ product, onNavigateHome, onAddToCart }) => {
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading] = useState(!product);
  const [productData] = useState(product);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (!product && window.location.hash) {
      // 如果沒有傳入產品數據，嘗試從URL或其他方式獲取
      // 這裡可以根據需要實現產品ID獲取邏輯
    }
  }, [product]);

  const nextImage = () => {
    if (productData?.images?.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productData.images.length);
    }
  };

  const prevImage = () => {
    if (productData?.images?.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + productData.images.length) % productData.images.length);
    }
  };

  const handleAddToCart = async () => {
    if (!productData) {
      alert('商品資訊載入中，請稍後再試');
      return;
    }

    // 如果沒有用戶ID，使用訪客ID
    const currentUserId = userId || 'guest_' + Date.now();

    setAddingToCart(true);

    try {
      const response = await fetch(`/api/cart/${currentUserId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productData._id || productData.id,
          productName: productData.name,
          productImage: productData.images?.[0] || '/images/placeholder.svg',
          price: productData.price,
          quantity: quantity
        }),
      });

      if (response.ok) {
        alert(`已將 ${productData.name} x${quantity} 加入購物車！`);
        if (onAddToCart) {
          onAddToCart();
        }
      } else {
        const error = await response.json();
        alert(`加入購物車失敗：${error.message}`);
      }
    } catch (error) {
      console.error('加入購物車失敗:', error);
      alert('加入購物車失敗，請重試');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading || !productData) {
    return (
      <div className="ProductPage">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          載入中...
        </div>
      </div>
    );
  }

  const images = productData.images || ['/images/placeholder.svg'];
  const mainImage = images[0]; // 第一張圖作為主圖（小圖）
  const detailImage = images[1]; // 第二張圖作為詳細圖（長圖）

  return (
    <div className="ProductPage">
      {/* 置中容器 */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 20px',
        textAlign: 'center'
      }}>

        {/* 1. 產品圖（主圖） */}
        <div className="product-main-image" style={{ marginBottom: '40px' }}>
          {productData.badge && (
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'var(--secondary-color)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.9em',
              fontWeight: 'bold',
              zIndex: 10
            }}>
              {productData.badge}
            </div>
          )}
          <img
            src={mainImage}
            alt={productData.name}
            style={{
              width: '100%',
              maxWidth: '600px',
              height: 'auto',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(130, 191, 183, 0.2)'
            }}
            onError={(e) => {
              e.target.src = '/images/placeholder.svg';
            }}
          />
        </div>

        {/* 2. 產品資訊和加入購物車區塊 */}
        <div className="product-details" style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '2.5em',
            color: 'var(--primary-color)',
            marginBottom: '20px'
          }}>
            {productData.name}
          </h1>
          <div className="price-section" style={{ fontSize: '1.8em', marginBottom: '30px' }}>
            <span style={{
              color: 'var(--secondary-color)',
              fontWeight: 'bold'
            }}>
              NT${productData.price?.toLocaleString()}
            </span>
            {productData.originalPrice && (
              <span style={{
                textDecoration: 'line-through',
                color: '#999',
                marginLeft: '15px'
              }}>
                NT${productData.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {/* 加入購物車區塊 */}
          <div className="purchase-section" style={{
            background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
            borderRadius: '15px',
            padding: '30px'
          }}>
            <div className="quantity-selector" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <label style={{ fontSize: '1.2em', fontWeight: 'bold' }}>數量：</label>
              <div className="quantity-controls" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '2px solid var(--primary-color)',
                    background: 'white',
                    color: 'var(--primary-color)',
                    fontSize: '1.5em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  -
                </button>
                <span style={{
                  fontSize: '1.5em',
                  fontWeight: 'bold',
                  minWidth: '40px',
                  textAlign: 'center'
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '2px solid var(--primary-color)',
                    background: 'white',
                    color: 'var(--primary-color)',
                    fontSize: '1.5em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              style={{
                background: 'var(--secondary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '15px 40px',
                fontSize: '1.3em',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                margin: '0 auto',
                minWidth: '200px',
                boxShadow: '0 4px 15px rgba(242, 162, 189, 0.3)'
              }}
            >
              <span className="material-icons">shopping_cart</span>
              {addingToCart ? '加入中...' : '加入購物車'}
            </button>
          </div>
        </div>

        {/* 3. 描述區塊 */}
        <div className="description-section">
          {/* 產品描述圖 */}
          {(productData.descriptionImage || (detailImage && detailImage !== mainImage)) && (
            <div style={{
              textAlign: 'center',
              margin: '0 0 30px 0',
              background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
              borderRadius: '15px',
              padding: '20px'
            }}>
              <img
                src={productData.descriptionImage || detailImage}
                alt={`${productData.name}產品說明`}
                style={{
                  width: '100%',
                  maxWidth: '700px',
                  height: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0 4px 15px rgba(130, 191, 183, 0.2)'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* 產品描述（文字） */}
          <div className="product-description" style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 4px 15px rgba(130, 191, 183, 0.1)',
            textAlign: 'left'
          }}>
            <h3 style={{
              color: 'var(--primary-color)',
              fontSize: '1.8em',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              商品描述
            </h3>
            <p style={{
              fontSize: '1.1em',
              lineHeight: '1.8',
              color: 'var(--text-primary)',
              whiteSpace: 'pre-wrap'
            }}>
              {productData.description}
            </p>
          </div>
        </div>
      </div>
        
        {/* 產品特色 */}
        {productData.specifications?.features && productData.specifications.features.length > 0 && (
          <>
            <h2>商品特色</h2>
            <ul>
              {productData.specifications.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </>
        )}

        {/* 營養成分分析 - 可以根據產品分類動態調整 */}
        <h2>產品優勢</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px', 
          margin: '20px 0' 
        }}>
          {getProductAdvantages(productData).map((advantage, index) => (
            <div key={index} style={{ 
              textAlign: 'center', 
              padding: '20px',
              background: 'var(--white)',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <span className="material-icons" style={{ 
                fontSize: '48px', 
                color: advantage.color, 
                marginBottom: '10px' 
              }}>
                {advantage.icon}
              </span>
              <h3 style={{ color: advantage.color, marginBottom: '10px' }}>
                {advantage.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {/* 產品規格 */}
        {productData.specifications && (
          <>
            <h2>產品規格</h2>
            <div style={{ 
              background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
              borderRadius: '15px',
              padding: '25px',
              margin: '20px 0'
            }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '20px' 
              }}>
                {productData.specifications.content && (
                  <div style={{ 
                    background: 'var(--white)', 
                    padding: '15px', 
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
                  }}>
                    <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>內容量</h4>
                    <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                      {productData.specifications.content}
                    </p>
                  </div>
                )}
                {productData.specifications.storage && (
                  <div style={{ 
                    background: 'var(--white)', 
                    padding: '15px', 
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
                  }}>
                    <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>保存方式</h4>
                    <p style={{ color: 'var(--text-primary)' }}>
                      {productData.specifications.storage}
                    </p>
                  </div>
                )}
                {productData.specifications.origin && (
                  <div style={{ 
                    background: 'var(--white)', 
                    padding: '15px', 
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
                  }}>
                    <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>產地</h4>
                    <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                      {productData.specifications.origin}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* 食用方法 */}
        {productData.specifications?.usage && (
          <>
            <h2>食用方法</h2>
            <div style={{ 
              background: 'var(--light-teal)',
              borderRadius: '15px',
              padding: '25px',
              margin: '20px 0'
            }}>
              <p style={{ 
                color: 'var(--text-primary)', 
                fontSize: '1.1em',
                lineHeight: '1.6',
                margin: 0
              }}>
                {productData.specifications.usage}
              </p>
            </div>
          </>
        )}

        {/* 主要成分 */}
        {productData.specifications?.ingredients && (
          <>
            <h2>主要成分</h2>
            <div style={{ 
              background: 'var(--white)',
              borderRadius: '15px',
              padding: '25px',
              margin: '20px 0',
              border: '2px solid var(--light-teal)',
              boxShadow: '0 4px 15px rgba(130, 191, 183, 0.1)'
            }}>
              <p style={{ 
                color: 'var(--text-primary)', 
                fontSize: '1.1em',
                lineHeight: '1.6',
                margin: 0
              }}>
                {productData.specifications.ingredients}
              </p>
            </div>
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button 
            onClick={onNavigateHome}
            style={{
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '1.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            返回首頁
          </button>
        </div>
      </div>
    </div>
  );
};

// 根據產品分類和特性生成產品優勢
const getProductAdvantages = (product) => {
  const defaultAdvantages = [
    {
      icon: 'verified',
      title: '品質保證',
      description: '嚴格品質控制',
      color: 'var(--primary-color)'
    },
    {
      icon: 'local_shipping',
      title: '快速配送',
      description: '24小時內出貨',
      color: 'var(--secondary-color)'
    },
    {
      icon: 'favorite',
      title: '健康首選',
      description: '專業推薦',
      color: 'var(--primary-color)'
    }
  ];

  // 根據產品分類定制優勢
  if (product.category === '美容保養') {
    return [
      {
        icon: 'auto_awesome',
        title: '美容養顏',
        description: '由內而外散發光彩',
        color: 'var(--secondary-color)'
      },
      {
        icon: 'sentiment_very_satisfied',
        title: '抗老化',
        description: '延緩老化過程',
        color: 'var(--primary-color)'
      },
      {
        icon: 'spa',
        title: '天然成分',
        description: '溫和不刺激',
        color: 'var(--secondary-color)'
      }
    ];
  } else if (product.category === '心血管保健') {
    return [
      {
        icon: 'favorite',
        title: '護心健康',
        description: '維護心血管',
        color: 'var(--primary-color)'
      },
      {
        icon: 'trending_up',
        title: '提升活力',
        description: '增強體力',
        color: 'var(--secondary-color)'
      },
      {
        icon: 'shield',
        title: '預防保健',
        description: '預防勝於治療',
        color: 'var(--primary-color)'
      }
    ];
  } else if (product.category === '護眼保健') {
    return [
      {
        icon: 'visibility',
        title: '護眼明目',
        description: '保護視力健康',
        color: 'var(--secondary-color)'
      },
      {
        icon: 'computer',
        title: '藍光防護',
        description: '過濾有害藍光',
        color: 'var(--primary-color)'
      },
      {
        icon: 'wb_sunny',
        title: '抗氧化',
        description: '預防眼部老化',
        color: 'var(--secondary-color)'
      }
    ];
  }

  return defaultAdvantages;
};

export default DynamicProductPage; 