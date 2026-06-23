import { cardiologyGuidePages } from './cardiologyGuidePages.js'

const reviewer = {
  name: '洪榮偉 院長',
  title: '獸醫心臟專科醫師',
  path: '/doctor/hung-rong-wei'
}

const mmvdConsensus = {
  publisher: 'Journal of Veterinary Internal Medicine',
  date: '2019-04-11',
  title: 'ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs',
  url: 'https://onlinelibrary.wiley.com/doi/10.1111/jvim.15488'
}

const epicStudy = {
  publisher: 'Journal of Veterinary Internal Medicine',
  date: '2016-09-28',
  title: 'Effect of Pimobendan in Dogs with Preclinical Myxomatous Mitral Valve Disease and Cardiomegaly',
  url: 'https://onlinelibrary.wiley.com/doi/10.1111/jvim.14586'
}

const felineConsensus = {
  publisher: 'Journal of Veterinary Internal Medicine',
  date: '2020-04-06',
  title: 'ACVIM consensus statement guidelines for the classification, diagnosis, and management of cardiomyopathies in cats',
  url: 'https://onlinelibrary.wiley.com/doi/10.1111/jvim.15745'
}

const oncologyGuidelines = {
  publisher: 'American Animal Hospital Association',
  date: '2016-03-01',
  title: '2016 AAHA Oncology Guidelines for Dogs and Cats',
  url: 'https://www.aaha.org/resources/2016-aaha-oncology-guidelines-for-dogs-and-cats/'
}

