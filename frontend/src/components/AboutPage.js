import React from 'react';
import './ProductPage.css';

function AboutPage() {
  return (
    <div className="ProductPage">
      <div className="about-hero-section" style={{
        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
        color: 'white',
        padding: '60px 40px',
        textAlign: 'center',
        borderRadius: '20px',
        margin: '20px 0 40px'
      }}>
        <h1 style={{ fontSize: '3em', marginBottom: '20px', fontWeight: '300' }}>關於 Auraway Shop</h1>
        <p style={{ fontSize: '1.3em', opacity: '0.9', maxWidth: '800px', margin: '0 auto' }}>
          您值得信賴的專業保健食品品牌
        </p>
      </div>

      <div className="additional-info">
        <section className="about-intro" style={{
          background: 'var(--white)',
          padding: '40px',
          borderRadius: '15px',
          marginBottom: '40px',
          boxShadow: '0 4px 15px rgba(130, 191, 183, 0.1)'
        }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '25px' }}>品牌故事</h2>
          <p style={{ 
            fontSize: '1.1em', 
            lineHeight: '1.8', 
            color: 'var(--text-primary)',
            textAlign: 'justify'
          }}>
            <strong>Auraway Shop</strong> 是您值得信賴的專業保健食品品牌。我們深信，健康是人生最珍貴的財富，
            因此致力於提供最優質的營養保健產品，陪伴您邁向更健康、更有活力的生活。
          </p>
        </section>

        <section className="mission-section" style={{
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          padding: '40px',
          borderRadius: '15px',
          marginBottom: '40px'
        }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '25px', textAlign: 'center' }}>我們的使命</h2>
          <p style={{ 
            fontSize: '1.1em', 
            color: 'var(--text-primary)', 
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            透過科學實證的營養方案，幫助每一位顧客：
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: 'var(--white)',
              padding: '25px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <span className="material-icons" style={{ 
                fontSize: '48px', 
                color: 'var(--primary-color)', 
                marginBottom: '15px' 
              }}>
                health_and_safety
              </span>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>建立堅實的健康防護網</p>
            </div>
            <div style={{
              background: 'var(--white)',
              padding: '25px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <span className="material-icons" style={{ 
                fontSize: '48px', 
                color: 'var(--secondary-color)', 
                marginBottom: '15px' 
              }}>
                bolt
              </span>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>提升日常活力與體能</p>
            </div>
            <div style={{
              background: 'var(--white)',
              padding: '25px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <span className="material-icons" style={{ 
                fontSize: '48px', 
                color: 'var(--primary-color)', 
                marginBottom: '15px' 
              }}>
                star
              </span>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>實現由內而外的健康光采</p>
            </div>
            <div style={{
              background: 'var(--white)',
              padding: '25px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <span className="material-icons" style={{ 
                fontSize: '48px', 
                color: 'var(--secondary-color)', 
                marginBottom: '15px' 
              }}>
                fitness_center
              </span>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>迎接生活中的每一個挑戰</p>
            </div>
          </div>
        </section>

        <section className="quality-section" style={{
          background: 'var(--white)',
          padding: '40px',
          borderRadius: '15px',
          marginBottom: '40px',
          boxShadow: '0 4px 15px rgba(130, 191, 183, 0.1)'
        }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '30px', textAlign: 'center' }}>品質承諾</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)' }}>
                  eco
                </span>
              </div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>嚴選原料</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em' }}>
                精心挑選全球優質原料，從源頭把關品質
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)' }}>
                  science
                </span>
              </div>
              <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>科學配方</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em' }}>
                結合營養學專業知識，打造黃金比例配方
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)' }}>
                  verified
                </span>
              </div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>安全認證</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em' }}>
                所有產品皆通過嚴格檢驗，符合國際最高標準
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)' }}>
                  psychology
                </span>
              </div>
              <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>專業把關</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em' }}>
                由專業營養師團隊監督，確保產品效能與安全
              </p>
            </div>
          </div>
        </section>

        <section className="why-choose-section" style={{
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          padding: '40px',
          borderRadius: '15px',
          marginBottom: '40px'
        }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '30px', textAlign: 'center' }}>為什麼選擇 Auraway？</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: 'var(--white)',
              padding: '25px',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px', fontSize: '1.1em' }}>專業團隊</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em' }}>
                營養師親自把關，提供專業建議
              </p>
            </div>
            <div style={{
              background: 'var(--white)',
              padding: '25px',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px', fontSize: '1.1em' }}>透明公開</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em' }}>
                完整標示成分，讓您安心選購
              </p>
            </div>
            <div style={{
              background: 'var(--white)',
              padding: '25px',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px', fontSize: '1.1em' }}>客製服務</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em' }}>
                根據個人需求，推薦最適合的產品
              </p>
            </div>
            <div style={{
              background: 'var(--white)',
              padding: '25px',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px', fontSize: '1.1em' }}>持續創新</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em' }}>
                不斷研發升級，提供最新營養方案
              </p>
            </div>
          </div>
        </section>

        <section className="nutritionist-quote" style={{
          background: 'var(--white)',
          padding: '40px',
          borderRadius: '15px',
          marginBottom: '40px',
          boxShadow: '0 4px 15px rgba(130, 191, 183, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '30px' }}>營養師的話</h2>
          <blockquote style={{
            fontSize: '1.2em',
            lineHeight: '1.8',
            color: 'var(--text-primary)',
            fontStyle: 'italic',
            maxWidth: '800px',
            margin: '0 auto 20px'
          }}>
            "在 Auraway Shop，我們不只是銷售保健食品，更是在傳遞健康的理念。每一個產品背後，
            都蘊含著我們對品質的堅持與對健康的承諾。讓我們一起，為更美好的明天儲備健康能量！"
          </blockquote>
          <cite style={{
            color: 'var(--secondary-color)',
            fontWeight: '500',
            fontSize: '1.1em'
          }}>
            — 營養師 Xin
          </cite>
        </section>

        <section className="contact-section" style={{
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          color: 'white',
          padding: '40px',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '20px', fontSize: '2em' }}>聯繫我們</h2>
          <p style={{ 
            fontSize: '1.1em', 
            marginBottom: '30px', 
            opacity: '0.9',
            maxWidth: '600px',
            margin: '0 auto 30px'
          }}>
            準備開始您的健康之旅了嗎？歡迎隨時與我們聯繫，讓專業團隊為您提供最適合的健康方案。
          </p>
          <button style={{
            padding: '15px 30px',
            fontSize: '1.1em',
            backgroundColor: 'var(--white)',
            color: 'var(--primary-color)',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.3s'
          }}>
            聯繫我們
          </button>
        </section>
      </div>
    </div>
  );
}

export default AboutPage; 