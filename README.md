# 專心動物醫院官網

專心動物醫院 CardioSpecial 官方網站。正式網址：

<https://cardiospecialvh.tw>

## 開發指令

```bash
npm install
npm run dev
npm run build
node scripts/seo-audit.mjs
```

`npm run build` 會先執行 Vite build，再產生靜態 SEO HTML、sitemap 與 robots。

## 工程維護文件

架構、部署、內容更新、SEO、GEO、Search Console、Firebase 與故障排查：

[docs/ENGINEERING_MAINTENANCE_GUIDE.md](docs/ENGINEERING_MAINTENANCE_GUIDE.md)


<!-- 
    一、修改各個醫師對應的報告顏色
        林正 #2F75B5
        士容 #7030A0
        冠勳 #7560CE
        炫甄 #74DAE4
        詩婷 #C65911
        洪醫師 #CC0904
        品齊 white
    二、尚未絕育的英文改成Intact
    三、刪除Gender欄位
    四、病史與目前狀態 移動到 最下面
    五、MCS是4級 
    六、心臟輪廓 Cardiac silhouette 新增 Left heart enlargement
    七、peak TR、peak PR、peak MR、RVOT、LVOT、A wave 新增單位m/s ； LA max 新增cm
    八、移除 肺動脈瓣與肺循環 下的 RPAD和RPAS
    九、LVIDs和LVIDd 移動到 左心室尺寸與收縮功能 下
    十、E/IVRT 移動到 舒張功能與左心房壓 下
    十一、心臟超音波 新增 LADn 、 PV/AO 、 PEAK TR(ms)、E/A、LVPWD、IVSD，其中PV/AO 當點擊的時候需要填選PV和AO，然後PV/AO要被計算出來
 -->