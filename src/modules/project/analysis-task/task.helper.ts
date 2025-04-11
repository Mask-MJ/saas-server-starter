import dayjs from 'dayjs';
import type { Page } from 'pdf2json';

// interface grounpInfo {
//   tag: string;
//   title: string;
//   index: number;
//   time: string;
//   data: string[];
// }

// export function transformPdfData(data: string[]) {
//   // 通过 标签名 'HART 标签名称' 进行分组
//   const indexes = data
//     .map((item, index) =>
//       ['HART 标签名称', 'HART Tag Name'].includes(item) ? index : -1,
//     )
//     .filter((index) => index !== -1);

//   const result = indexes.map((start, i) => {
//     const end = indexes[i + 1] ?? data.length;
//     return data.slice(start - 3, end - 3);
//   });

//   const regex = /\[(.*?)\]/;
//   const groupsInfo: grounpInfo[][] = result.map((item) => {
//     return item
//       .map((str, index) => {
//         const match = str.match(regex);
//         if (match) {
//           const cleanedTime = item[index + 1].split(/\s{4,}/)[0];
//           return {
//             tag: match[1],
//             title: str,
//             time: dayjs(cleanedTime).format('YYYY-MM-DD HH:mm:ss'),
//             index,
//             data: [],
//           };
//         }
//         return null;
//       })
//       .filter((entry) => entry !== null);
//   });
//   groupsInfo.map((group, index) => {
//     group.forEach((entry, j) => {
//       entry.data = result[index].slice(
//         j ? entry.index + 1 : 0,
//         group[j + 1] ? group[j + 1].index : result[index].length,
//       );
//     });
//   });

//   return groupsInfo;
// }
export function transformPdfData(data: Page[]) {}
