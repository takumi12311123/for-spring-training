import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom"
import axios from "axios";

interface Tweets {
  userName: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const response = {
    tweetList : [
      {
    userName: "yoshiki",
    content: "hello",
    createdAt: "2021-09-01",
    }]}
  const navigate = useNavigate()
  const [newTweet, setNewTweet] = useState("");
  const [tweetList, setTweetList] = useState<Tweets[]>(response.tweetList);
  const [search, setSearch ] = useState('') 
  const handleSignOut = () => {
    navigate('/login')
  }
  const handleTweetChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTweet(event.target.value)}
  
  const handleTweetSubmit = () => {
    try {
      if(newTweet !== ""){
        const newTweets = [...tweetList, {userName: "yoshiki", content: newTweet, createdAt: "2021-09-01"}]
        setTweetList(newTweets)
        setNewTweet("")
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = (e:any) =>{
    setSearch(e.target.value)
  }
  const handleSearchPost = () => {
    console.log('検索:', search)
    const res = "hello"
  }

  return (
    <MDBContainer className="mt-5  w-screen" >
      <MDBBtn color='danger' rounded className='float-start w-2' onClick={handleSignOut}>{' '}
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
                <MDBInput wrapperClass="mb-2" placeholder={search} label="Search" onChange={handleSearch} />
                <MDBBtn className="float-end" onClick={handleSearchPost}>検索</MDBBtn>
              </div>
              <div
                className="mb-4"
                style={{ maxHeight: "400px", overflow: "scroll" }}
              >

              {/* tweet表示部分 */}
              {tweetList.map((data: Tweets, index: number) =>(
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
              )
              )}
              </div>
              <p className="border-top pt-2">message</p>
              <MDBTextArea style={{ backgroundColor: '#fff'}}className = "text-dark" color="primary" contrast id='textAreaExample' label='message' rows={4} onChange={handleTweetChange}></MDBTextArea>
              <MDBBtn color='primary' rounded className='float-end mt-2' onClick={handleTweetSubmit}>{' '}
                Send{' '}
              </MDBBtn>
    
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}