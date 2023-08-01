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


class RemoveItemFromOrder(Resource):
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


class AdminRegistration(Resource):
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
        cursor.execute(f'select admin_registration("{first_name}", "{last_name}", "{email}", "{phone_number}", "{password}", "{reference_code}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


class AdminLogin(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('email', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        email = args['email']

        cursor = connection.cursor()
        cursor.execute(f'select admin_login("{email}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


class AddStorage(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('country', type=str, required=True)
        self.parser.add_argument('city', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        country = args['country']
        city = args['city']

        cursor = connection.cursor()
        cursor.execute(f'select add_storage("{country}", "{city}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


class AddProduct(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('name', type=str, required=True)
        self.parser.add_argument('price', type=str, required=True)
        self.parser.add_argument('brand', type=str, required=True)
        self.parser.add_argument('color_1', type=str, required=True)
        self.parser.add_argument('color_2', type=str, required=True)
        self.parser.add_argument('color_3', type=str, required=True)
        self.parser.add_argument('category', type=str, required=True)
        self.parser.add_argument('release_year', type=str, required=True)
        self.parser.add_argument('gender', type=str, required=True)
        self.parser.add_argument('description', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        name = args['name']
        price = args['price']
        brand = args['brand']
        color_1 = args['color_1']
        color_2 = args['color_2']
        color_3 = args['color_3']
        category = args['category']
        release_year = args['release_year']
        gender = args['gender']
        description = args['description']

        cursor = connection.cursor()
        cursor.execute(f'select add_product("{name}", "{price}", "{brand}", "{color_1}", "{color_2}", "{color_3}", "{category}", "{release_year}", "{gender}", "{description}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


class AddProductToStorage(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('name', type=str, required=True)
        self.parser.add_argument('color_1', type=str, required=True)
        self.parser.add_argument('color_2', type=str, required=True)
        self.parser.add_argument('color_3', type=str, required=True)
        self.parser.add_argument('gender', type=str, required=True)
        self.parser.add_argument('size', type=str, required=True)
        self.parser.add_argument('city', type=str, required=True)
        self.parser.add_argument('quantity', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        name = args['name']
        color_1 = args['color_1']
        color_2 = args['color_2']
        color_3 = args['color_3']
        gender = args['gender']
        size = args['size']
        city = args['city']
        quantity = args['quantity']

        cursor = connection.cursor()
        cursor.execute(f'select add_product_to_storage("{name}", "{color_1}", "{color_2}", "{color_3}", "{gender}", "{size}", "{city}", "{quantity}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


class Purchase(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('customer_id', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        customer_id = args['customer_id']

        cursor = connection.cursor()
        cursor.execute(f'select purchase("{customer_id}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


class ChangeProduct(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('name', type=str, required=True)
        self.parser.add_argument('color_1', type=str, required=True)
        self.parser.add_argument('color_2', type=str, required=True)
        self.parser.add_argument('color_3', type=str, required=True)
        self.parser.add_argument('gender', type=str, required=True)
        self.parser.add_argument('new_name', type=str, required=True)
        self.parser.add_argument('new_color_1', type=str, required=True)
        self.parser.add_argument('new_color_2', type=str, required=True)
        self.parser.add_argument('new_color_3', type=str, required=True)
        self.parser.add_argument('new_gender', type=str, required=True)
        self.parser.add_argument('new_price', type=str, required=True)
        self.parser.add_argument('new_brand', type=str, required=True)
        self.parser.add_argument('new_category', type=str, required=True)
        self.parser.add_argument('new_release_year', type=str, required=True)
        self.parser.add_argument('new_description', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        name = args['name']
        color_1 = args['color_1']
        color_2 = args['color_2']
        color_3 = args['color_3']
        gender = args['gender']
        new_name = args['new_name']
        new_color_1 = args['new_color_1']
        new_color_2 = args['new_color_2']
        new_color_3 = args['new_color_3']
        new_gender = args['new_gender']
        new_price = args['new_price']
        new_brand = args['new_brand']
        new_category = args['new_category']
        new_release_year = args['new_release_year']
        new_description = args['new_description']

        cursor = connection.cursor()
        cursor.execute(f'select change_product("{name}", "{color_1}", "{color_2}", "{color_3}", "{gender}", "{new_name}", "{new_color_1}", "{new_color_2}", "{new_color_3}", "{new_gender}", "{new_price}", "{new_brand}", "{new_category}", "{new_release_year}", "{new_description}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


class DeleteProduct(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('name', type=str, required=True)
        self.parser.add_argument('color_1', type=str, required=True)
        self.parser.add_argument('color_2', type=str, required=True)
        self.parser.add_argument('color_3', type=str, required=True)
        self.parser.add_argument('gender', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        name = args['name']
        color_1 = args['color_1']
        color_2 = args['color_2']
        color_3 = args['color_3']
        gender = args['gender']

        cursor = connection.cursor()
        cursor.execute(f'select delete_product("{name}", "{color_1}", "{color_2}", "{color_3}", "{gender}");')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        return result


class FilterProducts(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('name', type=str, required=False)
        self.parser.add_argument('min_price', type=str, required=False)
        self.parser.add_argument('max_price', type=str, required=False)
        self.parser.add_argument('brand', type=str, required=False)
        self.parser.add_argument('color_1', type=str, required=False)
        self.parser.add_argument('color_2', type=str, required=False)
        self.parser.add_argument('color_3', type=str, required=False)
        self.parser.add_argument('category', type=str, required=False)
        self.parser.add_argument('release_year', type=str, required=False)
        self.parser.add_argument('gender', type=str, required=False)

    def post(self):
        args = self.parser.parse_args()
        name = args['name']
        min_price = args['min_price']
        max_price = args['max_price']
        brand = args['brand']
        color_1 = args['color_1']
        color_2 = args['color_2']
        color_3 = args['color_3']
        category = args['category']
        release_year = args['release_year']
        gender = args['gender']

        cursor = connection.cursor()
        cursor.execute(f'select filter_products("{name}", "{min_price}", "{max_price}", "{brand}", "{color_1}", "{color_2}", "{color_3}", "{category}", "{release_year}", "{gender}");')
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
api.add_resource(AdminRegistration, '/admin_registration', methods=['POST'])
api.add_resource(AdminLogin, '/admin_login', methods=['POST'])
api.add_resource(AddStorage, '/add_storage', methods=['POST'])
api.add_resource(AddProduct, '/add_product', methods=['POST'])
api.add_resource(AddProductToStorage, '/add_product_to_storage', methods=['POST'])
api.add_resource(Purchase, '/purchase', methods=['POST'])
api.add_resource(ChangeProduct, '/change_product', methods=['POST'])
api.add_resource(DeleteProduct, '/delete_product', methods=['POST'])
api.add_resource(FilterProducts, '/filter_products', methods=['POST'])


if __name__ == '__main__':
    app.run(debug=True, port=5000)
