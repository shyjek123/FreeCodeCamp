import copy
import random


class Hat:
    def __init__(self, **kwargs):
        if kwargs:
            self.contents = [
                key for key, val in dict(kwargs).items() for i in range(val)
            ]
        else:
            self.contents = ["silver"]

    def draw(self, num_balls):
        if len(self.contents) < num_balls:
            return self.contents

        drawn_balls = []
        contents = self.contents

        for i in range(num_balls):
            ball = random.choice(contents)
            drawn_balls.append(ball)
            contents.remove(ball)
        return drawn_balls


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    tally = []
    num_occurrences = 0
    for i in range(num_experiments):
        hat_cp = copy.deepcopy(hat)
        draw = hat_cp.draw(num_balls_drawn)
        tally.append(
            {item: draw.count(item) for item in draw if item in expected_balls}
        )

    failed = []
    for ball in list(expected_balls.keys()):
        for thing in tally:
            if not (ball in list(thing.keys())):
                failed.append(thing)

    tally = [thing for thing in tally if thing not in failed]

    failed = []
    for ball in list(expected_balls.keys()):
        for r in tally:
            if int(expected_balls[ball]) > int(r[ball]):
                failed.append(r)
    tally = [r for r in tally if r not in failed]

    return len(tally) / num_experiments
