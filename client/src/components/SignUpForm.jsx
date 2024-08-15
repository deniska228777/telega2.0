import React, { useState } from "react";
import Form from "./Form";
import Input from "./Input";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router";
import PassAndCheckbox from "./PassAndCheckbox";
import ErrorDiv from "./ErrorDiv.jsx";
import Wrapper from "./Wrapper";

export default function SignUpForm({ btn }) {
  const user = useAuth();
  const action = "/auth/signup";
  const method = "post";
  const [errMsg, setErrMsg] = useState("");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const disabled = !data.username || !data.email || !data.password;
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  if (user.email) {
    return <Navigate to="/" replace />;
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    await user.SignUp(data);
    setErrMsg(localStorage.getItem("signupErr"));
  };
  return (
    <>
      <Form
        action={action}
        method={method}
        onSubmit={onSubmit}
        className="SignUpForm"
        content={
          <div className="formDiv">
            <ErrorDiv errMsg={errMsg} />
            <h1>Sign Up!</h1>
            <div className="inputDiv">
              <Input
                type="text"
                onChange={onChangeInput}
                name="username"
                placeholder="Username"
                value={data.username}
              />
              <Input
                type="email"
                onChange={onChangeInput}
                name="email"
                placeholder="Email"
                value={data.email}
              />
              <PassAndCheckbox
                value={data.password}
                onChange={onChangeInput}
                className="password"
              />
              {btn}
              <Wrapper style={{ bR: "10px", margin: "20px" }}>
                <button type="submit" disabled={disabled}>
                  Sign Up
                </button>
              </Wrapper>
            </div>
          </div>
        }
      />
    </>
  );
}
