HISTORY = []


def chat(message):
    HISTORY.append(message)
    return message.upper()
