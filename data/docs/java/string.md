---
sidebar_position: 1
---

# String类

## 奇怪的 nullnull

```java
public class Test1 {
  private static String s1;
  private static String s2;
  public static void main(String[] args) {
    String s= s1+s2;
    System.out.println(s);
  }
}
```
上面代码运行后会打印 `nullnull`,  `print`方法对`null`进行了额外处理 , 编译器会对 String 字符串相加的操作进行优化，会把这一过程转化为 StringBuilder 的 append 方法, append 也对null 进行了处理, 直接追加`null`

```
public void print(String s) {
    if (s == null) {
        s = "null";
    }
    write(s);
}
```