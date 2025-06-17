import React from 'react';
import './ProductPage.css';

function BrandStoryPage() {
  return (
    <div className="ProductPage">
      <div className="brand-story-hero" style={{
        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
        color: 'white',
        padding: '80px 40px',
        textAlign: 'center',
        borderRadius: '20px',
        margin: '20px 0 40px'
      }}>
        <h1 style={{ fontSize: '3.5em', marginBottom: '20px', fontWeight: '300' }}>Auraway Shop 品牌故事</h1>
        <p style={{ fontSize: '1.4em', opacity: '0.9', maxWidth: '900px', margin: '0 auto' }}>
          一個關於健康、愛與責任的美麗旅程
        </p>
      </div>

      <div className="additional-info">
        {/* 品牌起源 */}
        <section className="brand-origin" style={{
          background: 'var(--white)',
          padding: '50px 40px',
          borderRadius: '15px',
          marginBottom: '40px',
          boxShadow: '0 4px 15px rgba(130, 191, 183, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            <span className="material-icons" style={{ 
              fontSize: '48px', 
              color: 'var(--primary-color)', 
              marginRight: '20px' 
            }}>
              auto_stories
            </span>
            <h2 style={{ color: 'var(--primary-color)', margin: 0 }}>品牌起源</h2>
          </div>
          <div style={{ fontSize: '1.1em', lineHeight: '1.8', color: 'var(--text-primary)' }}>
            <p style={{ marginBottom: '20px' }}>
              <strong>Auraway Shop</strong> 的故事始於 2018 年，創辦人 Xin 營養師在臨床工作中深刻體會到現代人面臨的健康挑戰。
              在忙碌的都市生活中，許多人因為工作壓力、不規律的作息和飲食習慣，導致身體出現各種亞健康狀態。
            </p>
            <p style={{ marginBottom: '20px' }}>
              作為一名專業營養師，Xin 看到了市面上保健食品良莠不齊的現象，許多產品缺乏科學依據，
              或是成分標示不清，讓消費者在選擇時感到困惑。她深信，<strong>每個人都應該擁有獲得優質營養補充的權利</strong>，
              這個信念成為了 Auraway Shop 誕生的初衷。
            </p>
            <p>
              「Auraway」這個名字融合了「Aura」（光環、氣場）和「Away」（遠離）的概念，
              象徵著我們希望幫助每一位顧客遠離健康困擾，散發出由內而外的健康光彩。
            </p>
          </div>
        </section>

        {/* 發展歷程 */}
        <section className="development-timeline" style={{
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          padding: '50px 40px',
          borderRadius: '15px',
          marginBottom: '40px'
        }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '40px', textAlign: 'center' }}>發展歷程</h2>
          <div style={{ position: 'relative' }}>
            {/* 時間軸線 */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '100%',
              background: 'var(--primary-color)',
              opacity: '0.3'
            }}></div>
            
            {/* 2018年 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
              position: 'relative'
            }}>
              <div style={{
                flex: '1',
                textAlign: 'right',
                paddingRight: '30px'
              }}>
                <div style={{
                  background: 'var(--white)',
                  padding: '25px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
                }}>
                  <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>2018年 - 品牌創立</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em', margin: 0 }}>
                    Xin 營養師創立 Auraway Shop，致力於提供科學實證的營養保健方案
                  </p>
                </div>
              </div>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'var(--primary-color)',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2
              }}></div>
              <div style={{ flex: '1', paddingLeft: '30px' }}></div>
            </div>

            {/* 2019年 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
              position: 'relative'
            }}>
              <div style={{ flex: '1', paddingRight: '30px' }}></div>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'var(--secondary-color)',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2
              }}></div>
              <div style={{
                flex: '1',
                textAlign: 'left',
                paddingLeft: '30px'
              }}>
                <div style={{
                  background: 'var(--white)',
                  padding: '25px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
                }}>
                  <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>2019年 - 產品線擴充</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em', margin: 0 }}>
                    成功推出波森莓系列，獲得消費者熱烈回響，奠定品牌在抗氧化保健領域的地位
                  </p>
                </div>
              </div>
            </div>

            {/* 2020年 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
              position: 'relative'
            }}>
              <div style={{
                flex: '1',
                textAlign: 'right',
                paddingRight: '30px'
              }}>
                <div style={{
                  background: 'var(--white)',
                  padding: '25px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
                }}>
                  <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>2020年 - 國際合作</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em', margin: 0 }}>
                    與日本頂級保健食品製造商建立戰略合作，引進日本蜂王乳、Q10等高品質產品
                  </p>
                </div>
              </div>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'var(--primary-color)',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2
              }}></div>
              <div style={{ flex: '1', paddingLeft: '30px' }}></div>
            </div>

            {/* 2022年 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
              position: 'relative'
            }}>
              <div style={{ flex: '1', paddingRight: '30px' }}></div>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'var(--secondary-color)',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2
              }}></div>
              <div style={{
                flex: '1',
                textAlign: 'left',
                paddingLeft: '30px'
              }}>
                <div style={{
                  background: 'var(--white)',
                  padding: '25px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
                }}>
                  <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>2022年 - 創新突破</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em', margin: 0 }}>
                    推出青之酵素果凍，以創新的果凍劑型讓營養補充變得更加便利美味
                  </p>
                </div>
              </div>
            </div>

            {/* 2024年 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}>
              <div style={{
                flex: '1',
                textAlign: 'right',
                paddingRight: '30px'
              }}>
                <div style={{
                  background: 'var(--white)',
                  padding: '25px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
                }}>
                  <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>2024年 - 全方位健康</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95em', margin: 0 }}>
                    完善產品線布局，涵蓋免疫力、美容養顏、腸道健康、肝臟保健等全方位需求
                  </p>
                </div>
              </div>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'var(--primary-color)',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2
              }}></div>
              <div style={{ flex: '1', paddingLeft: '30px' }}></div>
            </div>
          </div>
        </section>

        {/* 品牌理念 */}
        <section className="brand-philosophy" style={{
          background: 'var(--white)',
          padding: '50px 40px',
          borderRadius: '15px',
          marginBottom: '40px',
          boxShadow: '0 4px 15px rgba(130, 191, 183, 0.1)'
        }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '30px', textAlign: 'center' }}>品牌理念</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span className="material-icons" style={{ fontSize: '50px', color: 'var(--primary-color)' }}>
                  favorite
                </span>
              </div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>以愛為本</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                我們相信，真正的健康來自於對自己和家人的愛。每一個產品的研發，
                都源於我們對消費者健康的關愛與責任感。
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span className="material-icons" style={{ fontSize: '50px', color: 'var(--secondary-color)' }}>
                  science
                </span>
              </div>
              <h3 style={{ color: 'var(--secondary-color)', marginBottom: '15px' }}>科學實證</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                堅持以科學研究為基礎，每一個配方都經過嚴格的實驗驗證，
                確保產品的安全性和有效性。
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span className="material-icons" style={{ fontSize: '50px', color: 'var(--primary-color)' }}>
                  eco
                </span>
              </div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>天然純淨</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                嚴選來自世界各地的優質天然原料，堅持無添加人工色素、香料，
                讓您享受最純淨的營養補充。
              </p>
            </div>
          </div>
        </section>

        {/* 團隊介紹 */}
        <section className="team-introduction" style={{
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          padding: '50px 40px',
          borderRadius: '15px',
          marginBottom: '40px'
        }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '40px', textAlign: 'center' }}>專業團隊</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            <div style={{
              background: 'var(--white)',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(130, 191, 183, 0.1)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'var(--primary-color)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span className="material-icons" style={{ fontSize: '40px', color: 'white' }}>
                  person
                </span>
              </div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Xin 營養師</h3>
              <p style={{ color: 'var(--secondary-color)', marginBottom: '15px', fontWeight: '500' }}>創辦人 & 首席營養師</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em', lineHeight: '1.6' }}>
                擁有 15 年臨床營養經驗，專精於功能性營養學。致力於將複雜的營養科學轉化為簡單實用的健康方案。
              </p>
            </div>
            <div style={{
              background: 'var(--white)',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(130, 191, 183, 0.1)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'var(--secondary-color)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span className="material-icons" style={{ fontSize: '40px', color: 'white' }}>
                  biotech
                </span>
              </div>
              <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>研發團隊</h3>
              <p style={{ color: 'var(--primary-color)', marginBottom: '15px', fontWeight: '500' }}>產品研發部門</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em', lineHeight: '1.6' }}>
                由生物科技、營養學、藥學等領域專家組成，持續研發創新產品，確保每一項產品都符合最高標準。
              </p>
            </div>
            <div style={{
              background: 'var(--white)',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(130, 191, 183, 0.1)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'var(--primary-color)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
              <span className="material-icons" style={{ fontSize: '40px', color: 'white' }}>
                support_agent
              </span>
              </div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>客服團隊</h3>
              <p style={{ color: 'var(--secondary-color)', marginBottom: '15px', fontWeight: '500' }}>專業諮詢服務</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em', lineHeight: '1.6' }}>
                具備營養學背景的專業客服團隊，提供個人化的產品建議和健康諮詢服務，陪伴您的健康之旅。
              </p>
            </div>
          </div>
        </section>

        {/* 未來展望 */}
        <section className="future-vision" style={{
          background: 'var(--white)',
          padding: '50px 40px',
          borderRadius: '15px',
          marginBottom: '40px',
          boxShadow: '0 4px 15px rgba(130, 191, 183, 0.1)'
        }}>
          <h2 style={{ color: 'var(--primary-color)', marginBottom: '30px', textAlign: 'center' }}>未來展望</h2>
          <div style={{
            fontSize: '1.1em',
            lineHeight: '1.8',
            color: 'var(--text-primary)',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <p style={{ marginBottom: '25px' }}>
              展望未來，<strong>Auraway Shop</strong> 將持續秉持「以愛為本，科學實證」的理念，
              不斷創新研發，為消費者提供更多元化的健康解決方案。
            </p>
            <p style={{ marginBottom: '25px' }}>
              我們計劃擴展國際市場，將台灣優質的保健食品推向世界，同時引進更多國際頂級產品，
              讓每一位顧客都能享受到全球最優質的營養保健服務。
            </p>
            <p style={{
              color: 'var(--primary-color)',
              fontWeight: '500',
              fontSize: '1.2em'
            }}>
              因為我們深信：<strong>健康，值得最好的呵護</strong>
            </p>
          </div>
        </section>

        {/* 聯繫我們 */}
        <section className="contact-cta" style={{
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          color: 'white',
          padding: '50px 40px',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '20px', fontSize: '2.2em' }}>加入我們的健康大家庭</h2>
          <p style={{ 
            fontSize: '1.2em', 
            marginBottom: '30px', 
            opacity: '0.9',
            maxWidth: '700px',
            margin: '0 auto 30px'
          }}>
            讓 Auraway Shop 成為您健康路上最值得信賴的夥伴，一起創造更美好、更健康的生活！
          </p>
          <button style={{
            padding: '18px 40px',
            fontSize: '1.2em',
            backgroundColor: 'var(--white)',
            color: 'var(--primary-color)',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s',
            boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)'
          }}>
            開始您的健康之旅
          </button>
        </section>
      </div>
    </div>
  );
}

export default BrandStoryPage; 