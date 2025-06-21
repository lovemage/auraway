import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AiQuestionnaireModal.css';
import { buildApiUrl } from '../config/api';

const questionnaire = [
  {
    key: 'gender',
    text: '您好！我是您的專屬 AI 營養師，很高興為您提供個人化的健康建議。請問您的生理性別是？',
    type: 'radio',
    options: ['男性', '女性']
    // In a real scenario, we might add logic to ask about pregnancy if female.
  },
  {
    key: 'age',
    text: '感謝您的回答！請問您的年齡區間？',
    type: 'radio',
    options: ['18-29', '30-49', '50-65', '65 歲以上']
  },
  {
    key: 'height',
    text: '了解了！為了更精準地評估您的健康狀況，請提供您的身高（公分）。',
    type: 'text',
    inputType: 'number',
    placeholder: '例如：175'
  },
  {
    key: 'weight',
    text: '好的，那您的體重（公斤）是？',
    type: 'text',
    inputType: 'number',
    placeholder: '例如：70'
  },
  {
    key: 'diet',
    text: '您的飲食習慣對健康影響很大。請問您目前的飲食模式是？',
    type: 'radio',
    options: ['均衡飲食', '外食為主（高油、高鹽或加工食品）', '素食/純素（無肉或無動物製品）', '其他']
  },
  {
    key: 'waterIntake',
    text: '水分攝取也很重要！您平均每天喝多少水？',
    type: 'radio',
    options: ['少於 1 公升', '1-2 公升', '2 公升以上']
  },
  {
    key: 'exercise',
    text: '運動能提升整體健康。請問您每週的運動頻率和類型是？',
    type: 'radio',
    options: ['幾乎不運動', '輕度運動（散步、瑜伽，1-2 次/週）', '中度運動（慢跑、健身，3-5 次/週）', '高強度運動（重訓、競技運動，5 次以上/週）']
  },
  {
    key: 'sleep',
    text: '睡眠和壓力對健康影響深遠。請問您的平均睡眠時數？',
    type: 'radio',
    options: ['少於 6 小時', '6-8 小時', '8 小時以上']
  },
  {
    key: 'stress',
    text: '那您的壓力水平感覺如何？',
    type: 'radio',
    options: ['低（輕鬆）', '中（偶爾緊張）', '高（持續壓力）']
  },
  {
    key: 'supplements',
    text: '為了避免重複推薦，您目前是否正在服用保健食品或藥物？若有，請簡單說明。',
    type: 'text',
    placeholder: '例如：維生素D (或填無)'
  },
  {
    key: 'healthGoals',
    text: '最後，請告訴我您希望優先改善的健康目標是什麼？（可多選）',
    type: 'checkbox',
    options: [
      '提升能量與活力', '改善睡眠品質', '促進腸道健康', '體重管理（減重/增肌）', 
      '穩定情緒與壓力', '增強免疫力', '改善皮膚與頭髮', '支持心血管健康',
      '緩解關節與肌肉不適', '保護視力', '提升認知功能（如記憶力）'
    ]
  }
];

const AiQuestionnaireModal = ({ isOpen, onClose, onProductSelect }) => {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const [step, setStep] = useState('questionnaire'); // 'questionnaire', 'results'
  const [analysis, setAnalysis] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [disclaimer, setDisclaimer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const resultsContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen && step === 'questionnaire') {
      const currentQuestion = questionnaire[currentQuestionIndex];
      if (currentQuestion) {
        setShowOptions(false);
        setInputValue(''); // Clear previous text input
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
        }, 30);

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
    setDisclaimer('');
    setError('');
    setInputValue('');
  };

  const handleSubmit = async (finalAnswers) => {
    setIsLoading(true);
    setError('');
    setStep('loading');
    try {
      const url = buildApiUrl('/api/ai-nutritionist/recommend');
      const response = await axios.post(url, finalAnswers);
      setAnalysis(response.data.analysis || []);
      setRecommendations(response.data.products || []);
      setDisclaimer(response.data.disclaimer || '');
      setStep('results');
    } catch (err) {
      setError('抱歉，無法獲取推薦，請稍後再試。');
      console.error('推薦請求失敗:', err);
      setStep('results'); // Show error on results page
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

  const handleTextAnswer = () => {
    const currentQuestion = questionnaire[currentQuestionIndex];
    if (inputValue.trim() === '' && currentQuestion.key !== 'supplements') {
        // supplements can be empty, but not height/weight
        return; 
    }
    handleNextQuestion(currentQuestion.key, inputValue.trim() === '' ? '無' : inputValue);
  };
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const currentGoals = answers.healthGoals || [];
    const newGoals = checked
      ? [...currentGoals, value]
      : currentGoals.filter(goal => goal !== value);
    setAnswers({ ...answers, healthGoals: newGoals });
  };
  
  const handleProductClick = (product) => {
    onClose();
    setTimeout(() => onProductSelect(product), 300);
  };
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    if (!isOpen) setTimeout(handleReset, 300);
  }, [isOpen]);

  useEffect(() => {
    if (step === 'results' && resultsContainerRef.current) {
      resultsContainerRef.current.scrollTop = 0;
    }
  }, [step]);

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
                {currentQuestion.type === 'text' && (
                    <div className="text-input-group">
                        <input 
                            type={currentQuestion.inputType || 'text'}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleTextAnswer()}
                            placeholder={currentQuestion.placeholder}
                            className="text-input-field"
                        />
                        <button onClick={handleTextAnswer} className="submit-button">繼續</button>
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
                      查看分析結果
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {(isLoading || step === 'loading') && 
          <div className="loading-container">
            <p>AI 營養師正在為您分析，請稍候...</p>
            <div className="spinner"></div>
          </div>
        }

        {step === 'results' && !isLoading && (
           <div className="results-container" ref={resultsContainerRef}>
            <h2>AI 營養師的分析與建議</h2>
            
            {error && <p className="error-message">{error}</p>}

            {analysis.length > 0 && (
              <div className="analysis-report">
                <h3>給您的專屬健康筆記 <span role="img" aria-label="memo">📝</span></h3>
                <ul>
                  {analysis.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            )}

            {recommendations.length > 0 && <h4>為您推薦的產品</h4>}
            <div className="recommendations-list">
              {recommendations.length > 0 ? (
                recommendations.map(product => (
                  <div key={product._id} className="product-card-enhanced" onClick={() => handleProductClick(product)}>
                    <img src={product.images[0]} alt={product.name} className="product-image-enhanced" />
                    <div className="product-info-enhanced">
                      <p className="product-name-enhanced">{product.name}</p>
                      <p className="product-benefits"><strong>主要效益：</strong>{product.benefits}</p>
                      <p className="product-evidence"><strong>科學依據：</strong>{product.evidence}</p>
                    </div>
                  </div>
                ))
              ) : (
                !error && <p>根據您的需求與現有補充品，目前沒有額外推薦的產品。請繼續保持！</p>
              )}
            </div>
            {disclaimer && <p className="disclaimer-text">{disclaimer}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiQuestionnaireModal; 