import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buildApiUrl } from '../config/api';
import './ProductPage.css';

const ProductDetail = ({ onAddToCart, userId, userEmail }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(buildApiUrl(`/api/products/${id}`));
        if (!response.ok) {
          throw new Error('商品不存在');
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const nextImage = () => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    }
  };

  const handleAddToCart = async () => {
    if (!userId) {
      alert('系統初始化中，請稍後再試');
      return;
    }

    if (!product) {
      alert('商品資訊載入中，請稍後再試');
      return;
    }

    setAddingToCart(true);

    try {
      const response = await fetch(buildApiUrl(`/api/cart/${userId}/items`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity,
          userEmail: userEmail || 'guest@auraway.com'
        }),
      });

      if (!response.ok) {
        throw new Error('添加到購物車失敗');
      }

      const result = await response.json();
      console.log('商品已添加到購物車:', result);
      
      if (onAddToCart) {
        onAddToCart();
      }
      
      alert(`已將 ${quantity} 個 ${product.name} 添加到購物車！`);
    } catch (error) {
      console.error('添加到購物車錯誤:', error);
      alert('添加到購物車失敗，請稍後再試');
    } finally {
      setAddingToCart(false);
    }
  };



  const handleNavigateHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="product-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>載入商品資訊中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-page">
        <div className="error-container">
          <h2>載入失敗</h2>
          <p>{error}</p>
          <button onClick={handleNavigateHome} className="back-home-btn">
            返回首頁
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page">
        <div className="error-container">
          <h2>商品不存在</h2>
          <p>找不到指定的商品</p>
          <button onClick={handleNavigateHome} className="back-home-btn">
            返回首頁
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <button onClick={handleNavigateHome} className="back-btn">
        <span className="material-icons">arrow_back</span>
        返回首頁
      </button>

      {/* 置中容器 */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 20px',
        textAlign: 'center'
      }}>

        {/* 1. 產品圖（主圖） */}
        <div className="product-images" style={{ marginBottom: '40px' }}>
          <div className="main-image-container">
            <img
              src={product.images && product.images.length > 0 ? product.images[currentImageIndex] : '/images/placeholder.svg'}
              onError={(e) => {
                e.target.src = '/images/placeholder.svg';
              }}
              alt={product.name}
              className="main-image"
              style={{
                width: '100%',
                maxWidth: '600px',
                height: 'auto',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(130, 191, 183, 0.2)'
              }}
            />
            {product.images && product.images.length > 1 && (
              <>
                <button className="image-nav prev" onClick={prevImage}>
                  <span className="material-icons">chevron_left</span>
                </button>
                <button className="image-nav next" onClick={nextImage}>
                  <span className="material-icons">chevron_right</span>
                </button>
              </>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="thumbnail-container" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: index === currentImageIndex ? '3px solid var(--primary-color)' : '2px solid #ddd'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* 2. 產品資訊和加入購物車區塊 */}
        <div className="product-info" style={{ marginBottom: '40px' }}>
          <div className="product-header" style={{ marginBottom: '30px' }}>
            <h1 className="product-title" style={{
              fontSize: '2.5em',
              color: 'var(--primary-color)',
              marginBottom: '20px'
            }}>
              {product.name}
            </h1>
            <div className="product-price" style={{ fontSize: '1.8em', marginBottom: '20px' }}>
              <span className="current-price" style={{
                color: 'var(--secondary-color)',
                fontWeight: 'bold'
              }}>
                NT$ {product.price?.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price" style={{
                  textDecoration: 'line-through',
                  color: '#999',
                  marginLeft: '15px'
                }}>
                  NT$ {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* 加入購物車區塊 */}
          <div className="purchase-section" style={{
            background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
            borderRadius: '15px',
            padding: '30px',
            marginBottom: '40px'
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
          {(product.descriptionImage || (product.images && product.images.length > 1 && product.images[1] !== product.images[0])) && (
            <div style={{
              textAlign: 'center',
              margin: '0 0 30px 0',
              background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
              borderRadius: '15px',
              padding: '20px'
            }}>
              <img
                src={product.descriptionImage || (product.images && product.images[1])}
                alt={`${product.name}產品說明`}
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
              color: 'var(--text-primary)'
            }}>
              {product.description}
            </p>

            {/* 其他產品資訊 */}
            {product.features && product.features.length > 0 && (
              <div style={{ marginTop: '30px' }}>
                <h4 style={{
                  color: 'var(--primary-color)',
                  fontSize: '1.4em',
                  marginBottom: '15px'
                }}>
                  主要特色
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: '0'
                }}>
                  {product.features.map((feature, index) => (
                    <li key={index} style={{
                      padding: '8px 0',
                      borderBottom: '1px solid #f0f0f0',
                      fontSize: '1.1em'
                    }}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.ingredients && (
              <div style={{ marginTop: '30px' }}>
                <h4 style={{
                  color: 'var(--primary-color)',
                  fontSize: '1.4em',
                  marginBottom: '15px'
                }}>
                  成分說明
                </h4>
                <p style={{ fontSize: '1.1em', lineHeight: '1.8' }}>
                  {product.ingredients}
                </p>
              </div>
            )}

            {product.usage && (
              <div style={{ marginTop: '30px' }}>
                <h4 style={{
                  color: 'var(--primary-color)',
                  fontSize: '1.4em',
                  marginBottom: '15px'
                }}>
                  使用方法
                </h4>
                <p style={{ fontSize: '1.1em', lineHeight: '1.8' }}>
                  {product.usage}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
