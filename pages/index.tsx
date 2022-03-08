import { FC } from "react";
import type { NextPage } from "next";
import { Layout } from "@/components/common";
import { Container } from "@/components/ui";
import { Welcome } from "@/components/sections";

const HomePage: NextPage & { Layout: FC } = () => {
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
