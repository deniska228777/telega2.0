import { useState, useEffect } from "react";
import Form from "./Form";
import Input from "./Input.jsx";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router";
import PassAndCheckbox from "./PassAndCheckbox";
import ErrorDiv from "./ErrorDiv";
import Wrapper from "./Wrapper";

export default function LogInForm({ btn }) {
  const user = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const disabled = !data.email || !data.password;
  const [errMsg, setErrMsg] = useState("");
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
  async function onSubmit(e) {
    e.preventDefault();
    await user.Login(data);
    setErrMsg(localStorage.getItem("loginErr"));
    setTimeout(() => {
      setErrMsg("");
    }, 10000);
  }
  return (
    <>
      <Form
        action="/auth/login"
        method="post"
        onSubmit={onSubmit}
        className="LoginForm"
        content={
          <div className="formDiv">
            <ErrorDiv errMsg={errMsg} />
            <h1>Log In</h1>
            <div className="inputDiv">
              <Input
                type="email"
                placeholder="Email"
                onChange={onChangeInput}
                name="email"
                value={data.email}
              />
              <PassAndCheckbox
                value={data.password}
                onChange={onChangeInput}
                className="password"
              />
              {btn}
              <Wrapper style={{ bR: "10px", margin: "20px" }}>
                <button type="submit" value="Log In" disabled={disabled}>
                  Log In
                </button>
              </Wrapper>
            </div>
          </div>
        }
      />
    </>
  );
}
