import React, { useState, useEffect } from 'react';
import './BlogStyles.css';

const BlogAdminPage = ({ onNavigateBack }) => {
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' 或 'settings'
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '健康',
    content: '',
    author: '編輯部'
  });
  const [blogSettings, setBlogSettings] = useState({
    blogTitle: 'Aura Post 專欄',
    blogDescription: '健康知識分享，專業營養資訊',
    headerImage: '',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    accentColor: '#007bff'
  });

  const tags = ['靈性', '家庭', '健康', '醫療', '兒童', '幼兒', '料理', '年齡', '睡眠'];

  useEffect(() => {
    const savedArticles = localStorage.getItem('auraPostArticles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
    
    const savedSettings = localStorage.getItem('blogSettings');
    if (savedSettings) {
      setBlogSettings(JSON.parse(savedSettings));
    }
  }, []);

  const saveArticles = (newArticles) => {
    setArticles(newArticles);
    localStorage.setItem('auraPostArticles', JSON.stringify(newArticles));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.content) {
      alert('請填寫所有必填欄位');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    
    if (editingArticle) {
      // 編輯現有文章
      const updatedArticles = articles.map(article => 
        article.id === editingArticle.id 
          ? { ...formData, id: editingArticle.id, date: editingArticle.date }
          : article
      );
      saveArticles(updatedArticles);
    } else {
      // 新增文章
      const newArticle = {
        ...formData,
        id: Date.now(),
        date: currentDate
      };
      saveArticles([...articles, newArticle]);
    }

    // 重置表單
    setFormData({
      title: '',
      description: '',
      tag: '健康',
      content: '',
      author: '編輯部'
    });
    setIsEditing(false);
    setEditingArticle(null);
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      description: article.description,
      tag: article.tag,
      content: article.content,
      author: article.author
    });
    setEditingArticle(article);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('確定要刪除這篇文章嗎？')) {
      const updatedArticles = articles.filter(article => article.id !== id);
      saveArticles(updatedArticles);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      tag: '健康',
      content: '',
      author: '編輯部'
    });
    setIsEditing(false);
    setEditingArticle(null);
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setBlogSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('blogSettings', JSON.stringify(blogSettings));
    alert('Blog 設定已儲存！');
  };

  return (
    <div className="blog-admin-container">
      <div className="admin-header">
        <button className="back-button" onClick={onNavigateBack}>
          ← 返回專欄
        </button>
        <h1>Blog 管理後台</h1>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'articles' ? 'active' : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          文章管理
        </button>
        <button 
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          版面設定
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'articles' && (
          <>
            <div className="admin-form-section">
              <h2>{isEditing ? '編輯文章' : '新增文章'}</h2>
              <form onSubmit={handleSubmit} className="article-form">
                <div className="form-group">
                  <label htmlFor="title">文章標題 *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="請輸入文章標題"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">文章描述 *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="請輸入文章簡短描述"
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="tag">文章標籤 *</label>
                    <select
                      id="tag"
                      name="tag"
                      value={formData.tag}
                      onChange={handleInputChange}
                      required
                    >
                      {tags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="author">作者</label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="作者名稱"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="content">文章內容 * (支援Markdown格式)</label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="請輸入文章內容，支援Markdown格式..."
                    rows="15"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {isEditing ? '更新文章' : '發布文章'}
                  </button>
                  {isEditing && (
                    <button type="button" className="cancel-btn" onClick={handleCancel}>
                      取消編輯
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="admin-list-section">
              <h2>已發布文章 ({articles.length})</h2>
              <div className="articles-list">
                {articles.length === 0 ? (
                  <p className="no-articles">目前沒有文章</p>
                ) : (
                  articles.map(article => (
                    <div key={article.id} className="article-item">
                      <div className="article-info">
                        <h3>{article.title}</h3>
                        <p className="article-meta">
                          <span className="tag">{article.tag}</span>
                          <span className="date">{article.date}</span>
                          <span className="author">作者：{article.author}</span>
                        </p>
                        <p className="article-desc">{article.description}</p>
                      </div>
                      <div className="article-actions">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEdit(article)}
                        >
                          編輯
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(article.id)}
                        >
                          刪除
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <div className="blog-settings-section">
            <h2>Blog 版面設定</h2>
            <form onSubmit={handleSettingsSubmit} className="settings-form">
              <div className="form-group">
                <label htmlFor="blogTitle">Blog 標題</label>
                <input
                  type="text"
                  id="blogTitle"
                  name="blogTitle"
                  value={blogSettings.blogTitle}
                  onChange={handleSettingsChange}
                  placeholder="請輸入 Blog 標題"
                />
              </div>

              <div className="form-group">
                <label htmlFor="blogDescription">Blog 描述</label>
                <textarea
                  id="blogDescription"
                  name="blogDescription"
                  value={blogSettings.blogDescription}
                  onChange={handleSettingsChange}
                  placeholder="請輸入 Blog 描述"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="headerImage">頭部圖片 URL (選填)</label>
                <input
                  type="url"
                  id="headerImage"
                  name="headerImage"
                  value={blogSettings.headerImage}
                  onChange={handleSettingsChange}
                  placeholder="請輸入圖片網址"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="backgroundColor">背景顏色</label>
                  <input
                    type="color"
                    id="backgroundColor"
                    name="backgroundColor"
                    value={blogSettings.backgroundColor}
                    onChange={handleSettingsChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="textColor">文字顏色</label>
                  <input
                    type="color"
                    id="textColor"
                    name="textColor"
                    value={blogSettings.textColor}
                    onChange={handleSettingsChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="accentColor">主題色</label>
                  <input
                    type="color"
                    id="accentColor"
                    name="accentColor"
                    value={blogSettings.accentColor}
                    onChange={handleSettingsChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  儲存設定
                </button>
              </div>
            </form>

            <div className="settings-preview">
              <h3>預覽效果</h3>
              <div 
                className="preview-container"
                style={{
                  backgroundColor: blogSettings.backgroundColor,
                  color: blogSettings.textColor,
                  border: `2px solid ${blogSettings.accentColor}`,
                  padding: '20px',
                  borderRadius: '8px',
                  marginTop: '10px'
                }}
              >
                <h4 style={{ color: blogSettings.accentColor, margin: '0 0 10px 0' }}>
                  {blogSettings.blogTitle}
                </h4>
                <p style={{ margin: '0 0 15px 0' }}>{blogSettings.blogDescription}</p>
                <button 
                  style={{ 
                    backgroundColor: blogSettings.accentColor,
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  範例按鈕
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAdminPage; 