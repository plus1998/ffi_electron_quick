## Doc

> TypeScript + Electron + Vite + Vue3 + ElementUI + ffi-napi

本项目通过注册user32.dll，使用了获取窗口句柄、移动窗口、设置前台窗口函数示例演示了FFI的注册、调用。

如需引用外部dll，在 src/main/ 下新建 library 目录，将dll置于其中，从 config.ts 导入 libDir 引用

前端使用 Vue3.x + ElementUI + Vite 方案、并编写了主进程与渲染进程通讯示例，轻松上手。

> 如需更新任何依赖，请自行测试

> 另外，在我的仓库中有大漠插件的调用示例

## ENV

node 12.18.3-x86

- choco install python visualcpp-build-tools -y

## Install

务必使用yarn安装、或者根据yarn.lock版本安装依赖

- yarn config set registry https://registry.npm.taobao.org

- yarn

- yarn rebuild

## Run

- yarn dev

## Build

- yarn build

- /dist/ffi_electron_quick_setup_0.0.1.exe

## 交流

QQ交流群： 210932685
