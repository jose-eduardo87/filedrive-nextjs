import { FC } from "react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import prisma from 'lib/prisma';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "@/components/common";
import { Container } from "@/components/ui";
import { Welcome } from "@/components/sections";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // await prisma.user.create({
  //   data: {
  //     name: "Eduardo",
  //     email: "test@test.com",
  //     password: "test1234",
  //     passwordConfirm: "test1234",
  //     files: {
  //       create: [
  //         {
  //           fileName: 'File-01.exe',
  //           size: 245.27
  //         }
  //       ]
  //     }
  //   }
  // });

  // await prisma.file.create({
  //   data: {
  //     fileName: "File-02.jpeg",
  //     size: 129.13,
  //     ownerId: 'cl1kpdv8y00004sfj0xw44r8c'
  //   }
  // })

const users = await prisma.user.findMany({
  include: {
    files: true
  }
});

console.log(users);

// await prisma.user.deleteMany();
// await prisma.file.deleteMany();


  return {
    props: {
      // users: JSON.stringify(users),
      ...(await serverSideTranslations(locale!, ["common", "welcome"])),
    },
  };
};

const HomePage: NextPage & { Layout: FC } = ({users}: InferGetStaticPropsType<
  typeof getStaticProps
>) => {
  // console.log(users)
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
