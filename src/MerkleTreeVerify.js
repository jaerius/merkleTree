export default class MerkleTreeVerify {
  /*
  TODO: 이전 단계에서 만든 코드 전체를 복사해서 아래에 붙여넣기 해주세요.
  */
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
      this.concat = concat;
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
      let leaves = this.leaves;
  
      while (leaves.length > 1) {
        const tempLeaves = [];
        for (let i = 0; i < leaves.length; i = i + 2) {
          if (leaves[i + 1] != null) {
            if (index == i) {
              proof.push({ data: `${leaves[i + 1]}`, left: false });
              tempLeaves.push(this.concat(leaves[i], leaves[i + 1]));
            } else if (index == i + 1) {
              proof.push({ data: `${leaves[i]}`, left: true });
              tempLeaves.push(this.concat(leaves[i], leaves[i + 1]));
            } else {
              tempLeaves.push(this.concat(leaves[i], leaves[i + 1]));
            }
            index = Math.floor(i / 2);
          } else {
            tempLeaves.push(leaves[i + 1]);
            index = Math.floor(i / 2);
          }
        }
        leaves = tempLeaves;
      }
      return proof;
    }
  
  
}
