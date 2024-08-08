import mysql.connector
import hashlib
import json
from flask import Flask,jsonify,request
from flask_cors import CORS, cross_origin
from mysql.connector import errorcode
import requests
import json
#To install all imports simply run this command in terminal pip install -r requirements.txt

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cnx = mysql.connector.connect(user = 'Equipe2', password = 'Equipe2', host = '10.2.0.24', database = 'Equipe2')


@app.route("/allmusic",methods=['GET'])
@cross_origin()
def Musique() :
    try:
        cursor = cnx.cursor()
    
        query1=f"select * from music ORDER BY Titre"
        cursor.execute(query1)
        reps = cursor.fetchall()
        cursor.close()
        retour =  json.dumps(reps)   

        return retour
    except:
        return {"code":500,"probleme":"Erreur interne du serveur!"}
        

@app.route("/music",methods=['POST'])
@cross_origin()
def MusiqueParNom() :
    try:
        data = request.data.decode("utf-8")
        data = json.loads(data)
        NomMusique = data.get("Nom")
        cursor = cnx.cursor()
    
        query1=f"select * from music where Titre = '"+NomMusique+"'"
        print(query1)
        cursor.execute(query1)
        reps = cursor.fetchall()
        cursor.close()
        retour =  json.dumps(reps)   
        print(retour)
        return retour
    except:
        return {"code":500,"probleme":"Erreur interne du serveur!"}

@app.route("/artiste",methods=['GET'])
@cross_origin()
def Artiste() :
    try:
        cursor = cnx.cursor()
    
        query1=f"select Artiste from music"
        cursor.execute(query1)
        reps = cursor.fetchall()
        cursor.close()
        retour =  json.dumps(reps)   

        return retour
    except:
        return {"code":500,"probleme":"Erreur interne du serveur!"}
    
app.debug = True
app.run(host='10.228.3.16',port=5000)