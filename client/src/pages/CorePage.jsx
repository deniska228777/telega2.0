import { useState } from "react";
import styles from "./CP.module.css"; 
import SignUpForm from "../auth/SignUpForm";
import LogInForm from "../auth/LogInForm";
import Wrapper from "../components/Wrapper";

export default function CorePage() {
  const [formType, setFormType] = useState("signup");
  const btn = (
    <button
      type="button"
      className={styles.changedButton}
      onClick={(e) => {
        e.stopPropagation();
        setFormType(formType === "signup" ? "login" : "signup");
      }}
    >
      {formType === "signup"
        ? "Already have an account? Log In!"
        : "Don't have an account? Sign Up!"}
    </button>
  );

  return (
    <div className={styles.forms}>
      <Wrapper style={{ bR: "0px" }}>
        {formType === "signup" ? (
          <SignUpForm btn={btn} />
        ) : (
          <LogInForm btn={btn} />
        )}
      </Wrapper>
    </div>
  );
}
