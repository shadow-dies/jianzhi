## html
### 事件冒泡
众所周知，html里元素触发的事件是往父元素不断冒泡的，如触发了子元素的onclick，会一层层往父元素冒泡，触发父元素的onclick

若想组织冒泡：

```js
onClick={e => e.stopPropagation()}
```

---