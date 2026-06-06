export const staticArticleSeo = {
  '/post-article': {
    title: '狗狗 MMVD 二尖瓣心臟病：內科治療與外科手術怎麼選？',
    description:
      '狗狗 MMVD 二尖瓣黏液樣變性該選擇內科治療或外科手術？從疾病分期、風險與照護目標了解適合的治療方向。',
    image: '/imgs/optimized/converted_image_2.webp',
    category: '醫療觀點',
    publishedDate: '2026-06-05',
    modifiedDate: '2026-06-05',
    tags: ['狗狗 MMVD', '二尖瓣膜疾病', '犬貓心臟病', '心臟手術']
  },
  '/post-article-2': {
    title: 'Still Beating：不曾停止的心跳',
    description:
      '專心動物醫院累積近三十年的犬貓心臟醫療經驗，持續以臨床、研究與教育守護每一顆心。',
    image: '/imgs/optimized/converted_image.webp',
    category: '真實案例',
    publishedDate: '2026-06-05',
    modifiedDate: '2026-06-05',
    tags: ['犬貓心臟專科', '專心動物醫院', '洪榮偉', '心臟病照護']
  },
  '/post-article-3': {
    title: '飼主大會考答案解析：犬貓心臟病常見警訊',
    description:
      '整理犬貓心臟病常見症狀、呼吸速率、居家照護與就醫時機，幫助飼主掌握重要警訊。',
    image: '/imgs/dejiang.webp',
    category: '飼主教育',
    publishedDate: '2026-06-05',
    modifiedDate: '2026-06-05',
    tags: ['犬貓心臟病', '心臟病警訊', '呼吸速率', '飼主教育']
  },
  '/post-mmvd-stage-c': {
    title: '狗狗 MMVD Stage C 心衰竭照護重點',
    description:
      '狗狗進入 MMVD Stage C 後，穩定用藥、睡眠呼吸速率監測與定期追蹤非常重要。整理飼主需要掌握的照護重點。',
    image: '/imgs/optimized/converted_image_2.webp',
    category: '疾病照護',
    publishedDate: '2026-06-05',
    modifiedDate: '2026-06-05',
    tags: ['MMVD Stage C', '狗狗心衰竭', '睡眠呼吸速率', '犬心臟病']
  },
  '/heart-pressure': {
    title: '毛孩的心臟正在承受壓力嗎？犬貓心臟病警訊',
    description:
      '從心雜音、咳嗽、喘、昏倒等訊號了解犬貓心臟壓力，認識心臟檢查與早期評估的重要性。',
    image: '/imgs/optimized/毛孩的心臟.webp',
    category: '心臟疾病',
    publishedDate: '2026-06-05',
    modifiedDate: '2026-06-05',
    tags: ['犬貓心臟病', '心雜音', '咳嗽喘氣', '心臟檢查']
  },
  '/petvoice-guide': {
    title: 'PetVoice 是什麼？犬貓居家生理監測完整指南',
    description:
      '認識 PetVoice 犬貓居家生理監測，了解心率、安靜時呼吸數、活動與睡眠趨勢如何輔助心臟病與慢性病毛孩照護。',
    image: '/imgs/optimized/petvoice宣傳.webp',
    category: 'PetVoice 指南',
    publishedDate: '2026-06-05',
    modifiedDate: '2026-06-05',
    tags: ['PetVoice', '犬貓居家生理監測', '安靜時呼吸數', '狗狗心臟病', '寵物健康監測'],
    reviewer: {
      name: '洪榮偉 院長',
      title: '獸醫心臟專科醫師',
      path: '/doctor/hung-rong-wei'
    }
  }
}

export const getStaticArticleSeo = (path) => staticArticleSeo[path]
