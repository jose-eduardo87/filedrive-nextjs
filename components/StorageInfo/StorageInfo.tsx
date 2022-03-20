import { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useTheme } from "store/theme-context";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface StorageInfoProps {
  freeSpace: number;
  usedSpace: number;
  title: string;
}

const StorageInfo: FC<StorageInfoProps> = ({ freeSpace, usedSpace, title }) => {
  const { isDark } = useTheme();
  const DATA = {
    labels: ["Free", "Used"],
    datasets: [
      {
        data: [freeSpace, usedSpace],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: isDark ? "#CECECE" : "#FFFFFF",
      },
    ],
  };
  return (
    <>
      <small
        style={{ textAlign: "center", marginBottom: "1rem", color: "#000000" }}
      >
        {title}
      </small>
      <Pie data={DATA} />
    </>
  );
};

export default StorageInfo;
