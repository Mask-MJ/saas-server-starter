interface grounpInfo {
  tag: string;
  title: string;
  index: number;
  data: string[];
}

export function transformPdfData(data: string[]) {
  // 通过 标签名 'HART 标签名称' 进行分组
  const indexes = data
    .map((item, index) =>
      ['HART 标签名称', 'HART Tag Name'].includes(item) ? index : -1,
    )
    .filter((index) => index !== -1);

  const result = indexes.map((start, i) => {
    const end = indexes[i + 1] ?? data.length;
    return data.slice(start - 3, end - 3);
  });

  // 正则匹配 "仪表组态 [DVW-R1] - 基本" 中的 "DVW-R1"
  const regex = /\[(.*?)\]/;
  const groupsInfo = result.map((item) => {
    return item
      .map((str, index) => {
        const match = str.match(regex);
        return (
          match &&
          ({ tag: match[1], title: str, index, data: [] } as grounpInfo)
        );
      })
      .filter((entry) => entry);
  });
  // console.log('groupsInfo', groupsInfo);
  // const groups = result.map((item, index) => {
  //   return groupsInfo[index]
  //     .filter((entry) => entry !== null)
  //     .reduce((prev, cur, j) => {
  //       // 从第二个元素开始, 根据 cur.index 的值和 下一个 cur.index 的值
  //       // 进行切片 赋值给 cur.data

  //       // cur.data = item.slice(prev.index + 1, cur.index);
  //       // cur.data = item.slice(prev.index + 1, cur.index);
  //       if (j === 1) {
  //         console.log(prev, cur, j);
  //         groupsInfo[index][j - 1].data = item.slice(0, cur.index);
  //       } else {
  //         groupsInfo[index][j].data = item.slice(
  //           cur.index + 1,
  //           groupsInfo[index][j + 1]?.index ?? item.length,
  //         );
  //       }

  //       return cur;
  //     });
  // });
  // console.log('groups', groupsInfo);
  result.forEach((item, index) => {
    groupsInfo[index].forEach((entry, j) => {
      if (!entry) return;
      if (j === 0) {
        entry.data = item.slice(0, groupsInfo[index][j + 1].index);
      } else {
        entry.data = item.slice(
          entry.index + 1,
          groupsInfo[index][j + 1].index,
        );
        console.log(
          'entry',
          entry.index,
          'groupsInfo[index][j + 1]',
          groupsInfo[index][j + 1],
        );
      }
    });
  });

  return groupsInfo;
}
