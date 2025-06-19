import React, { useState, useEffect } from 'react';
import './EventPage.css';

const EventPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, upcoming, notice

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/announcements/public');
      if (!response.ok) {
        throw new Error('無法載入活動公告');
      }
      const data = await response.json();
      setAnnouncements(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (announcement) => {
    const now = new Date();
    const startDate = new Date(announcement.startDate);
    const endDate = announcement.endDate ? new Date(announcement.endDate) : null;

    if (announcement.type === '一般公告' || announcement.type === '系統公告' || announcement.type === '重要通知') {
      return { text: '公告', className: 'notice' };
    }

    if (!endDate) {
      return { text: '長期有效', className: 'active' };
    }

    if (now < startDate) {
      return { text: '即將開始', className: 'upcoming' };
    } else if (now >= startDate && now <= endDate) {
      return { text: '進行中', className: 'active' };
    } else {
      return { text: '已結束', className: 'expired' };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case '緊急': return '#ff4757';
      case '高': return '#ff6b35';
      case '中': return '#ffa726';
      case '低': return '#66bb6a';
      default: return '#64b5f6';
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    if (filter === 'all') return true;
    
    const status = getStatusBadge(announcement);
    if (filter === 'active') return status.className === 'active';
    if (filter === 'upcoming') return status.className === 'upcoming';
    if (filter === 'notice') return announcement.type === '一般公告' || announcement.type === '系統公告' || announcement.type === '重要通知';
    
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="event-page-container">
        <div className="event-page-header">
          <h1>Event 活動公告</h1>
          <p>最新優惠活動與重要公告</p>
        </div>
        <div className="event-loading-container">
          <div className="event-loading-spinner"></div>
          <p>載入活動公告中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="event-page-container">
        <div className="event-page-header">
          <h1>Event 活動公告</h1>
          <p>最新優惠活動與重要公告</p>
        </div>
        <div className="event-error-container">
          <p>載入失敗：{error}</p>
          <button onClick={fetchAnnouncements} className="event-retry-button">重新載入</button>
        </div>
      </div>
    );
  }

  return (
    <div className="event-page-container">
      <div className="event-page-header">
        <h1>Event 活動公告</h1>
        <p>最新優惠活動與重要公告</p>
      </div>
      
      <div className="event-content-container">
        {/* 篩選按鈕 */}
        <div className="event-filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            全部 ({announcements.length})
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''} 
            onClick={() => setFilter('active')}
          >
            進行中 ({announcements.filter(a => getStatusBadge(a).className === 'active').length})
          </button>
          <button 
            className={filter === 'upcoming' ? 'active' : ''} 
            onClick={() => setFilter('upcoming')}
          >
            即將開始 ({announcements.filter(a => getStatusBadge(a).className === 'upcoming').length})
          </button>
          <button 
            className={filter === 'notice' ? 'active' : ''} 
            onClick={() => setFilter('notice')}
          >
            公告 ({announcements.filter(a => a.type === '一般公告' || a.type === '系統公告' || a.type === '重要通知').length})
          </button>
        </div>

        <div className="event-events-list">
          {filteredAnnouncements.length === 0 ? (
            <div className="event-no-events">
              <p>目前沒有{filter === 'all' ? '' : '符合條件的'}活動公告</p>
            </div>
          ) : (
            filteredAnnouncements.map(announcement => {
              const status = getStatusBadge(announcement);
              return (
                <div 
                  key={announcement._id} 
                  className={`event-card ${status.className}`}
                  style={{ borderLeftColor: getPriorityColor(announcement.priority) }}
                >
                  <div className={`event-badge ${status.className}`}>
                    {status.text}
                  </div>
                  <div className="event-content">
                    <h3>{announcement.title}</h3>
                    <div 
                      className="event-description" 
                      dangerouslySetInnerHTML={{ __html: announcement.content }}
                    />
                    <div className="event-details">
                      {announcement.type === '活動公告' || announcement.type === '優惠公告' ? (
                        <span className="event-date">
                          活動期間：{formatDate(announcement.startDate)} - {announcement.endDate ? formatDate(announcement.endDate) : '長期有效'}
                        </span>
                      ) : (
                        <span className="event-date">
                          公告日期：{formatDate(announcement.createdAt)}
                        </span>
                      )}
                      <span className="event-type" style={{ backgroundColor: announcement.backgroundColor, color: announcement.textColor }}>
                        {announcement.type}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage; 