import { FC } from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@/components/common";
import { Container } from "@/components/ui";
import { Login } from "@/components/sections";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale!, [
        "common",
        "login",
        "loginform",
      ])),
    },
  };
};

const LoginPage: NextPage & { Layout: FC } = ({ locale }: InferGetStaticPropsType<
  typeof getStaticProps
>) => {
  return (
    <Container>
      <Login currentLocale={locale} />
    </Container>
  );
};

LoginPage.Layout = Layout;

export default LoginPage;
