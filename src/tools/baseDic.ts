// 代码样例定义
const codeSamples: any = {
  ['选择代码样例']: `

  `,

  ['branch']: `#!/usr/bin/python3
# 分支语句样例

# 获取用户输入
age = input("请输入您的年龄: ")

try:
    age = int(age)

    # 多重分支判断
    if age < 0:
        print("年龄不能为负数！")
    elif age < 13:
        print("您是儿童")
    elif age < 20:
        print("您是青少年")
    elif age < 60:
        print("您是成年人")
    else:
        print("您是老年人")

    # 嵌套分支
    if age >= 18:
        print("您已成年，可以：")
        if age >= 21:
            print("- 在美国可以饮酒")
        if age >= 25:
            print("- 租车更便宜")
        print("- 投票")
        print("- 签署合同")
    else:
        print("您未成年，需要监护人同意某些事项")

except ValueError:
    print("请输入有效的数字！")`,

  ['for-loop']: `#!/usr/bin/python3
# for循环语句样例

print("=== for循环基础用法 ===")

# 1. 基本数字循环
print("1. 数字循环:")
for i in range(5):
    print(f"  第 {i+1} 次循环")

# 2. 指定范围的循环
print("\\n2. 指定范围循环 (2到8，步长2):")
for i in range(2, 9, 2):
    print(f"  数字: {i}")

# 3. 遍历列表
print("\\n3. 遍历列表:")
fruits = ["苹果", "香蕉", "橙子", "葡萄"]
for fruit in fruits:
    print(f"  我喜欢吃{fruit}")

# 4. 遍历字符串
print("\\n4. 遍历字符串:")
word = "Python"
for char in word:
    print(f"  字符: {char}")

# 5. 使用enumerate获取索引
print("\\n5. 带索引的遍历:")
colors = ["红色", "绿色", "蓝色"]
for index, color in enumerate(colors):
    print(f"  第{index+1}个颜色是{color}")

# 6. 嵌套循环 - 打印乘法表
print("\\n6. 嵌套循环 - 3x3乘法表:")
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i}x{j}={i*j}", end="  ")
    print()  # 换行`,

  ['while-loop']: `#!/usr/bin/python3
# while循环语句样例

print("=== while循环基础用法 ===")

# 1. 基本while循环
print("1. 基本计数循环:")
count = 1
while count <= 5:
    print(f"  计数: {count}")
    count += 1

# 2. 用户输入验证循环
print("\\n2. 输入验证循环:")
while True:
    password = input("请输入密码 (输入'123456'正确): ")
    if password == "123456":
        print("密码正确！")
        break
    else:
        print("密码错误，请重试")

# 3. 累加计算
print("\\n3. 累加计算 (1到10的和):")
sum_total = 0
num = 1
while num <= 10:
    sum_total += num
    print(f"  加上 {num}，当前和为: {sum_total}")
    num += 1
print(f"最终结果: {sum_total}")

# 4. 猜数字游戏
print("\\n4. 简单猜数字游戏:")
import random
target = random.randint(1, 10)
attempts = 0
max_attempts = 3

print(f"我想了一个1-10之间的数字，你有{max_attempts}次机会猜中它！")

while attempts < max_attempts:
    guess = input(f"第{attempts+1}次猜测，请输入数字: ")
    attempts += 1

    try:
        guess = int(guess)
        if guess == target:
            print(f"恭喜！你猜对了！数字就是 {target}")
            break
        elif guess < target:
            print("太小了！")
        else:
            print("太大了！")
    except ValueError:
        print("请输入有效数字！")

    if attempts == max_attempts:
        print(f"游戏结束！正确答案是 {target}")`,

  ['function']: `#!/usr/bin/python3
# 函数定义样例

print("=== Python函数定义和使用 ===")

# 1. 基本函数定义
def greet(name):
    """问候函数"""
    return f"你好, {name}!"

# 2. 带默认参数的函数
def introduce(name, age=18, city="北京"):
    """自我介绍函数"""
    return f"我叫{name}，今年{age}岁，来自{city}"

# 3. 可变参数函数
def calculate_sum(*numbers):
    """计算多个数字的和"""
    total = 0
    for num in numbers:
        total += num
    return total

# 4. 关键字参数函数
def create_profile(**kwargs):
    """创建用户档案"""
    profile = "用户档案:\\n"
    for key, value in kwargs.items():
        profile += f"  {key}: {value}\\n"
    return profile

# 5. 递归函数
def factorial(n):
    """计算阶乘"""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# 6. Lambda函数
square = lambda x: x ** 2
is_even = lambda x: x % 2 == 0

# 使用函数
print("1. 基本函数调用:")
print(greet("小明"))
print(greet("小红"))

print("\\n2. 默认参数函数:")
print(introduce("张三"))
print(introduce("李四", 25))
print(introduce("王五", 30, "上海"))

print("\\n3. 可变参数函数:")
print(f"计算 1,2,3,4,5 的和: {calculate_sum(1, 2, 3, 4, 5)}")
print(f"计算 10,20,30 的和: {calculate_sum(10, 20, 30)}")

print("\\n4. 关键字参数函数:")
print(create_profile(姓名="赵六", 年龄=28, 职业="程序员", 爱好="编程"))

print("\\n5. 递归函数:")
print(f"5的阶乘: {factorial(5)}")
print(f"6的阶乘: {factorial(6)}")

print("\\n6. Lambda函数:")
numbers = [1, 2, 3, 4, 5, 6]
print(f"原数组: {numbers}")
print(f"平方后: {[square(x) for x in numbers]}")
print(f"偶数: {[x for x in numbers if is_even(x)]}")`,

  ['sum']: `#!/usr/bin/python3
# 累计求和样例

print("=== 各种累计求和方法 ===")

# 1. 基本累加求和
print("1. 计算1到100的和:")
total = 0
for i in range(1, 101):
    total += i
print(f"结果: {total}")

# 2. 用户输入数字求和
print("\\n2. 用户输入数字求和:")
numbers = []
print("请输入数字，输入0结束:")

while True:
    try:
        num = float(input("输入数字: "))
        if num == 0:
            break
        numbers.append(num)
    except ValueError:
        print("请输入有效数字！")

if numbers:
    total = sum(numbers)
    print(f"输入的数字: {numbers}")
    print(f"总和: {total}")
    print(f"平均值: {total/len(numbers):.2f}")
else:
    print("没有输入任何数字")

# 3. 列表推导式求和
print("\\n3. 使用列表推导式:")
# 计算1到20中偶数的和
even_sum = sum([x for x in range(1, 21) if x % 2 == 0])
print(f"1到20中偶数的和: {even_sum}")

# 计算1到10中奇数的平方和
odd_square_sum = sum([x**2 for x in range(1, 11) if x % 2 == 1])
print(f"1到10中奇数的平方和: {odd_square_sum}")

# 4. 嵌套列表求和
print("\\n4. 嵌套列表求和:")
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# 方法1: 嵌套循环
total1 = 0
for row in matrix:
    for num in row:
        total1 += num

# 方法2: 列表推导式
total2 = sum([sum(row) for row in matrix])

print(f"矩阵: {matrix}")
print(f"方法1结果: {total1}")
print(f"方法2结果: {total2}")

# 5. 条件求和
print("\\n5. 条件求和示例:")
scores = [85, 92, 78, 96, 88, 76, 94, 82]
print(f"所有分数: {scores}")

# 及格分数(>=80)的和
pass_sum = sum([score for score in scores if score >= 80])
print(f"及格分数的和: {pass_sum}")

# 优秀分数(>=90)的和
excellent_sum = sum([score for score in scores if score >= 90])
print(f"优秀分数的和: {excellent_sum}")

print(f"\\n总分数: {sum(scores)}")
print(f"平均分: {sum(scores)/len(scores):.2f}")`,

  ['fibonacci']: `#!/usr/bin/python3
# 斐波那契数列样例

print("=== 斐波那契数列的多种实现方法 ===")

# 1. 循环实现
def fibonacci_loop(n):
    """使用循环计算斐波那契数列"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]

    fib_list = [0, 1]
    for i in range(2, n):
        fib_list.append(fib_list[i-1] + fib_list[i-2])
    return fib_list

# 2. 递归实现（单个数字）
def fibonacci_recursive(n):
    """递归计算第n个斐波那契数"""
    if n <= 1:
        return n
    return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)

# 3. 生成器实现
def fibonacci_generator(n):
    """使用生成器产生斐波那契数列"""
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

# 4. 记忆化递归（优化版）
def fibonacci_memo(n, memo={}):
    """使用记忆化的递归实现"""
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

# 演示不同实现方法
print("1. 循环实现 - 前15项:")
fib_loop = fibonacci_loop(15)
print(f"   {fib_loop}")

print("\\n2. 递归实现 - 前10项:")
fib_recursive = [fibonacci_recursive(i) for i in range(10)]
print(f"   {fib_recursive}")

print("\\n3. 生成器实现 - 前12项:")
fib_gen = list(fibonacci_generator(12))
print(f"   {fib_gen}")

print("\\n4. 记忆化递归 - 前20项:")
fib_memo_list = [fibonacci_memo(i) for i in range(20)]
print(f"   {fib_memo_list}")

# 交互式计算
print("\\n5. 交互式计算:")
try:
    n = int(input("请输入要计算的斐波那契数列项数: "))
    if n > 0:
        if n <= 30:  # 避免递归太深
            print(f"\\n使用不同方法计算前{n}项:")
            print(f"循环方法: {fibonacci_loop(n)}")
            print(f"生成器方法: {list(fibonacci_generator(n))}")

            if n <= 10:  # 递归方法比较慢，限制项数
                print(f"递归方法: {[fibonacci_recursive(i) for i in range(n)]}")
        else:
            print("项数太大，只显示循环方法结果:")
            result = fibonacci_loop(n)
            print(f"前10项: {result[:10]}")
            print(f"后10项: {result[-10:]}")
    else:
        print("请输入正整数！")
except ValueError:
    print("请输入有效的数字！")

# 黄金比例计算
print("\\n6. 斐波那契数列与黄金比例:")
fib_nums = fibonacci_loop(20)
if len(fib_nums) >= 10:
    ratios = []
    for i in range(1, min(10, len(fib_nums))):
        if fib_nums[i-1] != 0:
            ratio = fib_nums[i] / fib_nums[i-1]
            ratios.append(ratio)
            print(f"   F({i+1})/F({i}) = {fib_nums[i]}/{fib_nums[i-1]} = {ratio:.6f}")

    if ratios:
        print(f"\\n黄金比例 φ ≈ 1.618034")
        print(f"最后计算的比值: {ratios[-1]:.6f}")`,

  ['list-operations']: `#!/usr/bin/python3
# 列表操作样例

print("=== Python列表操作大全 ===")

# 1. 创建列表
print("1. 创建列表:")
empty_list = []
numbers = [1, 2, 3, 4, 5]
fruits = ["苹果", "香蕉", "橙子"]
mixed = [1, "hello", 3.14, True]

print(f"   空列表: {empty_list}")
print(f"   数字列表: {numbers}")
print(f"   水果列表: {fruits}")
print(f"   混合列表: {mixed}")

# 2. 列表基本操作
print("\\n2. 列表基本操作:")
print(f"   列表长度: {len(fruits)}")
print(f"   第一个元素: {fruits[0]}")
print(f"   最后一个元素: {fruits[-1]}")
print(f"   切片 [1:3]: {numbers[1:3]}")

# 3. 添加元素
print("\\n3. 添加元素:")
fruits.append("葡萄")  # 末尾添加
print(f"   append后: {fruits}")

fruits.insert(1, "草莓")  # 指定位置插入
print(f"   insert后: {fruits}")

fruits.extend(["芒果", "樱桃"])  # 扩展列表
print(f"   extend后: {fruits}")

# 4. 删除元素
print("\\n4. 删除元素:")
fruits_copy = fruits.copy()

removed = fruits_copy.pop()  # 删除最后一个
print(f"   pop()删除了: {removed}, 剩余: {fruits_copy}")

fruits_copy.remove("草莓")  # 删除指定元素
print(f"   remove('草莓')后: {fruits_copy}")

del fruits_copy[0]  # 删除指定索引
print(f"   del [0]后: {fruits_copy}")

# 5. 列表方法
print("\\n5. 列表方法:")
test_numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print(f"   原列表: {test_numbers}")

print(f"   count(1): {test_numbers.count(1)}")  # 计数
print(f"   index(4): {test_numbers.index(4)}")  # 查找索引

test_numbers.sort()  # 排序
print(f"   sort()后: {test_numbers}")

test_numbers.reverse()  # 反转
print(f"   reverse()后: {test_numbers}")

# 6. 列表推导式
print("\\n6. 列表推导式:")
squares = [x**2 for x in range(1, 6)]
print(f"   平方数: {squares}")

even_numbers = [x for x in range(1, 11) if x % 2 == 0]
print(f"   偶数: {even_numbers}")

words = ["hello", "world", "python", "programming"]
lengths = [len(word) for word in words]
print(f"   单词长度: {lengths}")

# 7. 嵌套列表
print("\\n7. 嵌套列表:")
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(f"   矩阵: {matrix}")
print(f"   第2行第3列: {matrix[1][2]}")

# 展平嵌套列表
flattened = [item for row in matrix for item in row]
print(f"   展平后: {flattened}")

# 8. 列表与字符串
print("\\n8. 列表与字符串:")
sentence = "Python is awesome"
words_list = sentence.split()
print(f"   分割字符串: {words_list}")

joined = "-".join(words_list)
print(f"   连接列表: {joined}")

# 9. 列表排序和搜索
print("\\n9. 列表排序和搜索:")
students = [
    {"name": "张三", "score": 85},
    {"name": "李四", "score": 92},
    {"name": "王五", "score": 78}
]

# 按分数排序
students_by_score = sorted(students, key=lambda x: x["score"], reverse=True)
print("   按分数排序:")
for student in students_by_score:
    print(f"     {student['name']}: {student['score']}")

# 10. 列表统计
print("\\n10. 列表统计:")
grades = [85, 92, 78, 96, 88, 76, 94, 82, 90, 87]
print(f"    成绩列表: {grades}")
print(f"    最高分: {max(grades)}")
print(f"    最低分: {min(grades)}")
print(f"    平均分: {sum(grades)/len(grades):.2f}")
print(f"    及格人数: {len([g for g in grades if g >= 80])}")`,
}

