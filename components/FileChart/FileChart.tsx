import { FC } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { useTheme } from "store/theme-context";
import { BAR_COLORS } from "helpers/constants";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export interface FilesChart {
  size: number;
  fileName: string;
}

export interface FileChartProps {
  type: string;
  files: FilesChart[];
  title: string;
}

const FileChart: FC<FileChartProps> = ({ type, files, title }) => {
  const { isDark } = useTheme();
  const labels: string[] = [];
  const data: number[] = [];

  // populate labels and data by looping into files props
  files.map(({ fileName, size }) => {
    labels.push(fileName);
    data.push(+(size * 0.00000095367432).toFixed(2));
  });

  const DATA = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: BAR_COLORS.slice(0, files.length),
      },
    ],
    borderWidth: 1,
  };

  return (
    <>
      <small
        style={{ textAlign: "center", color: isDark ? "#BDBDBD" : "#000000" }}
      >
        {title}
      </small>
      {type === "PolarArea" ? (
        <PolarArea redraw={true} data={DATA} />
      ) : (
        <PolarArea redraw={true} data={DATA} />
      )}
    </>
  );
};

export default FileChart;
