from flask import Flask, render_template
from flask_mysqldb import MySQL

app = Flask(__name__)

# MySQL-Datenbankverbindung
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'dein_benutzer'
app.config['MYSQL_PASSWORD'] = 'dein_passwort'
app.config['MYSQL_DB'] = 'deine_datenbank'

mysql = MySQL(app)

@app.route('/produkte')
def produkte():
    # Verbindung zur Datenbank herstellen und Produkte abrufen
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM produkte")
    produkte = cur.fetchall()
    cur.close()

    return render_template('produkte.html', produkte=produkte)

if __name__ == '__main__':
    app.run(debug=True)
