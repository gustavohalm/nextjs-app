import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type UserProps = {
  id: BigInteger;
  name: string;
  email: string;
  checking: {
    id: BigInteger;
    fund: BigInteger;
    userId: BigInteger;
  } | null;
  saving: {
    id: BigInteger;
    fund: BigInteger;
    userId: BigInteger;
  } | null;
};

const User: React.FC<{ user: UserProps }> = ({ user }) => {

  return (
  <></>
  );
};

export default User;
