const crypto = require("crypto");

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function defaultConcat(a, b) {
  return sha256(a + b);
}
export default class MerkleTreeProof {
  /*
  TODO: 다음의 조건을 만족하는 생성자를 만들어주세요.
  - 생성자의 첫번째 인자는 리프 노드들로 구성된 배열을 받습니다.
  - 생성자의 두번째 인자는 두 노드를 결합하고 해시하는 함수를 받습니다.
  - root 속성에 트리의 루트 노드를 할당해주세요.
  - leaves 속성에는 입력 받은 leaves 배열을 할당해주세요.
  - hash 속성에는 입력 받은 concat 함수를 할당해주세요.
  */
  constructor(leaves, defaultConcat) {
    this.leaves = leaves;
    this.concat = defaultConcat;
    this.root = this.buildtree(leaves.map(this.concat));
    this.hash = concat;
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

  /*
  TODO: 리프 노드의 인덱스를 받아서 proof를 반환합니다.
  증명은 해시를 나타내는 data 속성과 해시가 왼쪽에 있는지를 나타내는 left 속성을 가진 객체들의 배열이 됩니다.
  (예시)
  [
  { data: 'D', left: false },
  { data: 'AB', left: true },
  { data: 'E', left: false }
  ]
  */
  //tempLeaves.push({data : `${leaves[i]}`, left:true})

  getProof(index) {
    let proof = [];
    let layer = this.leaves;
    let idx = index;

    while (layer.length > 1) {
      let nextLayer = [];
      for (let i = 0; i < layer.length; i += 2) {
        if (i + 1 < layer.length) {
          nextLayer.push(this.concat(layer[i], layer[i + 1]));
          if (i === idx || i + 1 === idx) {
            const isLeftNode = i === idx;
            proof.push({
              data: isLeftNode ? layer[i + 1] : layer[i],
              left: !isLeftNode,
            });
            idx = Math.floor(i / 2);
          }
        } else {
          nextLayer.push(layer[i]);
          if (i === idx) {
            idx = Math.floor(i / 2);
          }
        }
      }
      layer = nextLayer;
    }
  }
}
