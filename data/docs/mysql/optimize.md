
# Mysql优化

## 主键的选择

在使用`InnoDB`存储引擎时，如果没有特别的需要，尽量使用一个与业务无关的`递增字段`作为主键，主键字段不宜过长。原因上面在讲索引结构时已提过。比如说常用雪花算法生成64bit大小的整数(占8个字节，用`BIGINT`类型)作为主键就是一个不错的选择。


## 索引的选择

1. 表记录比较少的时候，比如说只有几百条记录的表，对一些列建立索引的意义可能并不大，所以表记录不大时酌情考虑索引。但是业务上具有`唯一特性`的字段，即使是多个字段的组合，也建议使用唯一索引(`UNIQUE KEY`)。 

2. 当索引的选择性非常低时，索引的意义可能也不大。所谓索引的选择性(`Selectivity`)，是指不重复的索引值(也叫基数`Cardinality`)与表记录数的比值，即`count(distinct 列名)/count(*)`，常见的场景就是有一列`status`标识数据行的状态，可能`status`非0即1，总数据100万行有50万行`status`为0，50万行`status`为1  

3. 在`varchar`类型字段上建立索引时，建议指定`索引长度`，有些时候可能没必要对全字段建立索引，根据实际文本区分度决定索引长度即可【说明：索引的长度与区分度是一对矛盾体，一般对字符串类型数据，长度为20的索引，区分度会高达90%以上，可以使用`count(distinct left(列名, 索引长度))/count(*)`来确定区分度】。  
这种指定索引长度的索引叫做`前缀索引`(详情见https://dev.mysql.com/doc/refman/5.7/en/column-indexes.html#column-indexes-prefix)。  
`前缀索引`兼顾索引大小和查询速度，但是其缺点是不能用于`group by`和`order by`操作，也不能用于`covering index`（即当索引本身包含查询所需全部数据时，不再访问数据文件本身）。

4. 当查询语句的`where`条件或`group by`、`order by`含多列时，可根据实际情况优先考虑联合索引(`multiple-column index`)，这样可以减少单列索引(`single-column index`)的个数，有助于高效查询。   
建立联合索引时要特别注意column的次序，应结合上面提到的最左前缀法则以及实际的过滤、分组、排序需求。区分度最高的建议放最左边。  

## order by与group by

尽量在索引列上完成分组、排序，遵循索引`最左前缀法则`，如果`order by`的条件不在索引列上，就会产生`Using filesort`，降低查询性能。


## 分页查询

MySQL分页查询大多数写法可能如下：
```
select * from tb_hero limit offset,N;
```
MySQL并不是跳过offset行，而是取offset+N行，然后返回放弃前offset行，返回N行，那当offset特别大的时候，效率就非常的低下。  

可以对超过特定阈值的页数进行SQL改写如下： 

先快速定位需要获取的id段，然后再关联  
```
select a.* from tb_hero a, 
(select hero_id from tb_hero where 条件 limit 100000,20 ) b 
where a.hero_id = b.hero_id;
```
或者这种写法
```
select a.* from tb_hero a 
inner join (select hero_id from tb_hero where 条件 limit 100000,20) b on a.hero_id = b.hero_id;
```

## 多表join

1. 需要join的字段，数据类型必须绝对一致；
2. 多表join时，保证被关联的字段有索引

## 覆盖索引

利用覆盖索引(`covering index`)来进行查询操作，避免回表，从而增加磁盘I/O。换句话说就是，尽可能避免`select *`语句，只选择必要的列，去除无用的列。

当索引本身包含查询所需全部列时，无需回表查询完整的行记录。对于`InnoDB`来说，非主键索引中包含了`所有的索引列`以及`主键值`，查询的时候尽量用这种特性避免回表操作，数据量很大时，查询性能提升很明显。

## in和exsits

原则：`小表驱动大表`，即小的数据集驱动大的数据集

1. 当A表的数据集大于B表的数据集时，in优于exists

```
select * from A where id in (select id from B)
```

2. 当A表的数据集小于B表的数据集时，exists优于in

```
select * from A where exists (select 1 from B where B.id = A.id)
```

## like

索引文件具有`B+Tree`最左前缀匹配特性，如果左边的值未确定，那么无法使用索引，所以应尽量避免左模糊(即%xxx)或者全模糊(即%xxx%)。

## 其他

索引列上做任何操作(`表达式`、`函数计算`、`类型转换`等)时无法使用索引会导致全表扫描



