import trjData from "/Users/sun/Desktop/绕越模拟轨迹数据/ry4.json";
import { WriteFile } from "../File/writeFile";
const outFile = "/Users/sun/Desktop/绕越模拟轨迹数据/trjPoints/ry.json";
const R = 6371000; // 地球半径（单位：米）
const stepMeters = 2.5; // 间隔距离（单位：米）
const disHeight = 33.2674865722656 - 26.6013412475586;
let pointResult: Point[] = [];
type Point = number[];
/**
 *
 * @param start 起点经纬度
 * @param end 终点经纬度
 * @param stepMeters 间距
 * @return 生成start到end的间隔stepMeters的所有点形成的轨迹
 */
function getPointsBetweenCoordinates(
  start: Point,
  end: Point,
  stepMeters: number
) {
  // 转换为弧度
  const lat1 = start[1] * (Math.PI / 180);
  const lng1 = start[0] * (Math.PI / 180);
  const lat2 = end[1] * (Math.PI / 180);
  const lng2 = end[0] * (Math.PI / 180);

  const d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin((lat2 - lat1) / 2), 2) +
          Math.cos(lat1) *
            Math.cos(lat2) *
            Math.pow(Math.sin((lng2 - lng1) / 2), 2)
      )
    );

  const totalSteps = Math.floor(d / stepMeters);
  for (let i = 1; i <= totalSteps; i++) {
    const f = i / totalSteps;
    const lat = Math.asin(Math.sin(lat1) * (1 - f) + Math.sin(lat2) * f);
    const lng = lng1 + (lng2 - lng1) * f;
    // pointsStr =
    //   pointsStr +
    //   "100000000" +
    //   JSON.stringify({
    //     frame_num: 0,
    //     timeStamp: 0,
    //     fuse_data: [
    //       {
    //         id: 1000000004405,
    //         uid: 0,
    //         cls: 0,
    //         clsStr: "未定义目标",
    //         V_x: -0.49,
    //         V_y: 28.59,
    //         speed: 0,
    //         bbox: null,
    //         lcstatus: null,
    //         x: 7.44,
    //         y: 98.15,
    //         radian: 0,
    //         acceleration: 0,
    //         position: [lng * (180 / Math.PI), lat * (180 / Math.PI)],
    //         kind: 0,
    //         coo_x: 0,
    //         coo_y: 0,
    //         idLane: 3,
    //         plateNumber: "",
    //         plateColor: "",
    //         plateType: "",
    //         vehicleColor: "",
    //         time: 1695371743804,
    //         DeviceID: "k2",
    //         color: "",
    //         Vehicle_type: "",
    //         DeviceNumber: "",
    //         probability: 0,
    //       },
    //     ],
    //     video_data: null,
    //     radar_data: [],
    //     radar_flow: null,
    //     video_flow: null,
    //     class_flow: null,
    //     Radar_event: null,
    //     event: {
    //       EventType: "",
    //       CarId: 0,
    //       Position: null,
    //       PlateNumber: "",
    //       TimeTemp: 0,
    //       DeviceID: "",
    //       X: 0,
    //       Y: 0,
    //     },
    //   }) +
    //   "\n";

    pointResult.push([
      lng * (180 / Math.PI),
      lat * (180 / Math.PI),
      33.2674865722656 - i * (disHeight / totalSteps),
    ]);
  }
  // return points;
}

// trjData.forEach((item) => {
//   const pointsStr = getPointsBetweenCoordinates(item[0], item[1], stepMeters)
// })
function handleTrjData() {
  for (let index = 0; index < trjData.length - 1; index++) {
    getPointsBetweenCoordinates(trjData[index], trjData[index + 1], stepMeters);
  }
}
handleTrjData();
WriteFile(outFile, JSON.stringify(pointResult));
