import { FC } from "react";
import { Carousel } from "react-responsive-carousel";
import { StorageInfoProps } from "@/components/StorageInfo/StorageInfo";

import "react-responsive-carousel/lib/styles/carousel.css";

interface SliderProps {
  components: {
    Component: FC<StorageInfoProps>;
    freeSpace: number;
    usedSpace: number;
    title: string;
  }[];
}

const Slider: FC<SliderProps> = ({ components }) => {
  return (
    <Carousel
      autoPlay={true}
      interval={5000}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      emulateTouch={true}
      infiniteLoop={true}
    >
      {components.map(({ Component, freeSpace, usedSpace, title }, index) => (
        <div key={index}>
          {
            <Component
              freeSpace={freeSpace}
              usedSpace={usedSpace}
              title={title}
            />
          }
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
