import { FC } from "react";
import { NextPage } from "next";
import { Layout } from "@/components/common";
import { Container } from "@/components/ui";
import { Login } from "@/components/sections";

const LoginPage: NextPage & { Layout: FC } = () => {
  return (
    <Container>
      <Login />
    </Container>
  );
};

LoginPage.Layout = Layout;

export default LoginPage;
