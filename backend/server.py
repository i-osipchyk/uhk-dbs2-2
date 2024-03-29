from flask import Flask, jsonify, Response
from flask_restful import Resource, Api, reqparse
import mysql.connector
from functions import format_results, build_filter_query, build_get_customer_data_query, build_get_order_query
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)


class CustomerRegistration(Resource):
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

        password_hash = generate_password_hash(password)

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(f'select customer_registration("{first_name}", "{last_name}", "{email}", "{phone_number}", '
                       f'"{password_hash}", "{country}", "{city}", "{street}", "{house_number}", "{postal_code}");')
        result = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()
        if result == 1:
            return Response("{'message': 'Customer registered'}", status=200, mimetype='application/json')
        elif result == 0:
            return Response("{'message': 'Phone number is already in use'}", status=409, mimetype='application/json')
        else:
            return Response("{'message': 'Email is already in use'}", status=409, mimetype='application/json')


class CustomerLogin(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('email', type=str, required=True)
        self.parser.add_argument('password', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        email = args['email']
        password = args['password']

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(f'select customer_login("{email}");')
        existing_password_hash = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()

        if check_password_hash(existing_password_hash, password):
            return Response("{'message': 'Credentials are correct'}", status=200, mimetype='application/json')
        else:
            return Response('{"message": "Credentials are incorrect"}', status=401, mimetype="application/json")


class UpdateAddress(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('customer_id', type=int, required=True)
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

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(
            f'select update_address("{customer_id}", "{country}", "{city}", "{street}", "{house_number}", "{postal_code}");')
        result = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()

        if result == 0:
            return Response('{"message": "Address was changed successfully."}', status=200, mimetype="application/json")
        else:
            return Response('{"message": "Something went wrong. Please, try again."}', status=500,
                            mimetype="application/json")


class AddProductToOrder(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('customer_id', type=int, required=True)
        self.parser.add_argument('product_id', type=int, required=True)
        self.parser.add_argument('quantity', type=int, required=True)
        self.parser.add_argument('size', type=float, required=True)

    def post(self):
        args = self.parser.parse_args()
        customer_id = args['customer_id']
        product_id = args['product_id']
        quantity = args['quantity']
        size = args['size']

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(
            f'select add_product_to_order("{product_id}", "{quantity}", "{customer_id}", "{size}");')
        message = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()

        status_code = 500
        if message.split(' ')[0] == 'Quantity' or message.split(' ')[0] == 'Item':
            status_code = 200
        print(message)
        return Response(message, status=status_code, mimetype="application/json")


class UpdateQuantity(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('customer_id', type=int, required=True)
        self.parser.add_argument('product_id', type=int, required=True)
        self.parser.add_argument('quantity', type=int, required=True)

    def post(self):
        args = self.parser.parse_args()
        customer_id = args['customer_id']
        product_id = args['product_id']
        quantity = args['quantity']

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(f'select update_quantity("{customer_id}", "{product_id}", "{quantity}");')
        result = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()

        if result == 0:
            return Response('{"message": "Quantity was updated successfully"}', status=200, mimetype="application/json")
        else:
            return Response('{"message": "Something went wrong. Please try again."}', status=500,
                            mimetype="application/json")


class RemoveItemFromOrder(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('product_id', type=str, required=True)
        self.parser.add_argument('customer_id', type=str, required=True)
        self.parser.add_argument('size', type=float, required=True)

    def post(self):
        args = self.parser.parse_args()
        product_id = args['product_id']
        customer_id = args['customer_id']
        size = args['size']

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(f'select remove_from_order("{product_id}", "{size}","{customer_id}");')
        result = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()

        if result == 0:
            return Response('{"message": "Item removed successfully."}', status=200, mimetype="application/json")
        else:
            return Response('{"message": "Something went wrong. Please try again."}', status=500,
                            mimetype="application/json")


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

        password_hash = generate_password_hash(password)

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(
            f'select admin_registration("{first_name}", "{last_name}", "{email}", "{phone_number}", "{password_hash}", "{reference_code}");')
        result = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()

        if result == 0:
            return Response("{'message': 'Admin registered'}", status=200, mimetype='application/json')
        elif result == 1:
            return Response("{'message': 'Invalid reference code'}", status=409, mimetype='application/json')
        elif result == 2:
            return Response("{'message': 'Phone number is already in use}", status=409, mimetype='application/json')
        else:
            return Response("{'message': 'Email is already in use'}", status=409, mimetype='application/json')


class AdminLogin(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('email', type=str, required=True)
        self.parser.add_argument('password', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        email = args['email']
        password = args['password']

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(f'select admin_login("{email}");')
        existing_password_hash = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()

        if check_password_hash(existing_password_hash, password):
            return Response("{'message': 'Credentials are correct'}", status=200, mimetype='application/json')
        else:
            return Response('{"message": "Credentials are incorrect"}', status=401, mimetype="application/json")


class AddStorage(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('country', type=str, required=True)
        self.parser.add_argument('city', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        country = args['country']
        city = args['city']

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(f'select add_storage("{country}", "{city}");')
        result = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()

        if result == 0:
            return Response("{'message': 'Storage added successfully.'}", status=200, mimetype='application/json')
        else:
            return Response("{'message': 'Something wend wrong. Please, try again'}", status=500,
                            mimetype='application/json')


class AddProduct(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('name', type=str, required=True)
        self.parser.add_argument('price', type=float, required=True)
        self.parser.add_argument('brand', type=str, required=True)
        self.parser.add_argument('color_1', type=str, required=True)
        self.parser.add_argument('color_2', type=str, required=False)
        self.parser.add_argument('color_3', type=str, required=False)
        self.parser.add_argument('category', type=str, required=True)
        self.parser.add_argument('release_year', type=int, required=True)
        self.parser.add_argument('gender', type=str, required=True)
        self.parser.add_argument('description', type=str, required=True)
        self.parser.add_argument('image', type=str, required=True)

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
        image = args['image']

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(
            f'select add_product("{name}", "{price}", "{brand}", "{color_1}", "{color_2}", "{color_3}", "{category}", "{release_year}", "{gender}", "{description}", "{image}");')
        result = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()

        if result == 0:
            return Response("{'message': 'Product added successfully.}", status=200, mimetype='application/json')
        elif result == 1:
            return Response("{'message': 'Product already exists.'}", status=200, mimetype='application/json')
        else:
            return Response("{'message': 'Something went wrong. Please, try again.'}", status=500,
                            mimetype='application/json')


class AddProductToStorage(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('product_id', type=int, required=True)
        self.parser.add_argument('size', type=float, required=True)
        self.parser.add_argument('city', type=str, required=True)
        self.parser.add_argument('quantity', type=int, required=True)

    def post(self):
        args = self.parser.parse_args()
        product_id = args['product_id']
        size = args['size']
        city = args['city']
        quantity = args['quantity']

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(
            f'select add_product_to_storage("{product_id}", "{size}", "{city}", "{quantity}");')
        message = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()

        if message.split(' ')[0] == 'There':
            return Response(f"{'message': '{message}'}", status=500, mimetype='application/json')
        else:
            return Response(f"{'message': '{message}'}", status=200, mimetype='application/json')


class Purchase(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('customer_id', type=int, required=True)

    def post(self):
        args = self.parser.parse_args()
        customer_id = args['customer_id']

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(f'select purchase("{customer_id}");')
        message = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()

        status_code = 200
        if message.split(' ')[0] == 'There' or message.split(' ')[0] == 'Some':
            status_code = 404

        return Response(message, status=status_code, mimetype='application/json')


class ChangeProduct(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('product_id', type=int, required=True)
        self.parser.add_argument('new_name', type=str, required=False)
        self.parser.add_argument('new_color_1', type=str, required=False)
        self.parser.add_argument('new_color_2', type=str, required=False)
        self.parser.add_argument('new_color_3', type=str, required=False)
        self.parser.add_argument('new_gender', type=str, required=False)
        self.parser.add_argument('new_price', type=float, required=False)
        self.parser.add_argument('new_brand', type=str, required=False)
        self.parser.add_argument('new_category', type=str, required=False)
        self.parser.add_argument('new_release_year', type=int, required=False)
        self.parser.add_argument('new_description', type=str, required=False)
        self.parser.add_argument('new_image', type=str, required=False)

    def post(self):
        args = self.parser.parse_args()
        product_id = args['product_id']
        new_name = f"\"{args['new_name']}\"" if args['new_name'] is not None else 'null'
        new_color_1 = f"\"{args['new_color_1']}\"" if args['new_color_1'] is not None else 'null'
        new_color_2 = f"\"{args['new_color_2']}\"" if args['new_color_2'] is not None else 'null'
        new_color_3 = f"\"{args['new_color_3']}\"" if args['new_color_3'] is not None else 'null'
        new_gender = f"\"{args['new_gender']}\"" if args['new_gender'] is not None else 'null'
        new_price = f"\"{args['new_price']}\"" if args['new_price'] is not None else 'null'
        new_brand = f"\"{args['new_brand']}\"" if args['new_brand'] is not None else 'null'
        new_category = f"\"{args['new_category']}\"" if args['new_category'] is not None else 'null'
        new_release_year = f"\"{args['new_release_year']}\"" if args['new_release_year'] is not None else 'null'
        new_description = f"\"{args['new_description']}\"" if args['new_description'] is not None else 'null'
        new_image = f"\"{args['new_image']}\"" if args['new_image'] is not None else 'null'

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(
            f'select change_product("{product_id}", {new_name}, {new_color_1}, {new_color_2}, {new_color_3}, {new_gender}, {new_price}, {new_brand}, {new_category}, {new_release_year}, {new_description}, {new_image});')
        result = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()

        if result == 0:
            return Response("{'message': 'Product was changed successfully.'}", status=200, mimetype='application/json')
        else:
            return Response("{'message': 'Product does not exist.'}", status=500, mimetype='application/json')


class DeleteProduct(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('product_id', type=int, required=True)

    def post(self):
        args = self.parser.parse_args()
        product_id = args['product_id']

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(f'select delete_product("{product_id}");')
        result = cursor.fetchall()[0][0]

        connection.commit()
        cursor.close()

        if result == 0:
            return Response("{'message': 'Product was deleted successfully.'}", status=200, mimetype='application/json')
        else:
            return Response("{'message': 'Product does not exist.'}", status=500, mimetype='application/json')


class FilterProducts(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('name', type=str, required=False)
        self.parser.add_argument('min_price', type=float, required=False)
        self.parser.add_argument('max_price', type=float, required=False)
        self.parser.add_argument('brand', type=str, required=False)
        self.parser.add_argument('color_1', type=str, required=False)
        self.parser.add_argument('color_2', type=str, required=False)
        self.parser.add_argument('color_3', type=str, required=False)
        self.parser.add_argument('category', type=str, required=False)
        self.parser.add_argument('release_year', type=int, required=False)
        self.parser.add_argument('gender', type=str, required=False)

    def post(self):
        args = self.parser.parse_args()
        name = f"\"{args['name']}\"" if args['name'] is not None else 'null'
        min_price = args['min_price'] if args['min_price'] is not None else 'null'
        color_1 = f"\"{args['color_1']}\"" if args['color_1'] is not None else 'null'
        color_2 = f"\"{args['color_2']}\"" if args['color_2'] is not None else 'null'
        color_3 = f"\"{args['color_3']}\"" if args['color_3'] is not None else 'null'
        gender = f"\"{args['gender']}\"" if args['gender'] is not None else 'null'

        if args['max_price'] == 0 or args['max_price'] is None:
            max_price = 'null'
        else:
            max_price = args['max_price']

        if args['release_year'] == 0 or args['release_year'] is None:
            release_year = 'null'
        else:
            release_year = args['release_year']

        if args['brand'] == '' or args['brand'] is None:
            brand = 'null'
        else:
            brand = f"\"{args['brand']}\""

        if args['category'] == '' or args['category'] is None:
            category = 'null'
        else:
            category = f"\"{args['category']}\""


        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        query = build_filter_query(name, min_price, max_price, brand, color_1, color_2, color_3, category, release_year,
                                   gender)
        cursor.execute(query)
        result = cursor.fetchall()

        cursor.close()
        connection.commit()

        if result:
            return result
        else:
            return Response('{"message":"There aren\'t any products."}', status=404, mimetype='application/json')


class GetId(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('email', type=str, required=True)

    def post(self):
        args = self.parser.parse_args()
        email = args['email']

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        cursor.execute(f'select customer_id from customers where email = "{email}";')
        result = cursor.fetchall()

        connection.commit()
        cursor.close()

        if result:
            return jsonify(result)
        else:
            return Response('{"message":"There is no customer with this email."}', status=404,
                            mimetype='application/json')


class GetCustomerData(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('customer_id', type=int, required=True)

    def post(self):
        args = self.parser.parse_args()
        customer_id = args['customer_id']

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        query = build_get_customer_data_query(current_customer_id=customer_id)
        cursor.execute(query)
        result = cursor.fetchall()

        cursor.close()
        connection.commit()

        if result:
            return jsonify(result)
        else:
            return Response('{"message":"There is no customer data."}', status=404, mimetype='application/json')


class GetOrderData(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('customer_id', type=int, required=True)

    def post(self):
        args = self.parser.parse_args()
        customer_id = args['customer_id']

        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        query = build_get_order_query(current_customer_id=customer_id)
        cursor.execute(query)
        result = cursor.fetchall()

        cursor.close()
        connection.commit()

        if result:
            return jsonify(result)
        else:
            return Response('{"message":"There is no current order."}', status=404, mimetype='application/json')


class GetNikeProducts(Resource):
    def get(self):
        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        query = 'select * from nike_products;'
        cursor.execute(query)
        result = cursor.fetchall()

        cursor.close()
        connection.commit()

        if result:
            return result
        else:
            return Response('{"message":"There are no Nike products."}', status=404, mimetype='application/json')


class GetAdidasProducts(Resource):
    def get(self):
        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        query = 'select * from adidas_products;'
        cursor.execute(query)
        result = cursor.fetchall()

        cursor.close()
        connection.commit()

        if result:
            return result
        else:
            return Response('{"message":"There are no Adidas products."}', status=404, mimetype='application/json')


class GetJordanProducts(Resource):
    def get(self):
        connection = mysql.connector.connect(
            user='root',
            password='password',
            # host='database',
            # port='3306',
            database='shop',
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        query = 'select * from jordan_products;'
        cursor.execute(query)
        result = cursor.fetchall()

        cursor.close()
        connection.commit()

        if result:
            return result
        else:
            return Response('{"message":"There are no Jordan products."}', status=404, mimetype='application/json')


api.add_resource(CustomerRegistration, '/customer_registration', methods=['POST'])
api.add_resource(CustomerLogin, '/customer_login', methods=['POST'])
api.add_resource(UpdateAddress, '/update_address', methods=['POST'])
api.add_resource(AddProductToOrder, '/add_product_to_order', methods=['POST'])
api.add_resource(UpdateQuantity, '/update_quantity', methods=['POST'])
api.add_resource(RemoveItemFromOrder, '/remove_item_from_order', methods=['POST'])
api.add_resource(AdminRegistration, '/admin_registration', methods=['POST'])
api.add_resource(AdminLogin, '/admin_login', methods=['POST'])
api.add_resource(AddStorage, '/add_storage', methods=['POST'])
api.add_resource(AddProduct, '/add_product', methods=['POST'])
api.add_resource(AddProductToStorage, '/add_product_to_storage', methods=['POST'])
api.add_resource(Purchase, '/purchase', methods=['POST'])
api.add_resource(ChangeProduct, '/change_product', methods=['POST'])
api.add_resource(DeleteProduct, '/delete_product', methods=['POST'])
api.add_resource(FilterProducts, '/filter_products', methods=['POST'])
api.add_resource(GetId, '/get_id', methods=['POST'])
api.add_resource(GetCustomerData, '/get_customer_data', methods=['POST'])
api.add_resource(GetOrderData, '/get_order_data', methods=['POST'])
api.add_resource(GetNikeProducts, '/get_nike_products', methods=['GET'])
api.add_resource(GetAdidasProducts, '/get_adidas_products', methods=['GET'])
api.add_resource(GetJordanProducts, '/get_jordan_products', methods=['GET'])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
