import React, { useEffect } from 'react';
import './WomenCards.css';

const WomenCards = () => {
  useEffect(() => {
    const track = document.querySelector(".women-cards-track");
    const cards = document.querySelectorAll(".women-deconstructed-card");
    const prevBtn = document.querySelector(".women-cards-button.prev");
    const nextBtn = document.querySelector(".women-cards-button.next");
    const dotsContainer = document.querySelector(".women-dots-container");

    if (!track || !cards.length || !prevBtn || !nextBtn || !dotsContainer) return;

    // 清除現有的dots
    dotsContainer.innerHTML = '';

    cards.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("women-dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToCard(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".women-dot");
    const cardWidth = cards[0].offsetWidth;
    const cardMargin = 40;
    const totalCardWidth = cardWidth + cardMargin;
    let currentIndex = 0;

    function goToCard(index) {
      index = Math.max(0, Math.min(index, cards.length - 1));
      currentIndex = index;
      updateCarousel();
    }

    function updateCarousel() {
      const translateX = -currentIndex * totalCardWidth;
      track.style.transform = `translateX(${translateX}px)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    // 事件監聽器
    prevBtn.addEventListener("click", () => goToCard(currentIndex - 1));
    nextBtn.addEventListener("click", () => goToCard(currentIndex + 1));

    updateCarousel();
  }, []);

  return (
    <section className="women-cards-section">
      <h2 className="women-cards-title">女人最重視的五件事</h2>
      <div className="women-cards-root">
        <div className="women-cards-carousel">
          <div className="women-cards-track">
            {/* 卡片一：年齡 */}
            <article className="women-deconstructed-card">
              <div className="women-card-layer women-card-image">
                <svg className="women-wave-svg" viewBox="0 0 300 400" preserveAspectRatio="none">
                  <rect width="100%" height="100%" fill="#C6E6E3" />
                </svg>
              </div>
              <div className="women-card-layer women-card-frame">
                <svg viewBox="0 0 300 400" preserveAspectRatio="none">
                  <path className="women-frame-path" d="M 20,20 H 280 V 380 H 20 Z" />
                </svg>
              </div>
              <div className="women-card-layer women-card-content age-women-content">
                <div className="women-content-fragment women-fragment-heading">
                  <h2 className="women-content-text">🌙 年齡</h2>
                  <h3 className="women-content-subtext">時光的秘密</h3>
                </div>
                <div className="women-content-fragment women-fragment-meta">
                  <div className="women-meta-line"></div>
                  <span className="women-meta-text">BEAUTY</span>
                </div>
                <div className="women-content-fragment women-fragment-body">
                  <p className="women-content-text">她的生日蛋糕上永遠只有一根蠟燭。鏡子裡的秘密，只有時光知道。每一條細紋，都是歲月寫下的情書...</p>
                </div>
                <div className="women-content-fragment women-fragment-cta">
                  <a href="#age" className="women-cta-link">
                    <div className="women-cta-box"></div>
                    <span className="women-cta-text">了解更多</span>
                  </a>
                </div>
              </div>
            </article>

            {/* 卡片二：懷孕 */}
            <article className="women-deconstructed-card">
              <div className="women-card-layer women-card-image">
                <svg className="women-wave-svg" viewBox="0 0 300 400" preserveAspectRatio="none">
                  <rect width="100%" height="100%" fill="#FED3DD" />
                </svg>
              </div>
              <div className="women-card-layer women-card-frame">
                <svg viewBox="0 0 300 400" preserveAspectRatio="none">
                  <path className="women-frame-path" d="M 20,20 H 280 V 380 H 20 Z" />
                </svg>
              </div>
              <div className="women-card-layer women-card-content pregnancy-women-content">
                <div className="women-content-fragment women-fragment-heading">
                  <h2 className="women-content-text">🌸 懷孕</h2>
                  <h3 className="women-content-subtext">生命的奇蹟</h3>
                </div>
                <div className="women-content-fragment women-fragment-meta">
                  <div className="women-meta-line"></div>
                  <span className="women-meta-text">LIFE</span>
                </div>
                <div className="women-content-fragment women-fragment-body">
                  <p className="women-content-text">肚子裡藏著一個小宇宙，心跳聲是最美的旋律。她輕撫著未來，感受生命的悸動...</p>
                </div>
                <div className="women-content-fragment women-fragment-cta">
                  <a href="#pregnancy" className="women-cta-link">
                    <div className="women-cta-box"></div>
                    <span className="women-cta-text">了解更多</span>
                  </a>
                </div>
              </div>
            </article>

            {/* 卡片三：食物 */}
            <article className="women-deconstructed-card">
              <div className="women-card-layer women-card-image">
                <svg className="women-wave-svg" viewBox="0 0 300 400" preserveAspectRatio="none">
                  <rect width="100%" height="100%" fill="#F2A2BD" />
                </svg>
              </div>
              <div className="women-card-layer women-card-frame">
                <svg viewBox="0 0 300 400" preserveAspectRatio="none">
                  <path className="women-frame-path" d="M 20,20 H 280 V 380 H 20 Z" />
                </svg>
              </div>
              <div className="women-card-layer women-card-content food-women-content">
                <div className="women-content-fragment women-fragment-heading">
                  <h2 className="women-content-text">🍃 食物</h2>
                  <h3 className="women-content-subtext">愛與罪惡感</h3>
                </div>
                <div className="women-content-fragment women-fragment-meta">
                  <div className="women-meta-line"></div>
                  <span className="women-meta-text">NUTRITION</span>
                </div>
                <div className="women-content-fragment women-fragment-body">
                  <p className="women-content-text">深夜的巧克力是心情的解藥，沙拉是對鏡子的承諾。她與美食之間，有著說不清的曖昧...</p>
                </div>
                <div className="women-content-fragment women-fragment-cta">
                  <a href="#food" className="women-cta-link">
                    <div className="women-cta-box"></div>
                    <span className="women-cta-text">了解更多</span>
                  </a>
                </div>
              </div>
            </article>

            {/* 卡片四：睡眠 */}
            <article className="women-deconstructed-card women-text-card">
              <div className="women-card-layer women-card-background">
                <div className="women-bg-grid">
                  <div className="women-grid-line horizontal" style={{top: '25%'}}></div>
                  <div className="women-grid-line horizontal" style={{top: '50%'}}></div>
                  <div className="women-grid-line horizontal" style={{top: '75%'}}></div>
                  <div className="women-grid-line vertical" style={{left: '33.33%'}}></div>
                  <div className="women-grid-line vertical" style={{left: '66.66%'}}></div>
                </div>
                <div className="women-bg-objects">
                  <div className="women-bg-object circle"></div>
                  <div className="women-bg-object square"></div>
                  <div className="women-bg-object triangle"></div>
                </div>
              </div>
              <div className="women-card-layer women-card-frame">
                <svg viewBox="0 0 300 400" preserveAspectRatio="none">
                  <path className="women-frame-path" d="M 20,20 H 280 V 380 H 20 Z" />
                </svg>
              </div>
              <div className="women-card-layer women-card-content sleep-women-content">
                <div className="women-content-fragment women-fragment-meta women-text-align-right">
                  <span className="women-meta-text">DREAM</span>
                  <div className="women-meta-line"></div>
                </div>
                <div className="women-content-fragment women-fragment-heading">
                  <h2 className="women-content-text women-align-right">💤 睡眠</h2>
                  <h3 className="women-content-subtext women-align-right">夢境王國</h3>
                </div>
                <div className="women-content-fragment women-fragment-body women-text-align-right">
                  <p className="women-content-text">枕頭知道她所有的秘密，夢境是她的另一個王國。凌晨三點，她與月光對話...</p>
                </div>
                <div className="women-content-fragment women-fragment-cta women-text-align-right">
                  <a href="#sleep" className="women-cta-link">
                    <div className="women-cta-box"></div>
                    <span className="women-cta-text">了解更多</span>
                  </a>
                </div>
              </div>
            </article>

            {/* 卡片五：家庭 */}
            <article className="women-deconstructed-card">
              <div className="women-card-layer women-card-image">
                <svg className="women-wave-svg" viewBox="0 0 300 400" preserveAspectRatio="none">
                  <rect width="100%" height="100%" fill="#82BFB7" />
                </svg>
              </div>
              <div className="women-card-layer women-card-frame">
                <svg viewBox="0 0 300 400" preserveAspectRatio="none">
                  <path className="women-frame-path" d="M 20,20 H 280 V 380 H 20 Z" />
                </svg>
              </div>
              <div className="women-card-layer women-card-content family-women-content">
                <div className="women-content-fragment women-fragment-heading">
                  <h2 className="women-content-text">🏠 家庭</h2>
                  <h3 className="women-content-subtext">愛的魔法</h3>
                </div>
                <div className="women-content-fragment women-fragment-meta">
                  <div className="women-meta-line"></div>
                  <span className="women-meta-text">HOME</span>
                </div>
                <div className="women-content-fragment women-fragment-body">
                  <p className="women-content-text">客廳的每個角落都有她的痕跡，冰箱門上貼滿了愛的便條。她是這個小世界的魔法師...</p>
                </div>
                <div className="women-content-fragment women-fragment-cta">
                  <a href="#family" className="women-cta-link">
                    <div className="women-cta-box"></div>
                    <span className="women-cta-text">了解更多</span>
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div className="women-cards-controls">
            <button className="women-cards-button prev">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button className="women-cards-button next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          <div className="women-dots-container"></div>
        </div>
      </div>
    </section>
  );
};

export default WomenCards; 