export const seoContentPages = {
  ...cardiologyGuidePages,
  '/services/veterinary-cardiology': {
    path: '/services/veterinary-cardiology',
    type: 'service',
    serviceType: '犬貓心臟專科',
    eyebrow: 'Veterinary Cardiology',
    title: '犬貓心臟專科：從早期心雜音到心衰竭長期照護',
    description:
      '專心動物醫院犬貓心臟專科提供心雜音評估、心臟超音波、心律不整診斷、MMVD 與心衰竭長期追蹤。',
    image: '/imgs/all.webp',
    publishedDate: '2026-06-12',
    modifiedDate: '2026-06-12',
    keywords: ['犬貓心臟專科', '台北動物心臟科', '心臟超音波', '心律不整', '犬貓心衰竭'],
    reviewer,
    summary:
      '犬貓心臟疾病可能從沒有症狀的心雜音開始，也可能以喘、昏倒、活動力下降或肺水腫表現。心臟專科評估的目標，是確認疾病類型與分期，建立適合個別病患的追蹤與照護計畫。',
    highlights: ['心雜音與高風險族群評估', '心臟超音波與心律檢查', 'MMVD、心肌病與心衰竭追蹤', '居家呼吸與生活品質監測'],
    sections: [
      {
        title: '哪些情況適合安排心臟專科評估？',
        paragraphs: [
          '若犬貓被聽到心雜音、休息時呼吸變快、容易喘、咳嗽、昏倒、運動耐受下降，或胸腔影像顯示心臟擴大，建議進一步評估。',
          '部分貓咪心肌病可能沒有明顯心雜音；高風險品種、高齡犬貓、麻醉前評估或有家族病史者，也可能需要依臨床狀況安排檢查。'
        ]
      },
      {
        title: '心臟專科不是只有做心臟超音波',
        paragraphs: [
          '完整判讀會結合理學檢查、血壓、胸腔影像、心電圖、心臟超音波、血液檢查與病史。不同檢查回答的問題不同，不能只靠單一數值判斷。',
          '確診後的重點是疾病分期、是否需要治療、追蹤頻率、用藥安全與居家觀察。'
        ]
      },
      {
        title: '長期照護與急性警訊',
        paragraphs: [
          '心臟病犬貓需要穩定用藥、定期回診並觀察安靜時呼吸數、食慾、睡眠與活動力。',
          '若出現呼吸費力、無法平躺、舌色異常、昏倒或明顯虛弱，應儘快就醫。'
        ]
      }
    ],
    faqs: [
      { question: '有心雜音就代表需要吃藥嗎？', answer: '不一定。是否用藥需依疾病類型、分期、心臟大小與臨床症狀綜合判斷。' },
      { question: '沒有咳嗽就沒有心臟病嗎？', answer: '不是。早期心臟病可能沒有明顯症狀，部分貓咪甚至沒有可辨識的心雜音。' },
      { question: '心臟病可以只靠一次檢查判斷嗎？', answer: '多數慢性心臟疾病需要建立基準並定期追蹤，才能判斷變化與治療反應。' }
    ],
    relatedLinks: [
      { label: '檢查服務', title: '犬貓心臟超音波', path: '/services/echocardiography' },
      { label: '疾病指南', title: '狗狗 MMVD 完整指南', path: '/topics/mmvd' },
      { label: '疾病照護', title: '犬貓鬱血性心衰竭 CHF', path: '/topics/congestive-heart-failure' }
    ],
    sources: [mmvdConsensus, felineConsensus]
  },
  '/services/echocardiography': {
    path: '/services/echocardiography',
    type: 'service',
    serviceType: '犬貓心臟超音波',
    eyebrow: 'Echocardiography',
    title: '犬貓心臟超音波：檢查什麼、何時需要安排？',
    description:
      '犬貓心臟超音波可評估瓣膜、心房心室大小、心肌功能、血流與肺高壓風險，協助心臟疾病診斷與追蹤。',
    image: '/imgs/optimized/毛孩的心臟.webp',
    publishedDate: '2026-06-12',
    modifiedDate: '2026-06-12',
    keywords: ['犬貓心臟超音波', '狗狗心臟超音波', '貓心臟超音波', 'LA/Ao', '心臟檢查'],
    reviewer,
    summary:
      '心臟超音波使用即時影像觀察心臟結構與血流，常用於判斷瓣膜疾病、心肌病、先天性心臟病、心臟擴大與肺高壓風險。',
    highlights: ['評估瓣膜與心肌結構', '量測心房心室與血流', '協助疾病分期與追蹤', '需結合症狀與其他檢查判讀'],
    sections: [
      {
        title: '心臟超音波可以回答哪些問題？',
        paragraphs: [
          '檢查可觀察瓣膜是否逆流、心房與心室是否擴大、心肌厚度與收縮功能、血流速度及心包膜狀態。',
          '對 MMVD、貓心肌病、先天性心臟病與疑似肺高壓病患，超音波是重要的診斷與追蹤工具。'
        ]
      },
      {
        title: '哪些情況可能需要安排？',
        paragraphs: [
          '常見情況包括聽診發現心雜音、胸腔 X 光顯示心臟擴大、喘、昏倒、心律不整、麻醉風險評估，或已知心臟病的定期追蹤。',
          '是否需要檢查與追蹤頻率，應由獸醫師依病史、症狀與既有檢查結果判斷。'
        ]
      },
      {
        title: '數值不能脫離臨床情境',
        paragraphs: [
          'LA/Ao、心室尺寸或血流速度等數值，需要考量品種、體型、量測方式與完整影像。單一數值不能自行用來診斷或調整藥物。',
          '完整心臟評估通常還會結合血壓、胸腔影像、心電圖與血液檢查。'
        ]
      }
    ],
    faqs: [
      { question: '心臟超音波需要麻醉嗎？', answer: '多數犬貓可在清醒狀態下完成；是否需要鎮靜需依個別情況由醫療團隊評估。' },
      { question: '心臟超音波和胸腔 X 光有什麼不同？', answer: '超音波主要觀察心臟結構與血流；X 光則可評估整體心臟輪廓、肺部與胸腔狀態，兩者用途不同。' },
      { question: 'LA/Ao 正常就代表沒有心臟病嗎？', answer: '不一定。LA/Ao 只是其中一項量測，仍需結合其他結構、功能、血流與臨床資訊判讀。' }
    ],
    relatedLinks: [
      { label: '專科服務', title: '犬貓心臟專科', path: '/services/veterinary-cardiology' },
      { label: '疾病指南', title: '狗狗 MMVD 完整指南', path: '/topics/mmvd' },
      { label: '醫師介紹', title: '洪榮偉院長專業資歷', path: '/doctor/hung-rong-wei' }
    ],
    sources: [mmvdConsensus, felineConsensus]
  },
  '/services/veterinary-oncology': {
    path: '/services/veterinary-oncology',
    type: 'service',
    serviceType: '犬貓腫瘤門診',
    eyebrow: 'Veterinary Oncology',
    title: '犬貓腫瘤門診：從腫塊評估、分期到生活品質照護',
    description:
      '專心動物醫院犬貓腫瘤門診協助腫塊評估、腫瘤分期、治療規劃、追蹤與高齡犬貓生活品質照護。',
    image: '/imgs/DRLEE.webp',
    publishedDate: '2026-06-12',
    modifiedDate: '2026-06-12',
    keywords: ['犬貓腫瘤門診', '台北動物腫瘤科', '犬貓腫塊評估', '腫瘤分期', '高齡犬貓照護'],
    reviewer: {
      name: '李繼忠 醫師',
      title: '獸醫腫瘤內科醫師',
      path: '/doctor/lee-ji-zhong'
    },
    summary:
      '犬貓出現新生腫塊、體重下降、食慾改變或不明原因不適時，腫瘤門診可協助確認問題、評估疾病範圍並討論符合病患與家庭需求的照護方向。',
    highlights: ['腫塊與症狀評估', '疾病分期與治療規劃', '治療反應與副作用追蹤', '高齡病患生活品質照護'],
    sections: [
      {
        title: '發現腫塊後，第一步不是直接猜測良性或惡性',
        paragraphs: [
          '腫塊的外觀與觸感不足以確認性質。醫療團隊會依位置、大小、成長速度與病患狀況，討論細針採樣、影像或其他檢查。',
          '越早建立診斷與基準資料，越能清楚討論後續選項。'
        ]
      },
      {
        title: '腫瘤分期協助理解疾病範圍',
        paragraphs: [
          '分期可能包含血液檢查、胸腹腔影像、淋巴結評估與病理結果。不同腫瘤需要的分期方式不同。',
          '分期的目的不是只給出數字，而是協助評估治療選擇、預後與追蹤計畫。'
        ]
      },
      {
        title: '治療計畫應同時考量生活品質',
        paragraphs: [
          '手術、化療、放射治療或緩和照護各有適用情況。治療決策需考量腫瘤類型、病患整體健康、家庭目標與可接受的照護負擔。',
          '高齡並不等於不能治療，但需要更完整評估心臟、腎臟與其他慢性疾病。'
        ]
      }
    ],
    faqs: [
      { question: '摸到腫塊需要立刻就醫嗎？', answer: '建議儘早安排評估，尤其是快速變大、破皮、疼痛、固定不動或持續存在的腫塊。' },
      { question: '高齡犬貓適合接受腫瘤治療嗎？', answer: '年齡不是唯一判斷標準，需要評估整體健康、腫瘤類型、治療目標與生活品質。' },
      { question: '化療一定會像人一樣產生嚴重副作用嗎？', answer: '犬貓腫瘤治療通常重視生活品質，但仍可能有副作用，需由醫療團隊說明並持續追蹤。' }
    ],
    relatedLinks: [
      { label: '醫師介紹', title: '李繼忠醫師｜獸醫腫瘤內科', path: '/doctor/lee-ji-zhong' },
      { label: '在地服務', title: '台北中正區動物醫院', path: '/taipei-zhongzheng-veterinary-hospital' },
      { label: '內容中心', title: '專心快訊', path: '/articles' }
    ],
    sources: [oncologyGuidelines]
  },
  '/topics/mmvd': {
    path: '/topics/mmvd',
    type: 'topic',
    eyebrow: 'Topic Hub · MMVD',
    title: '狗狗 MMVD 二尖瓣黏液樣變性完整指南',
    description:
      '了解狗狗 MMVD 的心雜音、B1/B2/C/D 分期、心臟超音波、治療、心衰竭警訊與居家照護。',
    image: '/imgs/optimized/converted_image_2.webp',
    category: '疾病主題中心',
    publishedDate: '2026-06-12',
    modifiedDate: '2026-06-12',
    keywords: ['狗狗 MMVD', '二尖瓣黏液樣變性', 'MMVD 分期', '狗狗心臟病', '心衰竭'],
    tags: ['MMVD', '二尖瓣膜疾病', '犬心臟病', '心臟超音波'],
    reviewer,
    summary:
      'MMVD 是中老年小型犬常見的退化性心臟疾病。從只有心雜音的早期，到心臟擴大與鬱血性心衰竭，分期會影響治療與追蹤方式。',
    highlights: ['B1：尚未明顯心臟擴大', 'B2：心臟擴大但未心衰竭', 'C：現在或曾經發生心衰竭', 'D：難治型心衰竭'],
    sections: [
      {
        title: 'MMVD 是什麼？',
        paragraphs: [
          'MMVD 會使二尖瓣逐漸退化、關閉不完全，造成血液逆流回左心房。疾病可能長期只有心雜音，也可能逐漸造成心房心室擴大。',
          '不是每隻有心雜音的狗都會立刻心衰竭，因此正確分期與追蹤比只看單次症狀更重要。'
        ]
      },
      {
        title: '分期決定追蹤與治療方向',
        paragraphs: [
          'ACVIM 分期將高風險但尚未患病的犬隻列為 A 期；B1 與 B2 都尚未發生心衰竭，但 B2 已有心臟擴大；C 期代表現在或曾經發生心衰竭；D 期則是難治型心衰竭。',
          '分期通常需要結合聽診、胸腔影像與心臟超音波，不能只依咳嗽或心雜音程度判斷。'
        ]
      },
      {
        title: '飼主在家可以觀察什麼？',
        paragraphs: [
          '應觀察安靜時呼吸數、呼吸力道、咳嗽、昏倒、食慾、睡眠與活動力。已進入心衰竭階段的病患尤其需要穩定用藥與定期追蹤。',
          '若出現明顯呼吸費力、無法平躺、舌色異常或昏倒，應儘快就醫。'
        ]
      }
    ],
    faqs: [
      { question: 'MMVD B1 和 B2 差在哪裡？', answer: '兩者都尚未發生心衰竭；B2 已有符合分期標準的心臟擴大，追蹤與治療策略因此不同。' },
      { question: '狗狗 MMVD 一定會變成心衰竭嗎？', answer: '不一定。疾病進展速度差異很大，定期分期與追蹤有助於掌握變化。' },
      { question: 'MMVD 可以只靠心雜音分級判斷嗎？', answer: '不可以。心雜音是重要線索，但分期仍需結合影像與完整臨床評估。' }
    ],
    relatedLinks: [
      { label: '治療比較', title: 'MMVD 內科治療與外科手術怎麼選？', path: '/articles/dog-mmvd-treatment-options' },
      { label: 'C 期照護', title: 'MMVD Stage C 心衰竭照護重點', path: '/articles/dog-mmvd-stage-c-care' },
      { label: '檢查服務', title: '犬貓心臟超音波', path: '/services/echocardiography' }
    ],
    sources: [mmvdConsensus, epicStudy]
  },
  '/topics/congestive-heart-failure': {
    path: '/topics/congestive-heart-failure',
    type: 'topic',
    eyebrow: 'Topic Hub · CHF',
    title: '犬貓鬱血性心衰竭 CHF：警訊、治療與居家照護',
    description:
      '犬貓鬱血性心衰竭可能出現呼吸急促、肺水腫、胸水、無法平躺或昏倒。了解急性警訊與長期照護重點。',
    image: '/imgs/optimized/毛孩的心臟.webp',
    category: '疾病主題中心',
    publishedDate: '2026-06-12',
    modifiedDate: '2026-06-12',
    keywords: ['犬貓心衰竭', 'CHF', '狗狗肺水腫', '安靜時呼吸數', '心臟病急診'],
    tags: ['CHF', '鬱血性心衰竭', '肺水腫', '居家呼吸監測'],
    reviewer,
    summary:
      '鬱血性心衰竭代表心臟疾病已造成液體異常累積，犬隻常見肺水腫，貓咪也可能出現胸水。這是需要醫療評估與長期管理的狀態。',
    highlights: ['呼吸變快或費力是重要警訊', '急性期目標是穩定呼吸', '藥物需依醫囑使用與追蹤', '居家呼吸與生活品質需持續觀察'],
    sections: [
      {
        title: '心衰竭不等於心臟停止',
        paragraphs: [
          '心衰竭是指心臟疾病已造成身體無法維持正常循環或出現液體累積。常見表現包括肺水腫、胸水、呼吸困難與運動耐受下降。',
          '急性發作需要快速評估；穩定後仍需持續用藥、監測與回診。'
        ]
      },
      {
        title: '需要儘快就醫的呼吸警訊',
        paragraphs: [
          '休息時呼吸持續變快、胸腹起伏明顯、伸長脖子呼吸、無法平躺、舌色異常或昏倒，都可能代表嚴重狀況。',
          '飼主不應自行增加或停止藥物，應依醫療團隊提供的個別緊急計畫處理。'
        ]
      },
      {
        title: '穩定後的長期照護',
        paragraphs: [
          '長期照護包含規律用藥、安靜時呼吸數、食慾、體重、飲水、活動與睡眠觀察，並追蹤腎功能與電解質。',
          '治療目標不只是延長時間，也包括讓病患能舒服呼吸、進食、睡眠與維持家庭互動。'
        ]
      }
    ],
    faqs: [
      { question: '心衰竭穩定後可以停藥嗎？', answer: '通常不建議自行停藥。症狀穩定可能代表治療有效，任何調整都應由獸醫師評估。' },
      { question: '咳嗽一定是心衰竭嗎？', answer: '不一定。咳嗽可能有呼吸道等其他原因，需要結合檢查判斷。' },
      { question: '在家最重要的監測是什麼？', answer: '安靜或睡眠時呼吸、呼吸力道、食慾、活動力與能否平躺都是重要觀察項目。' }
    ],
    relatedLinks: [
      { label: 'C 期照護', title: 'MMVD Stage C 心衰竭照護重點', path: '/articles/dog-mmvd-stage-c-care' },
      { label: '居家監測', title: 'PetVoice 犬貓居家生理監測指南', path: '/petvoice-guide' },
      { label: '專科服務', title: '犬貓心臟專科', path: '/services/veterinary-cardiology' }
    ],
    sources: [mmvdConsensus, felineConsensus]
  }
}

export const getSeoContentPage = (path) => seoContentPages[path]
