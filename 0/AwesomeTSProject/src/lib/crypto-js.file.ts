import * as CryptoJS from 'crypto-js';

const u8array = {
  /**
   * Converts a word array to a Uint8Array.
   *
   * @param {WordArray} wordArray The word array.
   * @return {Uint8Array} The Uint8Array.
   * @static
   * @example
   *
   * var u8arr = CryptoJS.enc.u8array.stringify(wordArray);
   */
  stringify: function (wordArray: { words: any; sigBytes: any }) {
    // Shortcuts
    const words = wordArray.words;
    const sigBytes = wordArray.sigBytes;
    // Convert
    const u8 = new Uint8Array(sigBytes);
    for (let i = 0; i < sigBytes; i++) {
      u8[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }
    return u8;
  },
  /**
   * Converts a Uint8Array to a word array.
   *
   * @param {string} u8Str The Uint8Array.
   * @return {WordArray} The word array.
   * @static
   * @example
   *
   * var wordArray = CryptoJS.enc.u8array.parse(u8arr);
   */
  parse: function (u8arr: Uint8Array) {
    // Shortcut
    const len = u8arr.length;
    // Convert
    const words: any[] = [];
    for (let i = 0; i < len; i++) {
      words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
    }
    return CryptoJS.lib.WordArray.create(words, len);
  },
};
// CryptoJS.enc.u8array = u8array;
// 字符串转字节数组的方法
function stringToBytes(str: string) {
  let ch;
  let st = [];
  let re: any[] = [];
  for (let i = 0; i < str.length; i++) {
    ch = str.charCodeAt(i); // get char
    st = []; // set up "stack"
    do {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      st.push(ch & 0xff); // push byte to stack
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ch = ch >> 8; // shift value down by 1 byte
    } while (ch);
    // add stack contents to result
    // done because chars have "wrong" endianness
    re = re.concat(st.reverse());
  }
  // return an array of bytes
  return re;
}

// 将上面下载的图片转为base64编码，并处理key和iv的格式
// 解密方式和后端商定为为CBC模式
function process(buffer: ArrayBuffer, key: string, iv: string) {
  // 密钥转字节数组(16位)
  const keyBy = stringToBytes(key);
  const ivBy = stringToBytes(iv);

  // 字节数组转Uint8Array
  const keyBv = new Uint8Array(keyBy);
  const ivBv = new Uint8Array(ivBy);

  // Uint8Array转WordArray
  const keyWA = u8array.parse(keyBv);
  const ivWA = u8array.parse(ivBv);
  const view = new Uint8Array(buffer);

  // 将Uint8Array 转成 WordArray
  const contentWA = u8array.parse(view);
  // base64字符串
  const dcBase64String = contentWA.toString(CryptoJS.enc.Base64);

  // 解密
  const decryptedData = CryptoJS.AES.decrypt(dcBase64String, keyWA, {
    iv: ivWA,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // 把解密后的对象再转为base64编码,这步是关键,跟解密文字不同
  const d64 = decryptedData.toString(CryptoJS.enc.Base64);
  return 'data:image/png;base64,' + d64;
}

export async function urlToBuffer(url: string, key: string, iv: string) {
  const response = await fetch(url).then((res) => res.arrayBuffer());
  return process(response, key, iv);
}

// ajax获取图片为arraybuffer格式
/*export function urlToBuffer(url: string, key: string, iv: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const url = process(xhr.response, key, iv);
          resolve(url);
        } else {
          retry(url, key, iv);
        }
      }
    };
    xhr.send();
  });
  // 如果获取图片失败,尝试再获取一次 ，图片较少且尺寸较小的话不需要重新获取
function retry(url: string, key: string, iv: string) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    if (xhr.status === 200) {
      process(xhr.response, key, iv);
    }
  };
  xhr.send();
}
}*/
