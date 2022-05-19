import { FC } from "react";
import { StorageChart } from "@/components/StorageChart";
import { FileChart } from "@/components/FileChart";
import { useUserInfo } from "store/userinfo-context";
import { Carousel } from "react-responsive-carousel";
import { FilesChart } from "@/components/FileChart/FileChart";

import "react-responsive-carousel/lib/styles/carousel.css";

interface SliderProps {
  axis: "horizontal" | "vertical";
  chartType: "storage" | "file";
  chartInfo: {
    title: string;
    type: string;
    freeSpace?: number;
    usedSpace?: number;
    files?: FilesChart[];
  }[];
}

const Slider: FC<SliderProps> = ({ axis, chartType, chartInfo }) => {
  const { language } = useUserInfo();
  let renderChart: JSX.Element[];

  if (chartType === "storage") {
    renderChart = chartInfo.map(
      ({ type, freeSpace, usedSpace, title }, index) => (
        <div key={index}>
          {
            <StorageChart
              type={type}
              freeSpace={freeSpace!}
              usedSpace={usedSpace!}
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
              {language === "en"
                ? "* Values shown in MB."
                : "* Valores exibidos em MB."}
            </em>
          </small>
        </div>
      )
    );
  } else {
    renderChart = chartInfo.map(({ title, type, files }, index) => (
      <div key={index}>
        {<FileChart type={type} title={title} files={files!} />}
        <small
          style={{
            fontSize: ".6rem",
            color: "#FF7F50",
            textAlign: "right",
          }}
        >
          <em>
            {language === "en"
              ? "* Values shown in MB."
              : "* Valores exibidos em MB."}
          </em>
        </small>
      </div>
    ));
  }

  return (
    <Carousel
      axis={axis}
      autoPlay={true}
      interval={3500}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      showIndicators={false}
      emulateTouch={true}
      infiniteLoop={true}
    >
      {renderChart}
    </Carousel>
  );
};

export default Slider;
