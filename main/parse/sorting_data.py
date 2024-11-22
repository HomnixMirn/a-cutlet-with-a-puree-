import re
from datetime import datetime

def get_data():
    data = []

    with open("output.txt", "r", encoding="utf-8") as file:
        lines = file.read()
        i = 0
        all_split = lines.split("START : ")
        
        for n,item in enumerate(all_split):
            if n == 0:
                continue
            id=""
            date_start = ""
            date_end = ""
            participants = ""
            age_group = ''
            description = []
            location = []
            name = []
            for num,line in enumerate(item.split("\n")):
                if line == "":
                    continue
                line=line.split(" ")
                
                if num == 0:
                    id = line[0]
                    participants = line[-1]
                    for n,word in enumerate(line):
                        if re.match(r"\d{2}\.\d{2}\.\d{4}", word.strip()):
                            date_start = word
                            ind = n+1
                            break
                            
                    location.append(" ".join(line[ind:-1]))
                    
                    name.append(" ".join(line[1:ind-1]))
                elif num == 2:
                    for n,word in enumerate(line):
                        if re.match(r"\d{2}\.\d{2}\.\d{4}", word.strip()):
                            date_end = word
                            ind = n+1
                            break
                    if all([word.isupper() for word in line[:ind-1] if word.strip()]):
                        name.append(" ".join(line[:ind-1]))
                        next = True
                    else:
                        next = False
                        age_group = " ".join(line[:ind-1])
                    location.append(" ".join(line[ind:]))
                else:
                    if line[0] =="Стр.":
                        continue
                    if next and all([word.isupper() for word in line if word.strip()]):
                        name.append(" ".join(line))
                        next = True
                    elif next:
                        age_group = " ".join(line)
                        next = False
                    else:
                        description.append(" ".join(line))
                        next = False
                        
                        
                    
                    
                
                

            data.append({
                "num_SM": int(id),
                "name": " ".join(name),
                "date_start": datetime.strptime(date_start, '%d.%m.%Y').date().strftime('%Y-%m-%d'),
                "date_end": datetime.strptime(date_end, '%d.%m.%Y').date().strftime('%Y-%m-%d'),
                "location": " ".join(location),
                "participants":int(participants),
                'age_group': age_group,
                'description': " ".join(description)
            })
            i += 1

    return data
