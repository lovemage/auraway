import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { buildApiUrl } from '../config/api';
import './ProductPage.css';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
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
    if (!user) {
      alert('請先登入會員');
      return;
    }

    if (!product) {
      alert('商品資訊載入中，請稍後再試');
      return;
    }

    setAddingToCart(true);

    try {
      const response = await fetch(buildApiUrl(`/api/cart/${user.uid}/items`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity,
          price: product.price
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

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 999)) {
      setQuantity(newQuantity);
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

      <div className="product-content">
        <div className="product-images">
          <div className="main-image-container">
            <img
              src={product.images && product.images.length > 0 ? product.images[currentImageIndex] : '/images/white-rainforest-qCDK3DN7lOs-unsplash.jpg'}
              alt={product.name}
              className="main-image"
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
            <div className="thumbnail-container">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-price">
              <span className="current-price">NT$ {product.price?.toLocaleString()}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">NT$ {product.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          <div className="product-description">
            <h3>商品描述</h3>
            <p>{product.description}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="product-features">
              <h3>主要特色</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.ingredients && (
            <div className="product-ingredients">
              <h3>成分說明</h3>
              <p>{product.ingredients}</p>
            </div>
          )}

          {product.usage && (
            <div className="product-usage">
              <h3>使用方法</h3>
              <p>{product.usage}</p>
            </div>
          )}

          <div className="purchase-section">
            <div className="quantity-selector">
              <label>數量：</label>
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="quantity-btn"
                >
                  <span className="material-icons">remove</span>
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= (product.stock || 999)}
                  className="quantity-btn"
                >
                  <span className="material-icons">add</span>
                </button>
              </div>
            </div>

            <div className="purchase-buttons">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || !product.isActive}
                className="add-to-cart-btn"
              >
                {addingToCart ? (
                  <>
                    <span className="loading-spinner small"></span>
                    加入中...
                  </>
                ) : (
                  <>
                    <span className="material-icons">shopping_cart</span>
                    加入購物車
                  </>
                )}
              </button>
            </div>
          </div>

          {product.stock !== undefined && (
            <div className="stock-info">
              <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.stock > 0 ? `庫存：${product.stock} 件` : '缺貨中'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
