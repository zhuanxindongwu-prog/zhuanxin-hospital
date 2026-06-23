const reviewer = {
  name: '洪榮偉 院長',
  title: '獸醫心臟專科醫師',
  path: '/doctor/hung-rong-wei'
}

const sources = {
  diagnostics: {
    publisher: 'Merck Veterinary Manual',
    date: '2023-01-01',
    title: 'Diagnosis of Heart Disease in Animals',
    url: 'https://www.merckvetmanual.com/circulatory-system/diagnosis-of-heart-disease/diagnosis-of-heart-disease-in-animals'
  },
  feline: {
    publisher: 'Journal of Veterinary Internal Medicine',
    date: '2020-04-06',
    title: 'ACVIM consensus statement guidelines for the classification, diagnosis, and management of cardiomyopathies in cats',
    url: 'https://onlinelibrary.wiley.com/doi/10.1111/jvim.15745'
  },
  mmvd: {
    publisher: 'Journal of Veterinary Internal Medicine',
    date: '2019-04-11',
    title: 'ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs',
    url: 'https://onlinelibrary.wiley.com/doi/10.1111/jvim.15488'
  },
  pulmonaryHypertension: {
    publisher: 'Journal of Veterinary Internal Medicine',
    date: '2020-04-06',
    title: 'ACVIM consensus statement guidelines for the diagnosis, classification, treatment, and monitoring of pulmonary hypertension in dogs',
    url: 'https://onlinelibrary.wiley.com/doi/10.1111/jvim.15725'
  },
  heartworm: {
    publisher: 'American Heartworm Society',
    date: '2026-01-01',
    title: 'Canine Heartworm Guidelines',
    url: 'https://heartwormsociety.org/guidelines'
  },
  congenital: {
    publisher: 'WSAVA Congress Proceedings',
    date: '2016-01-01',
    title: 'PDA, Aortic and Pulmonic Stenosis: Update on Common Congenital Heart Diseases',
    url: 'https://www.vin.com/doc/?id=8249882'
  }
}

const baseRelatedLinks = [
  { label: '檢查服務', title: '犬貓心臟超音波', path: '/services/echocardiography' },
  { label: '專科服務', title: '犬貓心臟專科', path: '/services/veterinary-cardiology' },
  { label: '疾病指南', title: '狗狗 MMVD 完整指南', path: '/topics/mmvd' }
]

const makeGuide = (slug, page) => ({
  path: `/guides/${slug}`,
  type: 'article',
  publishedDate: '2026-06-22',
  modifiedDate: '2026-06-22',
  reviewer,
  relatedLinks: baseRelatedLinks,
  ...page,
  tags: page.tags || page.keywords || []
})

