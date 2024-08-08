import pytube as pt
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import json
import mariadb
import mysql.connector



cnx = mysql.connector.connect(user = 'Equipe2', password = 'Equipe2', host = '10.2.0.24', database = 'Equipe2')


def top100_music():
    options = webdriver.ChromeOptions()
    s=Service()
    driver= webdriver.Chrome(service=s,options=options)

    driver.get('https://charts.youtube.com/charts/TopSongs/global/weekly')

    imgs = driver.find_elements(By.XPATH,("//img[@id='thumbnail']"))
    songs = driver.find_elements(By.XPATH,("//img[@id='thumbnail']")) 
    title = driver.find_elements(By.XPATH,("//div[@clickable='true']")) 
    artists = driver.find_elements(By.XPATH,("//div[@id='artist-names']")) 

    for z in range(len(songs)):
        imgsrc = songs[z].get_attribute("src")
        artist = artists[z].text
        get_music(json.loads(songs[z].get_attribute("endpoint"))["urlEndpoint"]["url"],title[z].text,imgsrc,artist,z)


def get_music(url,name,imglink, artist,i):
    cursor = cnx.cursor()
    yt = pt.YouTube(url)
    t = yt.streams.filter(only_audio=True)
    t[0].download(filename=sanitize(name)+".mp4")
    url = sanitize(name)+".mp4"
    cursor.execute(f"insert into music(id,imgUrl,Titre,Artiste) values('{i}','{imglink}','{sanitize(name)}','{sanitize(artist)}')")
    cnx.commit()
    cursor.close()




def sanitize(titre):
    if "&" in titre:
        titre = titre.split("&")[0]
    return str(titre).replace(" ", "_").replace(".","_").replace("*","_").replace('"','').replace("(","").replace(")","").replace("'","").replace("?","")

top100_music()
