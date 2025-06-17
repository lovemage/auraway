import React, { useState, useEffect } from 'react';

const BlogAdminPage = ({ onNavigateBack }) => {
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '健康',
    content: '',
    author: '編輯部'
  });

  const tags = ['靈性', '家庭', '健康', '醫療', '兒童', '幼兒', '料理', '年齡', '睡眠'];

  useEffect(() => {
    const savedArticles = localStorage.getItem('auraPostArticles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
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

  return (
    <div className="blog-admin-container">
      <div className="admin-header">
        <button className="back-button" onClick={onNavigateBack}>
          ← 返回專欄
        </button>
        <h1>文章管理後台</h1>
      </div>

      <div className="admin-content">
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
      </div>
    </div>
  );
};

export default BlogAdminPage; 