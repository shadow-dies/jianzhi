## CSS
---

### 内联元素

内联元素一般是内容的容器，一般情况下，内联元素只能包含内容或者其它内联元素，宽度和长度依据内容而定，不可以设置，可以和其它元素和平共处于一行。内联元素适合显示具体内容。

特点：

1、和其他元素都在一行上；

2、高度、行高和顶以及底边距都不可改变；

3、宽度就是它的文字或图片的宽度，不可改变。

常用的内联(行内)元素：

* a - 锚点

* abbr - 缩写

* acronym - 首字

* b - 粗体(不推荐)

* bdo - bidi override

* big - 大字体

* br - 换行

* cite - 引用

* code - 计算机代码(在引用源码的时候需要)

* dfn - 定义字段

* em - 强调

* font - 字体设定(不推荐)

* i - 斜体

* img - 图片

* input - 输入框

* kbd - 定义键盘文本

* label - 表格标签

* q - 短引用

* s - 中划线(不推荐)

* samp - 定义范例计算机代码

* select - 项目选择

* small - 小字体文本

* span - 常用内联容器，定义文本内区块

* strike - 中划线

* strong - 粗体强调

* sub - 下标

* sup - 上标

* textarea - 多行文本输入框

* tt - 电传文本

* u - 下划线

* var - 定义变量

---

### CSS优先级

在css样式表中，同一个CSS样式你写了两次，后面的会覆盖前面的，在开发中基本不会使用。

不同的权重，权重值高则生效
>权重记忆口诀：从0开始，一个行内样式+1000，一个id选择器+100，一个属性选择器、class或者伪类+10，一个元素选择器，或者伪元素+1，通配符+0。

**!important(提升样式优先级)**

!important的作用是提升样式优先级，如果加了这句的样式的优先级是最高的。不过我这里建议大家一下，!important最好不要使用。当两个样式都使用!important时，权重值大的优先级更高

---

默认情况下，块级元素的内容宽度是其父元素的宽度的 100％，并且与其内容一样高。内联元素高宽与他们的内容高宽一样。你不能对内联元素设置宽度或高度——它们只是位于块级元素的内容中。如果要以这种方式控制内联元素的大小，则需要将其设置为类似块级元素 display: block;。

### position

如果所有的父元素都没有显式地定义 position 属性，那么所有的父元素默认情况下 position 属性都是 static。

**static**
>静态定位是每个元素获取的默认值——它只是意味着“将元素放入它在文档布局流中的正常位置 ——这里没有什么特别的。

**relative**
>它与静态定位非常相似，占据在正常的文档流中，除了你仍然可以修改它的最终位置，包括让它与页面上的其他元素重叠。

**absulute**
>绝对定位的元素不再存在于正常文档布局流中。相反，它坐在它自己的层独立于一切。绝对定位将元素固定在相对于其位置最近的祖先。（如果没有，则为初始包含它的块）

**fixed**
>与绝对定位的工作方式完全相同，只有一个主要区别：绝对定位将元素固定在相对于其位置最近的祖先。（如果没有，则为初始包含它的块）而固定定位固定元素则是相对于浏览器视口本身。

**sticky**
>它基本上是相对位置和固定位置的混合体，它允许被定位的元素表现得像相对定位一样，直到它滚动到某个阈值点（例如，从视口顶部起 10 像素）为止，此后它就变得固定了。

### display

none
>元素不显示，并且会从文档流中移除。

block
>块类型。默认宽度为父元素宽度，可设置宽高，换行显示。

inline
>行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。

inline-block
>默认宽度为内容宽度，可以设置宽高，同行显示。

list-item
>像块类型元素一样显示，并添加样式列表标记。

table
>此元素会作为块级表格来显示。

inherit
>规定应该从父元素继承display属性的值。



---

### CSS3新特性

**过渡**

语法：

transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)
```css
/*宽度从原始值到制定值的一个过渡，运动曲线ease,运动时间0.5秒，0.2秒后执行过渡*/
transition：width,.5s,ease,.2s
```
**动画**

语法：

animation：动画名称，一个周期花费时间，运动曲线（默认ease），动画延迟（默认0），播放次数（默认1），是否反向播放动画（默认normal），是否暂停动画（默认running）
```css
/*2秒后开始执行一次logo2-line动画，运动时间2秒，运动曲线为 linear*/
animation: logo2-line 2s linear 2s;
```

**形状转换**

