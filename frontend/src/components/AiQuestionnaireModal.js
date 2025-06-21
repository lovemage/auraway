import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AiQuestionnaireModal.css';
import { buildApiUrl } from '../config/api';

// 深度增強版問卷設計
const questionnaire = [
  {
    key: 'gender',
    text: '您好！我是您的專屬 AI 營養師，很高興為您提供健康建議。請問您的生理性別是？若為女性，是否正在懷孕或哺乳？',
    type: 'radio',
    options: ['男性', '女性（非懷孕/哺乳）', '女性（懷孕）', '女性（哺乳）', '非二元性別/不願透露']
  },
  {
    key: 'age',
    text: '感謝您的回答！請問您的年齡是？',
    type: 'text',
    inputType: 'number',
    placeholder: '請輸入年齡（18-100歲）',
    validation: (value) => {
      const age = parseInt(value);
      return age >= 18 && age <= 100;
    },
    validationMessage: '請輸入18-100歲之間的有效年齡'
  },
  {
    key: 'height',
    text: '為了更精準評估您的健康狀況，請提供您的身高（公分）。',
    type: 'text',
    inputType: 'number',
    placeholder: '例如：175',
    validation: (value) => {
      const height = parseInt(value);
      return height >= 120 && height <= 220;
    },
    validationMessage: '請輸入有效的身高（120-220公分）'
  },
  {
    key: 'weight',
    text: '請問您的體重（公斤）是？您是否為運動員或有較高肌肉量？',
    type: 'combined',
    fields: [
      {
        subKey: 'weight',
        type: 'text',
        inputType: 'number',
        placeholder: '例如：70',
        validation: (value) => {
          const weight = parseInt(value);
          return weight >= 30 && weight <= 200;
        },
        validationMessage: '請輸入有效的體重（30-200公斤）'
      },
      {
        subKey: 'athleteStatus',
        type: 'radio',
        options: ['否', '是（運動員/高肌肉量）']
      }
    ]
  },
  {
    key: 'diet',
    text: '您的飲食習慣對健康影響很大。請問您目前的飲食模式是？',
    type: 'radio',
    options: [
      '均衡飲食（規律三餐，包含蔬果、蛋白質、全穀類）',
      '外食為主（高油、高鹽或加工食品）',
      '素食（無肉）',
      '純素（無動物製品）',
      '低碳水化合物/生酮飲食',
      '其他'
    ],
    followUp: {
      condition: (value) => value === '外食為主（高油、高鹽或加工食品）',
      question: {
        key: 'eatingOutDetails',
        text: '您平均每週外食幾次？主要食用哪些類型食物？',
        type: 'combined',
        fields: [
          {
            subKey: 'frequency',
            type: 'radio',
            options: ['1-3次', '4-7次', '7次以上']
          },
          {
            subKey: 'types',
            type: 'checkbox',
            options: ['中式快餐', '西式速食', '日式料理', '其他']
          }
        ]
      }
    }
  },
  {
    key: 'foodFrequency',
    text: '請問您平均每天攝取以下食物的頻率？',
    type: 'matrix',
    foods: ['蔬菜', '水果', '全穀類（如糙米、燕麥）', '優質蛋白質（如魚、雞肉、豆類）', '乳製品或替代品', '加工食品（如零食、甜點）'],
    options: ['0次', '1-2次', '3次以上']
  },
  {
    key: 'beverages',
    text: '水分攝取影響代謝與健康。您平均每天喝多少水？是否有常喝其他飲料？',
    type: 'combined',
    fields: [
      {
        subKey: 'waterIntake',
        type: 'radio',
        options: ['少於1公升', '1-2公升', '2-3公升', '3公升以上']
      },
      {
        subKey: 'otherBeverages',
        type: 'checkbox',
        options: ['咖啡', '茶', '含糖飲料', '酒精飲料', '無']
      }
    ]
  },
  {
    key: 'exercise',
    text: '運動對健康至關重要。請問您每週的運動頻率、類型和時長？',
    type: 'combined',
    fields: [
      {
        subKey: 'frequency',
        type: 'radio',
        options: ['幾乎不運動', '1-2次', '3-5次', '5次以上']
      },
      {
        subKey: 'types',
        type: 'checkbox',
        options: ['有氧運動（如跑步、游泳）', '力量訓練', '靈活性運動（如瑜伽）', '其他']
      },
      {
        subKey: 'duration',
        type: 'radio',
        options: ['少於30分鐘', '30-60分鐘', '60分鐘以上']
      }
    ]
  },
  {
    key: 'sleep',
    text: '睡眠影響身心健康。請問您的平均睡眠時數和品質如何？',
    type: 'combined',
    fields: [
      {
        subKey: 'hours',
        type: 'radio',
        options: ['少於6小時', '6-8小時', '8小時以上']
      },
      {
        subKey: 'quality',
        type: 'radio',
        options: ['良好（醒來感到精神充沛）', '一般（偶爾疲倦）', '差（常感疲倦或難入睡）']
      },
      {
        subKey: 'issues',
        type: 'checkbox',
        options: ['失眠', '打鼾', '夜間醒來', '無']
      }
    ]
  },
  {
    key: 'stress',
    text: '壓力與情緒影響整體健康。請問您的壓力水平和主要壓力來源？',
    type: 'combined',
    fields: [
      {
        subKey: 'level',
        type: 'radio',
        options: ['低（輕鬆）', '中（偶爾緊張）', '高（持續壓力）']
      },
      {
        subKey: 'sources',
        type: 'checkbox',
        options: ['工作', '家庭', '財務', '健康', '其他']
      },
      {
        subKey: 'coping',
        type: 'checkbox',
        options: ['冥想或瑜伽', '運動', '社交活動', '無']
      },
      {
        subKey: 'mood',
        type: 'radio',
        options: ['穩定', '偶爾焦慮或低落', '經常焦慮或低落']
      }
    ]
  },
  {
    key: 'healthConditions',
    text: '了解您的健康狀況有助於提供更精準建議。請問您是否有以下情況？',
    type: 'combined',
    fields: [
      {
        subKey: 'diagnosed',
        type: 'checkbox',
        options: ['糖尿病', '高血壓', '高膽固醇', '甲狀腺問題', '無']
      },
      {
        subKey: 'medications',
        type: 'text',
        placeholder: '目前服用的藥物（無則填無）'
      },
      {
        subKey: 'familyHistory',
        type: 'checkbox',
        options: ['心臟病', '糖尿病', '癌症', '無']
      }
    ]
  },
  {
    key: 'dietaryRestrictions',
    text: '請問您是否有食物過敏或特殊飲食需求？',
    type: 'checkbox',
    options: ['無', '乳糖不耐', '麩質過敏', '堅果過敏', '其他（請在下方說明）'],
    allowOther: true
  },
  {
    key: 'supplements',
    text: '您目前是否服用保健食品或補充劑？若有，請列出。',
    type: 'text',
    placeholder: '例如：維生素D 1000 IU、魚油（無則填無）'
  },
  {
    key: 'healthGoals',
    text: '請告訴我您希望優先改善的健康目標？（可多選）',
    type: 'checkbox',
    options: [
      '提升能量與活力',
      '改善睡眠品質',
      '促進腸道健康',
      '體重管理（減重/增肌）',
      '穩定情緒與壓力',
      '增強免疫力',
      '改善皮膚與頭髮',
      '支持心血管健康',
      '緩解關節與肌肉不適',
      '保護視力',
      '提升認知功能',
      '其他'
    ],
    allowOther: true
  },
  {
    key: 'additionalConcerns',
    text: '是否有其他健康問題或想特別提到的需求？',
    type: 'text',
    placeholder: '請描述您的其他健康關注或特殊需求（選填）',
    optional: true
  }
];

