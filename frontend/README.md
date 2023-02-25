# フロントエンド編

## 1. はじめに

はいどうも、フロントエンド編担当です。フロントエンドって聞いてぱっとしない方もいると思いますが要は見た目部分をぱぱっと作ってしまおう編です。

今回は2月に学んでもらったReactを使ってフロントエンドを実装してもらう訳ですが、Reactを開発したのはかの有名な Facebook です。バックエンド編でザッカーバーグが出てきたのは実は伏線だったのかもしれませんね。

バックエンド同様質問は受け付けます。Slackで質問お願いします。

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
今回のfrontendのディレクトリ構造は、このようになっています。

~~~
 src
 ├── pages
 │   ├── Signup.tsx
 │   ├── Login.tsx
 │   └── Home.tsx
 ├── App.tsx
 └── index.tsx

~~~


## 5.App.tsx　(ページ遷移制御)

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

App.tsxでは、React Routerを用いて、ページの遷移を設定しています。
今回は、Home(<Home/>)がtweet実行、表示画面、Loginがログイン画面(<Login/>)Signup(<Signup/>)がサインアップ画面です。

<!-- react routerがあってもいいかも？ -->

## 6.Signup.tsx　(サインアップ画面)

次に、Signup画面を作成していきます。
まずは、app/src/pages/Signup.tsx に下記のコードをコピー

Signup.tsx
```tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import axios from 'axios';

function Signup() {
  // サインアップ処理の画面
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = axios.post('http://localhost:3002/users/create', {
        name: name, 
        email: email,
        password: password
      });
      navigate('/');
    } catch (error) {
        console.error(error);
    }
  };
  return (
    <MDBContainer className='my-5'>
      <MDBCard>
        <MDBRow className='g-0 d-flex align-items-center'>
          <MDBCol md='4'>
            <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>
          <MDBCol md='8'>
            <MDBCardBody>
              <form onSubmit={handleSignUp}>
                <MDBInput wrapperClass='mb-4' label='name' id='form1' type='name' value={name} onChange={(e) => setName(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
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

export default Signup;
```


次に、Signup.tsxのコードを説明していきます。

```tsx
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = axios.post('http://localhost:3002/users/create', {
        name: name, 
        email: email,
        password: password
      });
      navigate('/');
    } catch (error) {
        console.error(error);
    }
  };
```
<!-- 日本語直す -->
このhandleSignUp関数が実行されると、httpリクエストのpostが実行されます。
axiosを用いて、通信を行なっています。
``
navigate('/');
``で、処理が終わった後に画面の遷移が行われています。

<!-- axiosについての説明をしたいかも？＞ -->


```tsx
<MDBCardBody>
  <form onSubmit={handleSignUp}>
    <MDBInput wrapperClass='mb-4' label='name' id='form1' type='name' value={name} onChange={(e) => setName(e.target.value)}/>
    <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
    <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
    <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
    <div className="d-flex justify-content-between mx-4 mb-4">
      <a href="/login">Already have an account?</a>
    </div>
  </form>
</MDBCardBody>
```
``<form onSubmit={handleSignUp}>``の中のonSubmitは、formの中のbutton(今回では、``<MDBBtn className="mb-4 w-100">Sign up</MDBBtn>``)が押された際に動くものです。従ってボタンが押された際に、上で説明した、handleSignUp関数が動くことになります。


## 7.Login.tsx　（ログイン画面）

まずは、app/src/pages/Login.tsx に下記のコードをコピー

```tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/users/login', {
        email: email, 
        password: password
      });
      setUserInfo(response.data);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      console.log(response.data)
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MDBContainer className='my-5'>
      <MDBCard>

        <MDBRow className='g-0 d-flex align-items-center'>

          <MDBCol md='4'>
            <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol md='8'>

            <MDBCardBody>

              <form onSubmit={handleSignIn}>
                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

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

次に、Login.tsxのコードを説明していきます。


handleSignIn関数
```tsx
const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/users/login', {
        email: email, 
        password: password
      });
      setUserInfo(response.data);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      console.log(response.data)
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
```

handleSignIn関数は、Signupの時と同様に、関数が実行されると、httpリクエストのpostが実行されます。


```tsx
  <form onSubmit={handleSignIn}>
    <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
    <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

    <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>

    <div className="d-flex justify-content-between mx-4 mb-4">
      <a href="signup">Create a new account?</a>
    </div>
  </form>
```

ボタンが押された際に(``<MDBBtn className="mb-4 w-100">Sign in</MDBBtn>``)、Signup.tsxで説明したのと同様に、handleSignUp関数が動くことになります。

## 8.Home.tsx (Tweet投稿・表示画面)

次に、Tweet投稿・表示画面画面を作成していきます。
まずは、app/src/pages/Home.tsx に下記のコードをコピー

Home.tsx
```tsx
import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTextArea,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Tweets {
  userName: string;
  content: string;
  createdAt: string;
}

interface User {
  email: string;
}

export default function Home() {
  const response = {
    tweetList: [
      {
        userName: "yoshiki",
        content: "hello",
        createdAt: "2021-09-01",
      },
    ],
  };
  const navigate = useNavigate();
  const [newTweet, setNewTweet] = useState("");
  const [tweetList, setTweetList] = useState<Tweets[]>(response.tweetList);
  const [search, setSearch] = useState("");
  const [userInfo, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    if(storedUserInfo){
      setUser(storedUserInfo);
    } else {
      navigate('/login');
    }
  }, []);

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("userInfo")
    navigate("/login");
  };

  const handleTweetChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTweet(event.target.value);
  };

  const handleTweetSubmit = () => {
    try {
      if (newTweet !== "") {
        const newTweets = [
          ...tweetList,
          { userName: "yoshiki", content: newTweet, createdAt: "2021-09-01" },
        ];
        setTweetList(newTweets);
        setNewTweet("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleSearchPost = () => {
    console.log("検索:", search);
    const res = "hello";
  };

  return (
    <MDBContainer className="mt-5  w-screen">
      <MDBBtn
        color="danger"
        rounded
        className="float-start w-2"
        onClick={handleSignOut}
      >
        {" "}
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
              <div className="mb-6">
                <MDBInput
                  wrapperClass="mb-2"
                  placeholder={search}
                  label="Search"
                  onChange={handleSearch}
                />
                <MDBBtn className="float-end" onClick={handleSearchPost}>
                  検索
                </MDBBtn>
              </div>
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
                rows={4}
                onChange={handleTweetChange}
              ></MDBTextArea>
              <MDBBtn
                color="primary"
                rounded
                className="float-end mt-2"
                onClick={handleTweetSubmit}
              >
                {" "}
                Send{" "}
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
```












