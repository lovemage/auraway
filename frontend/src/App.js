import React, { useState, useEffect } from 'react';
import './App.css';
import ProductPage from './components/ProductPage';
import ProbioticProductPage from './components/ProbioticProductPage';
import LiverProductPage from './components/LiverProductPage';
import PearlDewProductPage from './components/PearlDewProductPage';
import RoyalJellyProductPage from './components/RoyalJellyProductPage';
import EnzymeJellyProductPage from './components/EnzymeJellyProductPage';
import Q10ProductPage from './components/Q10ProductPage';
import AboutPage from './components/AboutPage';
import BrandStoryPage from './components/BrandStoryPage';
import HeaderInfo from './components/HeaderInfo';
import TurmericFishOilProductPage from './components/TurmericFishOilProductPage';
import JointCareProductPage from './components/JointCareProductPage';
import LuteinProductPage from './components/LuteinProductPage';
import SleepGABAProductPage from './components/SleepGABAProductPage';
import FatBurnerProductPage from './components/FatBurnerProductPage';
import BlackMacaProductPage from './components/BlackMacaProductPage';
import CalciumPowderProductPage from './components/CalciumPowderProductPage';
import VitaminGummiesProductPage from './components/VitaminGummiesProductPage';
import BitterMelonProductPage from './components/BitterMelonProductPage';
import GutHealthProductPage from './components/GutHealthProductPage';
import MetabolismBProductPage from './components/MetabolismBProductPage';
import BeautyDrinkProductPage from './components/BeautyDrinkProductPage';
import AuraPostPage from './components/AuraPostPage';
import EventPage from './components/EventPage';
import BabyMemberPage from './components/BabyMemberPage';
import WomenCards from './components/WomenCards';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // 全局處理頁面切換時滾動到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigateToProduct = () => {
    setCurrentPage('product');
    setMenuOpen(false);
  };

  const navigateToProbioticProduct = () => {
    setCurrentPage('probiotic');
    setMenuOpen(false);
  };

  const navigateToLiverProduct = () => {
    setCurrentPage('liver');
    setMenuOpen(false);
  };

  const navigateToPearlDewProduct = () => {
    setCurrentPage('pearldew');
    setMenuOpen(false);
  };

  const navigateToRoyalJellyProduct = () => {
    setCurrentPage('royaljelly');
    setMenuOpen(false);
  };

  const navigateToEnzymeJellyProduct = () => {
    setCurrentPage('enzymejelly');
    setMenuOpen(false);
  };

  const navigateToQ10Product = () => {
    setCurrentPage('q10');
    setMenuOpen(false);
  };

  const navigateToTurmericFishOilProduct = () => {
    setCurrentPage('turmericfishoil');
    setMenuOpen(false);
  };

  const navigateToJointCareProduct = () => {
    setCurrentPage('jointcare');
    setMenuOpen(false);
  };

  const navigateToLuteinProduct = () => {
    setCurrentPage('lutein');
    setMenuOpen(false);
  };

  const navigateToSleepGABAProduct = () => {
    setCurrentPage('sleepgaba');
    setMenuOpen(false);
  };

  const navigateToFatBurnerProduct = () => {
    setCurrentPage('fatburner');
    setMenuOpen(false);
  };

  const navigateToBlackMacaProduct = () => {
    setCurrentPage('blackmaca');
    setMenuOpen(false);
  };

  const navigateToCalciumPowderProduct = () => {
    setCurrentPage('calciumpowder');
    setMenuOpen(false);
  };

  const navigateToVitaminGummiesProduct = () => {
    setCurrentPage('vitamingummies');
    setMenuOpen(false);
  };

  const navigateToBitterMelonProduct = () => {
    setCurrentPage('bittermelon');
    setMenuOpen(false);
  };

  const navigateToGutHealthProduct = () => {
    setCurrentPage('guthealth');
    setMenuOpen(false);
  };

  const navigateToMetabolismBProduct = () => {
    setCurrentPage('metabolismb');
    setMenuOpen(false);
  };

  const navigateToBeautyDrinkProduct = () => {
    setCurrentPage('beautydrink');
    setMenuOpen(false);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setMenuOpen(false);
  };

  const navigateToAbout = () => {
    setCurrentPage('about');
    setMenuOpen(false);
  };

  const navigateToBrandStory = () => {
    setCurrentPage('brandstory');
    setMenuOpen(false);
  };

  const navigateToAuraPost = () => {
    setCurrentPage('aurapost');
    setMenuOpen(false);
  };

  const navigateToEvent = () => {
    setCurrentPage('event');
    setMenuOpen(false);
  };

  const navigateToBabyMember = () => {
    setCurrentPage('babymember');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
          <div className="logo-section" onClick={navigateToHome} style={{ cursor: 'pointer' }}>
            <h1>Auraway Shop</h1>
            <p className="tagline">您的健康守護專家</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <span className="material-icons">search</span>
              <input type="text" placeholder="搜尋產品..." />
            </div>
            <div className="user-actions">
              <span className="material-icons">person</span>
              <span className="material-icons">favorite</span>
              <div className="cart-icon">
                <span className="material-icons">shopping_cart</span>
                <span className="cart-count">0</span>
              </div>
            </div>
          </div>
        </div>
        <nav className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
          <ul className="nav-menu">
            <li onClick={navigateToHome}>Home 首頁</li>
            <li onClick={navigateToAuraPost}>Aura Post 專欄</li>
            <li onClick={navigateToEvent}>Event 活動公告</li>
            <li onClick={navigateToBabyMember}>寶寶會員專區</li>
          </ul>
        </nav>
      </header>

      {currentPage === 'home' ? (
        <>
          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-main-title">妳的身體，懂得所有的答案</h1>
              <p className="hero-subtitle">
                我們只是翻譯者，<br />
                將健康的密語，化作每日的守護。
              </p>
              <div className="hero-buttons">
                <button 
                  className="hero-btn hero-btn-primary" 
                  onClick={() => {
                    const womenCardsSection = document.querySelector('.women-cards-section');
                    if (womenCardsSection) {
                      womenCardsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  開始對話
                </button>
                <button 
                  className="hero-btn hero-btn-secondary" 
                  onClick={() => {
                    const productsSection = document.querySelector('.featured-products');
                    if (productsSection) {
                      productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  探索更多
                </button>
              </div>
            </div>
          </section>

          <WomenCards />

          <main className="main-content">

            <section className="featured-products">
              <h2>精選商品</h2>
              <ul className="catCardList">
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToProduct(); }}>
                      <img src="/images/波森/sg-11134201-23010-iw5fi43owwlv07.webp" alt="波森莓濃縮飲PLUS" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>波森莓濃縮飲PLUS</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,280</span></div>
                      <p>富含抗氧化成分，有助於提升免疫力，保護細胞免受自由基傷害。每日一包，保持活力與健康。全素食用，適合全家人食用。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>注重抗氧化保健</li>
                        <li>免疫力提升需求</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToProbioticProduct(); }}>
                      <img src="/images/原生/main.avif" alt="日本-原生菌" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>【新上市】日本-原生菌</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,580</span></div>
                      <p>來自日本的頂級原生菌，經過嚴格品質控制，含有多種益生菌株，有助於維持腸道健康，提升消化功能。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>腸道健康維護</li>
                        <li>消化功能改善</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToProbioticProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToLiverProduct(); }}>
                      <img src="/images/肝精/肝經main.jpg" alt="專業肝精保健食品" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>專業肝精保健食品</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,680</span></div>
                      <p>專業級肝精保健食品，含有豐富的胺基酸、維生素B群及肝臟精華，有助於維護肝臟健康，促進新陳代謝。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>工作繁忙熬夜</li>
                        <li>應酬較多護肝</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToLiverProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToPearlDewProduct(); }}>
                      <img src="/images/珍珠露/4bf10c3038a770b3d4af941f36e77dde (1).jpg" alt="珍珠露美麗膠原蛋白" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>珍珠露 - 美麗膠原蛋白</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,290</span></div>
                      <p>來自日本的美麗秘密，嚴選珍珠粉、膠原蛋白胜肽與多種美容成分。每日一包，由內而外散發自然光采。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>追求美肌保養</li>
                        <li>抗老化需求</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToPearlDewProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToRoyalJellyProduct(); }}>
                      <img src="/images/日本蜂王乳/e9cc017fd6ade38af291acf2d319f1dc.jpg" alt="日本蜂王乳" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>日本蜂王乳</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,480</span></div>
                      <p>來自日本的頂級蜂王乳，富含豐富的蛋白質、維生素和礦物質，是天然的美容聖品。有助於維持青春活力。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>愛美女性保養</li>
                        <li>熟齡抗衰老</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToRoyalJellyProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToEnzymeJellyProduct(); }}>
                      <img src="/images/青之酵素果凍/4e541dda27431efc8d93a5adbed63ff0.jpg" alt="青之酵素果凍" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>青之酵素果凍</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,280</span></div>
                      <p>青之酵素果凍含有豐富的植物酵素，有助於促進消化、維持腸道健康。清爽的果凍口感，讓您輕鬆補充營養。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>消化功能改善</li>
                        <li>外食族保健</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToEnzymeJellyProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToQ10Product(); }}>
                      <img src="/images/日本q10/5bc33a45db7e74693e442838dff85d6b.jpg" alt="日本Q10" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>日本Q10</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,290</span></div>
                      <p>來自日本的高品質輔酶Q10，是細胞能量代謝的重要輔酶，有助於維持心血管健康，提供細胞所需能量。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>心血管保健</li>
                        <li>細胞能量補充</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToQ10Product(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToTurmericFishOilProduct(); }}>
                      <img src="/images/加拿大-薑黃魚油/f9a4ddbad103efea855a2af355dc97c2.jpg" alt="加拿大薑黃魚油" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>加拿大薑黃魚油</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,290</span></div>
                      <p>來自加拿大純淨海域的頂級深海魚油，結合印度薑黃素精華，為您提供雙重健康守護。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>心血管保健</li>
                        <li>抗發炎需求</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToTurmericFishOilProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToJointCareProduct(); }}>
                      <img src="/images/美國-關舒活/4ed8b1b1f856a37ca2951f5154b8f6aa.jpg" alt="美國關舒活" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>美國關舒活</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,290</span></div>
                      <p>來自美國的專業關節保健配方，結合葡萄糖胺、軟骨素、MSM和薑黃素，為您的關節提供全方位保護。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>關節保健需求</li>
                        <li>運動愛好者</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToJointCareProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToLuteinProduct(); }}>
                      <img src="/images/日本-葉黃素/c6077bb6abb93db08f907e4d95ac0ae2.jpg" alt="日本葉黃素" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>日本葉黃素</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,150</span></div>
                      <p>來自日本的頂級葉黃素護眼配方，採用金盞花萃取的天然葉黃素，結合玉米黃素和花青素，為您的雙眼提供全方位保護。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>3C族群護眼</li>
                        <li>視力保健需求</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToLuteinProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToSleepGABAProduct(); }}>
                      <img src="/images/美國-夜舒眠GABA/6c1ea9955b8cc16a1e72a661f1e2f5f2.jpg" alt="美國夜舒眠GABA" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>美國夜舒眠GABA</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,190</span></div>
                      <p>來自美國的專業助眠配方，結合GABA、洋甘菊萃取和褪黑激素，為您提供自然舒緩的睡眠支持。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>睡眠品質改善</li>
                        <li>壓力大難入睡</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToSleepGABAProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToFatBurnerProduct(); }}>
                      <img src="/images/美國-燃纖脂/c3c6e7d6079320a3f5577e12295fbc58.jpg" alt="美國燃纖脂" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>美國燃纖脂</h3>
                      <div className="startingPrice">特價 <span>NT$ 3,100</span></div>
                      <p>來自美國的專業燃脂配方，結合綠茶萃取、左旋肉鹼和藤黃果萃取物，為您提供全方位的體重管理支持。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>體態管理需求</li>
                        <li>代謝提升支持</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToFatBurnerProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToBlackMacaProduct(); }}>
                      <img src="/images/美國-黑馬卡精氨酸/91ce0a777ac90611c870c9caedd179f7.jpg" alt="美國黑馬卡精氨酸" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>美國黑馬卡精氨酸</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,250</span></div>
                      <p>來自美國的頂級男性活力配方，結合黑馬卡萃取、L-精氨酸和鋅，為男性提供全方位的活力支持。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>男性活力提升</li>
                        <li>運動表現增強</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToBlackMacaProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToCalciumPowderProduct(); }}>
                      <img src="/images/美國-檸檬酸鈣粉/1f51a977a5e989940a06ae39c8e01c52.jpg" alt="美國檸檬酸鈣粉" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>美國檸檬酸鈣粉</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,280</span></div>
                      <p>來自美國的優質檸檬酸鈣粉，含有高濃度鈣質，採用檸檬酸鈣形式，易於人體吸收，有助於維持骨骼健康。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>骨骼保健需求</li>
                        <li>鈣質補充支持</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToCalciumPowderProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToVitaminGummiesProduct(); }}>
                      <img src="/images/美國-綜合維生素軟糖/2a06e4486bb2944dbbaf1319cc5f3505.jpg" alt="美國綜合維生素軟糖" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>美國綜合維生素軟糖</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,050</span></div>
                      <p>來自美國的美味綜合維生素軟糖，含12種必需維生素及礦物質，口感Q彈香甜，讓補充營養變成一種享受。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>全面營養補充</li>
                        <li>不愛吞膠囊者</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToVitaminGummiesProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToBitterMelonProduct(); }}>
                      <img src="/images/美國-苦瓜胜肽/2749cfb0ba4558cbe2b17157d7dd9f48.jpg" alt="美國苦瓜胜肽" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>美國苦瓜胜肽</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,250</span></div>
                      <p>來自美國的高純度苦瓜胜肽，採用先進萃取技術，保留苦瓜的天然活性成分，有助於維持正常的新陳代謝。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>代謝調節需求</li>
                        <li>天然保健首選</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToBitterMelonProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToGutHealthProduct(); }}>
                      <img src="/images/美國-固益清/96fe13d991f0703660f9a06f69974378.jpg" alt="美國固益清" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>美國固益清</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,180</span></div>
                      <p>來自美國的頂級腸道保健配方，採用天然植物萃取精華，有助於維護腸道健康，改善消化問題。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>腸道保健需求</li>
                        <li>消化問題改善</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToGutHealthProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToMetabolismBProduct(); }}>
                      <img src="/images/美國-代謝b群plus/76d12961d9d8193df8b81920a8865b5b.jpg" alt="美國代謝b群plus" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>美國代謝b群plus</h3>
                      <div className="startingPrice">特價 <span>NT$ 1,180</span></div>
                      <p>來自美國的高效代謝B群配方，含8種完整B群維生素，有助於能量代謝、維持神經系統健康。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>能量代謝提升</li>
                        <li>神經系統保健</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToMetabolismBProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="catCardList">
                  <div className="catCard">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToBeautyDrinkProduct(); }}>
                      <img src="/images/美妍飲/875589f1c2a794f35f547c2e08580c0f.jpg" alt="美妍飲" />
                    </a>
                    <div className="lowerCatCard">
                      <h3>美妍飲</h3>
                      <div className="startingPrice">特價 <span>NT$ 850</span></div>
                      <p>專為現代女性設計的美肌養顏飲品，含有豐富的膠原蛋白、維生素C及多種美肌成分，由內而外散發自然光彩。</p>
                      <h4>適用族群：</h4>
                      <ul>
                        <li>美肌養顏需求</li>
                        <li>膠原蛋白補充</li>
                      </ul>
                      <div id="catCardButton" className="button">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateToBeautyDrinkProduct(); }}>查看產品</a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </section>

            <section className="features-section">
              <div className="feature-item">
                <span className="material-icons">local_shipping</span>
                <h3>快速配送</h3>
                <p>24小時內出貨，全台快速配送</p>
              </div>
              <div className="feature-item">
                <span className="material-icons">security</span>
                <h3>安全認證</h3>
                <p>國際認證，品質有保障</p>
              </div>
              <div className="feature-item">
                <span className="material-icons">support_agent</span>
                <h3>專業諮詢</h3>
                <p>營養師線上諮詢服務</p>
              </div>
              <div className="feature-item">
                <span className="material-icons">loop</span>
                <h3>七天鑑賞</h3>
                <p>不滿意七天內可退換貨</p>
              </div>
            </section>


          </main>
        </>
      ) : currentPage === 'product' ? (
        <ProductPage />
      ) : currentPage === 'probiotic' ? (
        <ProbioticProductPage />
      ) : currentPage === 'liver' ? (
        <LiverProductPage />
      ) : currentPage === 'pearldew' ? (
        <PearlDewProductPage />
      ) : currentPage === 'royaljelly' ? (
        <RoyalJellyProductPage />
      ) : currentPage === 'enzymejelly' ? (
        <EnzymeJellyProductPage />
      ) : currentPage === 'q10' ? (
        <Q10ProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'turmericfishoil' ? (
        <TurmericFishOilProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'jointcare' ? (
        <JointCareProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'lutein' ? (
        <LuteinProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'sleepgaba' ? (
        <SleepGABAProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'fatburner' ? (
        <FatBurnerProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'blackmaca' ? (
        <BlackMacaProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'calciumpowder' ? (
        <CalciumPowderProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'vitamingummies' ? (
        <VitaminGummiesProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'bittermelon' ? (
        <BitterMelonProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'guthealth' ? (
        <GutHealthProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'metabolismb' ? (
        <MetabolismBProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'beautydrink' ? (
        <BeautyDrinkProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'about' ? (
        <AboutPage />
      ) : currentPage === 'brandstory' ? (
        <BrandStoryPage />
      ) : currentPage === 'aurapost' ? (
        <AuraPostPage />
      ) : currentPage === 'event' ? (
        <EventPage />
      ) : currentPage === 'babymember' ? (
        <BabyMemberPage />
      ) : null}

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
    </div>
  );
}

export default App;
