// const fs = require("fs");
import fs from "fs";

export function WriteFile(filePath: string, contentToWrite: string) {
  // 使用 fs.writeFile 方法来写入文件
  fs.writeFile(filePath, contentToWrite, (err: any) => {
    if (err) {
      console.error("写入文件时发生错误：", err);
    } else {
      console.log("文件写入成功！");
    }
  });
}
