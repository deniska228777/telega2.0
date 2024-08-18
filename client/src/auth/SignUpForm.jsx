import React, { useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import { useAuth } from "../auth/AuthProvider.js";
import { Navigate } from "react-router";
import PassAndCheckbox from "./PassAndCheckbox";
import ErrorDiv from "../components/ErrorDiv.jsx";
import Wrapper from "../components/Wrapper";
import { useForm } from "react-hook-form";
import styles from "../pages/CP.module.css";

export default function SignUpForm({ btn }) {
  const { register, handleSubmit } = useForm();
  const user = useAuth();
  const action = "/auth/signup";
  const method = "post";
  const [errMsg, setErrMsg] = useState("");
  
  if (user.token) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (data) => {
    await user.SignUp(data);
    setErrMsg(localStorage.getItem("signupErr"));
  };

  return (
    <Form
      action={action}
      method={method}
      onSubmit={handleSubmit(onSubmit)}
      className={styles.SignUpForm} 
      content={
        <div className={styles.formDiv}>
          <ErrorDiv errMsg={errMsg} />
          <h1>Sign Up!</h1>
          <div className={styles.inputDiv}>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              className={styles.username}
              {...register("username", { required: true })}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.email}
              {...register("email", { required: true })}
            />
            <PassAndCheckbox
              className={styles.password}
              register={register("password")}
            />
            {btn}
            <Wrapper style={{ bR: "0px", margin: "20px" }}>
              <button type="submit">
                Sign Up
              </button>
            </Wrapper>
          </div>
        </div>
      }
    />
  );
}
