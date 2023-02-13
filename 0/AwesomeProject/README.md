启动  Android Studio 编译完成关闭
启动雷电模拟器之后，检查 adb是否已经连接
adb.exe devices
如果没有，则可以手动连接
adb.exe connect 127.0.0.1:5559
启动项目，yarn android
