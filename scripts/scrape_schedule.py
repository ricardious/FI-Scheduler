import requests
from bs4 import BeautifulSoup
import pandas as pd

#Enviar solicitud a la página web
url='https://usuarios.ingenieria.usac.edu.gt/horarios/semestre/1'
response = requests.get(url)

#Obtenemos el contenido de la página web
response = requests.get(url)
if response.status_code != 200:
    print('Error al acceder', response.status_code)
    exit()

#Analisamos el contenido de la página web
soup = BeautifulSoup(response.text, 'html.parser')
tabla = (soup.find('table'))

if not tabla:
    print('No se encontro tablas en la pagina')
    exit()

#Extraemos los datos de la tabla
datos =[]
for fila in tabla.find_all('tr'):
    celdas = fila.find_all('td')
    if celdas:
        datos_fila = [celda.text.strip() for celda in celdas]
        datos.append(datos_fila)

        #Guardamos en CSV
        columnas = ['Nombre_de_Curso', 'Seccion', 'Modalidad', 'Edificio', 'Salon', 'Inicio', 'Final',
        'Dias', 'Catedratico', 'Auxiliar', 'Detalle']
        df = pd.DataFrame(datos, columns=columnas)
        df.to_csv('ingenieria.csv', index=False)

        print('Datos guardados en ingenieria.csv')