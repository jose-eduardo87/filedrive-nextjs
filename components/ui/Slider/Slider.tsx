import { FC } from "react";
import { useRouter } from "next/router";
import { Carousel } from "react-responsive-carousel";
import { StorageInfoProps } from "@/components/StorageInfo/StorageInfo";

import "react-responsive-carousel/lib/styles/carousel.css";

interface SliderProps {
  components: {
    Component: FC<StorageInfoProps>;
    freeSpace: number;
    usedSpace: number;
    title: string;
    type: string;
  }[];
}

const Slider: FC<SliderProps> = ({ components }) => {
  const { locale } = useRouter();

  return (
    <Carousel
      autoPlay={true}
      interval={3500}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      showIndicators={false}
      emulateTouch={true}
      infiniteLoop={true}
    >
      {components.map(
        ({ Component, type, freeSpace, usedSpace, title }, index) => (
          <div key={index}>
            {
              <Component
                type={type}
                freeSpace={freeSpace}
                usedSpace={usedSpace}
                title={title}
              />
            }
            <small
              style={{
                fontSize: ".6rem",
                color: "#FF7F50",
                textAlign: "right",
              }}
            >
              <em>
                {locale === "en"
                  ? "* Values shown in MB."
                  : "* Valores exibidos em MB."}
              </em>
            </small>
          </div>
        )
      )}
    </Carousel>
  );
};

export default Slider;