const AiQuestionnaireModal = ({ isOpen, onClose, onProductSelect }) => {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputValues, setInputValues] = useState({});
  const [validationError, setValidationError] = useState('');
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [followUpAnswers, setFollowUpAnswers] = useState({});
  
  const [step, setStep] = useState('questionnaire');
  const [analysis, setAnalysis] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [disclaimer, setDisclaimer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const resultsContainerRef = useRef(null);

  // 計算問卷進度
  const getProgress = () => {
    const totalQuestions = questionnaire.length;
    const currentProgress = currentQuestionIndex + 1;
    return Math.round((currentProgress / totalQuestions) * 100);
  };

  useEffect(() => {
    if (isOpen && step === 'questionnaire') {
      const currentQuestion = questionnaire[currentQuestionIndex];
      if (currentQuestion) {
        setShowOptions(false);
        setShowFollowUp(false);
        setInputValue('');
        setInputValues({});
        setValidationError('');
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
        }, 25);

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
    setInputValues({});
    setFollowUpAnswers({});
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
      setStep('results');
    } finally {
      setIsLoading(false);
    }
  };

  const validateInput = (question, value) => {
    if (question.validation) {
      return question.validation(value);
    }
    return true;
  };

  const handleNextQuestion = (key, value) => {
    const currentQuestion = questionnaire[currentQuestionIndex];
    
    // 檢查是否有後續問題
    if (currentQuestion.followUp && currentQuestion.followUp.condition(value)) {
      setShowFollowUp(true);
      return;
    }

    const newAnswers = { ...answers, [key]: value };
    
    // 如果有後續問題的答案，也要包含進去
    if (Object.keys(followUpAnswers).length > 0) {
      Object.assign(newAnswers, followUpAnswers);
      setFollowUpAnswers({});
    }
    
    setAnswers(newAnswers);

    if (currentQuestionIndex < questionnaire.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };

  const handleTextAnswer = () => {
    const currentQuestion = questionnaire[currentQuestionIndex];
    
    if (!inputValue.trim() && !currentQuestion.optional) {
      setValidationError('此欄位為必填');
      return;
    }

    if (inputValue.trim() && !validateInput(currentQuestion, inputValue)) {
      setValidationError(currentQuestion.validationMessage || '輸入格式不正確');
      return;
    }

    setValidationError('');
    handleNextQuestion(currentQuestion.key, inputValue.trim() || '無');
  };

  const handleCombinedAnswer = () => {
    const currentQuestion = questionnaire[currentQuestionIndex];
    const combinedAnswer = {};
    
    let hasError = false;
    currentQuestion.fields.forEach(field => {
      const value = inputValues[field.subKey];
      if (!value && !field.optional) {
        hasError = true;
        return;
      }
      if (value && field.validation && !field.validation(value)) {
        hasError = true;
        setValidationError(field.validationMessage || '輸入格式不正確');
        return;
      }
      combinedAnswer[field.subKey] = value || '';
    });

    if (hasError && !validationError) {
      setValidationError('請完成所有必填欄位');
      return;
    }

    if (hasError) return;

    setValidationError('');
    handleNextQuestion(currentQuestion.key, combinedAnswer);
  };

  const handleMatrixAnswer = () => {
    const currentQuestion = questionnaire[currentQuestionIndex];
    const matrixAnswer = {};
    
    currentQuestion.foods.forEach(food => {
      const value = inputValues[food];
      if (!value) {
        setValidationError('請完成所有食物類別的選擇');
        return;
      }
      matrixAnswer[food] = value;
    });

    if (Object.keys(matrixAnswer).length !== currentQuestion.foods.length) {
      return;
    }

    setValidationError('');
    handleNextQuestion(currentQuestion.key, matrixAnswer);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const currentQuestion = questionnaire[currentQuestionIndex];
    const currentValues = answers[currentQuestion.key] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(item => item !== value);
    setAnswers({ ...answers, [currentQuestion.key]: newValues });
  };

  const handleFollowUpSubmit = () => {
    const currentQuestion = questionnaire[currentQuestionIndex];
    const mainAnswer = answers[currentQuestion.key];
    
    setShowFollowUp(false);
    handleNextQuestion(currentQuestion.key, mainAnswer);
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
      <div className="modal-content enhanced">
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        
        {step === 'questionnaire' && (
          <div className="questionnaire-form">
            {/* 進度條 */}
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getProgress()}%` }}
                ></div>
              </div>
              <div className="progress-text">
                問題 {currentQuestionIndex + 1} / {questionnaire.length} ({getProgress()}%)
              </div>
            </div>

            <div className="question-container">
              <div className="question-bubble">
                {displayedText}
                {!showOptions && <span className="typing-indicator">▋</span>}
              </div>
            </div>
            
            {showOptions && !showFollowUp && (
              <div className="options-container">
                {renderQuestionOptions(currentQuestion)}
                {validationError && (
                  <div className="validation-error">{validationError}</div>
                )}
              </div>
            )}

            {showFollowUp && currentQuestion.followUp && (
              <div className="followup-container">
                <div className="followup-question">
                  {currentQuestion.followUp.question.text}
                </div>
                {renderQuestionOptions(currentQuestion.followUp.question, true)}
                <button onClick={handleFollowUpSubmit} className="submit-button">
                  繼續
                </button>
              </div>
            )}
          </div>
        )}

        {(isLoading || step === 'loading') && (
          <div className="loading-container">
            <p>AI 營養師正在為您進行深度分析，請稍候...</p>
            <div className="spinner"></div>
            <p className="loading-detail">正在分析您的健康數據並匹配最適合的產品...</p>
          </div>
        )}

        {step === 'results' && !isLoading && (
          <div className="results-container enhanced" ref={resultsContainerRef}>
            <h2>🔬 AI 營養師深度分析報告</h2>
            
            {error && <p className="error-message">{error}</p>}

            {analysis.length > 0 && (
              <div className="analysis-report enhanced">
                <h3>📋 個人化健康分析</h3>
                <div className="analysis-grid">
                  {analysis.map((item, index) => (
                    <div key={index} className="analysis-card">
                      <div className="analysis-icon">🔍</div>
                      <div className="analysis-content">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {recommendations.length > 0 && (
              <>
                <h4>💊 專業營養師推薦產品</h4>
                <div className="recommendations-grid">
                  {recommendations.map(product => (
                    <div key={product._id} className="product-card-premium" onClick={() => handleProductClick(product)}>
                      <img src={product.images[0]} alt={product.name} className="product-image-premium" />
                      <div className="product-info-premium">
                        <h5 className="product-name-premium">{product.name}</h5>
                        <p className="product-benefits-premium">
                          <strong>主要效益：</strong>{product.benefits}
                        </p>
                        <p className="product-evidence-premium">
                          <strong>科學依據：</strong>{product.evidence}
                        </p>
                        <div className="product-recommendation-badge">
                          AI 營養師推薦
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {disclaimer && (
              <div className="disclaimer-enhanced">
                <h5>⚠️ 重要聲明</h5>
                <p>{disclaimer}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // 渲染問題選項的輔助函數
  function renderQuestionOptions(question, isFollowUp = false) {
    const targetAnswers = isFollowUp ? followUpAnswers : answers;
    const setTargetAnswers = isFollowUp ? setFollowUpAnswers : setAnswers;

    switch (question.type) {
      case 'radio':
        return (
          <div className="radio-group enhanced">
            {question.options.map(option => (
              <label key={option} className="radio-option">
                <input 
                  type="radio" 
                  name={question.key} 
                  value={option}
                  onChange={(e) => !isFollowUp && handleNextQuestion(question.key, e.target.value)} 
                />
                <span className="radio-text">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'text':
        return (
          <div className="text-input-group enhanced">
            <input 
              type={question.inputType || 'text'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTextAnswer()}
              placeholder={question.placeholder}
              className="text-input-field enhanced"
            />
            <button onClick={handleTextAnswer} className="submit-button enhanced">
              繼續 →
            </button>
          </div>
        );

      case 'checkbox':
        return (
          <>
            <div className="checkbox-group enhanced">
              {question.options.map(option => (
                <label key={option} className="checkbox-option">
                  <input 
                    type="checkbox" 
                    value={option} 
                    onChange={handleCheckboxChange}
                    checked={(targetAnswers[question.key] || []).includes(option)} 
                  />
                  <span className="checkbox-text">{option}</span>
                </label>
              ))}
            </div>
            {question.allowOther && (
              <div className="other-input">
                <input 
                  type="text" 
                  placeholder="其他（請說明）"
                  className="other-text-input"
                />
              </div>
            )}
            <button 
              onClick={() => handleNextQuestion(question.key, targetAnswers[question.key] || [])} 
              className="submit-button enhanced"
            >
              繼續 →
            </button>
          </>
        );

      case 'combined':
        return (
          <>
            {question.fields.map(field => (
              <div key={field.subKey} className="combined-field">
                <label className="field-label">{field.label || field.subKey}</label>
                {field.type === 'radio' && (
                  <div className="radio-group mini">
                    {field.options.map(option => (
                      <label key={option} className="radio-option mini">
                        <input 
                          type="radio" 
                          name={field.subKey}
                          value={option}
                          onChange={(e) => setInputValues({...inputValues, [field.subKey]: e.target.value})}
                        />
                        <span className="radio-text">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                {field.type === 'checkbox' && (
                  <div className="checkbox-group mini">
                    {field.options.map(option => (
                      <label key={option} className="checkbox-option mini">
                        <input 
                          type="checkbox" 
                          value={option}
                          onChange={(e) => {
                            const current = inputValues[field.subKey] || [];
                            const newValue = e.target.checked 
                              ? [...current, option]
                              : current.filter(item => item !== option);
                            setInputValues({...inputValues, [field.subKey]: newValue});
                          }}
                        />
                        <span className="checkbox-text">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                {field.type === 'text' && (
                  <input 
                    type={field.inputType || 'text'}
                    placeholder={field.placeholder}
                    onChange={(e) => setInputValues({...inputValues, [field.subKey]: e.target.value})}
                    className="text-input-field mini"
                  />
                )}
              </div>
            ))}
            <button onClick={handleCombinedAnswer} className="submit-button enhanced">
              繼續 →
            </button>
          </>
        );

      case 'matrix':
        return (
          <>
            <div className="matrix-container">
              {question.foods.map(food => (
                <div key={food} className="matrix-row">
                  <div className="matrix-label">{food}</div>
                  <div className="matrix-options">
                    {question.options.map(option => (
                      <label key={`${food}-${option}`} className="matrix-option">
                        <input 
                          type="radio" 
                          name={food}
                          value={option}
                          onChange={(e) => setInputValues({...inputValues, [food]: e.target.value})}
                        />
                        <span className="matrix-text">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleMatrixAnswer} className="submit-button enhanced">
              繼續 →
            </button>
          </>
        );

      default:
        return null;
    }
  }
};

export default AiQuestionnaireModal; 