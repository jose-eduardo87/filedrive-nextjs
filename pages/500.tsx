import { FC } from "react";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@/components/common";
import { Container } from "@/components/ui";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "welcome"])),
    },
  };
};

const ErrorPage: NextPage & { Layout: FC } = ({}: InferGetStaticPropsType<
  typeof getStaticProps
>) => {
  return (
    <>
      <Head>
        <title>Capybara Drive - Your files, everywhere!</title>
        <meta
          name="description"
          content="Capybara Drive - Cloud storage. This demo application comes with no practical usage. It is purely designed to be part of my personal Portfolio."
        />
      </Head>
      <Container>
        <h1>ERROR PAGE!!!</h1>
      </Container>
    </>
  );
};

ErrorPage.Layout = Layout;

export default ErrorPage;
