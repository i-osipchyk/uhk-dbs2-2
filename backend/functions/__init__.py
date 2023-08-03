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
