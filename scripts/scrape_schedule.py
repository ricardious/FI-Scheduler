import requests
from bs4 import BeautifulSoup
import json


url = "https://usuarios.ingenieria.usac.edu.gt/horarios/semestre/1"

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')

    tables = soup.find_all('table')

    schedule_data = []

    for table in tables:
        rows = table.find_all('tr')
        for row in rows:
            cols = row.find_all('td')
            if cols and len(cols) >= 11:
                restriction_cell = cols[10]
                restriction_text = restriction_cell.text.strip()

                if restriction_text == "Ver Restricciones":
                    restriction_button = restriction_cell.find('verRestricciones') or restriction_cell.find('a')
                    if restriction_button:
                        restriction_text = restriction_button.get('data-tooltip') or restriction_button.get('title') or "No especificado"

                data = {
                    "course_code_name": cols[0].text.strip(),
                    "section": cols[1].text.strip(),
                    "mode": cols[2].text.strip(),
                    "credits": cols[3].text.strip(),
                    "classroom": cols[4].text.strip(),
                    "start_time": cols[5].text.strip(),
                    "end_time": cols[6].text.strip(),
                    "days": cols[7].text.strip(),
                    "professor": cols[8].text.strip(),
                    "additional_notes": cols[9].text.strip(),
                    "restrictions": restriction_text
                }
                schedule_data.append(data)

    with open("public/schedules.json", "w", encoding="utf-8") as json_file:
        json.dump(schedule_data, json_file, ensure_ascii=False, indent=4)

    print("Los datos se han guardado en 'schedule.json'")
else:
    print(f"Error al acceder a la página: {response.status_code}")
