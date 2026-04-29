# =========================================
# Q1: Count digits using while loop
# =========================================
num = int(input("Q1 - Enter a number: "))
count = 0

if num == 0:
    count = 1
else:
    while num != 0:
        num = num // 10
        count += 1

print("Number of digits:", count)

# =========================================
# Q2: Sum until 0 using break
# =========================================
total = 0

while True:
    num = int(input("\nQ2 - Enter number (0 to stop): "))
    if num == 0:
        break
    total += num

print("Sum:", total)

# =========================================
# Q3: Prime numbers from 1 to N
# =========================================
N = int(input("\nQ3 - Enter N: "))
count = 0

for num in range(2, N + 1):
    is_prime = True

    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            break

    if is_prime:
        print(num, end=" ")
        count += 1

print("\nTotal prime numbers:", count)

# =========================================
# Q4: Count even, odd, divisible by 7 and sum
# =========================================
N = int(input("\nQ4 - Enter N: "))

even = 0
odd = 0
div7 = 0
total = 0

for i in range(1, N + 1):
    total += i

    if i % 2 == 0:
        even += 1
    else:
        odd += 1

    if i % 7 == 0:
        div7 += 1

print("Even:", even)
print("Odd:", odd)
print("Divisible by 7:", div7)
print("Sum:", total)

# =========================================
# Q5: Reverse traversal using string
# =========================================
num = input("\nQ5 - Enter a number: ")

even = 0
odd = 0
total = 0

for i in range(-1, -len(num) - 1, -1):
    digit = int(num[i])

    total += digit

    if digit % 2 == 0:
        even += 1
    else:
        odd += 1

print("Even digits:", even)
print("Odd digits:", odd)
print("Sum of digits:", total)