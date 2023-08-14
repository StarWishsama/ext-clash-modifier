// 指定需要在原有配置文件上删除的字段
const remove = ["proxy-groups", "rules", "rule-providers"];

// 指定需要需要追加的 YAML 配置，注意缩进
// 在数组中，使用 `_PROXY_NAME` 指代所有的 Proxy Name
// 在 Rule Provider 中的 URL 中，使用 `_PROVIDER_PROXY|` 指代规则文件代理 URL
const append = `
proxy-groups:
  - name: '🌐 国外流量'
    type: select
    proxies: [_PROXY_NAME]
  - name: '🚥 其他流量'
    type: select
    proxies:
      - '🌐 国外流量'
      - DIRECT
  - name: 🎬 国际流媒体
    type: select
    interval: 300
    proxies: ['🌐 国外流量', DIRECT]
  - name: '🎬 大陆流媒体国际版'
    type: select
    proxies: [DIRECT, _PROXY_NAME]
  - name: '🎮 Steam'
    type: select
    proxies: [DIRECT, '🌐 国外流量', _PROXY_NAME]  
  - name: '🎵 世界计划'
    type: select   
    proxies: [DIRECT, '🌐 国外流量', _PROXY_NAME]
  - name: '🔍 必应'
    type: select
    proxies: ['🌐 国外流量', DIRECT, _PROXY_NAME]
  - name: '🌐 国际网站'
    type: select  
    proxies: ['🌐 国外流量', DIRECT]  
  - name: '🏠 大陆流量'
    type: select 
    proxies: [DIRECT, '🌐 国外流量']  
  - name: '🎬 大陆流媒体'
    type: select 
    proxies: [DIRECT, '🏠 大陆流量']  
  - name: '🏠 大陆网站'
    type: select 
    proxies: [DIRECT, '🏠 大陆流量']             

rules:  
  # Disable MIUI anti fraud upload
  - DOMAIN,flash.sec.miui.com,REJECT
  
  # bypass BakaXL  
  - PROCESS-NAME,BakaXL.exe,DIRECT
  # bypass Torrent
  - PROCESS-NAME,qbittorrent.exe,DIRECT
  
  - DOMAIN,clash.razord.top,DIRECT
  - DOMAIN,yacd.haishan.me,DIRECT
  
  # Force proxy gstatic
  - DOMAIN-SUFFIX,gstatic.com,GLOBAL
  
  # Local Area Network
  - IP-CIDR,192.168.0.0/16,DIRECT
  - IP-CIDR,10.0.0.0/8,DIRECT
  - IP-CIDR,172.16.0.0/12,DIRECT
  - IP-CIDR,127.0.0.0/8,DIRECT
  - IP-CIDR,100.64.0.0/10,DIRECT
  - IP-CIDR,224.0.0.0/4,DIRECT
  - IP-CIDR,fe80::/10,DIRECT
  
  # Unbreak
  - RULE-SET,Unbreak,DIRECT
  
  # (Streaming Media)
  - RULE-SET,Streaming,🎬 国际流媒体

  # (StreamingSE)
  - RULE-SET,StreamingSE,🎬 大陆流媒体国际版

  # (Steam)
  - RULE-SET,Steam,🎮 Steam
  
  # (Project Sekai)
  - RULE-SET,PJSK,🎵 世界计划
  
  # Bing
  - RULE-SET,Bing,🔍 必应

  # (DNS Cache Pollution) / (IP Blackhole) / (Region-Restricted Access Denied) / (Network Jitter)
  - RULE-SET,Global,🌐 国际网站

  # (StreamingCN)
  - RULE-SET,StreamingCN,🎬 大陆流媒体

  # China Area Network
  - RULE-SET,China,🏠 大陆网站
  - RULE-SET,ChinaIP,🏠 大陆流量
  - MATCH,🚥 其他流量

rule-providers:
  Unbreak:
    type: http
    behavior: classical
    path: ./RuleSet/Unbreak.yaml
    url: https://ghproxy.com/https://raw.githubusercontent.com/DivineEngine/Profiles/master/Clash/RuleSet/Unbreak.yaml
    interval: 86400

  Streaming:
    type: http
    behavior: classical
    path: ./RuleSet/StreamingMedia/Streaming.yaml
    url: https://ghproxy.com/https://raw.githubusercontent.com/DivineEngine/Profiles/master/Clash/RuleSet/StreamingMedia/Streaming.yaml
    interval: 86400

  StreamingSE:
    type: http
    behavior: classical
    path: ./RuleSet/StreamingMedia/StreamingSE.yaml
    url: https://ghproxy.com/https://raw.githubusercontent.com/DivineEngine/Profiles/master/Clash/RuleSet/StreamingMedia/StreamingSE.yaml
    interval: 86400

  StreamingCN:
    type: http
    behavior: classical
    path: ./RuleSet/StreamingMedia/StreamingCN.yaml
    url: https://ghproxy.com/https://raw.githubusercontent.com/DivineEngine/Profiles/master/Clash/RuleSet/StreamingMedia/StreamingCN.yaml
    interval: 86400

  Steam:
    type: http
    behavior: classical
    path: ./RuleSet/Extra/Game/Steam.yaml
    url: https://ghproxy.com/https://raw.githubusercontent.com/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Game/Steam.yaml
    interval: 86400

  Global:
    type: http
    behavior: classical
    path: ./RuleSet/Global.yaml
    url: https://ghproxy.com/https://raw.githubusercontent.com/StarWishsama/ext-clash-modifier/main/rulesets/Global.yaml
    interval: 86400

  China:
    type: http
    behavior: classical
    path: ./RuleSet/China.yaml
    url: https://ghproxy.com/https://raw.githubusercontent.com/DivineEngine/Profiles/master/Clash/RuleSet/China.yaml
    interval: 86400

  ChinaIP:
    type: http
    behavior: ipcidr
    path: ./RuleSet/Extra/ChinaIP.yaml
    url: https://ghproxy.com/https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/cncidr.txt
    interval: 86400
    
  PJSK:
    type: http
    behavior: classical
    path: ./RuleSet/Extra/Game/pjsk.yaml
    url: https://ghproxy.com/https://raw.githubusercontent.com/StarWishsama/ext-clash-modifier/main/rulesets/pjsk.yaml
    interval: 86400 
    
  Bing:
    type: http
    behavior: classical
    path: ./RuleSet/Extra/Bing.txt
    url: https://ghproxy.com/https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Microsoft.list
    interval: 86400  

`;

export default { remove, append };
