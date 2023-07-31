from flask import Flask
from flask_restful import Resource, Api
import mysql.connector
from functions import format_results

app = Flask(__name__)
api = Api(app)

connection = mysql.connector.connect(
    user='root',
    password='password',
    # host='database',
    # port='3306',
    database='shop',
    auth_plugin='mysql_native_password'
)


class Admins(Resource):
    def get(self):
        cursor = connection.cursor()

        cursor.execute("select * from admins")
        rows = cursor.fetchall()
        column_names = [desc[0] for desc in cursor.description]
        results = format_results(column_names, rows)

        connection.commit()
        cursor.close()

        return results


api.add_resource(Admins, '/get_admins')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
