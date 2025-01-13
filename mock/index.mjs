import fs from 'fs';
import path from 'path';
const directoryPath = path.join(__dirname);
// 递归遍历文件夹
function getFilesPath(dir, filelist) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      filelist = getFilesPath(filepath, filelist);
    } else {
      filelist.push(filepath);
    }
  });
  return filelist;
}

async function loadMockFiles() {
  try {
    const allFiles = [...new Set(getFilesPath(directoryPath, []).filter((file) => !/index.js?|.mjs$/.test(file)))];
    return await Promise.all(
      allFiles.map((filename) => {
        const name = `${filename.replace(directoryPath + '/', '')}`;
        return import(`./${name}`)
          .then((module) => {
            return Array.prototype.concat(...Object.values(module));
          })
          .catch(console.error);
      }),
    );
  } catch (err) {
    console.log(err);
    return [];
  }
}
// 自动读取mock下的文件、导出所有模块（export、default导出都支持）
export default (await loadMockFiles()).flat(Infinity);
