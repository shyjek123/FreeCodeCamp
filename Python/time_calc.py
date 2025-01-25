def add_time(start, duration, week=None):
    weekdays = {
        "monday": 0,
        "tuesday": 1,
        "wednesday": 2,
        "thursday": 3,
        "friday": 4,
        "saturday": 5,
        "sunday": 6,
    }

    startArr = start.split(" ")
    startTime = startArr[0].split(":")
    ampm = "AM"
    durationTime = duration.split(":")

    tmpEndHour = int(startTime[0]) + int(durationTime[0])

    if startArr[1] == "PM":
        tmpEndHour += 12

    tmpEndMinute = int(startTime[1]) + int(durationTime[1])

    if tmpEndMinute > 59:
        tmpEndHour += 1

    days = int(tmpEndHour // 24)

    endHour = tmpEndHour % 24

    if endHour > 11:
        ampm = "PM"

    if endHour > 12:
        endHour -= 12
    elif endHour == 0:
        endHour = 12

    endMinute = tmpEndMinute % 60

    endTime = str(endHour) + ":" + str(endMinute).zfill(2) + " " + ampm

    if week is not None:
        week = week.lower()
        weekdayNum = weekdays[week]
        newWeekdayNum = (days + weekdayNum) % 7
        newWeek = list(weekdays.keys())[list(weekdays.values()).index(newWeekdayNum)]
        endTime += ", " + newWeek.capitalize()

    if days > 1:
        endTime += " (" + str(days) + " days later)"
    elif days > 0:
        endTime += " (next day)"

    return endTime
