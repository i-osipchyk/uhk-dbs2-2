# create a list of rows. each row is represented as a dict in format {column_name: column_value}
def format_results(column_names, rows):
    result_list = [{column_names[i]: tpl[i] for i in range(len(tpl))} for tpl in rows]

    return result_list


def build_filter_query(name, min_price, max_price, brand, color_1, color_2, color_3, category, release_year, gender):
    query = f'select * from products ' \
            f'where (name_ like CONCAT(\'%\', {name}, \'%\') or {name} is null) ' \
            f'and (price >= {min_price} or {min_price} is null) ' \
            f'and (price <= {max_price} or {max_price} is null) ' \
            f'and (brand like CONCAT(\'%\', {brand}, \'%\') or {brand} is null) ' \
            f'and (color_1 = {color_1} or {color_1} is null) ' \
            f'and (color_2 = {color_2} or {color_2} is null) ' \
            f'and (color_3 = {color_3} or {color_3} is null) ' \
            f'and (category = {category} or {category} is null) ' \
            f'and (release_year = {release_year} or {release_year} is null) ' \
            f'and (gender = {gender} or {gender} is null);'

    return query


def build_get_customer_data_query(current_customer_id):
    query = f'select c.first_name, c.last_name, c.email, c.phone_number, a.country, a.city, a.street, a.house_number, a.postal_code ' \
            f'from customers c ' \
            f'join addresses a on c.address_id = a.address_id ' \
            f'where customer_id = {current_customer_id};'

    return query


def build_get_order_query(current_customer_id):
    query = f'select p.name_, p.brand, p.color_1, p.color_2, p.color_3, p.category, p.release_year, p.gender, oi.size, oi.price, oi.quantity ' \
            f'from products p ' \
            f'join order_items oi on p.product_id = oi.product_id ' \
            f'join orders_ o on oi.order_id = o.order_id ' \
            f'where o.customer_id = {current_customer_id} and o.order_date is null;'

    return query
