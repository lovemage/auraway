import React, { useState, useEffect } from 'react';

const HeaderInfo = () => {
  const [headerInfos, setHeaderInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeaderInfo();
  }, []);

  const fetchHeaderInfo = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/header-info');
      if (response.ok) {
        const data = await response.json();
        setHeaderInfos(data);
        console.log('成功載入導航區塊信息:', data);
      } else {
        console.log('API響應錯誤，使用默認數據');
        useDefaultData();
      }
    } catch (error) {
      console.log('API連接失敗，使用默認導航區塊信息:', error.message);
      useDefaultData();
    } finally {
      setLoading(false);
    }
  };

  const useDefaultData = () => {
    setHeaderInfos([
      {
        type: 'shipping',
        icon: 'local_shipping',
        title: '全館滿千免運',
        content: '24小時內出貨，全台快速配送',
        isActive: true,
        order: 1,
        settings: { freeShippingThreshold: 1000 }
      },
      {
        type: 'discount',
        icon: 'card_giftcard',
        title: '本月全館 85 折優惠',
        content: '限時優惠，數量有限',
        isActive: true,
        order: 2,
        settings: { discountPercentage: 85 }
      },
      {
        type: 'guarantee',
        icon: 'verified',
        title: '正品保證',
        content: '國際認證，品質有保障',
        isActive: true,
        order: 3,
        settings: {}
      }
    ]);
  };

  const formatTitle = (info) => {
    if (info.type === 'shipping' && info.settings?.freeShippingThreshold) {
      return `全館滿${info.settings.freeShippingThreshold}免運`;
    } else if (info.type === 'discount' && info.settings?.discountPercentage) {
      return `本月全館 ${info.settings.discountPercentage} 折優惠`;
    }
    return info.title;
  };

  if (loading) {
    return (
      <div className="header-top">
        <div className="header-info">
          <span className="material-icons">local_shipping</span>
          <span>載入中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="header-top">
      {headerInfos
        .filter(info => info.isActive)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((info, index) => (
          <div key={info.type || index} className="header-info">
            <span className="material-icons">{info.icon}</span>
            <span>{formatTitle(info)}</span>
          </div>
        ))}
    </div>
  );
};

export default HeaderInfo; 