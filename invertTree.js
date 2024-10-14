class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function invertTree(root) {
  if (!root) return null;

  const queue = [root];

  while (queue.length > 0) {
    const current = queue.shift();

    // Swap the left and right children
    [current.left, current.right] = [current.right, current.left];

    // Add the children to the queue for further processing
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  return root;
}

// Helper function to create a binary tree from an array
function createTree(arr) {
  if (!arr.length) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];
  let index = 1;

  while (queue.length > 0 && index < arr.length) {
    const current = queue.shift();
    if (arr[index] !== null) {
      current.left = new TreeNode(arr[index]);
      queue.push(current.left);
    }
    index++;
    if (index < arr.length && arr[index] !== null) {
      current.right = new TreeNode(arr[index]);
      queue.push(current.right);
    }
    index++;
  }

  return root;
}

// Helper function to convert tree back to list representation
function treeToList(root) {
  const result = [];
  if (!root) return result;

  const queue = [root];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current) {
      result.push(current.val);
      queue.push(current.left);
      queue.push(current.right);
    } else {
      result.push(null);
    }
  }

  // Remove trailing null values for cleaner output
  while (result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const worker = () => {
  readline.question('input: ', str => {
    const input = JSON.parse(str);
    if (Array.isArray(input)) {
      const tree = createTree(input);
      const invertedTree = invertTree(tree);
      console.log('output:', JSON.stringify(treeToList(invertedTree)));
    }
    worker();
    // readline.close();
  });
};

worker();
