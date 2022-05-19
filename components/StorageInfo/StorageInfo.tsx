import { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { useTheme } from "store/theme-context";
import { useUserInfo } from "store/userinfo-context";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface StorageInfoProps {
  type: string;
  freeSpace: number;
  usedSpace: number;
  title: string;
}

const StorageInfo: FC<StorageInfoProps> = ({
  type,
  freeSpace,
  usedSpace,
  title,
}) => {
  const { language } = useUserInfo();
  const { isDark } = useTheme();
  const labels = language === "en" ? ["Free", "Used"] : ["Livre", "Usado"];
  const OPTIONS = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: isDark ? "#BDBDBD" : "#000000",
        },
      },
    },
  };
  const DATA = {
    labels,
    datasets: [
      {
        data: [freeSpace, usedSpace],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: isDark ? "#FF8B3D" : "#FFFFFF",
        borderWidth: 1.2,
      },
    ],
  };

  return (
    <>
      <small
        style={{ textAlign: "center", color: isDark ? "#BDBDBD" : "#000000" }}
      >
        {title}
      </small>
      {type === "Pie" ? (
        <Pie redraw={true} options={OPTIONS} data={DATA} />
      ) : (
        <Doughnut redraw={true} options={OPTIONS} data={DATA} />
      )}
    </>
  );
};

export default StorageInfo;
