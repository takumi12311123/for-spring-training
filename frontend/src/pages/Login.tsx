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

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/users/login", {
        email: email,
        password: password,
      });
      // レスポンスの中身を確認
      console.log(response.data);
      sessionStorage.setItem("id", response.data.id);
      sessionStorage.setItem("name", response.data.name);
      // localStorageの中身をログで確認
      console.log(sessionStorage.getItem("id"));
      console.log(sessionStorage.getItem("name"));
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
                  {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
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
