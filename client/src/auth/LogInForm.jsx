import { useState } from "react";
import Form from "../components/Form.jsx";
import Input from "../components/Input.jsx";
import { useAuth } from "./AuthProvider.js";
import { Navigate } from "react-router";
import PassAndCheckbox from "./PassAndCheckbox.jsx";
import ErrorDiv from "../components/ErrorDiv.jsx";
import Wrapper from "../components/Wrapper.jsx";
import { useForm } from "react-hook-form";
import styles from "../pages/CP.module.css";

export default function LogInForm({ btn }) {
  const { register, handleSubmit } = useForm();
  const user = useAuth();
  const [errMsg, setErrMsg] = useState("");
  
  if (user.email) {
    return <Navigate to="/" replace />;
  }

  async function onSubmit(data) {
    await user.Login(data);
    setErrMsg(localStorage.getItem("loginErr"));
    setTimeout(() => {
      setErrMsg("");
    }, 10000);
  }

  return (
    <Form
      action="/auth/login"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.LoginForm}
      content={
        <div className={styles.formDiv}>
          <ErrorDiv errMsg={errMsg} />
          <h1>Log In</h1>
          <div className={styles.inputDiv}>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              className={styles.email}
              {...register("email", { required: true })}
            />
            <PassAndCheckbox
              className={styles.password}
              register={register("password")}
            />
            {btn}
            <Wrapper style={{ bR: "0px", margin: "20px" }}>
              <button type="submit" value="Log In">
                Log In
              </button>
            </Wrapper>
          </div>
        </div>
      }
    />
  );
}
