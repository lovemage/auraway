import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AiQuestionnaireModal.css';
import { buildApiUrl } from '../config/api';

const questionnaire = [
  {
    key: 'gender',
    text: '你好！我是您的專屬AI營養師。為了給您最貼切的建議，我需要先了解一下您的基本情況。請問您的生理性別是？',
    type: 'radio',
    options: ['男性', '女性']
  },
  {
    key: 'age',
    text: '好的，接下來想了解您的年齡大概落在哪個區間呢？',
    type: 'radio',
    options: ['18-29', '30-49', '50歲以上']
  },
  {
    key: 'sleep',
    text: '了解。那您的睡眠情況通常如何呢？平均每晚睡幾個小時？',
    type: 'radio',
    options: ['少於6小時', '6-8小時', '8小時以上']
  },
  {
    key: 'workStyle',
    text: '您的工作型態比較偏向哪一種？這能幫助我了解您白天的活動量。',
    type: 'radio',
    options: ['長時間久坐辦公', '需要體力勞動', '經常外出走動']
  },
  {
    key: 'stress',
    text: '現代人壓力都很大，您感覺自己最近的壓力水平如何？',
    type: 'radio',
    options: ['輕鬆愜意', '有點壓力', '壓力山大']
  },
  {
    key: 'diet',
    text: '在飲食方面，您比較接近哪種情況？',
    type: 'radio',
    options: ['三餐均衡', '經常外食/吃加工食品', '我是素食者']
  },
  {
    key: 'alcohol',
    text: '好的，快完成了！請問您有飲酒的習慣嗎？',
    type: 'radio',
    options: ['從不或偶爾', '每週1-2次', '每週3次以上']
  },
  {
    key: 'healthGoals',
    text: '感謝您提供這麼多資訊！最後，請告訴我您最想改善的健康目標是什麼？(可複選)',
    type: 'checkbox',
    options: [
      '增加活力', '改善睡眠', '腸道健康', '減重減脂', '情緒穩定', 
      '改善過敏', '降低血壓', '眼睛疲勞', '長期坐姿', '心血管問題', 
      '改善皮膚', '容易疲倦', '體重管理', '身體強壯'
    ]
  }
];

const AiQuestionnaireModal = ({ isOpen, onClose, onProductSelect }) => {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  
  const [step, setStep] = useState('questionnaire'); // 'questionnaire', 'results'
  const [analysis, setAnalysis] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Typing animation effect
  useEffect(() => {
    if (isOpen && step === 'questionnaire') {
      const currentQuestion = questionnaire[currentQuestionIndex];
      if (currentQuestion) {
        setShowOptions(false);
        let i = 0;
        setDisplayedText('');
        const typingInterval = setInterval(() => {
          if (i < currentQuestion.text.length) {
            setDisplayedText(prev => prev + currentQuestion.text.charAt(i));
            i++;
          } else {
            clearInterval(typingInterval);
            setShowOptions(true);
          }
        }, 30); // Typing speed

        return () => clearInterval(typingInterval);
      }
    }
  }, [currentQuestionIndex, isOpen, step]);
  
  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setStep('questionnaire');
    setAnalysis([]);
    setRecommendations([]);
    setError('');
  };

  const handleSubmit = async (finalAnswers) => {
    setIsLoading(true);
    setError('');
    try {
      const url = buildApiUrl('/api/ai-nutritionist/recommend');
      const response = await axios.post(url, finalAnswers);
      setAnalysis(response.data.analysis || []);
      setRecommendations(response.data.products || []);
      setStep('results');
    } catch (err) {
      setError('抱歉，無法獲取推薦，請稍後再試。');
      console.error('推薦請求失敗:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = (key, value) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questionnaire.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const currentGoals = answers.healthGoals || [];
    let newGoals;
    if (checked) {
      newGoals = [...currentGoals, value];
    } else {
      newGoals = currentGoals.filter(goal => goal !== value);
    }
    setAnswers({ ...answers, healthGoals: newGoals });
  };
  
  const handleProductClick = (product) => {
    onClose(); // Close the modal first
    setTimeout(() => {
      onProductSelect(product); // Then navigate
    }, 300); // Add a small delay for smoother transition
  };
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Reset state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      // Delay reset to allow closing animation
      setTimeout(() => {
        handleReset();
      }, 300);
    }
  }, [isOpen]);


  if (!isOpen) return null;

  const currentQuestion = questionnaire[currentQuestionIndex];

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        
        {step === 'questionnaire' && currentQuestion && (
          <div className="questionnaire-form">
            <div className="question-container">
              <div className="question-bubble" style={{ minHeight: '50px' }}>
                {displayedText}
                {!showOptions && <span className="typing-indicator"></span>}
              </div>
            </div>
            
            {showOptions && (
              <div className="options-container">
                {currentQuestion.type === 'radio' && (
                  <div className="radio-group">
                    {currentQuestion.options.map(option => (
                      <label key={option}>
                        <input type="radio" name={currentQuestion.key} value={option} 
                               onChange={(e) => handleNextQuestion(currentQuestion.key, e.target.value)} />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
                {currentQuestion.type === 'checkbox' && (
                  <>
                    <div className="checkbox-group">
                      {currentQuestion.options.map(option => (
                        <label key={option}>
                          <input type="checkbox" name={currentQuestion.key} value={option} 
                                 onChange={handleCheckboxChange} 
                                 checked={(answers.healthGoals || []).includes(option)} /> 
                          {option}
                        </label>
                      ))}
                    </div>
                    <button onClick={() => handleNextQuestion('healthGoals', answers.healthGoals || [])} className="submit-button" style={{marginTop: '20px'}}>
                      選好了
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {isLoading && <p>分析中，請稍候...</p>}

        {step === 'results' && !isLoading && (
           <div className="results-container">
            <h2>AI 營養師的分析與建議</h2>
            {error && <p className="error-message">{error}</p>}

            {analysis.length > 0 && (
              <div className="analysis-report">
                <h3>給您的專屬健康筆記</h3>
                <ul>
                  {analysis.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <h4>為您推薦的產品</h4>
            <div className="recommendations-list">
              {recommendations.length > 0 ? (
                recommendations.map(product => (
                  <div 
                    key={product._id} 
                    className="product-card" 
                    onClick={() => handleProductClick(product)}
                    style={{cursor: 'pointer'}}
                  >
                    <img src={product.images[0]} alt={product.name} />
                    <p>{product.name}</p>
                  </div>
                ))
              ) : (
                <p>根據您的需求，目前沒有找到合適的產品。</p>
              )}
            </div>
            <p className="disclaimer-text">本營養師數據庫均為參考值，詳情請洽專業人士。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiQuestionnaireModal; 