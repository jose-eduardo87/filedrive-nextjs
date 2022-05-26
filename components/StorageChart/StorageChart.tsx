import { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { useTheme } from "store/theme-context";
import { useUserInfo } from "store/userinfo-context";
import { BAR_COLORS } from "helpers/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface StorageChartProps {
  type: string;
  freeSpace: number;
  usedSpace: number;
  title: string;
}

const StorageChart: FC<StorageChartProps> = ({
  type,
  freeSpace,
  usedSpace,
  title,
}) => {
  const { language } = useUserInfo();
  const { isDark } = useTheme();
  const labels = language === "en" ? ["Free", "Used"] : ["Livre", "Usado"];
  const OPTIONS = {
    responsive: true,
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
        backgroundColor: BAR_COLORS.slice(0, 2),
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

export default StorageChart;
