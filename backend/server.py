from flask import Flask
from flask_restful import Resource, Api, reqparse
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


class RegisterAdmin(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('first_name', type=str, required=True)
        self.parser.add_argument('last_name', type=str, required=True)
        self.parser.add_argument('email', type=str, required=True)
        self.parser.add_argument('phone_number', type=str, required=True)
        self.parser.add_argument('password', type=str, required=True)
        self.parser.add_argument('reference_code', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        first_name = args['first_name']
        last_name = args['last_name']
        email = args['email']
        phone_number = args['phone_number']
        password = args['password']
        reference_code = args['reference_code']

        cursor = connection.cursor()
        cursor.execute(f'select admin_registration("{first_name}", "{last_name}", "{email}", "{phone_number}", '
                       f'"{password}", "{reference_code}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


api.add_resource(Admins, '/get_admins')
api.add_resource(RegisterAdmin, '/register_admin', methods=['POST'])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
