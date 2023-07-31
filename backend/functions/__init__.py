# create a list of rows. each row is represented as a dict in format {column_name: column_value}
def format_results(column_names, rows):
    result_list = [{column_names[i]: tpl[i] for i in range(len(tpl))} for tpl in rows]

    return result_list