const guidePageEntries = [
  // ['dog-cough', makeGuide('dog-cough', {
  //   eyebrow: 'Symptom Guide',
  //   category: '常見警訊',
  //   title: '狗狗咳嗽一定是心臟病嗎？先分辨就醫警訊與常見原因',
  //   description: '狗狗咳嗽可能與心臟、呼吸道、氣管或感染有關。整理飼主可以記錄的資訊，以及什麼情況應儘快安排檢查。',
  //   image: '/imgs/guides/cardiac-exam.jpg',
  //   keywords: ['狗狗咳嗽', '狗狗心臟病咳嗽', '狗狗氣管咳嗽', '犬心臟病症狀'],
  //   summary: '咳嗽不是單一疾病的專屬症狀。判讀時需要一起看發作時間、睡眠呼吸、運動耐受、聽診和胸腔影像，才能找出較可能的原因。',
  //   highlights: ['記錄咳嗽時段與誘因', '觀察安靜時呼吸是否變快', '不要自行以咳嗽判定心臟病', '呼吸費力時應儘快就醫'],
  //   sections: [
  //     { title: '咳嗽的原因不只一種', paragraphs: ['狗狗咳嗽可能來自氣管、支氣管、肺部、心臟相關肺水腫或感染。小型犬常見氣管問題；心臟病病患則需要結合病史、聽診與影像確認是否已影響肺部。', '咳嗽的聲音、是否在夜間或興奮後出現，都能成為醫師判讀的線索，但不能單獨當成診斷。'] },
  //     { title: '飼主可以先記錄什麼？', paragraphs: ['記錄咳嗽發作時的影片、頻率、持續時間、是否伴隨喘、食慾下降或活動力改變。若家中已有心臟病病患，也應固定觀察安靜或睡眠時的呼吸速率。', '把這些資訊帶到門診，可幫助醫療團隊選擇是否需要胸腔 X 光、心臟超音波、血壓或其他檢查。'] },
  //     { title: '哪些情況需要加快就醫？', paragraphs: ['呼吸明顯費力、張口呼吸、無法安穩躺下、舌色異常、昏倒或精神快速惡化，都不適合等待下次例行門診。', '即使咳嗽後自行緩解，若症狀反覆或頻率增加，也建議及早安排評估。'] }
  //   ],
  //   faqs: [
  //     { question: '心臟病造成的咳嗽會是什麼聲音？', answer: '單靠聲音無法可靠區分。是否與心臟病相關，需要結合呼吸狀況、聽診、胸腔影像與心臟評估。' },
  //     { question: '狗狗咳嗽可以先吃人用止咳藥嗎？', answer: '不建議自行給藥。不同原因需要不同處理，部分人用藥也可能對犬隻造成風險。' }
  //   ],
  //   sources: [sources.diagnostics, sources.mmvd]
  // })],
  // ['breathing-difficulty', makeGuide('breathing-difficulty', {
  //   eyebrow: 'Symptom Guide',
  //   category: '常見警訊',
  //   title: '犬貓呼吸變快、喘或呼吸困難：何時需要立即就醫？',
  //   description: '分辨正常喘氣、呼吸速率變快與呼吸困難，掌握犬貓出現呼吸異常時的安全處置與就醫時機。',
  //   image: '/imgs/guides/breathing-monitor.jpg',
  //   keywords: ['狗狗呼吸急促', '貓咪呼吸困難', '犬貓安靜呼吸速率', '心衰竭症狀'],
  //   summary: '呼吸異常可能與心臟、肺部、氣道、疼痛、發燒或壓力有關。重要的是辨識是否正在費力呼吸，而不是只看是否「喘」。',
  //   highlights: ['安靜時觀察比運動後更有意義', '張口呼吸或腹部用力是警訊', '避免強迫活動與過度搬動', '帶著呼吸影片就醫'],
  //   sections: [
  //     { title: '喘、呼吸變快與呼吸困難不同', paragraphs: ['運動、炎熱或緊張後的短暫喘氣不一定是疾病；但在安靜休息時持續呼吸變快、胸腹起伏明顯或姿勢改變，則需要提高警覺。', '貓咪張口呼吸尤其不應視為一般現象，應儘快由醫療團隊評估。'] },
  //     { title: '在家怎麼安全觀察？', paragraphs: ['在毛孩熟睡或完全安靜時，觀察胸腹起伏並記錄每分鐘呼吸次數。固定在相近時段與情境紀錄，才能比較趨勢。', '若毛孩不願躺下、伸長脖子呼吸、腹部明顯用力或牙齦顏色異常，應停止量測、保持環境安靜並儘快就醫。'] },
  //     { title: '門診可能安排哪些檢查？', paragraphs: ['醫師會依年齡、病史與呼吸型態考量理學檢查、血氧、胸腔影像、心臟超音波、心電圖或血液檢查。', '檢查目標是找出造成呼吸問題的原因並判斷緊急程度，而不是只以單一數值決定治療。'] }
  //   ],
  //   faqs: [
  //     { question: '安靜時呼吸數多少才需要注意？', answer: '重點是個體平時基準與持續上升的趨勢。若合併費力呼吸、精神變差或既有心臟病，請直接聯繫醫院。' },
  //     { question: '呼吸困難時可以自行餵藥嗎？', answer: '除非醫師已提供明確急性處置計畫，否則不建議自行加藥或強迫餵食。' }
  //   ],
  //   sources: [sources.diagnostics, sources.feline]
  // })],
  // ['pet-syncope', makeGuide('pet-syncope', {
  //   eyebrow: 'Emergency Guide',
  //   category: '常見警訊',
  //   title: '毛孩突然昏倒怎麼辦？犬貓昏厥的第一時間處置與檢查方向',
  //   description: '犬貓昏倒可能與心律不整、心臟輸出下降、神經問題或其他疾病相關。整理安全處置與需要記錄的資訊。',
  //   image: '/imgs/guides/syncope-care.jpg',
  //   keywords: ['狗狗昏倒', '犬貓昏厥', '狗狗心律不整', '狗狗突然倒下'],
  //   summary: '昏厥通常是短暫失去意識與姿勢控制，但在家中不容易和癲癇、虛弱或跌倒完全區分。任何首次或反覆發作都值得安排評估。',
  //   highlights: ['保持環境安全與安靜', '不要把手伸入口中', '錄影與記錄持續時間', '反覆、呼吸異常或未恢復時需急診'],
  //   sections: [
  //     { title: '先保護毛孩，不要強迫叫醒', paragraphs: ['發作時請移開周邊硬物、保持空氣流通並觀察呼吸。不要把手指或物品伸入口中，也不要強迫灌水或餵藥。', '若安全可行，錄下發作前後的影片，並記錄是否在興奮、運動、咳嗽、排便或休息時發生。'] },
  //     { title: '為什麼需要心臟評估？', paragraphs: ['心律不整、肺高壓、嚴重心臟結構疾病或心臟輸出量下降，都可能造成短暫腦部灌流不足。', '但昏倒並非只由心臟引起，醫師也會依情況評估血糖、神經、血壓與其他系統性問題。'] },
  //     { title: '哪些情況不能等待？', paragraphs: ['發作後沒有迅速恢復、同日反覆昏倒、合併呼吸困難、牙齦發白或發紫、嚴重虛弱時，應立即就醫。', '即使很快恢復正常，第一次昏倒或症狀頻率改變也應在近期內安排門診。'] }
  //   ],
  //   faqs: [
  //     { question: '昏倒和癲癇怎麼分？', answer: '兩者可能相似，影片與完整病史很重要。是否有意識恢復速度、四肢動作、排尿與發作情境，都能提供判讀線索。' },
  //     { question: '昏倒後恢復正常還需要看醫生嗎？', answer: '需要。短暫恢復不代表原因已排除，尤其是反覆發作或有心雜音、喘、運動耐受下降時。' }
  //   ],
  //   sources: [sources.diagnostics, sources.pulmonaryHypertension]
  // })],
  // ['cat-hindlimb-emergency', makeGuide('cat-hindlimb-emergency', {
  //   eyebrow: 'Emergency Guide',
  //   category: '貓咪心臟疾病',
  //   title: '貓咪後腳突然無力或疼痛：認識動脈血栓的急診警訊',
  //   description: '貓咪突發後肢無力、疼痛或腳掌變冷可能是急症。了解第一時間該做什麼，以及為何需要盡快就醫。',
  //   image: '/imgs/guides/feline-thromboembolism.jpg',
  //   keywords: ['貓咪後腳無力', '貓咪血栓', '貓咪動脈血栓', '貓咪心臟病急診'],
  //   summary: '動脈血栓栓塞可能和貓咪心肌病相關，也可能以毫無預警的後肢疼痛或行走困難出現。這類狀況需要急診評估。',
  //   highlights: ['突發疼痛與行走異常需急診', '不要按摩或熱敷患肢', '運送時保持安靜與保暖', '治療與預後需個別評估'],
  //   sections: [
  //     { title: '哪些表現需要警覺？', paragraphs: ['突然不願走路、拖行後肢、明顯疼痛叫喊、腳掌冰冷或肉墊顏色改變，都可能是嚴重循環問題的表現。', '有些貓同時會出現呼吸急促或精神變差，尤其是已知有心肌病的病患。'] },
  //     { title: '在家不要做的事', paragraphs: ['不要按摩、熱敷、強迫站立或自行給予人用止痛藥。這些處置可能增加壓力、造成受傷或延誤正確治療。', '請將貓咪放在穩定提籠內，降低刺激並立即聯繫可處理急症的動物醫院。'] },
  //     { title: '急診評估的目標', paragraphs: ['醫療團隊會處理疼痛與呼吸循環穩定，並以理學檢查、血壓、影像與心臟評估判斷原因與範圍。', '後續是否需要抗血栓策略與心肌病追蹤，需依風險因子與病患反應個別討論。'] }
  //   ],
  //   faqs: [
  //     { question: '貓咪後腳無力一定是心臟病嗎？', answer: '不一定，神經、骨科與其他循環問題也可能造成類似症狀；但突發疼痛或腳掌變冷應以急症處理。' },
  //     { question: '有心肌病的貓可以預防血栓嗎？', answer: '部分高風險病患可能需要預防策略，必須由醫師依心房大小、血流與既往病史評估。' }
  //   ],
  //   sources: [sources.feline]
  // })],
  // ['cardiac-physical-exam', makeGuide('cardiac-physical-exam', {
  //   eyebrow: 'Diagnostic Guide',
  //   category: '心臟檢查',
  //   title: '犬貓心臟理學檢查：聽診、脈搏與病史能提供什麼線索？',
  //   description: '心臟評估的第一步不只聽心雜音。了解問診、視診、觸診與聽診如何協助決定下一步檢查。',
  //   image: '/imgs/guides/physical-exam.jpg',
  //   keywords: ['犬貓心臟檢查', '心雜音檢查', '狗狗心臟聽診', '貓咪心臟檢查'],
  //   summary: '理學檢查能建立病患當下的基準，也能協助判斷是否需要影像、血壓、心電圖或血液檢查，但不會取代完整診斷。',
  //   highlights: ['病史與居家影片很重要', '心雜音不等於疾病嚴重度', '脈搏與呼吸可提供循環線索', '檢查組合依病患需求決定'],
  //   sections: [
  //     { title: '門診會問哪些問題？', paragraphs: ['醫師通常會詢問咳嗽、喘、昏倒、活動力、食慾、用藥與既往檢查。飼主提供的居家影片、呼吸紀錄與症狀發作情境，常比單一次門診表現更有幫助。', '犬貓在陌生環境可能因緊張而心跳變快，因此病史是判讀的重要部分。'] },
  //     { title: '聽診不只是找心雜音', paragraphs: ['除了心雜音，心率、節律、肺音、脈搏品質與血壓都會影響後續判斷。部分貓咪心肌病可能沒有明顯心雜音，不能只靠單一聽診結果排除。', '聽診發現異常時，常需要搭配影像或心電圖找出原因。'] },
  //     { title: '何時需要進一步檢查？', paragraphs: ['心雜音、心律不規則、呼吸速率改變、昏倒、胸腔影像異常或麻醉前風險評估，都可能是進一步檢查的理由。', '下一步檢查要回答的問題不同，並非每隻動物都需要相同的檢查組合。'] }
  //   ],
  //   faqs: [
  //     { question: '聽到心雜音代表一定有心臟病嗎？', answer: '不一定。心雜音需要依年齡、型態、症狀與後續檢查綜合判讀。' },
  //     { question: '貓咪沒有心雜音就可以不用心臟檢查嗎？', answer: '不一定。部分貓咪心肌病可能沒有明顯心雜音，若有高風險品種、症狀或麻醉需求仍可能需要評估。' }
  //   ],
  //   sources: [sources.diagnostics, sources.feline]
  // })],
  // ['chest-xray', makeGuide('chest-xray', {
  //   eyebrow: 'Diagnostic Guide',
  //   category: '心臟檢查',
  //   title: '犬貓胸腔 X 光：心臟、肺部與呼吸問題怎麼看？',
  //   description: '胸腔 X 光可協助評估心臟輪廓、肺部與胸腔狀態。了解它能回答什麼問題，以及為何常需要搭配其他檢查。',
  //   image: '/imgs/guides/chest-xray.jpg',
  //   keywords: ['犬貓胸腔X光', '狗狗心臟X光', '貓咪胸腔X光', '肺水腫檢查'],
  //   summary: '胸腔 X 光能看見心臟輪廓、肺部血管、肺部浸潤與胸腔空間，常用於咳嗽、喘、呼吸異常與心臟病追蹤。',
  //   highlights: ['評估心臟輪廓與肺部變化', '協助辨識肺水腫與呼吸道問題', '不能取代心臟超音波', '影像需由病史與臨床狀態解讀'],
  //   sections: [
  //     { title: '胸腔 X 光可以看見什麼？', paragraphs: ['X 光可提供心臟大小與輪廓、肺部型態、肺血管與胸腔內其他結構的資訊。對咳嗽或呼吸異常病患，這些資訊有助於分辨較可能的心肺問題。', '不同拍攝姿勢與呼吸狀態都會影響影像，因此需要由醫療團隊整體判讀。'] },
  //     { title: '和心臟超音波有什麼不同？', paragraphs: ['心臟超音波主要評估瓣膜、心肌、腔室與血流；胸腔 X 光更能呈現肺部與整體胸腔變化。兩者常互補，而不是互相取代。', '若懷疑心律不整或系統性疾病，也可能需要心電圖、血壓或血液檢查。'] },
  //     { title: '拍攝時需要注意什麼？', paragraphs: ['多數病患可在短時間內完成拍攝，但是否適合擺位或需要額外處置，會依呼吸狀況與壓力程度評估。', '呼吸困難病患的安全與穩定優先，醫療團隊會選擇合適的處理方式。'] }
  //   ],
  //   faqs: [
  //     { question: '胸腔 X 光有輻射風險嗎？', answer: '獸醫影像檢查會依臨床需要與安全原則進行。是否拍攝與拍攝次數，應由醫師依病患狀況評估。' },
  //     { question: 'X 光顯示心臟變大就能確診嗎？', answer: '不能。心臟輪廓需結合體型、拍攝角度、超音波與臨床資訊判讀。' }
  //   ],
  //   sources: [sources.diagnostics]
  // })],
  // ['pet-ecg', makeGuide('pet-ecg', {
  //   eyebrow: 'Diagnostic Guide',
  //   category: '心律不整',
  //   title: '犬貓心電圖 ECG：什麼時候需要做？檢查能回答哪些問題？',
  //   description: '心電圖記錄心臟電氣活動，協助判讀心律過快、過慢或不規則。了解它與心臟超音波的不同用途。',
  //   image: '/imgs/guides/pet-ecg.jpg',
  //   keywords: ['犬貓心電圖', '狗狗ECG', '貓咪心律不整', '犬心律不整檢查'],
  //   summary: '心電圖是節律檢查工具，不直接取代結構影像。對昏倒、脈搏不規則、心跳過快或過慢的犬貓，常是重要評估之一。',
  //   highlights: ['記錄心臟電氣活動', '判讀心跳快慢與規律性', '昏倒與脈搏異常常需評估', '可能需要搭配 Holter 長時間監測'],
  //   sections: [
  //     { title: 'ECG 的用途是什麼？', paragraphs: ['心電圖透過體表電極記錄心臟的電氣活動，可協助判斷節律來源、心率與傳導是否異常。', '它回答的是「心跳怎麼跳」，不是直接量測瓣膜逆流或心臟腔室大小。'] },
  //     { title: '哪些情況可能需要安排？', paragraphs: ['昏倒、脈搏不規則、心跳明顯過快或過慢、聽診懷疑節律異常，以及已知心臟病病患追蹤時，都可能需要 ECG。', '若症狀是間歇性，短時間 ECG 未必能捕捉，醫師可能評估較長時間的節律監測。'] },
  //     { title: '檢查時會被電到嗎？', paragraphs: ['ECG 是被動記錄訊號，不會對病患施加電流。多數犬貓在安靜站立或側躺時可完成。', '緊張可能影響心率，因此醫療團隊會盡量降低刺激並搭配病史判讀。'] }
  //   ],
  //   faqs: [
  //     { question: '心電圖正常就代表沒有心臟病嗎？', answer: '不一定。心電圖主要評估節律，結構性心臟疾病仍可能需要超音波、X 光或其他檢查。' },
  //     { question: 'Holter 和一般心電圖差在哪裡？', answer: '一般 ECG 是短時間紀錄；Holter 可在日常活動中較長時間紀錄節律，適用於間歇性問題。' }
  //   ],
  //   sources: [sources.diagnostics]
  // })],
  // ['nt-probnp', makeGuide('nt-probnp', {
  //   eyebrow: 'Diagnostic Guide',
  //   category: '心臟檢查',
  //   title: 'NT-proBNP 是什麼？犬貓心臟血液檢查怎麼解讀？',
  //   description: 'NT-proBNP 可作為心臟負荷的輔助指標，但不能脫離症狀、影像與其他檢查單獨判讀。',
  //   image: '/imgs/guides/nt-probnp.jpg',
  //   keywords: ['NT-proBNP', '貓心臟血液檢查', '狗狗心臟血檢', '心臟病篩檢'],
  //   summary: 'NT-proBNP 是心臟相關生物標記，可在特定情境協助風險評估或判讀呼吸症狀來源，但不是單獨確診心臟病的工具。',
  //   highlights: ['屬於輔助性生物標記', '適合與症狀和影像一起看', '腎臟與其他疾病可能影響結果', '異常結果需由醫師安排後續判讀'],
  //   sections: [
  //     { title: 'NT-proBNP 反映什麼？', paragraphs: ['當心臟肌肉承受壓力時，相關生物標記可能上升。檢驗結果可提供額外線索，協助醫師決定是否需要進一步心臟評估。', '不同檢測平台、病種與臨床情境的解讀方式不同，不能以單一數值自行診斷。'] },
  //     { title: '哪些情況可能使用？', paragraphs: ['例如犬貓有呼吸症狀、貓咪麻醉前風險評估、懷疑心肌病或需要輔助區分心臟與非心臟原因時，醫師可能考慮使用。', '檢驗不是所有病患的例行必做項目，選擇與否取決於要回答的臨床問題。'] },
  //     { title: '結果異常後下一步是什麼？', paragraphs: ['異常結果通常需要回到完整病史、理學檢查、血壓、影像與心臟超音波一起判讀。', '治療與追蹤不應只因單一檢驗數值改變，而是依整體疾病分期與病患狀態規劃。'] }
  //   ],
  //   faqs: [
  //     { question: 'NT-proBNP 正常就能排除所有心臟病嗎？', answer: '不能。它是輔助檢查，仍有需要結合其他檢查的情況。' },
  //     { question: '抽血前需要空腹嗎？', answer: '請依醫院檢驗安排與病患同時需要的其他檢查指示準備。' }
  //   ],
  //   sources: [sources.feline, sources.diagnostics]
  // })],
  // ['feline-hcm', makeGuide('feline-hcm', {
  //   eyebrow: 'Feline Cardiology',
  //   category: '貓咪心臟疾病',
  //   title: '貓咪肥厚型心肌病 HCM：為什麼常常沒有明顯症狀？',
  //   description: '認識貓咪常見心肌病的警訊、風險與心臟超音波評估，了解沒有心雜音也不能完全排除心肌病。',
  //   image: '/imgs/guides/feline-hcm.jpg',
  //   keywords: ['貓咪HCM', '貓咪肥厚型心肌病', '貓咪心臟病', '貓咪心臟超音波'],
  //   summary: '肥厚型心肌病是貓咪常見的心肌病表現。部分貓可長期沒有症狀，部分則可能以呼吸異常、血栓或急性病況出現。',
  //   highlights: ['症狀可能不明顯', '超音波是重要診斷工具', '呼吸異常與後肢急症要警覺', '分期比單一名詞更影響照護'],
  //   sections: [
  //     { title: 'HCM 是什麼？', paragraphs: ['HCM 是以心肌肥厚為特徵的心肌病表現。是否為原發性心肌病，仍需考量血壓、甲狀腺與其他可能影響心肌厚度的因素。', '不同貓咪的病程差異很大，因此需要依影像、心房大小、血流與臨床狀態進行分期。'] },
  //     { title: '沒有症狀就不用擔心嗎？', paragraphs: ['部分貓咪在例行檢查或麻醉前評估才發現異常；也有病患直到呼吸變快、食慾下降、後肢疼痛或急性呼吸問題才被注意到。', '高風險品種、家族史或聽診異常時，可與醫師討論是否需要進一步評估。'] },
  //     { title: '如何安排後續照護？', paragraphs: ['追蹤頻率與治療取決於疾病分期、心房變化、是否有心衰竭或血栓風險，以及病患壓力承受能力。', '固定觀察安靜呼吸、食慾與活動狀態，能幫助及早發現變化。'] }
  //   ],
  //   faqs: [
  //     { question: '貓咪沒有心雜音還會有 HCM 嗎？', answer: '可能。部分貓咪心肌病沒有明顯聽診異常，是否需要評估應依整體風險判斷。' },
  //     { question: 'HCM 可以靠藥物治癒嗎？', answer: '多數情況以風險分層、併發症預防與長期追蹤為主，治療方向需依個別分期決定。' }
  //   ],
  //   sources: [sources.feline]
  // })],
  // ['canine-dcm', makeGuide('canine-dcm', {
  //   eyebrow: 'Canine Cardiology',
  //   category: '心臟疾病',
  //   title: '大型犬心臟無力？認識擴張型心肌病 DCM 的評估方向',
  //   description: '大型犬出現活動耐受下降、昏倒或心律異常時，可能需要評估擴張型心肌病與其他心臟疾病。',
  //   image: '/imgs/guides/canine-dcm.jpg',
  //   keywords: ['狗狗DCM', '擴張型心肌病', '大型犬心臟病', '犬心律不整'],
  //   summary: 'DCM 是以心腔擴大與收縮功能下降為主要特徵的心肌病之一，部分犬隻也可能先出現心律不整或昏厥。',
  //   highlights: ['大型犬與特定品種需留意', '症狀可能包含虛弱與昏倒', '超音波與心電圖常互補', '早期發現有助建立追蹤基準'],
  //   sections: [
  //     { title: 'DCM 可能怎麼表現？', paragraphs: ['有些犬隻先出現活動力下降、容易疲勞、咳嗽或呼吸異常；也可能以心律不整、昏倒或突然虛弱表現。', '症狀不具專一性，不能只憑品種或單一表現判定。'] },
  //     { title: '診斷通常需要哪些資訊？', paragraphs: ['心臟超音波可評估心腔尺寸與收縮功能；心電圖或長時間節律監測可協助了解是否有心律不整。', '胸腔影像、血壓與血液檢查則可提供肺部、循環與共病狀態的資訊。'] },
  //     { title: '照護與追蹤重點', paragraphs: ['確診後的重點包括疾病分期、是否有心衰竭或節律風險、用藥反應與居家生活品質。', '飼主可記錄運動耐受、安靜呼吸與昏倒事件，幫助團隊調整追蹤計畫。'] }
  //   ],
  //   faqs: [
  //     { question: '大型犬都會得到 DCM 嗎？', answer: '不會。品種、家族史、臨床症狀與檢查結果需要一起評估。' },
  //     { question: 'DCM 和 MMVD 一樣嗎？', answer: '不同。MMVD 主要涉及瓣膜退化；DCM 主要與心肌收縮功能與心腔擴大相關。' }
  //   ],
  //   sources: [sources.diagnostics]
  // })],
  // ['canine-heartworm', makeGuide('canine-heartworm', {
  //   eyebrow: 'Prevention Guide',
  //   category: '心臟疾病',
  //   title: '犬心絲蟲：為什麼預防比治療更重要？',
  //   description: '心絲蟲可影響心肺循環，了解定期預防、篩檢與陽性後應由獸醫師規劃治療的原因。',
  //   image: '/imgs/guides/heartworm-prevention.jpg',
  //   keywords: ['犬心絲蟲', '狗狗心絲蟲預防', '心絲蟲檢查', '狗狗心肺疾病'],
  //   summary: '心絲蟲經由蚊子傳播，可能造成漸進性心肺損傷。規律預防與依醫師建議的篩檢，是降低風險的核心。',
  //   highlights: ['透過蚊子傳播', '規律預防與篩檢並重', '陽性後不可自行處理', '活動限制與治療計畫需由醫師安排'],
  //   sections: [
  //     { title: '心絲蟲如何影響犬隻？', paragraphs: ['成蟲可存在於肺動脈與心臟相關循環，造成血管與心肺負擔。早期可能沒有明顯症狀，病程進展時可能出現咳嗽、疲勞、體重下降或呼吸問題。', '症狀程度與蟲體負荷、病程及個體反應有關。'] },
  //     { title: '為什麼預防與篩檢都需要？', paragraphs: ['預防用藥和定期檢測扮演不同角色。是否使用、使用間隔與檢查時機，應依所在地風險、生活型態與醫師建議安排。', '遺漏用藥、嘔吐或其他因素都可能影響預防效果，應主動告知醫療團隊。'] },
  //     { title: '檢驗陽性後該怎麼辦？', paragraphs: ['陽性不代表可以自行開始或停止任何藥物。醫師通常會評估感染狀態、心肺風險與安全的治療次序。', '治療期間的活動限制與回診追蹤十分重要，目的是降低嚴重併發症風險。'] }
  //   ],
  //   faqs: [
  //     { question: '室內犬也需要預防心絲蟲嗎？', answer: '風險會依地區與蚊蟲暴露不同，請與獸醫師討論合適的預防策略。' },
  //     { question: '心絲蟲陽性可以自己買藥治療嗎？', answer: '不可以。錯誤處置可能造成嚴重風險，應由獸醫師規劃完整治療與活動管理。' }
  //   ],
  //   sources: [sources.heartworm]
  // })],
  // ['pet-arrhythmia', makeGuide('pet-arrhythmia', {
  //   eyebrow: 'Rhythm Guide',
  //   category: '心律不整',
  //   title: '犬貓心律不整：心跳太快、太慢或不規則時怎麼評估？',
  //   description: '心律不整可能沒有症狀，也可能造成昏倒、虛弱或運動耐受下降。了解心電圖與長時間監測的角色。',
  //   image: '/imgs/guides/arrhythmia-holter.jpg',
  //   keywords: ['犬貓心律不整', '狗狗心跳不規則', '狗狗心電圖', '貓咪心律不整'],
  //   summary: '心律不整是心跳節律、速度或傳導異常的統稱。其重要性取決於種類、持續時間、是否影響循環與是否有基礎心臟疾病。',
  //   highlights: ['可無症狀或造成昏倒', '短時間 ECG 不一定能捕捉', 'Holter 可評估間歇性事件', '治療需先釐清節律種類與原因'],
  //   sections: [
  //     { title: '心律不整不只是一種疾病', paragraphs: ['有些節律變化在特定情境下可能是生理反應，有些則與心肌病、電解質異常、藥物或其他系統性疾病相關。', '因此治療前需要確認節律類型，以及它是否真的影響病患的循環與生活品質。'] },
  //     { title: '哪些症狀值得安排檢查？', paragraphs: ['反覆昏倒、突然虛弱、心跳感覺不規則、運動耐受下降、已知心臟病或聽診發現節律異常時，都應討論心電圖評估。', '若症狀偶爾才出現，飼主影片與長時間監測常能提供更完整資訊。'] },
  //     { title: '治療重點不是只把心跳變慢', paragraphs: ['不同節律問題的處理方式不同，有些需要處理基礎疾病，有些需要藥物或介入評估。', '自行使用人用心臟藥或調整既有劑量可能造成危險，應由醫療團隊追蹤。'] }
  //   ],
  //   faqs: [
  //     { question: '摸到心跳不規則就一定是嚴重心律不整嗎？', answer: '不一定，但值得由醫師以聽診與心電圖確認。' },
  //     { question: '心律不整一定需要長期吃藥嗎？', answer: '不一定。是否治療取決於節律種類、原因、症狀與風險。' }
  //   ],
  //   sources: [sources.diagnostics, sources.feline]
  // })],
  // ['congenital-heart-disease', makeGuide('congenital-heart-disease', {
  //   eyebrow: 'Pediatric Cardiology',
  //   category: '心臟疾病',
  //   title: '幼犬幼貓心雜音與先天性心臟病：何時需要心臟超音波？',
  //   description: '幼齡犬貓的心雜音可能是暫時性，也可能和先天性心臟結構異常有關。了解需要評估的情況。',
  //   image: '/imgs/guides/congenital-heart.jpg',
  //   keywords: ['幼犬心雜音', '先天性心臟病', 'PDA', '肺動脈狹窄', '幼貓心雜音'],
  //   summary: '先天性心臟病是出生時即存在的心臟結構異常。及早確認類型與嚴重度，能協助評估追蹤、介入或手術的時機。',
  //   highlights: ['幼齡心雜音需依型態判斷', '超音波可確認結構與血流', 'PDA 與肺動脈狹窄是常見類型', '處置時機需個別評估'],
  //   sections: [
  //     { title: '幼齡心雜音代表什麼？', paragraphs: ['部分幼齡動物可能有暫時性的生理性心雜音，但明顯、持續或合併生長遲緩、呼吸異常、昏倒的心雜音，需要進一步評估。', '心雜音的音量不是唯一判斷標準，位置、型態與病患狀態都很重要。'] },
  //     { title: '超音波如何協助？', paragraphs: ['心臟超音波可觀察心臟隔膜、血管連接、瓣膜與血流速度，協助確認是否存在結構異常。', '部分疾病可能適合追蹤，部分則需要及早討論介入治療或轉診。'] },
  //     { title: '飼主在家應觀察什麼？', paragraphs: ['留意生長、活動耐受、呼吸、食慾與昏倒事件。任何明顯呼吸困難、虛弱或持續不長大，都應提早回診。', '若未來需要麻醉或手術，也應讓醫療團隊知道既有心臟評估結果。'] }
  //   ],
  //   faqs: [
  //     { question: '幼犬心雜音會自己消失嗎？', answer: '有些可能會，但不能預設所有心雜音都是暫時性；需要由獸醫師依年齡、聽診與風險判斷。' },
  //     { question: '先天性心臟病都要開刀嗎？', answer: '不一定。處置取決於疾病種類、嚴重度、症狀與可行的治療選項。' }
  //   ],
  //   sources: [sources.congenital, sources.diagnostics]
  // })],
  // ['pulmonary-hypertension', makeGuide('pulmonary-hypertension', {
  //   eyebrow: 'Pulmonary Vascular Guide',
  //   category: '心臟疾病',
  //   title: '犬肺高壓：為什麼會喘、昏倒？評估與治療重點一次看',
  //   description: '肺高壓不是單一疾病，可能與心臟、肺部、血栓或其他問題相關。了解為何需要找出背後原因。',
  //   image: '/imgs/guides/pulmonary-hypertension.jpg',
  //   keywords: ['狗狗肺高壓', '犬肺高壓', '狗狗昏倒', '狗狗呼吸困難'],
  //   summary: '肺高壓代表肺循環壓力上升，可能造成喘、疲勞、昏倒或右心負擔。治療前最重要的是辨識造成壓力上升的原因。',
  //   highlights: ['可能來自心肺或血栓問題', '超音波協助風險評估', '昏倒與呼吸異常需提高警覺', '治療依病因與嚴重度調整'],
  //   sections: [
  //     { title: '肺高壓不是單一診斷終點', paragraphs: ['肺高壓可能與左心疾病、慢性呼吸系統疾病、肺血管問題、血栓或先天性心臟異常有關。', '找到病因會影響治療方向，因此通常需要心臟與呼吸系統的完整評估。'] },
  //     { title: '如何評估風險？', paragraphs: ['心臟超音波可提供右心與血流的關鍵線索；胸腔影像、血液檢查、血壓與病史也可能需要納入。', '單一超音波估值需要搭配完整影像與臨床狀態解讀。'] },
  //     { title: '在家需要留意哪些變化？', paragraphs: ['觀察安靜呼吸、活動耐受、咳嗽、昏倒與食慾。若出現呼吸費力、反覆昏倒或精神快速惡化，應儘快就醫。', '既有藥物與追蹤時間應依醫師計畫執行，不宜自行停藥或加量。'] }
  //   ],
  //   faqs: [
  //     { question: '肺高壓可以完全治好嗎？', answer: '預後取決於背後病因與嚴重度。有些情況可改善或控制，但需要長期追蹤。' },
  //     { question: '肺高壓和心臟病一定有關嗎？', answer: '不一定。心臟、肺部與肺血管等多種問題都可能造成肺高壓。' }
  //   ],
  //   sources: [sources.pulmonaryHypertension]
  // })],
  // ['cardiorenal-syndrome', makeGuide('cardiorenal-syndrome', {
  //   eyebrow: 'Long-term Care',
  //   category: '治療與照護',
  //   title: '犬貓心腎症候群：心臟病與腎臟病為何需要一起追蹤？',
  //   description: '高齡犬貓可能同時面臨心臟與腎臟問題。了解用藥、檢驗與生活品質為何需要整體評估。',
  //   image: '/imgs/guides/cardiorenal-syndrome.jpg',
  //   keywords: ['心腎症候群', '狗狗心臟病腎臟病', '貓咪心腎', '心臟病血液檢查'],
  //   summary: '心臟與腎臟都參與血流與體液調節。當慢性疾病同時存在時，治療需要在呼吸、循環、腎功能與生活品質間取得平衡。',
  //   highlights: ['心腎問題常見於高齡病患', '用藥與水分策略需個別化', '定期血液與尿液追蹤重要', '不宜自行調整利尿劑或飲水'],
  //   sections: [
  //     { title: '為什麼心臟與腎臟會互相影響？', paragraphs: ['心臟影響血流灌注，腎臟則調節水分與電解質；慢性疾病或治療調整可能使另一系統受到影響。', '因此對同時有心腎問題的病患，單看某一次腎指數或症狀常不足以做決定。'] },
  //     { title: '追蹤項目為何重要？', paragraphs: ['醫師可能依病況安排血液、尿液、血壓、體重、呼吸與心臟影像追蹤。重點是看趨勢與病患反應，而非只追求單一數值。', '飼主應如實記錄食慾、飲水、排尿、活動與呼吸變化。'] },
  //     { title: '用藥調整需要哪些原則？', paragraphs: ['心臟與腎臟病患的藥物調整通常需要依回診檢查與居家狀態循序進行。', '自行停藥、加藥、限制飲水或使用保健品，都可能影響病情，應先聯繫醫療團隊。'] }
  //   ],
  //   faqs: [
  //     { question: '心臟藥會不會傷腎？', answer: '藥物效益與風險需要依個別病患平衡，因此才需要規律追蹤腎功能、電解質與臨床狀態。' },
  //     { question: '心腎病患要限制喝水嗎？', answer: '不應自行限制，水分策略應由醫師依病患情況決定。' }
  //   ],
  //   sources: [sources.mmvd, sources.feline]
  // })],
  // ['cardiac-medication', makeGuide('cardiac-medication', {
  //   eyebrow: 'Long-term Care',
  //   category: '治療與照護',
  //   title: '犬貓心臟藥物怎麼吃？用藥、回診與居家觀察重點',
  //   description: '心臟藥物依疾病類型與分期使用。了解為什麼不能自行加減藥，以及飼主在家應記錄哪些變化。',
  //   image: '/imgs/guides/cardiac-medication.jpg',
  //   keywords: ['狗狗心臟藥', '貓咪心臟藥', '心臟病用藥', '心衰竭居家照護'],
  //   summary: '心臟用藥的目的可能是減少心臟負荷、控制體液、改善特定節律或處理併發症。每種藥物都有不同適應症與追蹤需求。',
  //   highlights: ['用藥依疾病分期決定', '固定時間與紀錄有助追蹤', '副作用或症狀改變要回報', '不要以人用藥替代獸醫處方'],
  //   sections: [
  //     { title: '不是每隻心臟病患都需要相同藥物', paragraphs: ['是否需要用藥與選擇哪一類藥物，取決於疾病類型、是否有心臟擴大、心衰竭、心律不整或血栓風險。', '正確分期比「有沒有心雜音」更能決定治療方向。'] },
  //     { title: '在家如何讓用藥更安全？', paragraphs: ['依處方時間給藥、保留用藥清單並記錄漏服、嘔吐、食慾或呼吸變化。回診時帶上所有正在使用的藥物與保健品。', '若病患不願進食、持續嘔吐、非常虛弱或呼吸異常，應先聯繫醫院，不要自行加倍補藥。'] },
  //     { title: '為什麼需要定期抽血與回診？', paragraphs: ['部分心臟用藥會影響體液、電解質或腎臟相關指標，定期檢驗能協助安全調整。', '回診也能比對症狀、體重、呼吸紀錄與影像變化，確認治療是否仍適合。'] }
  //   ],
  //   faqs: [
  //     { question: '漏吃一次心臟藥怎麼辦？', answer: '不要自行加倍補吃，請依處方與醫院提供的指示處理；不確定時先致電詢問。' },
  //     { question: '可以把藥藏在零食裡嗎？', answer: '多數情況可行，但需確認病患完整吞服，並避免使用不適合其飲食限制的食物。' }
  //   ],
  //   sources: [sources.mmvd, sources.feline]
  // })]
]

export const cardiologyGuidePages = Object.fromEntries(
  guidePageEntries.map(([, page]) => [page.path, page])
)

export const cardiologyGuideCards = Object.values(cardiologyGuidePages).map((page) => ({
  title: page.title,
  category: page.category,
  image: page.image,
  link: page.path,
  description: page.description
}))
