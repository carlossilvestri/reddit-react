import React from "react";
import { ErrorMsgComponentProps } from "../../interfaces";

export const ErrorMsgComponent = ({ msg }: ErrorMsgComponentProps) => {
  return (
    <div className="alert alert-danger" role="alert">
      { msg }
    </div>
  );
};
