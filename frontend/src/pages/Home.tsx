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
