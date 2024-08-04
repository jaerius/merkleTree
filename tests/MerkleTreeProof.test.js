import MerkleTreeProof from "../src/MerkleTreeProof";

// describe("MerkleTreeBig", () => {
//   const concat = (a, b) => `Hash(${a} + ${b})`;

//   it("두 노드로부터 루트 노드를 만들어야 합니다.", () => {
//     const leaves = ["A", "B"];

//     const merkleTree = new MerkleTreeBig(leaves, concat);

//     expect(merkleTree.getRoot()).toBe("Hash(A + B)");
//   });

//   it("네 개의 노드로부터 루트 노드를 만들어야 합니다.", function () {
//     const leaves = ["A", "B", "C", "D"];

//     const merkleTree = new MerkleTreeBig(leaves, concat);

//     expect(merkleTree.getRoot()).toBe("Hash(Hash(A + B) + Hash(C + D))");
//   });
// });

// const { assert } = require("chai");
// const { hashProof, sha256, concatHash, concatLetters } = require("./testUtil");
// const MerkleTree = require("../index");
const crypto = require("crypto");

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function concatHash(a, b) {
  return sha256(a + b); // Concatenates two strings and hashes the result
}

function concatLetters(a, b) {
  return a + b;
}

describe("MerkleTreeProof", () => {
  const leaves = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const root =
    "eb100814abc896ab18bcf6c37b6550eeadeae0c312532286a4cf4be132ace526";
  const hashTree = new MerkleTreeProof(leaves.map(sha256), concatHash);
  const lettersTree = new MerkleTreeProof(leaves, concatLetters);

  describe("", () => {});
});

// describe("merkle proof", function () {
//   describe("for each leaf", function () {
//     leaves.forEach((leaf, i) => {
//       it(`should return a proof that calculates the root from leaf ${leaves[i]}`, function () {
//         const proof = hashTree.getProof(i);
//         const hashedProof = hashProof(leaf, proof).toString("hex");
//         if (hashedProof !== root) {
//           const lettersProof = lettersTree.getProof(i);
//           console.log(
//             "The resulting hash of your proof is wrong. \n" +
//               `We were expecting: ${root} \n` +
//               `We received: ${hashedProof} \n` +
//               `In ${leaves.join("")} Merkle tree, the proof of ${
//                 leaves[i]
//               } you gave us is: \n` +
//               `${JSON.stringify(lettersProof, null, 2)}`
//           );
//         }
//         assert.equal(hashedProof, root);
//       });
//     });
//   });
// });
