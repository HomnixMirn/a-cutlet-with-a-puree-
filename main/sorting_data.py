import re


data = []

# with open("output.txt", "r", encoding="utf-8") as file:
#     for line in file:
#         if line.startswith("START : "):
#             id = line.split("START : ")[1].strip()
#             name = ""
#             date_start = ""
#             date_end = ""
#             location = ""
#             participants = ""
#             gender = ""
#             age_group = ""
#             discipline = ""
#             program = ""
#             for line in file:
#                 if not line.strip():
#                     break
#                 if re.match(r"\d{2}\.\d{2}\.\d{4}", line.strip()):
#                     date_start = line.strip()
#                     date_end = next(file).strip()
#                 elif re.match(r"[A-Za-zА-Яа-я]+", line.strip()):
#                     name += line.strip() + " "
#                 elif re.match(r"\d+", line.strip()):
#                     participants = line.strip()
#                 elif re.match(r"[Вв]ладимирская область|[Мм]осковская область", line.strip()):
#                     location = line.strip()
#                 elif re.match(r"[Шш]ахматы|[Дд]ругие", line.strip()):
#                     discipline = line.strip()
#             data.append({
#                 "id": id,
#                 "name": name.strip(),
#                 "date_start": date_start,
#                 "date_end": date_end,
#                 "location": location,
#                 "participants": participants,
#                 "gender": "",
#                 "age_group": "",
#                 "discipline": discipline,
#                 "program": ""
#             })


with open("output.txt", "r", encoding="utf-8") as file:
    lines = file.read()
    i = 0
    all_split = lines.split("START : ")
    for item in all_split:
        location = []
        print(item)
        name = []
        for num,line in enumerate(item.split("\n")):
            if line == "":
                continue
            line=line.split(" ")
            print(f"{num = } {line = }")
            
            if num == 0:
                id = line[0]
                participants = line[-1]
                location.append(line[-2])
                date_start = line[-3]
                name.append(" ".join(line[1:-3]))
            elif num == 2:
                for n,word in enumerate(line):
                    if re.match(r"\d{2}\.\d{2}\.\d{4}", word.strip()):
                        date_end = word
                        ind = n
                        break
                location.append(" ".join(line[ind:]))
                   
            
            gender = ""
            age_group = ""
            discipline = ""
            program = ""

        data.append({
            "id": id,
            "name": " ".join(name),
            "date_start": date_start,
            "date_end": date_end,
            "location": " ".join(location),
            "participants": participants,
            "gender": "",
            "age_group": "",
            "discipline": discipline,
            "program": ""
        })
        i += 1
# Теперь вы можете получить доступ к данным как к списку словарей
for item in data:
    print(item)