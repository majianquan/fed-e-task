* diff 的过程就是调用名为 patch 的函数，比较新旧节点，一边比较一边给真实的 DOM 打补丁。

* patch 函数接收两个参数 oldVnode 和 Vnode 分别代表新的节点和之前的旧节点,这个函数会比较 oldVnode 和 vnode 是否是相同的, 即函数 sameVnode(oldVnode, vnode), 根据这个函数的返回结果分如下两种情况：
true：则执行 patchVnode
false：则用 vnode 替换 oldVnode

* patchVnode 这个函数做了以下事情：

  * 找到对应的真实 dom，称为 el

  * 判断 vnode 和 oldVnode 是否指向同一个对象，如果是，那么直接 return

  * 如果他们都有文本节点并且不相等，那么将 el 的文本节点设置为 vnode 的文本节点。

  * 如果 oldVnode 有子节点而 vnode 没有，则删除 el 的子节点

  * 如果 oldVnode 没有子节点而 vnode 有，则将 vnode 的子节点真实化之后添加到 el

  * 如果两者都有子节点，则执行 updateChildren 函数比较子节点，这一步很重要

    ```javascript
      function updateChildren(parentElm: Node,
                              oldCh: Array<VNode>,
                              newCh: Array<VNode>,
                              insertedVnodeQueue: VNodeQueue) {
        let oldStartIdx = 0, newStartIdx = 0;
        let oldEndIdx = oldCh.length - 1;
        let oldStartVnode = oldCh[0];
        let oldEndVnode = oldCh[oldEndIdx];
        let newEndIdx = newCh.length - 1;
        let newStartVnode = newCh[0];
        let newEndVnode = newCh[newEndIdx];
        let oldKeyToIdx: any;
        let idxInOld: number;
        let elmToMove: VNode;
        let before: any;
    
        // 循环对比新界节点数组种的元素
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
          // 索引变化后，可能会把节点设置为空
          if (oldStartVnode == null) {
            // 节点为空，移动索引
            oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
          } else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
          } else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
          } else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
          // 比较开始和结束节点的四种情况
          } else if (sameVnode(oldStartVnode, newStartVnode)) {
            // 1. 比较老开始节点和新开始节点，然后更新 DOM
            patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
            // 移动索引指向下一个节点
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
          } else if (sameVnode(oldEndVnode, newEndVnode)) {
            // 2. 比较老结束节点和新结束节点，然后更新 DOM
            patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
            // 更新索引
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
          } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
            // 3. 比较老开始节点和新结束节点，然后更新 DOM
            patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
            api.insertBefore(parentElm, oldStartVnode.elm as Node, api.nextSibling(oldEndVnode.elm as Node));
            // 更新索引
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
          } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
            // 4. 比较老结束节点和新开始节点
            patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
            api.insertBefore(parentElm, oldEndVnode.elm as Node, oldStartVnode.elm as Node);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
          } else {
            // 开始节点和结束节点都不相同
            // 使用 newStartNode 的 key 在老节点数组中找相同节点
            if (oldKeyToIdx === undefined) {
              // 先设置记录 key 和 index 的对象
              oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }
            // 遍历 newStartVnode ，从老节点中找相同 key 的 oldVnode 的索引
            idxInOld = oldKeyToIdx[newStartVnode.key as string];
            // 如果是新的 Node
            if (isUndef(idxInOld)) { // New element
              // 如果没找到，newStartNode 是新节点
              // 创建元素插入 DOM 树
              api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm as Node);
              // 重新给 newStartVnode 赋值，指向下一个新节点
              newStartVnode = newCh[++newStartIdx];
            } else {
              // 如果找到 key 相同的老节点，记录到 elemToMove 遍历
              elmToMove = oldCh[idxInOld];
              // 比较老节点的 sel 属性是否和新的开始节点的 sel 属性相同
              if (elmToMove.sel !== newStartVnode.sel) {
                // 如果新旧节点的选择器不同
                // 创建新开始节点对应的 DOM 元素，插入到 DOM 树中
                api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm as Node);
              } else {
                // 如果相同，patchVnode()
                // 把 elmToMove 对应的 DOM 元素，移到左边
                patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                oldCh[idxInOld] = undefined as any;
                api.insertBefore(parentElm, (elmToMove.elm as Node), oldStartVnode.elm as Node);
              }
              // 重新给 newStartVnode 赋值，指向下一个节点
              newStartVnode = newCh[++newStartIdx];
            }
          }
        }
        // 循环结束，老节点数组先遍历完成或者新节点数组先遍历完成
        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
          if (oldStartIdx > oldEndIdx) {
            // 如果老节点数组先遍历完成，说明新的节点剩余
            // 把剩余的节点都插入到右边
            before = newCh[newEndIdx+1] == null ? null : newCh[newEndIdx+1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
          } else {
            // 如果新节点数组先遍历完成，说明老节点数组有剩余
            // 把剩余老节点删除
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
          }
        }
      }
    ```

    * 首先介绍下这个函数中的变量定义：
      * （oldStartIdx = 0）：oldVnode 的 startIdx, 初始值为 0
      * （newStartIdx = 0）：vnode 的 startIdx, 初始值为 0
      * （oldEndIdx = oldCh.length - 1）：oldVnode 的 endIdx, 初始值为 oldCh.length - 1
      * （oldStartVnode = oldCh[0]）：oldVnode 的初始开始节点
      * （oldEndVnode = oldCh[oldEndIdx]）：oldVnode 的初始结束节点
      * （newEndIdx = newCh.length - 1）：vnode 的 endIdx, 初始值为 newCh.length - 1
      * （newStartVnode = newCh[0]）：vnode 的初始开始节点
      * （newEndVnode = newCh[newEndIdx]）：vnode 的初始结束节点
      * 当 oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx 时，执行如下循环判断：
      * 1、oldStartVnode 为 null，则 oldStartVnode 等于 oldCh 的下一个子节点，即 oldStartVnode 的下一个兄弟节点
      * 2、oldEndVnode 为 null, 则 oldEndVnode 等于 oldCh 的相对于 oldEndVnode 上一个子节点，即 oldEndVnode 的上一个兄弟节点
      * 3、newStartVnode 为 null，则 newStartVnode 等于 newCh 的下一个子节点，即 newStartVnode 的下一个兄弟节点
      * 4、newEndVnode 为 null, 则 newEndVnode 等于 newCh 的相对于 newEndVnode 上一个子节点，即 newEndVnode 的上一个兄弟节点
      * 5、oldEndVnode 和 newEndVnode 为相同节点则执行 patchVnode(oldStartVnode, newStartVnode)，执行完后 oldStartVnode 为此节点的下一个兄弟节点，newStartVnode 为此节点的下一个兄弟节点
      * 6、oldEndVnode 和 newEndVnode 为相同节点则执行 patchVnode(oldEndVnode, newEndVnode)，执行完后 oldEndVnode 为此节点的上一个兄弟节点，newEndVnode 为此节点的上一个兄弟节点
      * 7、oldStartVnode 和 newEndVnode 为相同节点则执行 patchVnode(oldStartVnode, newEndVnode)，执行完后 oldStartVnode 为此节点的下一个兄弟节点，newEndVnode 为此节点的上一个兄弟节点
      * 8、oldEndVnode 和 newStartVnode 为相同节点则执行 patchVnode(oldEndVnode, newStartVnode)，执行完后 oldEndVnode 为此节点的上一个兄弟节点，newStartVnode 为此节点的下一个兄弟节点
      * 9、使用 key 时的比较：
        oldKeyToIdx为未定义时，由 key 生成 index 表，具体实现为 createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)，createKeyToOldIdx 的代码如下：

    ```javascript
    function createKeyToOldIdx(children: Array<VNode>, beginIdx: number, endIdx: number): KeyToIndexMap {
      let i: number, map: KeyToIndexMap = {}, key: Key | undefined, ch;
      for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
          key = ch.key;
          if (key !== undefined) map[key] = i;
        }
      }
      return map;
    }
    ```

    createKeyToOldIdx 方法，用以将 oldCh 中的 key 属性作为键，而对应的节点的索引作为值。然后再判断在 newStartVnode 的属性中是否有 key，且是否在 oldKeyToIndx 中找到对应的节点。
    如果不存在这个 key，那么就将这个 newStartVnode 作为新的节点创建且插入到原有的 root 的子节点中，然后将 newStartVnode 替换为此节点的下一个兄弟节点。
    如果存在这个key，那么就取出 oldCh 中的存在这个 key 的 vnode，然后再进行 diff 的过程，并将 newStartVnode 替换为此节点的下一个兄弟节点。
    当上述 9 个判断执行完后，oldStartIdx 大于 oldEndIdx，则将 vnode 中多余的节点根据 newStartIdx 插入到 dom 中去；newStartIdx 大于 newEndIdx，则将 dom 中在区间 【oldStartIdx， oldEndIdx】的元素节点删除