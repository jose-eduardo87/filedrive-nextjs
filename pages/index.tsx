import { FC } from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@/components/common";
import { Container } from "@/components/ui";
import { Welcome } from "@/components/sections";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "welcome"])),
    },
  };
};

const HomePage: NextPage & { Layout: FC } = ({}: InferGetStaticPropsType<
  typeof getStaticProps
>) => {
  return (
    <>
      <Container>
        <Welcome />
      </Container>
    </>
  );
};

HomePage.Layout = Layout;

export default HomePage;
