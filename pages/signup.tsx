import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@/components/common";
import { Container } from "@/components/ui";
import { SignUp } from "@/components/sections";

export const getServerSideProps: GetServerSideProps = async ({ locale, req }) => {
  const session = await getSession({ req });

  // in case an already logged in user tries to access the signup page, they will be redirected to the home page.
  if(session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "signupform"])),
    },
  };
};

const SignUpPage: NextPage & { Layout: FC } = ({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) => (
  <Container>
    <SignUp />
  </Container>
);

SignUpPage.Layout = Layout;

export default SignUpPage;
