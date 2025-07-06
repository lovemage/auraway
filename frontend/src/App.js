import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { buildApiUrl } from './config/api';
import ProductDetail from './components/ProductDetail';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import BrandStoryPage from './components/BrandStoryPage';
import HeaderInfo from './components/HeaderInfo';
import AuraPostPage from './components/AuraPostPage';
import EventPage from './components/EventPage';
import BabyMemberPage from './components/BabyMemberPage';
import AurawayRecommendPage from './components/AurawayRecommendPage';
import FloatingAiButton from './components/FloatingAiButton';
import AiQuestionnaireModal from './components/AiQuestionnaireModal';

import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';



function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showCart, setShowCart] = useState(false); // 控制購物車顯示
  const [showCheckout, setShowCheckout] = useState(false); // 控制結帳頁面顯示
  const [checkoutCart, setCheckoutCart] = useState(null); // 結帳時的購物車數據

  // 用戶ID管理
  const [userId, setUserId] = useState(null);
  const userEmail = ''; // 暫時固定為空，未來實現用戶登入時再使用 useState
  const [cartItemCount, setCartItemCount] = useState(0);

  // Admin UI 隱藏入口功能
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [logoClickTimer, setLogoClickTimer] = useState(null);

  // 初始化用戶ID
  useEffect(() => {
    // 檢查是否已有用戶ID，如果沒有則創建一個訪客ID
    let currentUserId = localStorage.getItem('auraway_user_id');
    if (!currentUserId) {
      currentUserId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('auraway_user_id', currentUserId);
    }
    setUserId(currentUserId);
    
    // 載入購物車計數
    loadCartCount(currentUserId);
  }, []);

  // 全局處理頁面切換時滾動到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 載入購物車計數
  const loadCartCount = async (userIdToLoad) => {
    if (!userIdToLoad) return;
    
    try {
      const response = await fetch(buildApiUrl(`/api/cart/${userIdToLoad}/count`));
      if (response.ok) {
        const data = await response.json();
        setCartItemCount(data.itemCount || 0);
      }
    } catch (error) {
      console.error('載入購物車計數失敗:', error);
    }
  };



  const navigateToProduct = (product) => {
    navigate(`/product/${product._id}`);
    setMenuOpen(false);
  };

  const navigateToHome = () => {
    navigate('/');
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
    setMenuOpen(false);
  };





  // 購物車相關處理函數
  const handleOpenCart = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleCheckout = (cart) => {
    setCheckoutCart(cart);
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setCheckoutCart(null);
  };

  const handleOrderComplete = (order) => {
    console.log('訂單完成:', order);
    // 可以在這裡添加訂單完成後的處理邏輯
    // 例如顯示成功訊息、清空購物車等
  };

  const handleAddToCart = () => {
    // 當商品添加到購物車後，重新載入購物車計數
    if (userId) {
      loadCartCount(userId);
    }
    console.log('商品已添加到購物車');
  };

  // Logo 隱藏入口功能
  const handleLogoClick = (e) => {
    e.stopPropagation(); // 防止事件冒泡
    
    // 添加點擊動畫效果
    const logoElement = e.currentTarget;
    logoElement.classList.add('clicking');
    setTimeout(() => {
      logoElement.classList.remove('clicking');
    }, 300);
    
    // 清除之前的計時器
    if (logoClickTimer) {
      clearTimeout(logoClickTimer);
    }
    
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    // 如果點擊 5 次，跳轉到 Admin UI
    if (newCount >= 5) {
      // 重置計數
      setLogoClickCount(0);
      
      // 添加特殊動畫效果
      logoElement.classList.add('admin-hint');
      setTimeout(() => {
        logoElement.classList.remove('admin-hint');
      }, 500);
      
      // 顯示提示訊息
      setTimeout(() => {
        const confirmAccess = window.confirm('🎉 恭喜發現隱藏入口！\n🔐 是否要進入後台管理系統？');
        
        if (confirmAccess) {
          // 跳轉到本地 Admin UI
          if (process.env.NODE_ENV === 'development') {
            window.open('http://localhost:5002/admin.html', '_blank');
          } else {
            // 生產環境跳轉到 Admin UI
            window.open('/admin', '_blank');
          }
        }
      }, 600);
      
      return;
    }
    
    // 顯示進度提示（3次以上時）
    if (newCount >= 3) {
      logoElement.classList.add('admin-hint');
      setTimeout(() => {
        logoElement.classList.remove('admin-hint');
      }, 500);
      
      // 顯示進度提示
      if (newCount === 3) {
        console.log('🔍 繼續點擊發現隱藏功能...');
      } else if (newCount === 4) {
        console.log('🔐 再點擊一次即可進入管理系統！');
      }
    }
    
    // 設置 3 秒後重置計數
    const timer = setTimeout(() => {
      setLogoClickCount(0);
    }, 3000);
    
    setLogoClickTimer(timer);
    
    // 如果不是第 5 次點擊，執行原本的導航功能
    if (newCount < 5) {
      navigateToHome();
    }
  };

  const navigateToBrandStory = () => {
    navigate('/brandstory');
    setMenuOpen(false);
  };

  const navigateToAuraPost = () => {
    navigate('/aurapost');
    setMenuOpen(false);
  };

  const navigateToEvent = () => {
    navigate('/event');
    setMenuOpen(false);
  };

  const navigateToBabyMember = () => {
    navigate('/babymember');
    setMenuOpen(false);
  };

  const navigateToAurawayRecommend = () => {
    navigate('/aurawayrecommend');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 搜尋功能
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
              const response = await fetch(buildApiUrl('/api/products/active'));
      const products = await response.json();
      
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        (product.tags && product.tags.some(tag => 
          tag.toLowerCase().includes(query.toLowerCase())
        )) ||
        (product.category && product.category.toLowerCase().includes(query.toLowerCase()))
      );
      
      setSearchResults(filteredProducts);
      setShowSearchResults(true);
    } catch (error) {
      console.error('搜尋錯誤:', error);
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    handleSearch(query);
  };

  const handleSearchResultClick = (product) => {
    navigateToProduct(product);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const handleSearchInputBlur = () => {
    // 延遲隱藏搜尋結果，讓用戶有時間點擊結果
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
  };

  const handleSearchInputFocus = () => {
    if (searchQuery.trim() !== '' && searchResults.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <header className="App-header">
        <HeaderInfo />
        <div className="header-main">
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className="logo-section" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img 
              src="/images/asset/logo-auraway.png" 
              alt="Auraway Shop" 
              style={{ height: '60px', width: 'auto' }}
            />
          </div>
          <div className="header-actions">
            <div className="search-box">
              <span className="material-icons">search</span>
              <input 
                type="text" 
                placeholder="搜尋產品..." 
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={handleSearchInputFocus}
                onBlur={handleSearchInputBlur}
              />
              {showSearchResults && (
                <div className="search-results">
                  {searchResults.length > 0 ? (
                    searchResults.map(product => (
                      <div 
                        key={product._id} 
                        className="search-result-item"
                        onClick={() => handleSearchResultClick(product)}
                      >
                        <img
                          src={product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.svg'}
                          alt={product.name}
                          onError={(e) => {
                            e.target.src = '/images/placeholder.svg';
                          }}
                        />
                        <div className="search-result-info">
                          <h4>{product.name}</h4>
                          <p>NT$ {product.price}</p>
                          <span className="search-result-category">{product.category}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="search-no-results">
                      <span className="material-icons">search_off</span>
                      <p>找不到相關產品</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="user-actions">
              <span className="material-icons" style={{ cursor: 'pointer' }}>person</span>
              <div className="cart-icon" onClick={handleOpenCart} style={{ cursor: 'pointer' }}>
                <span className="material-icons">shopping_cart</span>
                <span className="cart-count">{cartItemCount}</span>
              </div>
            </div>
          </div>
        </div>
        <nav className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
          <ul className="nav-menu">
            {/* 移動端搜索框 */}
            <div className="mobile-search">
              <input
                type="text"
                placeholder="搜尋產品..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={handleSearchInputFocus}
                onBlur={handleSearchInputBlur}
              />
              {showSearchResults && searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      className="search-result-item"
                      onClick={() => handleSearchResultClick(product)}
                    >
                      <img
                        src={product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.svg'}
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = '/images/placeholder.svg';
                        }}
                      />
                      <div className="result-info">
                        <h4>{product.name}</h4>
                        <p>NT$ {product.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 移動端用戶功能 */}
            <div className="mobile-user-actions">
              <div className="mobile-user-action">
                <span className="material-icons">person</span>
                <span>會員</span>
              </div>
            </div>

            {/* 導航菜單項目 */}
            <li onClick={navigateToHome}>Home 首頁</li>
            <li onClick={navigateToAurawayRecommend}>Auraway推薦</li>
            <li onClick={navigateToAuraPost}>Aura Post 專欄</li>
            <li onClick={navigateToEvent}>Event 活動公告</li>
            <li onClick={navigateToBabyMember}>寶寶會員專區</li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage onProductClick={navigateToProduct} />} />
        <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} userId={userId} userEmail={userEmail} />} />
        <Route path="/brandstory" element={<BrandStoryPage />} />
        <Route path="/aurapost" element={<AuraPostPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/babymember" element={<BabyMemberPage />} />
        <Route path="/aurawayrecommend" element={<AurawayRecommendPage onProductClick={navigateToProduct} />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>

      <footer className="App-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>關於我們</h3>
            <ul>
              <li onClick={navigateToBrandStory} style={{ cursor: 'pointer' }}>品牌故事</li>
              <li>經營理念</li>
              <li>團隊介紹</li>
              <li>媒體報導</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>顧客服務</h3>
            <ul>
              <li>購物說明</li>
              <li>付款方式</li>
              <li>配送資訊</li>
              <li>退換貨政策</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>會員專區</h3>
            <ul>
              <li>會員權益</li>
              <li>點數說明</li>
              <li>訂單查詢</li>
              <li>會員登入</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>聯絡資訊</h3>
            <ul>
              <li><span className="material-icons">phone</span> 0800-123-456</li>
              <li><span className="material-icons">email</span> service@aurawayshop.com</li>
              <li><span className="material-icons">schedule</span> 週一至週五 9:00-18:00</li>
              <li><span className="material-icons">location_on</span> 台北市信義區信義路五段7號</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p><strong>Auraway Shop - 因為健康，值得最好的呵護</strong></p>
          <p>&copy; 2025 Auraway Shop. 版權所有。</p>
        </div>
      </footer>

      <FloatingAiButton onClick={handleOpenModal} />
      <AiQuestionnaireModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onProductSelect={navigateToProduct}
      />



      <ShoppingCart
        isOpen={showCart}
        onClose={handleCloseCart}
        onCheckout={handleCheckout}
        userId={userId}
        userEmail={userEmail}
      />

      {showCheckout && checkoutCart && (
        <Checkout
          cart={checkoutCart}
          onClose={handleCloseCheckout}
          onOrderComplete={handleOrderComplete}
        />
      )}
    </div>
  );
}

export default App;
