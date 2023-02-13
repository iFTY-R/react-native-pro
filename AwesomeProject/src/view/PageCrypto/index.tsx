import React, { useMemo, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { urlToBuffer } from '../../lib/crypto-js.file';

export default function PageCryptoImageIndex() {
  const imgUrl =
    'http://app.cdn.chuniaocloud.site/ig/admin_video/061209/RrT8/51H7/d41c3d85d49a2e25e47690f48c323734.ceb';
  const key = '4iiSDPQCACPZT2E9iR477bcTankaWhr8';
  const iv = '8209658041411076';
  const [result, setResult] = useState<string>('');
  urlToBuffer(imgUrl, key, iv).then((res) => {
    // setResult(res);
  });
  return (
    <View>
      <Text> {imgUrl}</Text>
      <Text> {result}</Text>
      <Image
        style={{ width: 200, height: 200 }}
        resizeMode="stretch"
        source={{ uri: imgUrl }}
      />
    </View>
  );
}
