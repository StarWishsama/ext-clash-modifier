// 指定需要在原有配置文件上删除的字段
const remove = ["proxy-groups", "rules", "rule-providers", "dns"];

// 指定需要需要追加的 YAML 配置，注意缩进
// 在数组中，使用 `_PROXY_NAME` 指代所有的 Proxy Name
// 在 Rule Provider 中的 URL 中，使用 `_PROVIDER_PROXY|` 指代规则文件代理 URL
const append = `
geodata-mode: true 
geo-auto-update: true
geo-update-interval: 24
geox-url:
  geoip: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip.dat"
  geosite: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat"
  mmdb: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country.mmdb"

dns:
  enable: true
  stack: mixed
  ipv6: true
  prefer-h3: true
  use-hosts: true
  use-system-hosts: true
  enhanced-mode: fake-ip
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  nameserver:
    - https://cloudflare-dns.com/dns-query
    - https://1.0.0.1/dns-query
    - https://dns.google/dns-query
    - https://doh.apad.pro/dns-query
  proxy-server-nameserver:
      - 'https://223.5.5.5/dns-query#h3=true'
      - 'https://223.6.6.6/dns-query#h3=true'
      - https://doh.pub/dns-query
      - https://1.12.12.12/dns-query
  nameserver-policy:
    "geosite:private,cn,geolocation-cn,apple-cn,steam@cn":
      - 'https://223.5.5.5/dns-query#h3=true'
      - 'https://223.6.6.6/dns-query#h3=true'
      - https://doh.pub/dns-query
      - https://1.12.12.12/dns-query
  hosts:
  fake-ip-filter:
    # 网络状态探测器
    - "dns.msftncsi.com"
    - "www.msftconnecttest.com"
    - "ipv6.msftconnecttest.com"
    #LAN
    - "*.lan"
    - "*.localdomain"
    - "*.example"
    - "*.invalid"
    - "*.localhost"
    - "*.test"
    - "*.local"
    - "*.home.arpa"
    #放行NTP服务"
    - "time.*.com"
    - "time.*.gov"
    - "time.*.edu.cn"
    - "time.*.apple.com"
    - "time1.*.com"
    - "time2.*.com"
    - "time3.*.com"
    - "time4.*.com"
    - "time5.*.com"
    - "time6.*.com"
    - "time7.*.com"
    - "ntp.*.com"
    - "ntp1.*.com"
    - "ntp2.*.com"
    - "ntp3.*.com"
    - "ntp4.*.com"
    - "ntp5.*.com"
    - "ntp6.*.com"
    - "ntp7.*.com"
    - "*.time.edu.cn"
    - "*.ntp.org.cn"
    - "+.pool.ntp.org"
    - "time1.cloud.tencent.com"
    #放行网易云音乐"
    - "music.163.com"
    - "*.music.163.com"
    - "*.126.net"
    #百度音乐"
    - "musicapi.taihe.com"
    - "music.taihe.com"
    #酷狗音乐"
    - "songsearch.kugou.com"
    - "trackercdn.kugou.com"
    #酷我音乐"
    - "*.kuwo.cn"
    #JOOX音乐"
    - "api-jooxtt.sanook.com"
    - "api.joox.com"
    - "joox.com"
    #QQ音乐"
    - "y.qq.com"
    - "*.y.qq.com"
    - "streamoc.music.tc.qq.com"
    - "mobileoc.music.tc.qq.com"
    - "isure.stream.qqmusic.qq.com"
    - "dl.stream.qqmusic.qq.com"
    - "aqqmusic.tc.qq.com"
    - "amobile.music.tc.qq.com"
    #虾米音乐"
    - "*.xiami.com"
    #咪咕音乐"
    - "*.music.migu.cn"
    - "music.migu.cn"
    #QQ快捷登录
    - "localhost.ptlogin2.qq.com"
    - "localhost.sec.qq.com"
    #Game
    #Nintendo Switch
    - "+.srv.nintendo.net"
    #Sony PlayStation
    - "+.stun.playstation.net"
    #Microsoft Xbox
    - "xbox.*.microsoft.com"
    - "xnotify.xboxlive.com"
    - "+.ipv6.microsoft.com"
    # Battle.Net
    - "+.battlenet.com.cn"
    - "+.wotgame.cn"
    - "+.wggames.cn"
    - "+.wowsgame.cn"
    - "+.wargaming.net"
    #Golang
    - "proxy.golang.org"
    #STUN
    - "stun.*.*"
    - "stun.*.*.*"
    - "+.stun.*.*"
    - "+.stun.*.*.*"
    - "+.stun.*.*.*.*"
    - "+.pvp.net"
    #Linksys Router
    - "heartbeat.belkin.com"
    - "*.linksys.com"
    - "*.linksyssmartwifi.com"
    #ASUS Router
    - "*.router.asus.com"
    #Apple Software Update Service
    - "mesu.apple.com"
    - "swscan.apple.com"
    - "swquery.apple.com"
    - "swdownload.apple.com"
    - "swcdn.apple.com"
    - "swdist.apple.com"
    #Google
    - "lens.l.google.com"
    - "stun.l.google.com"
    #Netflix
    - "+.nflxvideo.net"
    #FinalFantasy XIV Worldwide Server & CN Server
    - "*.square-enix.com"
    - "*.finalfantasyxiv.com"
    - "*.ffxiv.com"
    - "*.ff14.sdo.com"
    - "ff.dorado.sdo.com"
    #Bilibili
    - "*.mcdn.bilivideo.cn"
    #Disney Plus
    - "+.media.dssott.com"
    # Mijia
    - "Mijia Cloud"
    # UU Booster
    - "+.uu.163.com"
    - "ps.res.netease.com"
    # 迅雷
    - "+.sandai.net"
    - "+.n0808.com"
    - "+.3gppnetwork.org"
    # aws
    - "+.prod.s3.amazonaws.com"
    # Ubisoft
    - "+.ubi.com"
    - '+.ubisoft.com'
    - '+.vivox.com'
    - '+.azureedge.net'

proxy-groups:
  - {
      name: 代理选择,
      type: select,
      proxies: [_PROXY_NAME],
    }
  - {
      name: 国内,
      type: select,
      proxies: [DIRECT, 代理选择, _PROXY_NAME],
    }
  - {
      name: Proxy,
      type: select,
      proxies: [代理选择, DIRECT],
      
    }
  - {
      name: Dler,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: Bilibili,
      type: select,
      proxies: [DIRECT, 代理选择, _PROXY_NAME],
      
    }
  - {
      name: Speedtest,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: Apple,
      type: select,
      proxies: [DIRECT, 代理选择, _PROXY_NAME],
      
    }
  - {
      name: Microsoft,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: AI,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: Paypal,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: GitHub,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: Google,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: YouTube,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: Netflix,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: Steam,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: Spotify,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: Telegram,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: Twitter,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: Discord,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: DMM,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }
  - {
      name: 未匹配,
      type: select,
      proxies: [代理选择, DIRECT, _PROXY_NAME],
      
    }      
  - name: '世界计划'
    type: select   
    proxies: [代理选择, DIRECT, _PROXY_NAME]     

rules:
  # Disable MIUI anti fraud upload
  - DOMAIN,flash.sec.miui.com,REJECT
  # Block QUIC
  - 'AND,((NETWORK,UDP),(DST-PORT,443),(GEOSITE,youtube)),REJECT'

  # Clash Web 前端
  - DOMAIN,clash.razord.top,DIRECT
  - DOMAIN,yacd.haishan.me,DIRECT
  # UA2F 检测工具
  - "DOMAIN,ua-check.stagoh.com,DIRECT"
  # Unraid 局域网
  - "DOMAIN-SUFFIX,wanip4.unraid.net,DIRECT"
  - "DOMAIN-SUFFIX,wanip6.unraid.net,DIRECT"
  # Bemanicn 似乎不接受任何来自海外的 DNS 解析
  - "DOMAIN-SUFFIX,bemani.cc,DIRECT"
  # 强制 IPv6 测速走代理
  - "DOMAIN-SUFFIX,test-ipv6.com,Proxy"

  # 内网
  - "IP-CIDR,192.168.0.0/16,DIRECT"
  - "IP-CIDR,10.0.0.0/8,DIRECT"
  - "IP-CIDR,172.16.0.0/12,DIRECT"
  - "IP-CIDR,127.0.0.0/8,DIRECT"
  - "IP-CIDR,100.64.0.0/10,DIRECT"
  - "IP-CIDR,224.0.0.0/4,DIRECT"

  - GEOSITE,steam@cn,DIRECT
  - "GEOSITE,dmm,DMM"
  - "DOMAIN-SUFFIX,game-gakuen-idolmaster.jp,DMM"

  - "GEOSITE,apple@cn,DIRECT"
  - "GEOSITE,apple,Apple"
  - "RULE-SET,Bilibili,Bilibili"
  - "RULE-SET,AI,AI"
  - "RULE-SET,Dler,Dler"
  - "RULE-SET,Google,Google"
  - "RULE-SET,GitHub,GitHub"
  - "RULE-SET,Microsoft,Microsoft"
  - "RULE-SET,Netflix,Netflix"
  - "RULE-SET,Speedtest,Speedtest"
  - "RULE-SET,Steam,Steam"
  - "RULE-SET,Spotify,Spotify"
  - "RULE-SET,Telegram,Telegram"
  - "RULE-SET,TelegramIP,Telegram"
  - "RULE-SET,Twitter,Twitter"
  - "RULE-SET,YouTube,YouTube"
  - "RULE-SET,PayPal,Paypal"
  - "RULE-SET,Discord,Discord"
  - "RULE-SET,PJSK,世界计划"
  
  - "RULE-SET,Proxy,Proxy"
  - "RULE-SET,China,国内"

  - "GEOIP,CN,国内"
  
  - "MATCH,未匹配"

rule-providers:
  China:
    {
      type: http,
      behavior: classical,
      path: ./Rule/China.yaml,
      url: "https://raw.githubusercontent.com/Semporia/Clash/master/Rule/China.yaml",
      interval: 3600,
    }
  Dler:
    {
      type: http,
      behavior: classical,
      path: ./Rule/Dler.yaml,
      url: "https://raw.githubusercontent.com/Semporia/Clash/master/Rule/Dler.yaml",
      interval: 3600,
    }
  GitHub:
    {
      type: http,
      behavior: classical,
      path: ./Rule/GitHub.yaml,
      url: "https://raw.githubusercontent.com/Semporia/Clash/master/Rule/GitHub.yaml",
      interval: 3600,
    }
  Google:
    {
      type: http,
      behavior: classical,
      path: ./Rule/Google.yaml,
      url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Google/Google.yaml",
      interval: 3600,
    }
  Microsoft:
    {
      type: http,
      behavior: classical,
      path: ./Rule/Microsoft.yaml,
      url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Microsoft/Microsoft.yaml",
      interval: 3600,
    }
  Netflix:
    {
      type: http,
      behavior: classical,
      path: ./Rule/Netflix.yaml,
      url: "https://raw.githubusercontent.com/Semporia/Clash/master/Rule/Netflix.yaml",
      interval: 3600,
    }
  Spotify:
    {
      type: http,
      behavior: classical,
      path: ./Rule/Spotify.yaml,
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.yaml",
      interval: 3600,
    }
  Speedtest:
    {
      type: http,
      behavior: classical,
      path: ./Rule/Speedtest.yaml,
      url: "https://raw.githubusercontent.com/Semporia/Clash/master/Rule/Speedtest.yaml",
      interval: 3600,
    }
  Steam:
    {
      type: http,
      behavior: classical,
      path: ./Rule/Steam.yaml,
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Steam/Steam.yaml",
      interval: 3600,
    }
  Telegram:
    {
      type: http,
      behavior: classical,
      path: ./Rule/Telegram.txt,
      format: text,
      url: "https://ruleset.skk.moe/Clash/ip/telegram.txt",
      interval: 3600,
    }
  TelegramIP:
    {
      type: http,
      behavior: classical,
      format: text,
      interval: 43200,
      url: https://ruleset.skk.moe/Clash/ip/telegram.txt,
      path: ./Rule/telegram_ip.txt,
    }
  Twitter:
    {
      type: http,
      behavior: classical,
      path: ./Rule/Twitter.yaml,
      url: "https://raw.githubusercontent.com/Semporia/Clash/master/Rule/Twitter.yaml",
      interval: 3600,
    }
  YouTube:
    {
      type: http,
      behavior: classical,
      path: ./Rule/YouTube.yaml,
      url: "https://raw.githubusercontent.com/Semporia/Clash/master/Rule/YouTube.yaml",
      interval: 3600,
    }
  PayPal:
    {
      type: http,
      behavior: classical,
      path: ./Rule/PayPal.yaml,
      url: "https://raw.githubusercontent.com/Semporia/Clash/master/Rule/PayPal.yaml",
      interval: 3600,
    }
  Discord:
    {
      type: http,
      behavior: classical,
      path: ./Rule/Discord.yaml,
      url: "https://raw.githubusercontent.com/Semporia/Clash/master/Rule/Discord.yaml",
      interval: 3600,
    }
  Proxy:
    {
      type: http,
      behavior: classical,
      path: ./Rule/Proxy.yaml,
      url: "https://raw.githubusercontent.com/Semporia/Clash/master/Rule/Proxy.yaml",
      interval: 3600,
    }
  Bilibili:
    {
      type: http,
      behavior: classical,
      path: ./Rule/Bilibili.yaml,
      url: "https://raw.githubusercontent.com/Semporia/Clash/master/Rule/BiliBili.yaml",
      interval: 3600,
    }
  AI:
    {
      type: http,
      behavior: classical,
      path: ./Rule/AI.txt,
      url: "https://ruleset.skk.moe/Clash/non_ip/ai.txt",
      format: text,
      interval: 3600,
    }
  PJSK:
    type: http
    behavior: classical
    path: ./RuleSet/Extra/Game/pjsk.yaml
    url: https://ghproxy.com/https://raw.githubusercontent.com/StarWishsama/ext-clash-modifier/main/rulesets/pjsk.yaml
    interval: 86400 
`;

export default { remove, append };
