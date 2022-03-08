import { NextPage } from "next";
import { FC } from "react";
import { Layout } from "@/components/common";
import { Container } from "@/components/ui";
import { SignUp } from "@/components/sections";

const SignUpPage: NextPage & { Layout: FC } = () => (
  <Container>
    <SignUp />
  </Container>
);

SignUpPage.Layout = Layout;

export default SignUpPage;
