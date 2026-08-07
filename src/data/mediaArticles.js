import { careArticles } from './careArticles.js'

const reviewer = {
  name: '專心動物醫院醫療團隊',
  title: '犬貓心臟專科醫療團隊',
  path: '/services/veterinary-cardiology'
}

export const mediaArticles = [
  {
    slug: 'dog-cough-pulmonary-edema-home-monitoring',
    category: '心臟照護',
    label: '媒體',
    date: '2026-07-31',
    updatedDate: '2026-07-31',
    title: '狗狗咳嗽、喘氣，可能是肺積水嗎？心臟病警訊與居家監測',
    description:
      '狗狗咳嗽、喘氣不一定是肺積水。整理犬隻心臟病急症警訊、睡眠呼吸趨勢、心臟檢查與 Digital Health 居家監測的正確定位。',
    image: '/imgs/media/dog-cough-pulmonary-edema.webp',
    imageCaption: '犬貓心臟病的風險可能出現在兩次回診之間，居家觀察有助於保留日常變化線索。',
    imageCredit: '圖片來源：今周學堂／專心動物醫院（經授權使用）',
    reviewer,
    tags: ['狗狗咳嗽', '狗狗喘氣', '狗狗肺積水', 'MMVD', '心衰竭', '安靜時呼吸率', 'PetVoice'],
    intro:
      '狗狗咳嗽、喘氣或睡覺時呼吸變快，可能與心臟、呼吸道、疼痛、環境溫度或其他疾病有關。真正重要的是辨認急症徵象、建立個別基準，並讓居家資料與心臟超音波、胸腔 X 光及臨床評估互相補充。',
    highlights: [
      '咳嗽或喘氣不能單獨用來診斷肺積水，仍需由獸醫師整合症狀與檢查結果。',
      '呼吸費力、無法平躺、黏膜發紫、昏厥或精神快速惡化時，應立即就醫。',
      '安靜時呼吸率與休息時心率的長期趨勢，可補足兩次回診之間的日常資訊。',
      'PetVoice 屬於趨勢監測輔助工具，不能取代心臟超音波、胸腔 X 光或獸醫師診斷。'
    ],
    sections: [
      {
        title: '狗狗咳嗽、喘氣就是肺積水嗎？',
        paragraphs: [
          '不一定。氣管塌陷、支氣管或肺部疾病、疼痛、焦慮、炎熱與心臟疾病，都可能造成咳嗽或喘氣。僅靠聲音或一次呼吸計數，無法確認肺積水。',
          '如果出現腹部明顯用力呼吸、無法躺下休息、牙齦或舌頭發紫、昏厥、咳出粉紅色泡沫或精神快速惡化，應視為急症並立即就醫，不要等待穿戴裝置的下一筆數據。'
        ]
      },
      {
        title: '單次檢查與居家時間軸各自回答什麼？',
        paragraphs: [
          '心臟超音波用來評估瓣膜、心房心室、心肌與血流；胸腔 X 光可協助觀察肺部與心臟輪廓；血液檢查則用來了解腎功能、電解質及共病風險。這些檢查是診斷與治療的重要基礎。',
          '居家紀錄補充的是回診之間的變化，例如熟睡時呼吸、休息時心率、活動力、食慾、睡眠與症狀發生時間。資料需放回個別病史、藥物與檢查結果中判讀。'
        ]
      },
      {
        title: 'RHR、呼吸趨勢與 Digital Health 的研究定位',
        paragraphs: [
          '專心動物醫院研究團隊正探討休息時心率（RHR）、休息時呼吸率與呼吸變異性，是否能成為辨識心臟病惡化風險的數位生物標記。這些假說仍需完整研究、統計分析與同儕檢視。',
          '原始報導也整理院內病歷的初步回顧性分析。群體統計可協助提出研究問題，但不能直接推算個別毛孩的存活時間，也不應被解讀為不同治療方式的療效比較。'
        ]
      },
      {
        title: '飼主可以如何建立可靠的居家紀錄？',
        paragraphs: [
          '在毛孩熟睡、沒有做夢或喘氣且環境不炎熱時記錄呼吸，並持續觀察是否偏離牠自己的平日基準。同步記下咳嗽影片、活動量、食慾、用藥與異常發生時間，能讓回診討論更具體。',
          '若數值持續偏離基準，即使外觀看似穩定，也應聯絡主治獸醫師；不可只依穿戴裝置數值自行增減利尿劑或其他心臟藥物。'
        ]
      }
    ],
    faqs: [
      {
        question: '狗狗一直咳嗽、喘氣就是肺積水嗎？',
        answer: '不一定。心臟病、氣管與肺部疾病、疼痛、焦慮或炎熱都可能造成類似表現，必須由獸醫師結合症狀、聽診與影像檢查判斷。'
      },
      {
        question: '狗狗每分鐘呼吸幾次才算異常？',
        answer: '單一數字不能取代個別評估。應在熟睡且不喘氣時建立平日基準；若呼吸持續高於平常、逐日上升或伴隨呼吸費力，請儘快聯絡主治獸醫師。'
      },
      {
        question: 'PetVoice 可以診斷或預測肺積水嗎？',
        answer: '目前不能。PetVoice 用於蒐集居家生理趨勢，協助醫療團隊發現偏離基準的變化；是否能可靠預測肺積水仍在研究中。'
      },
      {
        question: '居家監測可以取代心臟超音波嗎？',
        answer: '不能。心臟超音波評估結構與血流，居家監測提供時間趨勢，兩者用途不同且需互相補充。'
      }
    ],
    relatedLinks: [
      { title: '犬貓心臟專科服務', path: '/services/veterinary-cardiology' },
      { title: '犬貓心臟超音波', path: '/services/echocardiography' },
      { title: '狗狗 MMVD 完整指南', path: '/topics/mmvd' },
      { title: 'PetVoice 犬貓居家生理監測', path: '/petvoice' }
    ],
    sources: [
      {
        publisher: '今周學堂',
        date: '2026-07-31',
        title: '狗狗咳嗽、喘氣，可能是肺積水嗎？獸醫解析心臟病「黃金救命期」與 Digital Health 居家監測',
        url: 'https://school.businesstoday.com.tw/posts/zhuanxinhospital07312026'
      },
      {
        publisher: 'Journal of Veterinary Internal Medicine',
        date: '2019',
        title: 'ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs',
        url: 'https://onlinelibrary.wiley.com/doi/10.1111/jvim.15488'
      }
    ]
  },
  {
    slug: 'asia-animal-physiological-database',
    category: '研究與趨勢',
    label: '媒體',
    date: '2026-07-17',
    updatedDate: '2026-07-17',
    title: '為什麼下一代動物醫療需要亞洲動物生理資料庫？',
    description:
      '認識亞洲動物生理資料庫、多中心臨床研究、MMVD 長期追蹤，以及 RHR、RR SD 等候選生物標記如何建立可驗證的獸醫證據。',
    image: '/imgs/media/asia-animal-physiological-database.webp',
    imageCaption: '標準化、長期且跨院累積的犬貓生理資料，是驗證新型健康指標的重要研究基礎。',
    imageCredit: '圖片來源：今周學堂／專心動物醫院（經授權使用）',
    reviewer,
    tags: ['亞洲動物生理資料庫', 'MMVD', 'RHR', 'RR SD', '多中心研究', '智慧寵物醫療', '預防醫學'],
    intro:
      '單一病例能回答當下的臨床問題，但疾病預測需要大量病例在一致標準下長期追蹤。亞洲動物生理資料庫的目標，是建立可持續累積、可查核並可用於多中心研究的健康資料基礎。',
    highlights: [
      '長期連續資料能協助研究疾病何時開始改變，而不只記錄確診當下。',
      '多中心研究需採用一致的收案條件、追蹤流程、資料格式與研究終點。',
      'RHR、RR SD 等候選指標必須經前瞻性研究驗證，不能先視為成熟的預測工具。',
      '資料治理、飼主同意、隱私與臨床可解釋性，和資料量同樣重要。'
    ],
    sections: [
      {
        title: '資料庫要回答的是長期變化',
        paragraphs: [
          '犬隻今天發生第一次心源性肺積水，醫療團隊可以診斷並安排治療；但若要知道疾病從何時開始變化、休息時心率是否提前上升，就需要回看更長時間的連續資料。',
          '因此，資料庫不是研究完成後的附屬成果，而是提出與驗證研究假說之前的重要基礎設施。'
        ]
      },
      {
        title: '為什麼需要台日多中心合作？',
        paragraphs: [
          '單一醫院可以累積深入的臨床經驗，多中心合作則有機會確認結果是否適用於不同地區、品種與照護環境。合作的前提，是共同定義病例條件、量測方式及追蹤終點。',
          '專心動物醫院正規劃以犬隻 MMVD 為核心的長期追蹤，並透過台日合作累積更符合亞洲臨床情境的資料。'
        ]
      },
      {
        title: 'RHR 與 RR SD 仍是待驗證指標',
        paragraphs: [
          '休息時心率（RHR）與呼吸標準差（RR SD）可能提供心肺狀態的新觀察角度，但候選生物標記必須先確認量測可靠，再透過足夠樣本與前瞻性研究評估臨床價值。',
          '在研究完成前，這些指標適合用來描述趨勢與提出問題，不應被宣稱為已能獨立診斷或預測疾病。'
        ]
      },
      {
        title: '資料真正的來源是每一個家庭',
        paragraphs: [
          '每筆長期資料都來自飼主對呼吸、心率、活動與疾病過程的持續紀錄。研究團隊需要以清楚的同意流程、資料保護與回饋方式，維持參與者的信任。',
          '當資料能被標準化並轉化為可驗證證據，才有機會支援未來的預防醫學、臨床決策與人工智慧分析。'
        ]
      }
    ],
    faqs: [
      {
        question: '什麼是亞洲動物生理資料庫？',
        answer: '它是透過多家醫院長期蒐集並標準化犬貓健康資料的平台，用於臨床研究、疾病趨勢分析與預防醫學。'
      },
      {
        question: '為什麼不能只使用歐美研究資料？',
        answer: '歐美研究仍非常重要，但亞洲犬貓的品種組成、生活環境與醫療流程可能不同，因此需要在地資料驗證結果是否適用。'
      },
      {
        question: '資料庫能直接預測毛孩何時生病嗎？',
        answer: '目前不能。資料庫提供研究基礎，任何預測模型或生物標記仍須經設計嚴謹的臨床研究與外部驗證。'
      },
      {
        question: 'RHR 與 RR SD 已經是確定有效的指標嗎？',
        answer: '仍屬研究中的候選指標。現階段可用於觀察趨勢，但不能取代獸醫師診斷或既有臨床檢查。'
      }
    ],
    relatedLinks: [
      { title: '台日獸醫心臟論壇與連續監測', path: '/articles/media/taiwan-japan-cardiology-forum-continuous-monitoring' },
      { title: '狗狗 MMVD 完整指南', path: '/topics/mmvd' },
      { title: '犬貓心臟專科服務', path: '/services/veterinary-cardiology' },
      { title: 'PetVoice 居家生理監測', path: '/petvoice' }
    ],
    sources: [
      {
        publisher: '今周學堂',
        date: '2026-07-17',
        title: '一隻狗改變不了醫學，但一萬隻可以：為什麼下一代動物醫療需要亞洲動物生理資料庫？',
        url: 'https://school.businesstoday.com.tw/posts/zhuanxinhospital07172026'
      }
    ]
  },
  {
    slug: 'digital-health-veterinary-care-2026',
    category: '智慧醫療',
    label: '媒體',
    date: '2026-06-30',
    updatedDate: '2026-06-30',
    title: '從「看病」到「看見健康」：Digital Health 與未來動物醫療',
    description:
      '從 2026 南港寵物展出發，理解 Digital Health、犬貓居家健康監測、亞洲動物健康資料與智慧寵物醫療如何補足單次門診。',
    image: '/imgs/media/nangang-pet-expo-digital-health.webp',
    imageCaption: '2026 南港寵物展「毛孩心臟健康科技體驗館」分享 Digital Health 與居家健康監測。',
    imageCredit: '圖片來源：今周學堂／專心動物醫院（經授權使用）',
    reviewer,
    tags: ['Digital Health', '智慧寵物醫療', '居家健康監測', 'PetVoice', '亞洲動物健康資料', '預防醫學'],
    intro:
      'Digital Health 的核心不是增加設備，而是讓醫療看見毛孩沒有走進診間時的長期變化。2026 南港寵物展的「毛孩心臟健康科技體驗館」，將這項概念轉化為飼主可理解的健康教育與研究展示。',
    highlights: [
      '單次門診呈現一個時間點，長期健康資料呈現變化趨勢。',
      '穿戴式裝置與 AI 分析屬於輔助工具，必須建立在可靠量測與臨床研究上。',
      '亞洲犬貓需要在地化資料，才能評估研究與模型是否適用。',
      '智慧醫療不能取代獸醫師，而是讓回診討論有更完整的日常線索。'
    ],
    sections: [
      {
        title: 'Digital Health 改變的是醫療的時間尺度',
        paragraphs: [
          '犬貓一生真正待在醫院的時間很短，傳統檢查多半反映門診當下。Digital Health 透過居家監測與數位工具，補充活動、睡眠、心率與呼吸等長期資訊。',
          '這些資料的價值不在於單一數字，而在於是否持續偏離個別毛孩原本的基準，以及能否和病史、症狀及臨床檢查互相印證。'
        ]
      },
      {
        title: 'PetVoice 把健康觀察帶回家庭',
        paragraphs: [
          'PetVoice 透過穿戴式感測與居家系統整理心率、呼吸、活動與睡眠趨勢，協助飼主保留日常變化，並在回診時提供醫療團隊參考。',
          '裝置資料不能獨立診斷疾病，也不能成為自行調藥的依據。若毛孩呼吸困難、發紫、昏厥或明顯不適，應直接就醫。'
        ]
      },
      {
        title: '亞洲動物健康資料需要臨床治理',
        paragraphs: [
          '亞洲犬貓的品種、生活環境與照護模式和歐美不完全相同。累積在地資料，有助於驗證健康指標及模型是否符合亞洲臨床需求。',
          '真正可用的資料庫還需要一致的量測方法、病例定義、飼主同意、隱私保護與醫療解釋，不能只追求資料數量。'
        ]
      },
      {
        title: '2026 南港寵物展的健康教育',
        paragraphs: [
          '專心動物醫院於 2026 年南港寵物展設置「毛孩心臟健康科技體驗館」，分享台日合作研究、居家健康監測、亞洲動物健康資料與獸醫師衛教。',
          '展覽希望傳達的重點是：醫療不只在疾病發生後介入，也能透過日常觀察、定期檢查與可靠研究，提早辨認需要評估的變化。'
        ]
      }
    ],
    faqs: [
      {
        question: '什麼是 Digital Health？',
        answer: 'Digital Health 是透過穿戴式裝置、健康資料、數位工具與研究，協助醫療從單次檢查延伸到長期健康管理。'
      },
      {
        question: '為什麼犬貓需要居家健康監測？',
        answer: '犬貓不會主動描述不適，居家趨勢能補充門診以外的變化，但仍須由獸醫師結合臨床資料判讀。'
      },
      {
        question: 'AI 可以取代獸醫師嗎？',
        answer: '不能。AI 可協助整理與分析資料，診斷與治療仍需由獸醫師綜合病史、檢查與個別風險決定。'
      },
      {
        question: 'PetVoice 是診斷工具嗎？',
        answer: '不是。PetVoice 用於長期趨勢觀察，不能取代心臟超音波、X 光、血液檢查或獸醫師診斷。'
      }
    ],
    relatedLinks: [
      { title: '亞洲動物生理資料庫', path: '/articles/media/asia-animal-physiological-database' },
      { title: 'PetVoice 犬貓居家生理監測', path: '/petvoice' },
      { title: '犬貓心臟專科服務', path: '/services/veterinary-cardiology' },
      { title: '犬貓心臟超音波', path: '/services/echocardiography' }
    ],
    sources: [
      {
        publisher: '今周學堂',
        date: '2026-06-30',
        title: '從「看病」到「看見健康」：2026 南港寵物展，看見下一個十年的動物醫療',
        url: 'https://school.businesstoday.com.tw/posts/zhuanxinhospital06302026-1'
      }
    ]
  },
  {
    slug: 'taiwan-japan-cardiology-forum-continuous-monitoring',
    category: '媒體',
    label: '媒體',
    date: '2026-06-29',
    updatedDate: '2026-06-30',
    title: '從一次檢查到連續監測：台日獸醫心臟專家齊聚台北',
    description:
      '今周學堂報導專心動物醫院主辦台日心臟專科論壇，聚焦穿戴式裝置、連續生理監測、RHR、RR SD 與亞洲動物生理資料庫。',
    image: '/imgs/media/taiwan-japan-cardiology-forum.webp',
    imageCaption: '台日心臟專科臨床研究與監測技術論壇，聚焦連續生理監測與智慧寵物醫療。',
    imageCredit: '圖片來源：今周學堂／專心動物醫院（經授權使用）',
    reviewer,
    tags: ['台日獸醫合作', '連續生理監測', 'RHR', 'RR SD', 'MMVD', '亞洲動物生理資料庫'],
    intro:
      '2026 年 5 月 31 日，專心動物醫院主辦台日心臟專科臨床研究與監測技術論壇，邀請日本心臟專科獸醫師與 PetVoice 團隊來台，討論犬貓心臟病如何從單次檢查走向長期連續監測。',
    highlights: [
      '論壇核心觀點是讓獸醫醫療從「治療疾病」逐步走向「預測疾病」。',
      '連續生理監測可補足門診單次檢查的限制，觀察毛孩日常生活中的長期變化。',
      'RHR、RR SD、心率、呼吸率與活動趨勢，有機會成為未來疾病風險評估的重要資料。',
      '台日合作與亞洲動物生理資料庫，是建立 AI 健康管理與預防醫學的基礎。'
    ],
    sections: [
      {
        title: '從單次檢查走向連續趨勢',
        paragraphs: [
          '心臟超音波、胸腔 X 光、血液檢查與心電圖仍是重要臨床檢查，但它們多半反映特定時間點的狀態。犬貓心臟疾病通常是在數月到數年之間逐步變化，因此長期趨勢資料能補足門診檢查以外的日常資訊。',
          '今周學堂報導指出，論壇真正討論的不是單一穿戴式裝置，而是下一代動物醫療的照護思維：如何看見疾病發生前的變化。'
        ]
      },
      {
        title: '連續生理監測需要臨床證據',
        paragraphs: [
          '穿戴式監測要進入醫療應用，關鍵不只是科技本身，而是資料是否能代表毛孩真實生活，且是否經過臨床驗證。',
          '專心動物醫院研究團隊以寵物穿戴式裝置搭配 24 小時 Holter 心電圖進行同步驗證，觀察自由活動犬隻的心率趨勢。報導中提到，研究結果顯示兩者具有良好相關性，為長期居家趨勢監測建立初步研究基礎。'
        ]
      },
      {
        title: 'RHR 與 RR SD 為什麼重要？',
        paragraphs: [
          '安靜時心率（Resting Heart Rate，RHR）可能與犬隻心衰竭風險有關。若未來研究證實 RHR 能作為心源性肺水腫前的早期預警指標，獸醫師將有機會更早辨識高風險個體。',
          '呼吸標準差（Respiratory Rate Standard Deviation，RR SD）則關注呼吸是否穩定，而不只看平均呼吸率。這類指標未來可能協助醫療團隊更細緻地評估心肺狀態。'
        ]
      },
      {
        title: '建立亞洲動物生理資料庫',
        paragraphs: [
          '專心動物醫院正與日本夥伴規劃多中心合作，希望累積亞洲犬貓的長期生理資料，包含心率、呼吸率、RR SD、影像學與臨床預後。',
          '這些資料不只服務單一個案，也可能成為未來 AI 健康管理、疾病預測模型與亞洲獸醫臨床研究的重要基礎。'
        ]
      }
    ],
    faqs: [
      {
        question: '這篇媒體報導主要在談什麼？',
        answer: '報導整理專心動物醫院主辦的台日心臟專科論壇，重點包含連續生理監測、智慧寵物醫療、RHR、RR SD、犬貓心臟病早期預測與亞洲動物生理資料庫。'
      },
      {
        question: '連續生理監測可以取代心臟超音波嗎？',
        answer: '不可以。連續生理監測主要用於長期趨勢觀察，仍需搭配問診、理學檢查、心臟超音波、X 光、心電圖與獸醫師判斷。'
      },
      {
        question: '為什麼要建立亞洲動物生理資料庫？',
        answer: '亞洲犬貓的品種、生活型態與醫療環境和歐美不完全相同。建立在地化資料，有助於未來臨床研究、疾病預測與 AI 輔助健康管理。'
      }
    ],
    relatedLinks: [
      { title: '亞洲動物生理資料庫', path: '/articles/media/asia-animal-physiological-database' },
      { title: '狗狗 MMVD 完整指南', path: '/topics/mmvd' },
      { title: '犬貓心臟專科服務', path: '/services/veterinary-cardiology' },
      { title: 'PetVoice 犬貓居家生理監測', path: '/petvoice' }
    ],
    sources: [
      {
        publisher: '今周學堂',
        date: '2026-06-29',
        title: '從一次檢查到連續監測：台日獸醫心臟專家齊聚台北，看見下一代動物醫療的開始',
        url: 'https://school.businesstoday.com.tw/posts/zhuanxinhospital06292026'
      }
    ]
  },
  {
    slug: 'petvoice-home-monitoring',
    category: '媒體報導',
    label: 'PetVoice',
    date: '2026-06-02',
    updatedDate: '2026-06-06',
    title: '從診間延伸到日常：專心動物醫院導入 PetVoice 居家生理監測',
    description:
      '專心動物醫院導入日本 PetVoice 生理監測系統，結合穿戴式裝置、雲端資料與臨床經驗，協助飼主掌握犬貓在休息狀態下的健康趨勢。',
    image: '/imgs/media/petvoice-hero.webp',
    imageCaption: '台日心臟專科臨床研究與監測技術研討會現場合影。',
    imageCredit: '圖片來源：威傳媒（經授權使用）',
    reviewer,
    intro:
      '犬貓心臟疾病的變化不一定發生在診間。對需要長期追蹤的毛孩而言，夜間與休息時的細微變化，可能是飼主最難察覺、卻最值得留意的訊號。',
    highlights: [
      '居家監測讓醫療觀察從單次回診延伸到日常生活。',
      'PetVoice 可持續整理安靜狀態下的心率、呼吸頻率、呼吸變化率與生活趨勢。',
      '監測資料用於照護輔助與趨勢觀察，不能取代獸醫師診斷。'
    ],
    sections: [
      {
        title: '讓不容易被看見的變化留下紀錄',
        paragraphs: [
          '小型犬常見的二尖瓣疾病、貓咪心肌病與慢性病照護，早期可能沒有明顯症狀。飼主往往直到毛孩開始喘氣、持續咳嗽或活動力下降，才察覺狀態已經改變。',
          'PetVoice 透過犬貓配戴的輕量感測器與居家同步裝置，協助整理休息時的生理與生活趨勢，作為回診時的補充參考。'
        ]
      },
      {
        title: '台日專家交流，聚焦心臟病長期照護',
        paragraphs: [
          '專心動物醫院與中華民國獸醫內科醫學會舉辦台日心臟專科臨床研究與監測技術研討會，邀請日本專家分享穿戴式監測在犬貓心臟病長期照護中的應用。',
          '媒體報導指出，連續觀察的價值不只在科技本身，而是協助飼主更早理解變化，並在需要時與獸醫團隊討論後續處置。'
        ]
      },
      {
        title: '居家監測的定位：提早察覺，而不是自行診斷',
        paragraphs: [
          '數據需要搭配毛孩原本的疾病狀態、用藥、食慾、活動力與臨床檢查一起判讀。若出現呼吸困難、昏倒、無法平躺或明顯不適，仍應儘快就醫。',
          '專心動物醫院將持續累積在地使用經驗，希望讓心臟病與慢性病照護更貼近日常生活。'
        ]
      },
      {
        title: '多家媒體共同關注：從單次量測走向長期趨勢',
        paragraphs: [
          '聯合新聞網、經濟日報、風傳媒、鏡週刊等報導進一步指出，毛孩在診間可能因緊張而影響量測結果；相較之下，居家環境中持續累積的心率、安靜時呼吸數、活動與睡眠資料，更適合用來觀察和平常不同的變化。',
          '相關報導也聚焦 PetVoice 與一般寵物穿戴裝置的差異：系統不只整理活動與睡眠，而是更著重心臟病程、休息狀態與呼吸變異的長期追蹤。當趨勢持續偏離毛孩原本的基準時，資料可作為飼主與獸醫師討論後續評估的線索。'
        ]
      }
    ],
    gallery: [
      {
        src: '/imgs/media/petvoice-team.webp',
        alt: '專心動物醫院團隊於台日心臟專科研討會合影',
        caption: '專心動物醫院團隊參與台日心臟專科臨床研究與監測技術研討會。',
        credit: '圖片來源：威傳媒（經授權使用）'
      },
      {
        src: '/imgs/media/petvoice-hung.webp',
        alt: '專心動物醫院洪榮偉院長於研討會分享',
        caption: '洪榮偉院長於研討會分享犬貓心臟照護與居家監測經驗。',
        credit: '圖片來源：威傳媒（經授權使用）'
      },
      {
        src: '/imgs/media/petvoice-fukada.webp',
        alt: 'PetVoice CEO 深田篤於研討會分享',
        caption: 'PetVoice CEO 深田篤於研討會介紹居家生理監測應用。',
        credit: '圖片來源：威傳媒（經授權使用）'
      }
    ],
    relatedLinks: [
      { title: 'PetVoice 犬貓居家生理監測', path: '/petvoice' },
      { title: 'PetVoice 居家生理監測完整指南', path: '/petvoice-guide' },
      { title: '犬貓心臟專科服務', path: '/services/veterinary-cardiology' },
      { title: '犬貓鬱血性心衰竭 CHF', path: '/topics/congestive-heart-failure' }
    ],
    sources: [
      {
        publisher: '聯合新聞網',
        date: '2026-06-03',
        title: '毛孩心臟病難察覺？台日權威推居家監測 揪出熟睡時奪命訊號',
        url: 'https://udn.com/news/story/7470/9543094'
      },
      {
        publisher: '經濟日報｜健康元氣',
        date: '2026-06-03',
        title: '毛孩健康進入數據時代！台日專家齊聚研討會 聚焦心臟疾病智慧監測新趨勢',
        url: 'https://money.udn.com/money/story/11800/9542262'
      },
      {
        publisher: '風傳媒',
        date: '2026-06-03',
        title: '不要等到來不及才送醫！毛孩心臟疾病難察覺 「提前預警」救牠一命',
        url: 'https://www.storm.mg/article/11138056'
      },
      {
        publisher: '中時新聞網｜市場快訊',
        date: '2026-06-03',
        title: '毛孩心臟病難察覺 台日權威攜手推動居家監測新模式',
        url: 'https://act.chinatimes.com/market/content.aspx?AdID=21338'
      },
      {
        publisher: 'Yahoo奇摩新聞',
        date: '2026-06-04',
        title: '毛孩心臟病難察覺 台日權威攜手推動居家監測新模式',
        url: 'https://tw.news.yahoo.com/%E6%AF%9B%E5%AD%A9%E5%BF%83%E8%87%9F%E7%97%85%E9%9B%A3%E5%AF%9F%E8%A6%BA-%E5%8F%B0%E6%97%A5%E6%AC%8A%E5%A8%81%E6%94%9C%E6%89%8B%E6%8E%A8%E5%8B%95%E5%B1%85%E5%AE%B6%E7%9B%A3%E6%B8%AC%E6%96%B0%E6%A8%A1%E5%BC%8F-004000381.html'
      },
      {
        publisher: 'NOW健康',
        date: '2026-06-03',
        title: '毛孩心臟病難察覺 台日權威攜手推動居家監測新模式',
        url: 'https://healthmedia.com.tw/main_detail.php?id=70778'
      },
      {
        publisher: 'LINE TODAY｜鏡週刊',
        date: '2026-06-04',
        title: '毛孩心臟病難察覺 台日權威攜手推動居家監測新模式',
        url: 'https://today.line.me/tw/v3/article/Nvy90RZ'
      },
      {
        publisher: '良醫健康網',
        date: '2026-06-02',
        title: '不要等到來不及才送醫！毛孩心臟疾病難察覺',
        url: 'https://health.businessweekly.com.tw/article/ARTL003018626'
      },
      {
        publisher: '威傳媒',
        date: '2026-06-01',
        title: '專心守護毛孩 專心動物醫院引進日本 PetVoice 生理監測系統',
        url: 'https://www.winnews.com.tw/269457/'
      },
      {
        publisher: '蕃新聞｜威傳媒轉載',
        date: '2026-06-01',
        title: '專心守護毛孩 專心動物醫院引進日本 PetVoice 生理監測系統',
        url: 'https://n.yam.com/Article/20260601131688'
      },
      {
        publisher: 'PChome 新聞｜威傳媒轉載',
        date: '2026-06-01',
        title: '專心守護毛孩 專心動物醫院引進日本 PetVoice 生理監測系統',
        url: 'https://news.pchome.com.tw/society/winnews/20260601/index-78031455239588346002.html'
      },
      {
        publisher: '蕃新聞｜匯流新聞網轉載',
        date: '2026-06-01',
        title: '提前預警救命 台日心臟權威攜手推動毛小孩居家監測新模式',
        url: 'https://n.yam.com/Article/20260601127554'
      }
    ]
  },
  {
    slug: 'hung-rong-wei-thirty-years',
    category: '人物專題',
    label: 'Still Beating',
    date: '2026-05-25',
    updatedDate: '2026-05-25',
    title: '不曾停止的心跳：洪榮偉院長投入動物心臟專科的 30 年',
    description:
      '從赴美深造、建立台灣動物心臟專科，到培育新一代獸醫師，整理洪榮偉院長深耕犬貓心臟醫療三十年的重要歷程。',
    image: '/imgs/media/hung-rong-wei-thirty-years.webp',
    imageCaption: '洪榮偉院長投入動物心臟專科醫療與人才培育。',
    imageCredit: '圖片來源：今周學堂／專心動物醫院（經授權使用）',
    reviewer,
    tags: ['洪榮偉獸醫師', '犬貓心臟專科', '獸醫教育', '心臟超音波', 'CardioSpecial'],
    intro:
      '專心動物醫院創立於 1996 年。洪榮偉院長從一隻生病的狗開始，走上動物心臟醫療之路，也一步步建立台灣小動物心臟專科的臨床與人才基礎。',
    highlights: [
      '1996 年創立專心動物醫院，投入台灣早期的小動物心臟專科醫療。',
      '持續參與國際交流、研究與教學，培育台灣動物心臟醫療人才。',
      '醫院近年擴大心臟、腫瘤與長期照護服務，延續專科醫療理念。'
    ],
    sections: [
      {
        title: '從一個無法被回答的問題開始',
        paragraphs: [
          '洪榮偉院長在求學期間，曾面對陪伴自己長大的狗狗罹患心臟病，卻受限於當時台灣缺乏相關設備與治療資源。這段經歷促使他赴美深造，學習心臟超音波、心律不整與專科診療。',
          '回台後，他在動物專科醫療尚未普及的年代創立專心動物醫院，逐步累積臨床經驗，也讓更多飼主開始理解犬貓心臟疾病需要長期分期與追蹤。'
        ]
      },
      {
        title: '讓專科醫療不只依賴一個人',
        paragraphs: [
          '專心動物醫院持續投入教學、國際研討會與人才培育，希望建立更完整的轉診與專科醫療環境。',
          '近年醫院搬遷至仁愛路新址，並發展心臟、腫瘤與長期照護服務，讓複雜疾病家庭獲得更完整的支持。'
        ]
      },
      {
        title: '從臨床經驗走向可傳承的專科制度',
        paragraphs: [
          '專科醫療除了儀器與技術，也需要標準化的病例討論、影像判讀、研究訓練及跨院交流。當知識能被整理與傳承，照護品質才不會只建立在單一醫師身上。',
          '三十年的累積，也讓專心動物醫院持續把臨床問題帶進研究與教育，並以犬貓生活品質及家庭可執行的照護方式作為決策核心。'
        ]
      }
    ],
    gallery: [
      {
        src: '/imgs/media/founder-02.png',
        alt: '洪榮偉院長接受專訪',
        caption: '洪榮偉院長分享投入犬貓心臟專科醫療的歷程。',
        credit: '圖片來源：今周學堂（經授權使用）'
      },
      {
        src: '/imgs/media/founder-03.png',
        alt: '洪榮偉院長與犬隻合影',
        caption: '從臨床、研究到教學，專科照護的核心始終是毛孩與家庭。',
        credit: '圖片來源：今周學堂（經授權使用）'
      }
    ],
    faqs: [
      {
        question: '洪榮偉獸醫師的主要專業領域是什麼？',
        answer: '主要投入犬貓心臟超音波、心律不整、心臟疾病分期與長期照護，並持續參與獸醫心臟專科教育與國際交流。'
      },
      {
        question: '什麼情況適合安排犬貓心臟專科評估？',
        answer: '若聽到心雜音、出現咳嗽、喘氣、昏厥、活動力下降，或已確診心臟病需要分期與追蹤，可和主治獸醫師討論專科評估。'
      },
      {
        question: '專心動物醫院只有心臟門診嗎？',
        answer: '網站目前介紹犬貓心臟專科、犬貓腫瘤門診及相關長期照護服務，實際看診安排請致電醫院確認。'
      }
    ],
    relatedLinks: [
      { title: '洪榮偉獸醫師專業資歷', path: '/doctor/hung-rong-wei' },
      { title: '犬貓心臟專科服務', path: '/services/veterinary-cardiology' },
      { title: '犬貓心臟超音波', path: '/services/echocardiography' }
    ],
    sources: [
      {
        publisher: '今周學堂',
        date: '2026-05-25',
        title: '不曾停止的心跳：台灣首位國際認證獸醫心臟專科醫師洪榮偉的 30 年執念',
        url: 'https://school.businesstoday.com.tw/posts/zhuanxinhospital05252026'
      }
    ]
  },
  {
    slug: 'monet-home-monitoring',
    category: '真實案例',
    label: 'PetVoice Case',
    date: '2026-05-29',
    updatedDate: '2026-05-29',
    title: '38.8 度背後的異常：14 歲老犬 Monet 的居家監測案例',
    description:
      '平時看似正常的體溫，對個別毛孩可能已是重要變化。從 Monet 的案例理解長期基礎資料與及時就醫判斷的價值。',
    image: '/imgs/media/monet-home-monitoring.webp',
    imageCaption: 'Monet 於專心動物醫院接受照護。',
    imageCredit: '圖片來源：今周學堂／專心動物醫院（經授權使用）',
    reviewer,
    tags: ['高齡犬照護', '居家健康監測', 'PetVoice', '個別健康基準', '急性胰臟炎'],
    intro:
      '單一數值不一定能完整反映狀況。當飼主已經掌握毛孩平時的基礎趨勢，即使數值仍在常見範圍內，也可能更早發現「和平常不一樣」。',
    highlights: [
      'Monet 曾參與居家健康監測研究，累積個別化基礎資料。',
      '飼主察覺體溫、飲水與行為出現異常後，及時尋求醫療協助。',
      '長期監測的價值在於認識毛孩自己的基準，而不是只看單次數字。'
    ],
    sections: [
      {
        title: '看似正常的數字，也可能和平常不同',
        paragraphs: [
          '14 歲約克夏 Monet 曾配戴 PetVoice 參與研究，留下長時間的基礎體溫與生活資料。某天夜間，飼主發現牠燥熱、頻繁喝水、嘔吐且明顯喘氣。',
          'App 顯示的體溫尚未超過一般常見警戒值，但已高於 Monet 平時的基礎範圍。因為飼主知道這個變化不尋常，及時尋求協助並前往急診。'
        ]
      },
      {
        title: '持續監測的價值，是減少猶豫時間',
        paragraphs: [
          '媒體報導指出，Monet 經診斷後需要緊急治療，所幸送醫及時。這個案例提醒飼主，數據不是診斷答案，而是協助辨認變化的線索。',
          '對高齡、慢性病或術後恢復期毛孩而言，了解平時狀態並持續觀察，有助於在異常發生時更快採取行動。'
        ]
      },
      {
        title: '單一數值不能取代症狀與獸醫評估',
        paragraphs: [
          '體溫、呼吸、心率或活動量都可能受到環境與當下狀態影響。真正值得留意的是數值是否持續偏離個別基準，以及是否同時出現嘔吐、喘氣、飲水增加或精神改變。',
          '居家裝置無法確認急性胰臟炎或其他疾病。若高齡毛孩出現快速惡化、反覆嘔吐、腹痛、呼吸費力或無法休息，應儘快就醫。'
        ]
      }
    ],
    gallery: [
      {
        src: '/imgs/media/monet-01.jpg',
        alt: 'PetVoice App 顯示 Monet 體溫趨勢',
        caption: 'PetVoice App 留下 Monet 的體溫趨勢，協助飼主辨認和平時不同的變化。',
        credit: '圖片來源：今周學堂（經授權使用）'
      },
      {
        src: '/imgs/media/monet-02.jpg',
        alt: 'Monet 與飼主前往醫院',
        caption: '飼主察覺 Monet 狀況異常後，及時尋求醫療協助。',
        credit: '圖片來源：今周學堂（經授權使用）'
      }
    ],
    faqs: [
      {
        question: '38.8 度對所有狗狗都代表發燒嗎？',
        answer: '不能只靠單次數值判斷。需考量測量方式、環境、個別基準與同時出現的症狀；若和平常明顯不同，應諮詢獸醫師。'
      },
      {
        question: '居家監測可以診斷急性胰臟炎嗎？',
        answer: '不能。居家資料只能提供變化線索，急性胰臟炎仍需由獸醫師進行理學、血液與影像等評估。'
      },
      {
        question: '高齡犬出現哪些變化應儘快就醫？',
        answer: '反覆嘔吐、腹痛、呼吸費力、無法休息、精神快速惡化或數值持續偏離平日基準時，應儘快聯絡獸醫院。'
      }
    ],
    relatedLinks: [
      { title: 'PetVoice 犬貓居家生理監測', path: '/petvoice' },
      { title: 'PetVoice 居家監測完整指南', path: '/petvoice-guide' },
      { title: '犬貓心臟專科服務', path: '/services/veterinary-cardiology' }
    ],
    sources: [
      {
        publisher: '今周學堂',
        date: '2026-05-29',
        title: '那晚 38.8 度救了牠：一隻 14 歲老犬如何靠居家健康監測逃過急性胰臟炎',
        url: 'https://school.businesstoday.com.tw/posts/zhuanxinhospital05292026'
      }
    ]
  }
]

export const getMediaArticle = (slug) =>
  mediaArticles.find((article) => article.slug === slug) || careArticles.find((article) => article.slug === slug)
