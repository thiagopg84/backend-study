import psycopg2
import json
from flask import request
from flask import Flask
from flask_cors import CORS
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)

@app.route('/allusers')
def allUsers():
	users = ''
	conn = psycopg2.connect("dbname=thiago user=postgres password=qazxsw")
	cursor = conn.cursor(cursor_factory=RealDictCursor)
	cursor.execute('select * from users')
	recset = cursor.fetchall()
	for rec in recset:
		users = users + str(rec)
	conn.close()
	return json.dumps(recset)

@app.route('/allgames')
def allGames():
	games = ''
	conn = psycopg2.connect("dbname=thiago user=postgres password=qazxsw")
	cursor = conn.cursor(cursor_factory=RealDictCursor)
	cursor.execute('select * from games')
	recset = cursor.fetchall()
	print(recset)
	for rec in recset:
		games = games + str(rec)
	conn.close()
	return json.dumps(recset)

@app.route('/createuser', methods = ['POST']) # methods é uma array que recebe os tipos de métodos (get, post etc)
def createUser():
	conn = psycopg2.connect("dbname=thiago user=postgres password=qazxsw")
	cursor = conn.cursor()
	if request.method == 'GET':
		return 'você chamou o método GET'
	if request.method == 'POST':
		data = request.form
		# print(data)
		# return data
		if request.is_json:
			content = request.get_json()
			cursor.execute("INSERT INTO users(avatar, city, email, fbmessenger, state, whatsapp) VALUES(%s, %s, %s, %s, %s, %s)", (content['avatar'], content['city'], content['email'], content['fbmessenger'], content['state'], content['whatsapp']))
		conn.commit()
		cursor.close()
		conn.close()
		return 'você chamou o método POST'

@app.route('/creategame', methods = ['POST']) # methods é uma array que recebe os tipos de métodos (get, post etc)
def createGame():
	conn = psycopg2.connect("dbname=thiago user=postgres password=qazxsw")
	cursor = conn.cursor()
	if request.method == 'GET':
		return 'você chamou o método GET'
	if request.method == 'POST':
		# print(request)
		# data = request.form
		# print(data)
		# return data
		if request.is_json:
			content = request.get_json()
			# print(content['gameName'])
			cursor.execute("INSERT INTO games(gameconsole, gamecover, gamename, email, fbmessenger, gameprice, sale, whatsapp, userid) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)", (content['gameConsole'], content['gameCover'], content['gameName'], content['email'], content['fbMessenger'], content['gamePrice'], content['sale'], content['whatsapp'], 3))
		#return {coco:'bosta'}
		conn.commit()
		cursor.close()
		conn.close()
		return 'oie'

if __name__ == '__main__':
	app.run()