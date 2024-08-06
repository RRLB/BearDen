// ErrorMessage.js
import React from "react";
import s from "./style.module.css"; // Add your CSS styles here

export const ErrorMessage = ({ message }) => {
  return <div className={s.error}>{message}</div>;
};