transform:适用于2D或3D转换的元素
transform-origin：转换元素的位置（围绕那个点进行转换）。默认(x,y,z)：(50%,50%,0)

**选择器**

**阴影**

box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始方向（默认是从里往外，设置inset就是从外往里）;

**边框图片**

border-image: 图片url 图像边界向内偏移 图像边界的宽度(默认为边框的宽度) 用于指定在边框外部绘制偏移的量（默认0） 铺满方式--重复（repeat）、拉伸（stretch）或铺满（round）（默认：拉伸（stretch））;

```css
.demo {
    border: 15px solid transparent;
    padding: 15px;   
    border-image: url(border.png);
    border-image-slice: 30;
    border-image-repeat: round;
    border-image-outset: 0;
}
```

**边框圆角**

```css
border-radius: n1,n2,n3,n4;
border-radius: n1,n2,n3,n4/n1,n2,n3,n4;
/*n1-n4四个值的顺序是：左上角，右上角，右下角，左下角。*/
```

**反射**

这个也可以说是倒影

-webkit-box-reflect:方向[ above-上 | below-下 | right-右 | left-左 ]，偏移量，遮罩图片

**超出省略号**

```css
text-overflow:ellipsis;
```

**文字阴影**

语法：text-shadow:水平阴影，垂直阴影，模糊的距离，以及阴影的颜色。
```css
text-shadow: 0 0 10px #f00;
```

**渐变 Gradient**

CSS3 Gradient分为linear-gradient(线性渐变)和radial-gradient(径向渐变)。简单来讲就是一种是直线渐变，一种是圆心向外的渐变。

语法：
```css
linear-gradient( top/left, start_color, end_color )
```


**Filter（滤镜）**




**颜色**

这个其实就是css3提供了新的颜色表示方法。

rgba
>（rgb为颜色值，a为透明度）

**flex**

**grid**

**盒子模型**


---

### flex(弹性布局/弹性盒子)

flexbox 是一种一维的布局，是因为一个 flexbox 一次只能处理一个维度上的元素布局，一行或者一列。主要用于实现响应式布局.

**主轴**

主轴由 flex-direction 定义，可以取 4 个值：
```
row
row-reverse
column
column-reverse
```
如果你选择了 row 或者 row-reverse，你的主轴将沿着 inline 方向延伸。

选择 column 或者 column-reverse 时，你的主轴会沿着上下方向延伸 — 也就是 block 排列的方向。

**Flex 容器**

文档中采用了 flexbox 的区域就叫做 flex 容器。为了创建 flex 容器，我们把一个容器的 display 属性值改为 flex 或者 inline-flex。完成这一步之后，容器中的直系子元素就会变为 flex 元素。所有 CSS 属性都会有一个初始值，所以 flex 容器中的所有 flex 元素都会有下列行为：

* 元素排列为一行 (flex-direction 属性的初始值是 row)。
* 元素从主轴的起始线开始。
* 元素不会在主维度方向拉伸，但是可以缩小。
* 元素被拉伸来填充交叉轴大小。
* flex-basis 属性为 auto。
* flex-wrap 属性为 nowrap。

**用 flex-wrap 实现多行 Flex 容器**

属性flex-wrap添加一个属性值wrap。如果您的项目太大而无法全部显示在一行中，则会换行显示。

**简写属性 flex-flow**

你可以将两个属性 flex-direction 和 flex-wrap 组合为简写属性 flex-flow。第一个指定的值为 flex-direction ，第二个指定的值为 flex-wrap.

```css
.box {
        display: flex;
        flex-flow: row wrap;
      }

      
```

**Flex 元素属性：flex-grow**

flex-grow 若被赋值为一个正整数，flex 元素会以 flex-basis 为基础，沿主轴方向增长尺寸。这会使该元素延展，并占据此方向轴上的可用空间（available space）。如果有其他元素也被允许延展，那么他们会各自占据可用空间的一部分。

如果我们给上例中的所有元素设定 flex-grow 值为 1，容器中的可用空间会被这些元素平分。它们会延展以填满容器主轴方向上的空间。

**Flex 属性的简写**

你可能很少看到 flex-grow，flex-shrink，和 flex-basis 属性单独使用，而是混合着写在 flex 简写形式中。 Flex 简写形式允许你把三个数值按这个顺序书写 — flex-grow，flex-shrink，flex-basis。

```css
 .box {
        display: flex;
      }

.one {
    flex: 1 1 auto;
    }
```

---
