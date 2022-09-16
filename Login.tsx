import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from './Login.module.scss';
import { LoginCreate } from "./LoginCreate";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  return (
    <section className={styles.login}>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/cadastro" element={<LoginCreate/>}/>
        </Routes>
    </section>
  )
}
