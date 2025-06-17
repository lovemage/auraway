import React from 'react';

const EventPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Event 活動公告</h1>
        <p>最新優惠活動與重要公告</p>
      </div>
      
      <div className="content-container">
        <div className="events-list">
          <div className="event-card active">
            <div className="event-badge">進行中</div>
            <div className="event-content">
              <h3>新會員首購優惠</h3>
              <p className="event-description">新會員註冊即享首購9折優惠，再送精美小禮品一份</p>
              <div className="event-details">
                <span className="event-date">活動期間：2025/01/01 - 2025/02/28</span>
                <span className="event-type">會員優惠</span>
              </div>
            </div>
          </div>
          
          <div className="event-card active">
            <div className="event-badge">進行中</div>
            <div className="event-content">
              <h3>滿額免運活動</h3>
              <p className="event-description">單筆訂單滿NT$2000即享免運費優惠</p>
              <div className="event-details">
                <span className="event-date">活動期間：2025/01/15 - 2025/03/31</span>
                <span className="event-type">購物優惠</span>
              </div>
            </div>
          </div>
          
          <div className="event-card">
            <div className="event-badge">即將開始</div>
            <div className="event-content">
              <h3>春季健康節</h3>
              <p className="event-description">精選保健食品全面8折，為春天做好健康準備</p>
              <div className="event-details">
                <span className="event-date">活動期間：2025/03/01 - 2025/03/31</span>
                <span className="event-type">季節活動</span>
              </div>
            </div>
          </div>
          
          <div className="event-card">
            <div className="event-badge">公告</div>
            <div className="event-content">
              <h3>春節配送時間調整</h3>
              <p className="event-description">春節期間配送時間將有所調整，請提前下單避免延誤</p>
              <div className="event-details">
                <span className="event-date">公告日期：2025/01/10</span>
                <span className="event-type">配送公告</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage; 