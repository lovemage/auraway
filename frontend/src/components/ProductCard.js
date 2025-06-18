import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('zh-TW').format(price);
  };

  const getMainImage = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return '/images/placeholder.jpg'; // 預設圖片
  };

  const isDiscounted = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="product-card" onClick={handleClick}>
      {product.badge && (
        <div className="badge">{product.badge}</div>
      )}
      
      <div className="product-tumb">
        <img 
          src={getMainImage()} 
          alt={product.name}
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg';
          }}
        />
      </div>
      
      <div className="product-details">
        <span className="product-catagory">{product.category}</span>
        <h4>
          <a href="#" onClick={(e) => { e.preventDefault(); handleClick(); }}>
            {product.name}
          </a>
        </h4>
        <p>{product.description}</p>
        
        <div className="product-bottom-details">
          <div className="product-price">
            {isDiscounted && (
              <small>NT$ {formatPrice(product.originalPrice)}</small>
            )}
            NT$ {formatPrice(product.price)}
          </div>
          
          <div className="product-links">
            <a href="#" onClick={(e) => e.preventDefault()}>
              <i className="fa fa-heart"></i>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <i className="fa fa-shopping-cart"></i>
            </a>
          </div>
        </div>
        
        {/* 庫存信息 */}
        <div className="product-stock">
          {product.stock > 0 ? (
            <span className="in-stock">庫存: {product.stock}</span>
          ) : (
            <span className="out-of-stock">缺貨</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard; 