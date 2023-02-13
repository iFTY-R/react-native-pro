import {
  Button,
  Dimensions,
  Image,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {Component} from 'react';
import RNFS, {
  DownloadBeginCallbackResult,
  DownloadProgressCallbackResult,
} from 'react-native-fs';

export default class FsDemoPage2 extends Component {
  state = {sourceFile: 'file:///', downloadProgress: 0};
  _create = () => {
    RNFS.mkdir(RNFS.DocumentDirectoryPath + '/mydata'); //新建目录
    //新建文件，并写入内容
    RNFS.writeFile(
      RNFS.DocumentDirectoryPath + '/test.txt',
      '一次学习，处处填坑',
      'utf8',
    ).then(() =>
      console.log(RNFS.DocumentDirectoryPath + '/test.txt 创建完成'),
    );
  };
  _read = () => {
    RNFS.readDir(RNFS.DocumentDirectoryPath).then(result => {
      result.forEach(file => {
        //读取常用文件特性
        console.log(file.size, file.path, file.isFile());
        //读取具体文件的内容
        if (file.path.endsWith('.txt')) {
          RNFS.readFile(file.path, 'utf8').then(content =>
            console.log({path: file.path, content}),
          );
        }
      });
    });
  };
  _delete = () => {
    RNFS.unlink(RNFS.DocumentDirectoryPath + '/test.txt').then(() =>
      console.log('test.txt 已经被删除'),
    );
  };
  _download = () => {
    let downloadUrl = 'https://reactnative.dev/img/tiny_logo.png';
    let target =
      RNFS.DocumentDirectoryPath + '/' + downloadUrl.split('/').slice(-1); //取出ice.jpeg
    console.log(target);
    let options = {
      fromUrl: downloadUrl,
      toFile: target,
      begin: (res: DownloadBeginCallbackResult) => {
        ToastAndroid.show(
          `size:${res.contentLength},type:${res.headers['Content-Type']}`,
          ToastAndroid.SHORT,
        );
      },
      progress: (res: DownloadProgressCallbackResult) => {
        console.log(res);
        this.setState({
          // a/width = b/c
          downloadProgress: res.bytesWritten / res.contentLength,
        });
      },
    };
    RNFS.downloadFile(options).promise.then(res => {
      console.log(res);
      this.setState({downloadProgress: 1});
      this.setState({sourceFile: 'file://' + target});
    });
  };

  render() {
    const {width, height} = Dimensions.get('window');

    return (
      <View>
        <Button onPress={this._create} title="创建文件及目录" />

        <Button onPress={this._read} title="读目录及文件的演示" />
        <Button onPress={this._delete} title="删除文件的演示" />

        <Button onPress={this._download} title="下载文件的演示" />
        <Text> {(this.state.downloadProgress * 100).toFixed(2)}% </Text>
        <View style={{borderColor: 'red', borderWidth: 1}}>
          <Text
            style={{
              height: 20,
              width: this.state.downloadProgress * width - 2,
              backgroundColor: 'green',
            }}
          />
        </View>
        <Image
          style={{width: 200, height: 200}}
          resizeMode="stretch"
          source={{uri: this.state.sourceFile}}
        />
      </View>
    );
  }
}
