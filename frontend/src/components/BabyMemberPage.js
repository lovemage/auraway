import React from 'react';

const BabyMemberPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>寶寶會員專區</h1>
        <p>專為寶寶健康設計的會員服務</p>
      </div>
      
      <div className="content-container">
        <div className="member-benefits">
          <h2>會員專屬權益</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">👶</div>
              <h3>專業諮詢</h3>
              <p>專業營養師一對一諮詢服務，為寶寶量身訂製健康方案</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🎁</div>
              <h3>生日禮品</h3>
              <p>寶寶生日當月享有專屬禮品與優惠券</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>成長記錄</h3>
              <p>詳細記錄寶寶成長過程，追蹤健康狀態</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>會員折扣</h3>
              <p>嬰幼兒專用產品享有會員專屬折扣</p>
            </div>
          </div>
        </div>
        
        <div className="member-products">
          <h2>寶寶專用商品</h2>
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <div className="placeholder-image">寶寶維生素</div>
              </div>
              <h3>嬰幼兒綜合維生素</h3>
              <p>專為0-3歲寶寶設計的綜合維生素</p>
              <div className="price">NT$ 980</div>
            </div>
            
            <div className="product-card">
              <div className="product-image">
                <div className="placeholder-image">寶寶益生菌</div>
              </div>
              <h3>嬰幼兒益生菌</h3>
              <p>溫和配方，幫助寶寶腸道健康</p>
              <div className="price">NT$ 1,200</div>
            </div>
            
            <div className="product-card">
              <div className="product-image">
                <div className="placeholder-image">寶寶鈣片</div>
              </div>
              <h3>兒童鈣質補充</h3>
              <p>促進骨骼發育，易吸收配方</p>
              <div className="price">NT$ 850</div>
            </div>
          </div>
        </div>
        
        <div className="member-login">
          <h2>會員登入</h2>
          <div className="login-form">
            <input type="email" placeholder="請輸入會員信箱" />
            <input type="password" placeholder="請輸入密碼" />
            <button className="login-btn">登入</button>
            <p>還不是會員？<span className="register-link">立即註冊</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabyMemberPage; 