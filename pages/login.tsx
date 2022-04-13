import { FC } from "react";
import Head from "next/head";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@/components/common";
import { Container } from "@/components/ui";
import { Login } from "@/components/sections";

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
}) => {
  const session = await getSession({ req });

  //  in case an already logged in user tries to access the login page, they will be redirected to the home page.
  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

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

const LoginPage: NextPage & { Layout: FC } = ({
  locale,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Log in</title>
        <meta
          name="description"
          content="Log in Page. Log in to your account by choosing one of the available log in options."
        />
      </Head>
      <Container>
        <Login currentLocale={locale} />
      </Container>
    </>
  );
};

LoginPage.Layout = Layout;

export default LoginPage;
