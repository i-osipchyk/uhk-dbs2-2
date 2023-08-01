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


class RegisterCustomer(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('first_name', type=str, required=True)
        self.parser.add_argument('last_name', type=str, required=True)
        self.parser.add_argument('email', type=str, required=True)
        self.parser.add_argument('phone_number', type=str, required=True)
        self.parser.add_argument('password', type=str, required=True)
        self.parser.add_argument('country', type=str, required=True)
        self.parser.add_argument('city', type=str, required=True)
        self.parser.add_argument('street', type=str, required=True)
        self.parser.add_argument('house_number', type=str, required=True)
        self.parser.add_argument('postal_code', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        first_name = args['first_name']
        last_name = args['last_name']
        email = args['email']
        phone_number = args['phone_number']
        password = args['password']
        country = args['country']
        city = args['city']
        street = args['street']
        house_number = args['house_number']
        postal_code = args['postal_code']

        cursor = connection.cursor()
        cursor.execute(f'select customer_registration("{first_name}", "{last_name}", "{email}", "{phone_number}", '
                       f'"{password}", "{country}", "{city}", "{street}", "{house_number}", "{postal_code}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


class LoginCustomer(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('email', type=str, required=True)

    def get(self):
        args = self.parser.parse_args()
        email = args['email']

        cursor = connection.cursor()
        cursor.execute(f'select customer_login("{email}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


class UpdateAddress(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('customer_id', type=str, required=True)
        self.parser.add_argument('country', type=str, required=True)
        self.parser.add_argument('city', type=str, required=True)
        self.parser.add_argument('street', type=str, required=True)
        self.parser.add_argument('house_number', type=str, required=True)
        self.parser.add_argument('postal_code', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        customer_id = args['customer_id']
        country = args['country']
        city = args['city']
        street = args['street']
        house_number = args['house_number']
        postal_code = args['postal_code']

        cursor = connection.cursor()
        cursor.execute(
            f'select update_address("{customer_id}", "{country}", "{city}", "{street}", "{house_number}", "{postal_code}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


class AddProductToOrder(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('customer_id', type=str, required=True)
        self.parser.add_argument('product_id', type=str, required=True)
        self.parser.add_argument('address_id', type=str, required=True)
        self.parser.add_argument('quantity', type=str, required=True)
        self.parser.add_argument('size', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        customer_id = args['customer_id']
        product_id = args['product_id']
        address_id = args['address_id']
        quantity = args['quantity']
        size = args['size']

        cursor = connection.cursor()
        cursor.execute(
            f'select add_product_to_order("{product_id}", "{quantity}", "{customer_id}", "{address_id}", "{size}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


class UpdateQuantity(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('customer_id', type=str, required=True)
        self.parser.add_argument('product_id', type=str, required=True)
        self.parser.add_argument('quantity', type=str, required=True)

    def update(self):
        args = self.parser.parse_args()
        customer_id = args['customer_id']
        product_id = args['product_id']
        quantity = args['quantity']

        cursor = connection.cursor()
        cursor.execute(f'select update_quantity("{customer_id}", "{product_id}", "{quantity}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


class RemoveItemFromOrder():
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('product_id', type=str, required=True)
        self.parser.add_argument('customer_id', type=str, required=True)

    def delete(self):
        args = self.parser.parse_args()
        product_id = args['product_id']
        customer_id = args['customer_id']

        cursor = connection.cursor()
        cursor.execute(f'select remove_from_order("{product_id}", "{customer_id}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


api.add_resource(RegisterCustomer, '/customer_registration', methods=['POST'])
api.add_resource(LoginCustomer, '/customer_login', methods=['POST'])
api.add_resource(UpdateAddress, '/update_address', methods=['POST'])
api.add_resource(AddProductToOrder, '/add_to_order', methods='POST')
api.add_resource(UpdateQuantity, '/update_quantity', methods=['POST'])
api.add_resource(RemoveItemFromOrder, '/remove_from_order', methods=['POST'])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
