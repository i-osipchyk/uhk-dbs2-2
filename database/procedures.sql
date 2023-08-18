##### FILTER PRODUCTS #####

# select the rows with given parameters, skip null parameters

create procedure filter_products(
    filter_name varchar(255),
    filter_min_price float,
    filter_max_price float,
    filter_brand varchar(255),
    filter_color_1 varchar(255),
    filter_color_2 varchar(255),
    filter_color_3 varchar(255),
    filter_product_category varchar(255),
    filter_release_year int,
    filter_product_gender varchar(255)
)
begin
    select *
    from products
    where (name_ like CONCAT('%', filter_name, '%') or filter_name is null)
      and (price >= filter_min_price or filter_min_price is null)
      and (price <= filter_max_price or filter_max_price is null)
      and (brand like CONCAT('%', filter_brand, '%') or filter_brand is null)
      and (color_1 = filter_color_1 or filter_color_1 is null)
      and (color_2 = filter_color_2 or filter_color_2 is null)
      and (color_3 = filter_color_3 or filter_color_3 is null)
      and (category = filter_product_category or filter_product_category is null)
      and (release_year = filter_release_year or filter_release_year is null)
      and (gender = filter_product_gender or filter_product_gender is null);
end;


##### GET CUSTOMER DATA #####

# search for a customer with the following id and returns his or her data

create procedure get_profile_data(
    current_customer_id int
)
begin
    select c.first_name, c.last_name, c.email, c.phone_number, a.country, a.city, a.street, a.house_number, a.postal_code
    from customers c
    join addresses a on c.address_id = a.address_id
    where customer_id = current_customer_id;
end;