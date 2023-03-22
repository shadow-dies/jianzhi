# 剑指offer

### 剑指 Offer 35. 复杂链表的复制
    复杂链表的指针指向不是顺序的，此时我们可以将拷贝出来的节点的next指向原来的节点，然后将拷贝和原版进行哈希连接，所有节点拷贝完成后可以借助哈希表重新调整next指针。

    如 a-> b -> c 的复制为 a -> a1 -> b -> b1 -> c -> c1 ;复制完成后再将链表拆分。

### 有序数组
首选二分查找

### 「Floyd 判圈算法」（龟兔赛跑算法）
设置快慢两个指针slow和fast,slow一次走一个节点，fast一次走两个节点。

1、判断链表是否有环
>若两个指针会相遇则说明有环。

2、获取环的入口
>快慢指针同一地点同一时间出发，快慢指针第一次相遇后，慢指针回到起点，快指针变为一次一个节点，第二次相遇位置即为环的入口，证明略。

### 通过原生方法优化时间
在js中，优先使用给定的方法库，比如Math.max()就是比手动用if 或者 ？ ：实现快。 

### 分治算法解决最大子数组和问题
思想类似于二分法

### JS创建二维数组的方法
``` js
const array = new Array(line);
for (let i = 0; i < array.length; i++) {
    array[i] = new Array(row); // 将项默认为false
  }
  ```

---

# ACM模式解决方式

通过readline来一行行写入，若是数组的话通过.splte(" ")分离成数组，再用.map(Number)转换为数字即可。


```js
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    let num = await readline(), inputs = [];
    for(let i = 0; i < num; i++) {
        let tokens = await readline();
        inputs.push(tokens.split(' ').map(Number));
    }
    console.log(inputs);
    for(let input of inputs) {
        let sum = 0;
        for(let num of input) {
            sum += num;
        }
        console.log(sum);
    }
}()//main函数
```
