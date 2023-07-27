import { WebView } from 'react-native-webview';
import { View, Text, Button } from 'react-native';
import { useRef, useState } from 'react';
import { OnShouldStartLoadWithRequest, WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

const cookie = `cf_chl_2=ed1dd91ebfa7746; cf_clearance=qgNl_Rp2bJtw4eZms4_2BslOBPgABiZ2_sRabSTvInk-1676516061-0-1-b2b480fe.41b9a490.e38c1259-160; _cfuvid=1IdxoutPY.yP3HmQTIhh7mAl2WngGUq.9HTq8r1pYjo-1676516061230-0-604800000; __Host-next-auth.csrf-token=a97e7ef4c0dd24f17e6da6e9a129a177277b31d3ab6ad75eb4cd722ef39d120b%7C401ac46480228987a5a100df931abff4cf5f1d68142a63bea3933d4d55c7dcd1; __Secure-next-auth.callback-url=https%3A%2F%2Fchat.openai.com%2Fchat; cf_clearance=xvU7ZxkVg964FRMkHcmBzxDTEAb8_ycLS2PlNJzkDK0-1676516132-0-1-b2b480fe.41b9a490.e38c1259-160; _ga=GA1.2.1386696469.1676516135; _gid=GA1.2.1505544375.1676516135; __cf_bm=.tw3rhvVXgqb914nIROD3K6AOpNLoml2JzNLU_wSjMY-1676516807-0-AUwJdnZFFvYgRlXCztBC69Z22t1Mc4fWT6ukJmDWKJa5+WK5YVOC8VzPNjxGWnD6f/iY7XPm0YoqYakazx8HHzs=; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..3pV77mt3qvJ1wM4g.J92DNU3LooYsjr3vAbqr6U_pHaAt-a7wBmErMEyLRE0yPFHT7Sg1nLYBv3TPA5P6osEEct_pssimBB_IYHk0_7ghgosfru8Ue2qTixB5zFQ_SPvhgvS9c50qxZIeucUJkhnCQjAz1OT7ps1sEBDfQuuIYz7Nfgz0RGeVGV0QvD3-8EY3CSRpfvhfOHrHHZKRFXLaQyFMUm_I_hG0MQlyoD0KkcU5Fv9_wkx8I5jUHChRqy-kbpBWwTHPbDOX7YGMwBrEqeqtyE0lhfAmbJQ6IJbArn4eQaH3jBj3tD_bQa_Uy5vKsg52YygHBYNDXceklmH9BNzBUvu8PM8lylxgR3HpRTgdLW7F5_l7De_m4HBsIzMpFcRnFw9yruFrzJ5lgHzRnoFk1inayToTDMXIwFoS0ePkgeRXxY2SZbsGXyIqINjEcuxRm-NwJa1mV8VYVDcrXyiOgNP4xqPtXm82cfOLZyVb7tYpy-hG8DJPMCrA_ZLcdXDiqk1MqL3cPOcDQYjMyos0bqIU5AJGTAl0SFXz3YvTML2_aQoaHeitMigh2x8mfZY8FiTqYoMZ_qoZCGyPXZ3aQFsxHWx8d_V3XVMGXs1KzbVP0kqxhFBQw1E8YmwqSOGWB1F_pkti3zwBMuq3MkDbSzn5C73kREOfOJrQGPH-BSstGCgSdqVqq55PoZf_Lp2py3x_srwjAlRHNYubUKp08aN5EFqj2GW2x8WDtimSj_EibBTE8MWmMVzw3EswLQcrV2D3jPmpeuy8akdKHFYmB_0ssbg-BXFw_kjtqY7L-pZZJCWljvCik2ahcuU1t0Xghc-mLxroAAPeMeoB4XrZxTzq42zHmg_q4fEvxqEGQuv_MBxlibydJ242a30w9keSJmqcd1h41kSbB86EClWv7xygNEllZDjdC7YvMemm4TVyzq7LiYYOiIBoD4sZIAPypY4SkfiN6dYMrDEZtQHV9UZGTcku6udn3Yt569qNZMpF0YlQ7amd9PjWOMYDW2oIdrWKYJagEeZ-Z8FBsk-EIrM_gEntSTvTt5qUGGc1DsVM00VZ28JnH87eQAypwROXq_URGWfDPFDXXmcrMVDOBr0NcytabxTiJuc6pmlkboRzwplpsEXEGrwRlVAb3moZ4uEq7e4LjzOoqcii0VVW5BfsRhUisLuufH3BECc67U48soTz4pUYGlly36a-Rl3rXnB9pv20elaYhCf3_ETlD8BhiMYfiFgumQGRIL9w9B2RMErmoT4foFskrAwnMvuzRN-BfiR5MwCWDPcmybw40MLi6O6CjEPDXKR8frRPQVn8DxRkDq_y0Fu4lpsb1m55GfK_wPgxNPjxZTx7UvHOSL2C7d1LomhmuD1tp7FP0LqGjp8gkfodnWsiDai8k7JLaJmhWIbjggh2QsxA_VW5BtDZapaca9DEI1pUsPJ-iwjejHyCfjk6ZZHmlSXQJ0qaFmuvrcpIflOUPGdxK6W767bGngSmjb2VDNj1d4K4EebaGd3J-mda9seQvVFYyJd9uYoXXZECZsjOv1UVhzCq_vKAHK_StK2Gg2p_hzKBnGLLi44ObuMfIoI2gTq_a18BLR3TCcnQWzj4Vcv2wDh9m1wNgo9yJB-uYLUBkjE5T5pDNRuf5eomNm4aEf_zVdaD79N_t64BWVcO83TTJGyzp1ZsNUMQCOdNlU-5XjYus-2sHeSI3qOzijXFrVYOHAfasavfsP6FxBq55zso4rvfgOrZV2mAa4YDwuwiaTrWFJilwXWuEOVA0OZLeeiuudmfEEWamkO3ztKZM4Ej5nZhMFfKc9HfQu_uzRAUWFggEVA1jHio29jBxBHqsOVHEO8ch35B0Of1nbhdHk5DYmzRXkgxidomw8jQOWqOSuiBBCqfjWYZDuA8XlhffkscwvLH_QFwvz-jqh1pMW_yLDMmiEMlhZ82nZ6PQy_lW3nSRGtxqknzwD4_2HDVJ_QaofNPkhIqO2fx2qtAEJf6HXQfONbwUyAlWyP9C4LFVdKKDLOn6wh_lJVIBPgOB10wurZ9EpEtIU7hQyHWnnVmbC_nGhiQOFm084KPpfGT-EVQoRNwomYFmXc5qEvOIFIDksUigCJudsSBbYANhTnDgcYpEPRed2L2TCKPdbmJ4JZXNyG6zsWKTIcD3e-CcbEVC5oyIMEm09Vl3B-azBunqgKXnKY7Zg4NOW5uZkUwO-F4Qaec9VfzVC7ICiWdVyV6Bj1Npxi1eVdcbyH9JRE9jVRCjAMIiQ46tKiPww-lgaARKh8v9Ay5D_Ntpac0PQn8fV2yfBBzQ1f2n3zak0peWqvYhqTAlbTfU4LDnN-49c6FuLOT4nW5lU62HqOraK50BjdaN5fsavrANgDHdMETlVU8ZTxAGy3eQ5WXYxsqOUBF8jPv55_jr0u5hWZN1KECzU95f6GhXSOis2q6i5Imr3of-nD2ljNVfz7oXZDMkxpk6dZn_Rjm2dAYlmpKWQmBtymrwDv7uoUz-pHUJDhwNzszYRHsg5cCDYVReLTSLXE7ety1y8CvVlBb4oTSjl0-dD52T177qndBwFe0I39TzoswFkWoWAiCd_lvKD5-Upp-_OQ2WGByq-qr0s-gGSzz8RgTV-f-wEg.X8MXWUibZUahvGu1omN6ZA; __cf_bm=oLY.2dU6VmHGHRzXc4st7RFW1GE6W7o_zyOtFXySeWo-1676516335-0-Afec3BJSJerPzLN3mI4qNMii66hcQEY162ajwFLZPr0GwmaLLL8Llr1k4RFZnIzVlRi9NQB49bomGfH+lzb5JO4=`;

const headers = {
  Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJpZnR5X2FAMTI2LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW9pcF9jb3VudHJ5IjoiS1IifSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLVFDZVkyQUZ2YTB5SXRKUWlkaEUxN3ZHQyJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiYXV0aDB8NjNlZDk3YzE5MDhlMmIzMmNjMDY1YTBjIiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3NjUxNjMwOCwiZXhwIjoxNjc3NzI1OTA4LCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9mZmxpbmVfYWNjZXNzIn0.armV17CyvYOmOc_f8sOTDoYkUkuiMlRMmXGy_BaOPWFSZsW2nSEiLqmZ1yxsQj3-FQFRYJT1W_XVJdNBPVY2aPB8YawRbzGH90AQ-JbninTOHJwznKEVMKuUGsiBlkUfi9EcHQzo57HpcZm9iIruvWAzgafyBvUkRPKXAByRY1PiahfbevFl16KoftDCW4xSXDzbPLe7MOUVtLb_ggrkRFyLvtr1edlf6Xw-BR5g-Zh7sMCXV-wODKjy3oj0Nn1vGX9Up8pcNjB5bg7-t-wwPx5np1L1fcmL14n0VeVu_mb-m0zAyWb5UjmdqtARZa0f1bkDf2BqZeRltHvfgu7ZUw',
};
const html = `
  <html lang="zh">
    <body>
      <h1>Local Storage Demo</h1>
      <button onclick="setData()">Set Data</button>
      <button onclick="getData()">Get Data</button>
      <p id="data"></p>
      <script >
        function setData() {
          localStorage.setItem('myData', 'Hello World');
        }
        function getData(){
         const data = localStorage.getItem('getData');
         const p = document.querySelector('#data');
         p.innerHTML = data;
        }
    </script>
  </body>
</html>
  `;

const WebViewWithCookie = () => {

  const webViewRef = useRef<WebView>(null);

  const handleReload = () => {
    webViewRef.current!.reload();
  };
  const handleGoBack = () => {
    webViewRef.current!.goBack();
  };

  const beautifyStyles = `
form~div {
    display:none !important;
}
#__next > div.relative > div.hidden > div > div > nav > a:nth-child(5) {
    display: none !important;
}
#__next > div.relative > div.hidden > div > div > nav > a:nth-child(6) {
    display: none !important;
}`
  const setCookieScript = `
    document.cookie = ${cookie};
    document.body.innerHTML = document.cookie;
    
    function beautifyPage(){
        console.log('beautify start....');

        const style = document.createElement('style');
        style.innerHTML ='${beautifyStyles}';
        document.head.appendChild(style);
    }
    window.onload = () => {
        beautifyPage();
    }
    // window.ReactNativeWebView.postMessage(cookie);
  `;

  const handleShouldStartLoadWithRequest = (event: any) => {
    // const { url } = event;
    // 在此处处理您的逻辑，决定是否允许 WebView 加载新页面
    return true; // 如果允许加载新页面，则返回 true
  };
  return (
      /*
        source={{ html: '<h1>This is a static HTML source!</h1>' }}
        source={{ uri: 'https://reactnative.dev/' }}
        thirdPartyCookiesEnabled  启用第三方 cookie 的布尔值WebView。仅在 Android Lollipop 及更高版本上使用，因为默认情况下在 Android Kitkat 及以下版本和 iOS 上启用第三方 cookie。默认值为true。
      */
      <View style={{ width: '100%', height: '100%' }}>
        <View style={{ flexDirection: 'row' }}>
          <Button title="Reload" onPress={handleReload} />
          <Button title="GoBack" onPress={handleGoBack} />
        </View>
        <WebView
            ref={webViewRef}
            // source={{ html }}
            source={{
              uri: 'https://chat.openai.com/chat',
              headers,
            }}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            thirdPartyCookiesEnabled={true}
            pullToRefreshEnabled={true}
            injectedJavaScript={setCookieScript}
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        />
      </View>
  );
};


export default WebViewWithCookie;
