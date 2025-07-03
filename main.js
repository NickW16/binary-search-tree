// test array
const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const uniqueSortedArray = [...new Set(testArray)].sort((a, b) => a - b);

// node factory with both right and left attributes
function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

function Tree(array) {
    this.root = buildTree(array, 0, array.length - 1);
}

function buildTree(array, start, end) { // for sorted arrays
    if (start > end) return null;

    // calculate mid node
    let mid = start + Math.floor((end - start) / 2);
    // create new root
    let root = new Node(array[mid]);

    // find left and right subtree
    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;
}

const myTree = new Tree(uniqueSortedArray);

// pretty print function from theodinproject
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
// prints the binary search tree
prettyPrint(myTree.root);