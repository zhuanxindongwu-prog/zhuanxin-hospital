# LikeWater 居家圖片敘事設計
日期：2026-11-16
使用者已選定本次三張提案中第 2 張，對應 output/product-design/ohtrust-20261116/option-2.png（At Home, Every Day）。

沿用既有 Vue 專案與 /ohtrust 路由，在原頁實作，不建立新框架或部署。白底、暖橡木與亞麻、少量森林綠連結；產品使用情境作為首屏，依序為雙張直式照片、細線報告導讀、寬幅包裝細節與使用提醒。往下延伸完整報告、證據範圍、產品定位、FAQ 與聯絡入口。

四張情境資產依使用者提供瓶身與選定設計生成；只呈現瓶身外觀，排除電腦背景及手寫資訊。情境圖標示示意，不能當作實證。真實產品標示和原始 PDF 為事實依據。

保留六份報告所有名稱、編號、標準、模型、完整結果及 PDF；保留既有 supportedClaims、unsupportedClaims、FAQ 與專業提醒，不擴大抗菌結果。#reports、#evidence-dossier、#use-and-limits 延續。原生 details 供鍵盤與觸控展開；PDF 入口常駐。/ohtrust 的共用導覽改為產品頁專用錨點，其他路由保持現況。

桌面複製選定圖的比例，手機改為先文後圖避免遮住瓶身。使用響應式 WebP、明確尺寸、首圖優先載入，後圖延遲載入。保留可讀 HTML、既有 canonical、Product 與 FAQ 結構資料。動態效果採輕量 hover，支援減少動態。

驗證：原六報告檢查、建置與既有 SEO/單元檢查；瀏覽器實際檢查桌面/平板/手機、錨點、FAQ、報告展開、PDF 與聯絡入口。以相同桌面寬度對照選定圖與實作截圖，通過 Product Design QA 後提供本機預覽。
