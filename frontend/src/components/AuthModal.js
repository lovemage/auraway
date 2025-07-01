import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import './AuthModal.css';

function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(true); // true for register, false for login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // 重置表單狀態當模態框關閉時
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError(null);
      setLoading(false);
      setIsRegisterMode(true); // 預設為註冊模式
    }
  }, [isOpen]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let userCredential;
      if (isRegisterMode) {
        if (password !== confirmPassword) {
          setError('密碼與確認密碼不符。');
          setLoading(false);
          return;
        }
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;
      console.log('Firebase 認證成功:', user);

      // 將 Firebase UID 和 email 發送到後端儲存到 MongoDB
      const idToken = await user.getIdToken();
      const response = await fetch('/api/register-user-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ firebaseUid: user.uid, email: user.email })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '後端儲存使用者資料失敗');
      }

      const data = await response.json();
      console.log('後端儲存使用者資料結果:', data);

      if (onAuthSuccess) {
        onAuthSuccess(user); // 通知父組件認證成功
      }
      onClose(); // 關閉模態框
    } catch (err) {
      console.error('認證失敗:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log('Google 登入成功:', user);

      // 將 Firebase UID 和 email 發送到後端儲存到 MongoDB
      const idToken = await user.getIdToken();
      const response = await fetch('/api/register-user-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ firebaseUid: user.uid, email: user.email })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '後端儲存使用者資料失敗');
      }

      const data = await response.json();
      console.log('後端儲存使用者資料結果:', data);

      if (onAuthSuccess) {
        onAuthSuccess(user); // 通知父組件認證成功
      }
      onClose(); // 關閉模態框
    } catch (err) {
      console.error('Google 登入失敗:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-content">
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <h2>{isRegisterMode ? '會員註冊' : '會員登入'}</h2>
        <p className="welcome-message">
          歡迎來到 Auraway！新加入會員可享優惠 10%！
        </p>

        <form onSubmit={handleAuth} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">電子郵件</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密碼</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          {isRegisterMode && (
            <div className="form-group">
              <label htmlFor="confirmPassword">確認密碼</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (isRegisterMode ? '註冊中...' : '登入中...') : (isRegisterMode ? '立即註冊' : '立即登入')}
          </button>
        </form>

        <div className="social-auth-section">
          <p>或使用</p>
          <button 
            type="button" 
            className="btn btn-secondary google-btn" 
            onClick={handleGoogleSignIn} 
            disabled={loading}
          >
            <img src="/images/asset/google-icon.svg" alt="Google" className="google-icon" />
            Google {isRegisterMode ? '註冊' : '登入'}
          </button>
        </div>

        <p className="toggle-mode-prompt">
          {isRegisterMode ? '已經有帳號了？' : '還沒有帳號？'}
          <span className="link-text" onClick={() => setIsRegisterMode(!isRegisterMode)}>
            {isRegisterMode ? '立即登入' : '立即註冊'}
          </span>
        </p>

        <p className="later-option">
          <span className="link-text" onClick={onClose}>稍後再說</span>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
