export default class MerkleTree {
  /*
  TODO: 다음의 조건을 만족하는 생성자를 만들어주세요.
  - 생성자의 첫번째 인자는 리프 노드들로 구성된 배열을 받습니다. 
  - 생성자의 두번째 인자는 두 노드를 결합하고 해시하는 함수를 받습니다.
  - root 속성에 트리의 루트 노드를 할당해주세요.
  */
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat;
    this.root = this.buildtree(leaves);
  }

  /*
  TODO: 다음의 조건을 만족하는 함수를 만들어주세요.
  - 트리의 루트 노드를 찾아주는 함수입니다.
  */

  buildtree(leaves) {
    while (leaves.length > 1) {
      const tempLeaves = [];
      for (let i = 0; i < leaves.length; i = i + 2) {
        if (leaves[i + 1] != null) {
          tempLeaves.push(this.concat(leaves[i], leaves[i + 1]));
        } else {
          tempLeaves.push(leaves[i + 1]);
        }
      }
      leaves = tempLeaves;
    }

    return leaves[0];
  }

  getRoot() {
    return this.root;
  }
}
