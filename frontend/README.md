# フロントエンド編

## 1. はじめに

はいどうも、フロントエンド編担当です。フロントエンドって聞いてぱっとしない方もいると思いますが要は見た目部分をぱぱっと作ってしまおう編です。

今回は2月に学んでもらった React を使ってフロントエンドを実装してもらう訳ですが、 React を開発したのはかの有名な Facebook です。バックエンド編でザッカーバーグが出てきたのは実は伏線だったのかもしれませんね。

バックエンド同様質問は受け付けます。Slackで@!田中善貴（田中以外のメンバー）までお願いします。

## 2. React アプリの起動

ターミナルを開いて、for-spring-training 上でコンテナ起動

```
docker-compose up
```

「localhost:3000」(http://localhost:3000)を開き以下の初期画面になっていたら正常です。

## 3. 初期画面の変更

では実際にフロントエンド開発をしていきましょう。

まずは下記コマンドを実行します。

```
frontend % npm install react-bootstrap bootstrap
```

このコマンドを実行することで React Bootstrap が使用できるようになります。
今回はUIをReact Bootstrapを使用して作成していきます。
React Bootstrapの詳細が気になる方は、こちらを見てください

App.ts
```　
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

```









