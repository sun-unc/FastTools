const { exec } = require("child_process");

// 定时发起请求的间隔（以毫秒为单位）
const interval = 5000; // 5秒

// 要执行的 curl 命令
const curlCommand = `curl 'https://api.m.jd.com/client.action?functionId=newBabelAwardCollection&body={%22activityId%22:%227ooZUnJ6JSgpdyqUNzqJVsmAd5U%22,%22scene%22:1,%22args%22:%22key=24A3221FDCD05340181FFBDD9F95E81A93710689C4AD2A5F4708D1102143874186BCB97280F660645087AC74837ACE15_bingo,roleId=62B8463C23BFCA12876A56FB49467670BFA35B5A229AF7D735148B1D36D0CA4AFFA2C0B1E3260F8E65EC54B9377BEFBD2C59C318D873652C79E4E6D6BC5A94DE6D42C5A353D20D81193C8CD109F6A2F3801A0096041B7B845AACE4E87CD2FFEC4B5F66E49168F1B4BC5C80EB75A8330B48B1A479EEF2A9187A238E3879B82DDCBF6B54A98E2967E18CFA63093601C75CACB41E6E94AAB47AEFF1DC03AEFA88F4_bingo,strengthenKey=19F512DCD8EE34ABE9C4FB4A92C2F42A300D470735EF4C042370C069E1ECE0BE_bingo%22}&client=wh5' \
-H 'Host: api.m.jd.com' \
-H 'Connection: keep-alive' \
-H 'Cache-Control: max-age=0' \
-H 'Upgrade-Insecure-Requests: 1' \
-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/6.8.0(0x16080000) MacWechat/3.8.3(0x13080310) XWEB/30817 Flue' \
-H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
-H 'Sec-Fetch-Site: none' \
-H 'Sec-Fetch-Mode: navigate' \
-H 'Sec-Fetch-User: ?1' \
-H 'Sec-Fetch-Dest: document' \
-H 'Accept-Language: zh-CN,zh' \
--cookie 'mba_muid=1698110731411636543543; b_dw=777; b_dh=881; b_dpr=1; b_webp=1; b_avif=1; shshshfpa=56713635-6342-6b2a-197a-3a068cbe61e7-1698110732; shshshfpx=56713635-6342-6b2a-197a-3a068cbe61e7-1698110732; wxa_level=1; TrackerID=vMCOh2XEmtmOkQnA6Vh6xZXjIZxLfVSO-lwRE0T5GdVME99c_kUpvheJ26a5GF1hCMc7Ws9q2A9xvxODssZmULHqV1EU7xd8nwhyUobie46MxXValBgfO4l_czlLKEUaWDypmNPA1hKpB6d3eT-jEg; pt_key=AAJlNx4yADC6Ec2eapQn412L_sqlKoev65iYLmD-1N96x9zBeCakI4pliU6-b6sUz3BwT09jhhc; pt_pin=jd_MGamCRrFZzBO; pt_token=s5wns0x0; pwdt_id=jd_MGamCRrFZzBO; sfstoken=tk01ma0551c09a8sMSsxai9ESlV6mEeOPdSPHCR/4FUV2iSEaZjLEvvH8U0+DSxBRbYid6dXTvrg9PloEisbbaiVfD74; unpl=JF8EAKJnNSttWR5RBBMKGBoQGF8HW18LSERTbzRRXA5cGFAGSFZIEhh7XlVdXxRLFh9sYhRUXVNKVQ4ZAysSFHtdVV9cDEoUC25uNWRVUCVXSBtsGHwTBhAZbl4IexYzb2ANXV1YSlIHGwcbEhdJWlBbXwxOFTNvYTVUW2h7ZAQrAysTIAAzVRNdD0MeA29mA1ZdXUtUAhkFHxcST1hWbl8ISxAHX2Q; retina=0; cid=1; jxsid=16981164316053838338; webp=1; visitkey=6686405830368251862; 3AB9D23F7A4B3CSS=jdd03UA75XJNSEPZZRGNVRS7Q2CNFJRFSXVIQAQEALJ2KS2KC4Q3QGYKB7VWACPVY7NDGXFKN2CTWP7ZWTX7I5YUHQRS4PYAAAAMLL6QHBHYAAAAAD56DPUO6XKUV3IX; __jda=122270672.1698110731411636543543.1698110731.1698110731.1698116432.2; __jdv=122270672%7Ckong%7Ct_1000502908_%7Cjingfen%7C0d4099291b3b4322ba1be9b5b52beb19%7C1698116432811; shshshfpb=AAll1oF-LEgC151ZCeoRpKlh3Is8qgK46rNSbwQAAAAA; joyya=1698116433.1698116434.32.1jiu6x0; __jdu=1698110731411636543543; 3AB9D23F7A4B3C9B=UA75XJNSEPZZRGNVRS7Q2CNFJRFSXVIQAQEALJ2KS2KC4Q3QGYKB7VWACPVY7NDGXFKN2CTWP7ZWTX7I5YUHQRS4PY' \
`;

function sendCurlRequest() {
  exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
    } else {
      console.log(`Curl output: ${stdout}`);
      if (stdout.includes("成功")) {
        console.log(`领取成功🏅！！！！！！！！！！！！！！`);
        clearInterval(timer);
      }
    }
  });
}

// 初始发送请求
// sendCurlRequest();

let timer = null;
// 指定目标时间点
const targetTime = new Date("2023-10-24T19:33:00").getTime();
getTimeDis();
function getTimeDis() {
  // 计算距离目标时间的时间差
  const currentTime = Date.now();
  const delay = Math.max(targetTime - currentTime, 0); // 保证时间差不为负值
  console.log(delay);
  if (delay > 500) {
    setTimeout(() => {
      getTimeDis();
    }, 10);
  } else {
    // 设置定时器以重复发送请求
    timer = setInterval(() => {
      sendCurlRequest();
    }, interval);
  }
}
