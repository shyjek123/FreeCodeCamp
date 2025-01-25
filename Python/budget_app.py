class Category:
    def __init__(self, cat):
        self.cat = cat
        self.ledger = []
        self.balance = 0.0

    def deposit(self, amount, description=""):
        self.ledger.append({"amount": amount, "description": description})
        self.balance += amount

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            self.ledger.append({"amount": -(amount), "description": description})
            self.balance -= amount
            return True
        else:
            return False

    def get_balance(self):
        return self.balance

    def transfer(self, amount, dest):
        if self.withdraw(amount, f"Transfer to {dest.cat}"):
            dest.deposit(amount, f"Transfer from {self.cat}")
            return True
        else:
            return False

    def check_funds(self, amount):
        if amount <= self.balance:
            return True
        return False

    def __repr__(self):
        display = ""

        piece_stars = 15 - len(self.cat) // 2
        title = "*" * (piece_stars) + self.cat + "*" * (piece_stars)

        body = ""
        sliced_description = ""
        right_alignment = 0
        for item in self.ledger:
            formatted_amount = float(str(item["amount"])[:7])
            sliced_description = item["description"][:23]

            right_alignment = len(title) - len(sliced_description)
            body += f"{sliced_description}{formatted_amount:>{right_alignment}.2f}\n"

        display += title + "\n" + body + f"Total: {self.balance:.2f}"

        return display


def create_spend_chart(categories):
    spent_amounts = []
    # Get total spent in each category
    for category in categories:
        spent = 0
        for item in category.ledger:
            if item["amount"] < 0:
                spent += abs(item["amount"])
        spent_amounts.append(round(spent, 2))

    # Calculate percentage rounded down to the nearest 10
    total = round(sum(spent_amounts), 2)
    spent_percentage = list(
        map(lambda amount: int((((amount / total) * 10) // 1) * 10), spent_amounts)
    )

    # Create the bar chart substrings
    header = "Percentage spent by category\n"

    chart = ""
    for value in reversed(range(0, 101, 10)):
        chart += str(value).rjust(3) + "|"
        for percent in spent_percentage:
            if percent >= value:
                chart += " o "
            else:
                chart += "   "
        chart += " \n"

    footer = "    " + "-" * ((3 * len(categories)) + 1) + "\n"
    descriptions = list(map(lambda category: category.cat, categories))
    max_length = max(map(lambda description: len(description), descriptions))
    descriptions = list(
        map(lambda description: description.ljust(max_length), descriptions)
    )
    for x in zip(*descriptions):
        footer += "    " + "".join(map(lambda s: s.center(3), x)) + " \n"

    return (header + chart + footer).rstrip("\n")
