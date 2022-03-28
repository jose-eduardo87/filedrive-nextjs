import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { FC } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@/components/common";
import { Container } from "@/components/ui";
import { SignUp } from "@/components/sections";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "signupform"])),
    },
  };
};

const SignUpPage: InferGetStaticPropsType<typeof getStaticProps> = () => (
  <Container>
    <SignUp />
  </Container>
);

SignUpPage.Layout = Layout;

export default SignUpPage;
