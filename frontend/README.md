# フロントエンド編

## 1. はじめに

はいどうも、フロントエンド編担当です。フロントエンドって聞いてぱっとしない方もいると思いますが要は見た目部分をぱぱっと作ってしまおう編です。

今回は 2 月に学んでもらった React を使ってフロントエンドを実装してもらう訳ですが、React を開発したのはかの有名な Facebook です。バックエンド編でザッカーバーグが出てきたのは実は伏線だったのかもしれませんね。

バックエンド同様質問は受け付けます。Slack で質問お願いします。

## 2. React アプリの起動

ターミナルを開いて、for-spring-training 上でコンテナ起動

```
docker-compose up
```

「localhost:3000」(http://localhost:3000)を開き以下の初期画面になっていたら正常です。

## 3. 初期画面の変更

では実際にフロントエンド開発をしていきましょう！

<!-- どこで実行すればいいか書いた方がいいかも？ -->

## 4.ディレクトリ、ファイルの作成

今回の frontend のディレクトリ構造は、このようになっています。

```
 src
 ├── pages
 │   ├── Signup.tsx
 │   ├── Login.tsx
 │   └── Home.tsx
 ├── App.tsx
 └── index.tsx

```

## 5.App.tsx 　(ページ遷移制御)

まずは、app/src/App.tsx に下記のコードをコピー

App.tsx

```tsx　
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

App.tsx では、React Router を用いて、ページの遷移を設定しています。
今回は、Home(<Home/>)が tweet 実行、表示画面、Login がログイン画面(<Login/>)Signup(<Signup/>)がサインアップ画面です。

<!-- react routerの説明があってもいいかも？ -->

## 6.Signup.tsx 　(サインアップ画面)

次に、Signup 画面を作成していきます。
まずは、app/src/pages/Signup.tsx に下記のコードをコピー

Signup.tsx

```tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import axios from "axios";

// サインアップ処理
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //axiosでpostを送る部分
    try {
      const response = await axios.post("http://localhost:3002/users/create", {
        name: name,
        email: email,
        password: password,
      });
      sessionStorage.setItem("id", response.data.id);
      sessionStorage.setItem("name", response.data.name);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0 d-flex align-items-center">
          <MDBCol md="4">
            <MDBCardImage
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              alt="phone"
              className="rounded-t-5 rounded-tr-lg-0"
              fluid
            />
          </MDBCol>

          <MDBCol md="8">
            <MDBCardBody>
              <form onSubmit={handleSignUp}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="name"
                  id="form1"
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="form1"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
                <div className="d-flex justify-content-between mx-4 mb-4">
                  <a href="/login">Already have an account?</a>
                </div>
              </form>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
```

次に、Signup.tsx のコードを説明していきます。

```tsx
const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  try {
    //axiosでpost
    const response = await axios.post("http://localhost:3002/users/create", {
      name: name,
      email: email,
      password: password,
    });
    //sesionStrageにidとnameを保存
    sessionStorage.setItem("id", response.data.id);
    sessionStorage.setItem("name", response.data.name);
    //ページ遷移
    navigate("/");
  } catch (error) {
    console.error(error);
    s;
  }
};
```

この handleSignUp 関数が実行されると、axios というライブラリを使用して非同期処理による HTTP 通信を行ないます。その後取得したユーザーの`id`と`name`を`sessionStorage`を使用してクライアント側に保存しています。

そして処理が成功した場合には、`navigate('/');`で、処理が終わった後に画面の遷移を行なっています。

Axios は、JavaScript／TypeScript で非同期 API 呼び出しを容易にするライブラリのことです。
https://axios-http.com/

Signup．tsx の form の中身

```tsx
<form onSubmit={handleSignUp}>
  <MDBInput
    wrapperClass="mb-4"
    label="name"
    id="form1"
    type="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  <MDBInput
    wrapperClass="mb-4"
    label="Email address"
    id="form1"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <MDBInput
    wrapperClass="mb-4"
    label="Password"
    id="form2"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
  <div className="d-flex justify-content-between mx-4 mb-4">
    <a href="/login">Already have an account?</a>
  </div>
</form>
```

`<form onSubmit={handleSignUp}>`の中の onSubmit は、form の中の button(今回では、`<MDBBtn className="mb-4 w-100">Sign up</MDBBtn>`)が押された際に動くものです。従ってボタンが押された際に、上記で説明した、handleSignUp 関数が動くことになります。

## 7.Login.tsx 　（ログイン画面）

まずは、app/src/pages/Login.tsx に下記のコードをコピー

```tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //axiosでpost
      const response = await axios.post("http://localhost:3002/users/login", {
        email: email,
        password: password,
      });
      //sessionStrageにidとnameを保存
      sessionStorage.setItem("id", response.data.id);
      sessionStorage.setItem("name", response.data.name);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0 d-flex align-items-center">
          <MDBCol md="4">
            <MDBCardImage
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              alt="phone"
              className="rounded-t-5 rounded-tr-lg-0"
              fluid
            />
          </MDBCol>

          <MDBCol md="8">
            <MDBCardBody>
              <form onSubmit={handleSignIn}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="form1"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>

                <div className="d-flex justify-content-between mx-4 mb-4">
                  <a href="signup">Create a new account?</a>
                </div>
              </form>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}
