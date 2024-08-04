const crypto = require("crypto");

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function defaultConcat(a, b) {
  return sha256(a + b);
}

export default class MerkleTreeBig {
  /*
  TODO: 다음의 조건을 만족하는 생성자를 만들어주세요.
  - 생성자의 첫번째 인자는 리프 노드들로 구성된 배열을 받습니다.
  - 생성자의 두번째 인자는 두 노드를 결합하고 해시하는 함수를 받습니다.
  - root 속성에 트리의 루트 노드를 할당해주세요.
  - leaves 속성에는 입력 받은 leaves 배열을 할당해주세요.
  - hash 속성에는 입력 받은 concat 함수를 할당해주세요.
  */
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat; //defaultConcat;
    this.root = this.buildTree(leaves);
    this.hash = concat;
  }

  /*
  TODO: 다음의 조건을 만족하는 함수를 만들어주세요.
  - 트리의 루트 노드를 찾아주는 함수입니다.
  */

  // buildtree(leaves) {
  //   while (leaves.length > 1) {
  //     const tempLeaves = [];
  //     for (let i = 0; i < leaves.length; i = i + 2) {
  //       if (leaves[i + 1] != null) {
  //         tempLeaves.push(this.concat(leaves[i], leaves[i + 1]));
  //       } else {
  //         tempLeaves.push(leaves[i + 1]);
  //       }
  //     }
  //     leaves = tempLeaves;
  //   }

  //   return leaves[0];
  // }

  buildTree(leaves) {
    if (leaves.length === 1) {
      return leaves[0];
    }

    const nextLevel = [];

    for (let i = 0; i < leaves.length; i += 2) {
      if (i + 1 < leaves.length) {
        nextLevel.push(this.concat(leaves[i], leaves[i + 1]));
      } else {
        nextLevel.push(leaves[i]);
      }
    }

    return this.buildTree(nextLevel);
  }

  getRoot() {
    return this.root;
  }
}
