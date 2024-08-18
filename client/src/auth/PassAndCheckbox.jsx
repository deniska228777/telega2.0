import { useRef } from "react";
import Input from "../components/Input";
import styles from '../pages/CP.module.css'

export default function PassAndCheckbox({ className, register }) {
  const { ref, ...rest } = register;
  const passRef = useRef("");
  const checkboxRef = useRef("");
  const divRef = useRef("");
  function checkboxChange() {
      if (checkboxRef.current.checked) {
        passRef.current.type = "text";
      } else {
        passRef.current.type = "password";
      }
  }
  return (
    <div
      className={styles.passAndCheck}
      ref={divRef}
      onFocus={() =>
        (divRef.current.style.border = "1px solid var(--active-green)")
      }
      onBlur={() => (divRef.current.style.border = "1px solid transparent")}
    >
      <Input
        type="password"
        placeholder="Password"
        className={className}
        ref={(e) => {
          ref(e)
          passRef.current = e;
        }}
        name="password"
        {...rest}
      />
      <Input
        type="checkbox"
        ref={checkboxRef}
        onChange={checkboxChange}
        className={styles.checkbox}
      />
    </div>
  );
}
