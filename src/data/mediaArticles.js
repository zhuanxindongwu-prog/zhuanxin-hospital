import { careArticles } from './careArticles.js'

export const mediaArticles = [
  ...careArticles,
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
    title: '不曾停止的心跳：洪榮偉院長投入動物心臟專科的 30 年',
    description:
      '從赴美深造、建立台灣動物心臟專科，到培育新一代獸醫師，整理洪榮偉院長深耕犬貓心臟醫療三十年的重要歷程。',
    image: '/imgs/media/founder-01.png',
    imageCaption: '洪榮偉院長投入動物心臟專科醫療與人才培育。',
    imageCredit: '圖片來源：今周學堂（經授權使用）',
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
    title: '38.8 度背後的異常：14 歲老犬 Monet 的居家監測案例',
    description:
      '平時看似正常的體溫，對個別毛孩可能已是重要變化。從 Monet 的案例理解長期基礎資料與及時就醫判斷的價值。',
    image: '/imgs/media/monet-03.png',
    imageCaption: 'Monet 於專心動物醫院接受照護。',
    imageCredit: '圖片來源：今周學堂（經授權使用）',
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

export const getMediaArticle = (slug) => mediaArticles.find((article) => article.slug === slug)
