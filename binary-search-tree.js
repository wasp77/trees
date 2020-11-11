const createNode = (key) => ({ key, left: null, right: null });

const insert = (key, root) => {
  // If no root is supplied or the keys match the new node is the root
  if (!root) {
    root = createNode(key);
    return root;
  }

  // The newNode belongs in the left subtree
  if (key < root.key) {
    if (root.left === null) {
      root.left = createNode(key);
      return root;
    } else {
      return insert(key, root.left);
    }
  } else if (key > root.key) {
    // The newNode belongs in the right subtree
    if (root.right === null) {
      root.right = createNode(key);
      return root;
    } else {
      return insert(key, root.right);
    }
  } else {
    // We don't allow duplicates
    throw new Error("Duplicate key");
  }
};

const search = (key, root) => {
  // The tree does not exist or the root matches the key
  if (root === null || root.key === key) {
    return root;
  }

  // Search the left subtree
  if (key < root.key) {
    return search(key, root.left);
  } else {
    //Search the right subtree
    return search(key, root.right);
  }
};

const findSuccessor = (node) => {
  if (!node.left) {
    return node.key;
  } else {
    return findSuccessor(node.left);
  }
};

const remove = (key, root) => {
  if (!root) {
    return root;
  }

  if (key < root.key) {
    root.left = remove(key, root.left);
  } else if (key > root.key) {
    root.right = remove(key, root.right);
  } else {
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }
    root.key = findSuccessor(root.right);
    root.right = remove(root.key, root.right);
  }
};

const traverse = (root) => {
  if (!root) {
    return null;
  }
  traverse(root.left);
  console.log(root.key);
  traverse(root.right);
};

//const node3 = createNode(20);
//const node4 = createNode(40);
//const node5 = createNode(70);
let root = insert(50);
insert(20, root);
insert(30, root);
insert(40, root);
insert(70, root);
//root = insert(40, root);
//root = insert(node3, root);
//root = insert(node4, root);
//root = insert(node5, root);
traverse(root);
remove(20, root);
console.log("delete 20: \n");
traverse(root);