export default Login;
```

次に、Login.tsx のコードを説明していきます。

handleSignIn 関数

```tsx
const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  try {
    //axiosでpost
    const response = await axios.post("http://localhost:3002/users/login", {
      email: email,
      password: password,
    });
    // レスポンスの中身を確認
    sessionStorage.setItem("id", response.data.id);
    sessionStorage.setItem("name", response.data.name);
    navigate("/");
  } catch (error) {
    console.error(error);
  }
};
```

handleSignIn 関数は実行されると、Signup の時と同様に、axios というライブラリを使用して非同期処理による HTTP 通信を行います。

Login．tsx の form の中身

```tsx
<form onSubmit={handleSignIn}>
  <MDBInput
    wrapperClass="mb-4"
    label="Email address"
    id="form1"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <MDBInput
    wrapperClass="mb-4"
    label="Password"
    id="form2"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>

  <div className="d-flex justify-content-between mx-4 mb-4">
    <a href="signup">Create a new account?</a>
  </div>
</form>
```

form で囲われているため、ボタンが押された際に(`<MDBBtn className="mb-4 w-100">Sign in</MDBBtn>`)、Signup.tsx で説明したのと同様に、handleSignUp 関数が動くことになります。

## 8.Home.tsx (Tweet 投稿・表示画面)

次に、Tweet 投稿・表示画面画面を作成していきます。
まずは、app/src/pages/Home.tsx に下記のコードをコピー

Home.tsx

```tsx
import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTextArea,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Tweets = {
  userName: string;
  content: string;
  createdAt: string;
};

export default function Home() {
  // 遷移するための関数
  const navigate = useNavigate();

  // ーーーーーツイート取得----------
  // ツイートの一覧を管理するstate
  const [tweetList, setTweetList] = useState<Tweets[]>([]);
  // 全件のツイートを取得する処理
  const getTweetList = async () => {
    const response = await axios.get("http://localhost:3002/tweets");
    setTweetList(response.data.tweetList);
  };
  useEffect(() => {
    // 全件のツイートを取得する処理を呼ぶ関数
    getTweetList();
  }, []);

  // ーーーーーツイート投稿----------
  // 入力欄のツイートの内容を管理するstate
  const [newTweet, setNewTweet] = useState("");
  // ツイートの内容を変更する処理
  const handleTweetChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTweet(event.target.value);
  };
  // ツイートを投稿する処理
  const handleTweetSubmit = async () => {
    try {
      if (newTweet !== "") {
        await axios.post("http://localhost:3002/tweets", {
          id: Number(sessionStorage.getItem("id")),
          content: newTweet,
        });
        //  ツイートを投稿したら全件のツイートを再取得する処理を呼ぶ関数
        getTweetList();
      }
      //  ツイートを投稿したらツイートの内容を空にする処理
      setNewTweet("");
    } catch (error) {
      console.error(error);
    }
  };

  // ーーーーー検索の処理----------
  // 検索欄の内容を管理するstate
  const [search, setSearch] = useState("");
  //  検索欄の内容を変更をする処理
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  // 検索ボタンを押した時の処理
  const handleSearchPost = async (e: any) => {
    e.preventDefault();
    // 検索欄の内容が空の場合は全件のツイートを取得する処理を呼ぶ関数
    // 検索欄の内容が空でない場合は検索結果のツイートを取得する処理を呼ぶ関数
    search === "" ? getTweetList() : getSearchTweetList();
  };
  // 検索結果のツイートを取得する処理
  const getSearchTweetList = async () => {
    const res = await axios.post("http://localhost:3002/tweets/search", {
      text: search,
    });
    setTweetList(res.data.tweetList);
  };

  // サインアウトの処理
  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <MDBContainer className="mt-5  w-screen">
      <MDBBtn
        color="danger"
        rounded
        className="float-start w-2"
        onClick={handleSignOut}
      >
        sign-out
      </MDBBtn>
      <MDBRow className="justify-content-center w-100">
        <MDBCol md="8" lg="6">
          <MDBCard
            className="shadow-0 border"
            style={{ backgroundColor: "#f0f2f5" }}
          >
            <MDBCardBody>
              {/* 検索部分 */}
              <form className="mb-6" onSubmit={handleSearchPost}>
                <MDBInput
                  wrapperClass="mb-2"
                  placeholder={"ツイートを検索"}
                  value={search}
                  label="Search"
                  onChange={handleSearch}
                />
                <MDBBtn className="float-end" type="submit">
                  検索
                </MDBBtn>
              </form>
              <div
                className="mb-4"
                style={{ maxHeight: "400px", overflow: "scroll" }}
              >
                {/* tweet表示部分 */}
                {tweetList.map((data: Tweets, index: number) => (
                  <MDBCard className="mb-4" key={index}>
                    <MDBCardBody>
                      <p className="float-end">{data.createdAt}</p>
                      <div className="d-flex justify-content-between mb-3">
                        <div className="d-flex flex-row align-items-center pl">
                          <MDBCardImage
                            src="https://cdn.w3.org/thumbnails/200/avatars/7mtpjeh4in8kw04ksso8ss4ocsksswo.webp"
                            alt="avatar"
                            width="25"
                            height="25"
                          />
                          <p className="small mb-3 ms-2">{data.userName}</p>
                        </div>
                      </div>
                      <p className="">{data.content}</p>
                    </MDBCardBody>
                  </MDBCard>
                ))}
              </div>
              <p className="border-top pt-2">message</p>
              <MDBTextArea
                style={{ backgroundColor: "#fff" }}
                className="text-dark"
                color="primary"
                contrast
                id="textAreaExample"
                label="message"
                value={newTweet}
                rows={4}
                onChange={handleTweetChange}
              ></MDBTextArea>
              <MDBBtn
                color="primary"
                rounded
                className="float-end mt-2"
                onClick={handleTweetSubmit}
              >
                Send
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
```
