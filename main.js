// test array
const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// this sorts the array and removes duplicate values!
const sortedArray = [...new Set(testArray)].sort((a, b) => a - b);

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

// this function inserts a value into the bst
function insert(root, value) {
    if (root === null) {
      return new Node(value);
    }
    
    //duplicates handling
    if (root.data === value){
      return root;
    }

    if (value < root.data) {
      root.left = insert(root.left, value);
    } else if (value > root.data) {
      root.right = insert(root.right, value);
    }

    return root;
}

// getSucessor function based in searching the successors nodes focused
// on the right. If it is empty, it doesnt work.
function getSuccessor(curr) {
  curr = curr.right;
  while(curr !== null && curr.left !== null) {
    curr = curr.left;
  }
  return curr;
}

// 'delete a node' function:
function deleteItem(root, value) {
    // base recursive case
    if (root === null) {
      console.log(`Attempted to delete ${value} but it was not found!`);
      return root;
    }
    // search for key
    if (root.data > value) {
      root.left = deleteItem(root.left, value);
    } else if (root.data < value) {
      root.right = deleteItem(root.right, value);     
    } else {
      // if root matches given key

      // cases when root has no children or only one child
      if (root.left === null && root.right === null) {
        return null; // no children
      } else if (root.left === null) {
        return root.right; // only right child
      } else if (root.right === null) {
        return root.left; // only left child
      }

      // when both children are present
      let successor = getSuccessor(root);
      root.data = successor.data;
      root.right = deleteItem(root.right, successor.data);

    }
    return root;
}

function find(root, value) {
  // value is not found
  if (root === null) {
    return null;
  }
  //value is found
  if (root.data === value) {
    return root;
  }

  if (value < root.data) {
    return find(root.left, value);
  } else if (value > root.data) {
    return find(root.right, value);
  }
}



// callback function to print.
function callback(node) {
  console.log(node.data);
}

// this traverses through each node and adds it to a queue.
// it visits a node, does nothing with it and then adds its children
// to the queue for later processing.
// this is Breadth-Frist Search:
// iterative version
function levelOrder(root, callback) {
  if (typeof callback !== 'function') {
    throw new Error('A callback function is required!');
  }
  if (root === null) {
    return null;
  }
  console.log('LevelOrder Traversing:');
  // this is an array that acts as a queue that is incremented
  // and decremented after each node visit
  let queue = [root];
  // while there is at least one discovered node.
  while (queue.length > 0) {
    let node = queue.shift();
    if (callback) callback(node);
    if (node.left != null) queue.push(node.left);
    if (node.right != null) queue.push(node.right);
  }
}
// recursive version of the above function
function levelOrderRecursive(queue, callback) {
  if (queue.length === 0) return;
  let node = queue.shift();
  callback(node);
  if (node.left) queue.push(node.left);
  if (node.right) queue.push(node.right);
  levelOrderRecursive(queue, callback);
}

//preorder recursive function
function preOrder(root, callback) {
  if (root === null) {
    return null;
  }
  callback(root); // call the callback function
  preOrder(root.left, callback);
  preOrder(root.right, callback);
}

// inorder recursive function
function inOrder(root, callback) {
  if (root === null) {
    return null;
  }
  inOrder(root.left, callback);
  callback(root);
  inOrder(root.right, callback);
}

// postOrder recursive function
function postOrder(root, callback) {
  if (root === null) {
    return null;
  }
  postOrder(root.left, callback);
  postOrder(root.right, callback);
  callback(root);
}

function height(root, value) {
  const node = find(root, value);
  if (!node) {
    console.log(`${value} was not found!`);
    return -1;
  }

  function getHeight(n) {
    if (n === null) return -1;
    return 1 + Math.max(getHeight(n.left), getHeight(n.right));
  }

  const h = getHeight(node);
  console.log(`Height of node ${value}: ${h}`);
  return h;
}

const myTree = new Tree(sortedArray);

// test cases:

// testing insert function
myTree.root = insert(myTree.root, 1000); // high value
myTree.root = insert(myTree.root, 301); // medium-high value
myTree.root = insert(myTree.root, 30); // medium value
myTree.root = insert(myTree.root, 6); // low value

// testing delete functions
myTree.root = deleteItem(myTree.root, 6); // deleting low value
myTree.root = deleteItem(myTree.root, 200); // delete inexistent value
myTree.root = deleteItem(myTree.root, 6345); // deleting high value
myTree.root = deleteItem(myTree.root, 8); // deleting first node

// testing find function
// in this case we cannot assign 'find' to 'myTree' because
// it erases the entire BST and only outputs the found node
// note:  removed prints from find function for better utility in
// other functions
find(myTree.root, 1000); // existing node
find(myTree.root, 4); // existing node
find(myTree.root, 2); // non existent node

// level order traversal test:
levelOrder(myTree.root, callback);
console.log('Recursive levelOrder Traversal:')
levelOrderRecursive([myTree.root], callback);

//preOrder traversal function: 
console.log('preOrder traversal:')
preOrder(myTree.root, callback);

//inOrder traversal function:
console.log('inOrder traversal:')
inOrder(myTree.root, callback);

//postOrder traversal function:
console.log('postOrder traversal:')
postOrder(myTree.root, callback);

// height function:
height(myTree.root, 1000); // high value
height(myTree.root, 4); // low value
height(myTree.root, 99); // non-existent value


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