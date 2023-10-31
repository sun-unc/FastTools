import { WriteFile } from "../File/writeFile";
import trj1 from "/Users/sun/Desktop/绕越模拟轨迹数据/trjPoints/trj1.json";
import trj2 from "/Users/sun/Desktop/绕越模拟轨迹数据/trjPoints/trj2.json";
import trj3 from "/Users/sun/Desktop/绕越模拟轨迹数据/trjPoints/trj3.json";
import trj4 from "/Users/sun/Desktop/绕越模拟轨迹数据/trjPoints/trj4.json";
import trj5 from "/Users/sun/Desktop/绕越模拟轨迹数据/trjPoints/trj5.json";
import trj6 from "/Users/sun/Desktop/绕越模拟轨迹数据/trjPoints/trj6.json";

type Point = number[];
interface Trj {
  data: Point[];
  cycleNum: number;
  length: number;
  index: number;
}

const dataAll = [trj1, trj4, trj5, trj2, trj3, trj6];
const trjSource: Trj[] = [];

const itemIndexMap: Record<string, number[]> = {};

function generateTrjSource(num: number) {
  const indexSet = new Set();
  for (let index = 0; index < num; index++) {
    const randomDataAllIndex = Math.floor(Math.random() * 6);
    const randomItemIndex = Math.floor(
      Math.random() * dataAll[randomDataAllIndex].length
    );
    const indexItem = randomDataAllIndex + "" + randomItemIndex;
    if (!indexSet.has(indexItem)) {
      indexSet.add(indexItem);

      //
      if (!itemIndexMap[randomDataAllIndex]) {
        itemIndexMap[randomDataAllIndex] = [0];
      }

      if (
        !itemIndexMap[randomDataAllIndex].some((item) => {
          if (Math.abs(item - randomItemIndex) < 3) {
            return true; //含有间距过近的目标
          }
        })
      ) {
        itemIndexMap[randomDataAllIndex].push(randomItemIndex);
        trjSource.push({
          data: dataAll[randomDataAllIndex],
          cycleNum: 0,
          length: dataAll[randomDataAllIndex].length,
          index: randomItemIndex,
        });
      }
    }
  }
}
function getMinCycleNum() {
  const cycleNumArr = trjSource.map((item) => item.cycleNum);
  return Math.min(...cycleNumArr);
}
function fusionTrjData() {
  let indexWhile = 0; //while循环次数
  while (getMinCycleNum() < 4) {
    console.log(indexWhile);
    const frameData = {
      // frame_num: 0,
      // timeStamp: 0,
      fuse_data: [],
      // video_data: null,
      // radar_data: [],
      // radar_flow: null,
      // video_flow: null,
      // class_flow: null,
      // Radar_event: null,
      // event: {
      //   EventType: "",
      //   CarId: 0,
      //   Position: null,
      //   PlateNumber: "",
      //   TimeTemp: 0,
      //   DeviceID: "",
      //   X: 0,
      //   Y: 0,
      // },
    };

    trjSource.forEach((item, index) => {
      const point = item.data[item.index];
      item.index++;
      if (point.length) {
        const fuseDataItem = {
          id: Number(index + 1 + "" + item.cycleNum),
          // uid: 0,
          cls: (index + 1) % 12 === 0 ? 2 : 1,
          // clsStr: "",
          // V_x: -0.49,
          // V_y: 88.59,
          // speed: 0,
          // bbox: null,
          // lcstatus: null,
          // x: 7.44,
          // y: 98.15,
          // radian: 0,
          // acceleration: 0,
          position: point,
          // kind: 0,
          // coo_x: 0,
          // coo_y: 0,
          // idLane: 3,
          // plateNumber: "",
          // plateColor: "",
          // plateType: "",
          // vehicleColor: "",
          // time: 1695371743804,
          // DeviceID: "k2",
          // color: "",
          // Vehicle_type: "",
          // DeviceNumber: "",
          // probability: 0,
        };
        if (item.index >= item.length) {
          item.cycleNum++;
          item.index = 0;
        }
        frameData.fuse_data.push(fuseDataItem as never);
      }
    });
    pointsStr = pointsStr + "100000000" + JSON.stringify(frameData) + "\n";
    indexWhile++;
  }
}

let pointsStr = "";
generateTrjSource(250);
fusionTrjData();
WriteFile("/Users/sun/Desktop/绕越模拟轨迹数据/轨迹/dump.txt", pointsStr);
