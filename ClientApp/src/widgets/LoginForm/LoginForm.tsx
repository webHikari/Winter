import { useState } from "react";
import AuthForm from "@shared/AuthForm/AuthForm";
import Input from "@shared/Input/Input";
import Button from "@shared/Button/Button";
import logo from "@shared/assets/logo.svg";
import styles from "./ui/LoginForm.module.css";

export default function RegisterForm({ setAuth }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isEmailCorrect, setIsEmailCorrect] = useState(true);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!value.length) {
      setIsEmailCorrect(true);
      return;
    }
    setIsEmailCorrect(Boolean(validateEmail(value)));
  };

  const validateEmail = (email: string): RegExpMatchArray | null => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(email);
    console.log(password);
    try {
      console.log("Loading...");
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const parseRes = await response.json();
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      } else {
        console.log(response.body);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.Container}>
      <AuthForm>
        {/* <h1>Sign in form</h1> */}
        <img src={logo} alt="Winter" />
        <h1>
          Welcome to <text>Winter</text>
        </h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {!isEmailCorrect ? <p>Incorrect email</p> : null}
            <Input
              styleType="Input1"
              placeholderValue="Your email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <Input
              styleType="Input1"
              placeholderValue="Your password"
              value={password}
              type="password"
              onChange={handlePasswordChange}
              required
            />
            <Button styleType="Button1" onClick={handleSubmit} />
          </>
        )}
      </AuthForm>
    </div>
  );
}
