def arithmetic_arranger(list, showAnswers=False):
    spacingBetweenProblems = 4
    if len(list) > 5:
        return "Error: Too many problems."
    result = ""
    row1 = ""
    row2 = ""
    row3 = ""
    row4 = ""

    for prob in list:
        prob = prob.split()
        num1 = prob[0]
        num2 = prob[2]

        if len(num1) > 4 or len(num2) > 4:
            return "Error: Numbers cannot be more than four digits."

        sign = prob[1]
        if not (sign == "+" or sign == "-"):
            return "Error: Operator must be '+' or '-'."

        try:
            int(num1)
            int(num2)
        except:
            return "Error: Numbers must only contain digits."

        largerNumLen = len(num1) if len(num1) > len(num2) else len(num2)
        row1 += (
            " " * (largerNumLen - len(num1) + 2) + num1 + " " * spacingBetweenProblems
        )
        row2 += (
            sign
            + " " * ((largerNumLen - len(num2)) + 1)
            + num2
            + " " * spacingBetweenProblems
        )

        row3 += "-" * (largerNumLen + 2) + " " * spacingBetweenProblems
        if sign == "+":
            answer = str(int(num1) + int(num2))
        else:
            answer = str(int(num1) - int(num2))

        row4 += (
            " " * (2 + (largerNumLen - len(answer)))
            + answer
            + " " * spacingBetweenProblems
        )

    if showAnswers:
        result += row1 + "\n" + row2 + "\n" + row3 + "\n" + row4
    else:
        result += row1 + "\n" + row2 + "\n" + row3

    return result


# Tests:
print(arithmetic_arranger(["3801 - 2", "123 + 49"]), "\n")
print(arithmetic_arranger(["1 + 2", "1 - 9380"]), "\n")
print(arithmetic_arranger(["3 + 855", "3801 - 2", "45 + 43", "123 + 49"]), "\n")
print(
    arithmetic_arranger(["11 + 4", "3801 - 2999", "1 + 2", "123 + 49", "1 - 9380"]),
    "\n",
)
print(
    arithmetic_arranger(
        ["44 + 815", "909 - 2", "45 + 43", "123 + 49", "888 + 40", "653 + 87"]
    ),
    "\n",
)
print(arithmetic_arranger(["3 / 855", "3801 - 2", "45 + 43", "123 + 49"]), "\n")
print(arithmetic_arranger(["24 + 85215", "3801 - 2", "45 + 43", "123 + 49"]), "\n")
print(arithmetic_arranger(["98 + 3g5", "3801 - 2", "45 + 43", "123 + 49"]), "\n")
print(arithmetic_arranger(["3 + 855", "988 + 40"], True), "\n")
print(
    arithmetic_arranger(
        ["32 - 698", "1 - 3801", "45 + 43", "123 + 49", "988 + 40"], True
    ),
    "\n",
)