const codeSamplesList = [
  {
    label: '默认代码样例',
    value: '默认代码样例',
    code: `# 打印一条消息
print("啦啦啦， 开始写代码啦~")
`
  },
  {
    label: '分支语句样例',
    value: '分支语句样例',
    code: `#!/usr/bin/python3
# 分支语句样例

# 获取用户输入
age = input("请输入您的年龄: ")

try:
    age = int(age)

    # 多重分支判断
    if age < 0:
        print("年龄不能为负数！")
    elif age < 13:
        print("您是儿童")
    elif age < 20:
        print("您是青少年")
    elif age < 60:
        print("您是成年人")
    else:
        print("您是老年人")

    # 嵌套分支
    if age >= 18:
        print("您已成年，可以：")
        if age >= 21:
            print("- 在美国可以饮酒")
        if age >= 25:
            print("- 租车更便宜")
        print("- 投票")
        print("- 签署合同")
    else:
        print("您未成年，需要监护人同意某些事项")

except ValueError:
    print("请输入有效的数字！")`
  },
  {
    label: 'for循环样例',
    value: 'for循环样例',
    code: `#!/usr/bin/python3
# for循环样例

# 打印数字1到5
for i in range(1, 6):
    print(i)

# 打印列表中的元素
fruits = ["苹果", "香蕉", " Cherry"]
for fruit in fruits:
    print(fruit)

# 打印字符串中的字符
for char in "Hello":
    print(char)
`
  },
]

export { codeSamples, codeSamplesList }
