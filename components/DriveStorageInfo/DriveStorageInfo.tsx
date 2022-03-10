import { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface StorageInfoProps {
  freeSpace: number;
  usedSpace: number;
}

const DriveStorageInfo: FC<StorageInfoProps> = ({ freeSpace, usedSpace }) => {
  const DATA = {
    labels: ["Free", "Used"],
    datasets: [
      {
        data: [freeSpace, usedSpace],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      },
    ],
  };
  return (
    <>
      <small style={{ textAlign: "center", marginBottom: "1rem" }}>
        Storage information
      </small>
      <Pie data={DATA} />
    </>
  );
};

export default DriveStorageInfo;
