##### CUSTOMER REGISTRATION #####

# function inserts address and returns its id. if address exists, returns its id

create function find_or_insert_address(
  new_country varchar(20),
  new_city varchar(20),
  new_street varchar(30),
  new_house_number varchar(10),
  new_postal_code varchar(10)
) returns int deterministic
begin
  declare address_id_ int;

  # check if address already exists
  select address_id into address_id_ from addresses where country = new_country and city = new_city and street = new_street and house_number = new_house_number and postal_code = new_postal_code;

  if address_id_ is null then
    # if address does not exist, insert a new row and return its id
    insert into addresses (country, city, street, house_number, postal_code) VALUES (new_country, new_city, new_street, new_house_number, new_postal_code);
    return LAST_INSERT_ID();
  else
    # if address already exists, return its id
    return address_id_;
  end if;
end;

# function checks if email and phone number are in use. then it creates or gets address_id and creates a new customer

create function customer_registration(
    new_first_name varchar(20),
    new_last_name varchar(20),
    new_email varchar(50),
    new_phone_number varchar(15),
    new_password_ varchar(1000),
    new_country varchar(20),
    new_city varchar(20),
    new_street varchar(30),
    new_house_number varchar(10),
    new_postal_code varchar(10)
) returns varchar(30) deterministic
begin
    declare email_in_use int;
    declare phone_number_in_use int;

    # check if email is already in use
    select customer_id into email_in_use from customers where email = new_email;

    if email_in_use is null then
        # if email is not used
        # check if phone number is already in use
        select customer_id into phone_number_in_use from customers where phone_number = new_phone_number;

        if phone_number_in_use is null then
            # if phone number is not used
            # get address_id
            set @result_id = find_or_insert_address(new_country, new_city, new_street, new_house_number, new_postal_code);
            # create new customer
            insert into customers(first_name, last_name, email, phone_number, password_, address_id)
                values (new_first_name, new_last_name, new_email, new_phone_number, new_password_, @result_id);
            return 'Customer registered';
        else
            return 'Phone number is already in use';
        end if;
    else
        return 'Email is already in use';
    end if;
end;


##### CUSTOMER LOGIN #####

# function checks if there is an account with this email. if yes, it returns the password

create function customer_login(
    login_email varchar(50)
) returns varchar(100) deterministic
begin
    declare existing_email varchar(50);
    declare existing_password varchar(1000);

    select email into existing_email from customers where email = login_email;

    if existing_email is not null then
        # if email is found
        select password_ into existing_password from customers where email = login_email;
        return existing_password;
    else
        return 'Account with following email was not found';
    end if;
end;


##### UPDATE ADDRESS #####

# update address
# function gets the id of the address or creates new address and gets it id. it then assigns address_id to the customer
create function update_address(
    customer_id_ int,
    new_country varchar(20),
    new_city varchar(20),
    new_street varchar(30),
    new_house_number varchar(10),
    new_postal_code varchar(10)
) returns varchar(100) deterministic
begin
    # get id of the address
    set @new_address_id = find_or_insert_address(new_country, new_city, new_street, new_house_number, new_postal_code);

    # update the address in customers table
    update customers
    set address_id = @new_address_id
    where customer_id = customer_id_;

    return 'Address was changed';
end;

##### ADD PRODUCT TO BASKET #####

# look for maximum quantity for a given product in the storages of the customers country

create function check_availability(
    required_product_id int,
    customers_address_id int,
    required_quantity int,
    required_size float
) returns int deterministic
begin
    declare order_country varchar(20);
    declare max_quantity int;

    # select the country of the customer
    select country into order_country from addresses
    where address_id = customers_address_id;

    # select the maximum quantity of give product of given size in a given country
    set max_quantity = (
        select max(quantity)
        from products_storages ps
        where ps.product_id = required_product_id and ps.size = required_size and ps.storage_country = order_country
    );

    # if product was not found or its quantity equals to 0 returns 0
    if max_quantity is null or max_quantity = 0 then
        return 0;
    end if;

    # if quantity of product is sufficient, return -1. if insufficient but greater than 0 return max_quantity
    if required_quantity <= max_quantity then
        return -1;
    else
        return max_quantity;
    end if;
end;

# add new order and return its id

create function add_order(
    current_customer_id int,
    current_address_id int
) returns varchar(50) deterministic
begin
    # insert new order and return its id
    insert into orders_(customer_id, address_id) values (current_customer_id, current_address_id);
    return last_insert_id();
end;

# calculate the total price of the item
# create new instance in order_items
# update total price of the order

create function add_order_item(
    added_order_id int,
    added_product_id int,
    added_size float,
    added_quantity int
) returns varchar(50) deterministic
begin
    declare new_item_price float;

    # calculate item price
    set new_item_price = added_quantity * (select price from products where product_id = added_product_id);

    # create order item
    insert into order_items(price, quantity, order_id, product_id, size)
    values (new_item_price, added_quantity, added_order_id, added_product_id, added_size);

    # update total order price
    update orders_
    set price = price + new_item_price
    where order_id = added_order_id;

    return 'Item successfully added to the order';
end;

# changes quantity and updates price of item
# updates price of order

create function update_price_and_quantity(
    chosen_product_id int,
    current_order_id int,
    new_quantity int,
    chosen_size float
) returns varchar(50) deterministic
begin
    declare old_quantity int;
    declare product_price int;

    # get product price
    select price into product_price from products where product_id = chosen_product_id;

    # get current quantity of product in order
    select quantity into old_quantity from order_items
    where order_id = current_order_id and product_id = chosen_product_id and size = chosen_size;

    # update quantity and price in order_items
    update order_items
    set quantity = new_quantity, price = quantity * product_price
    where product_id = chosen_product_id and order_id = current_order_id;

    # update total price of order
    update orders_
    set price = price + (new_quantity - old_quantity) * product_price
    where order_id = current_order_id;

    return 'Order and order_item are updated successfully';
end;

# check the availability of the product in the region for a selected quantity
#
# if product is not found or quantity is 0 returns the message
# if the quantity is not sufficient returns the quantity
# if the quantity is sufficient checks if there is an active order
#
#   if not, create order, adds product to the item and returns message
#   if there is, check if product is in the order
#
#       if not, adds product to new item and returns message
#       if it is, check the availability of the product in the region for a total quantity
#
#           if it is sufficient, updates quantity and returns message
#           if not, returns message

create function add_product_to_order(
    chosen_product_id int,
    chosen_quantity int,
    current_customer_id int,
    customer_address_id int,
    chosen_size float
) returns varchar(100) deterministic
begin
    declare current_order_id int;
    declare product_in_order int;
    declare in_stock int;
    declare current_quantity int;

    # check availability of product for a given address
    set in_stock = check_availability(chosen_product_id, customer_address_id, chosen_quantity, chosen_size);

    if in_stock = 0 then
        # if the quantity of the product in stock is 0 or product is not in the storage
        return 'This product is currently not available in your region';
    elseif in_stock = -1 then
        # if the quantity of the product in stock is sufficient, select active order of current customer
        select order_id into current_order_id from orders_
        where customer_id = current_customer_id and order_date is null;

        if current_order_id is null then
            # if there is no order, create it
            set current_order_id = add_order(current_customer_id, customer_address_id);

            # create new item and add product
            set @add_order_item_return = add_order_item(current_order_id, chosen_product_id, chosen_size, chosen_quantity);
            return concat('Item with id ', chosen_product_id, ' is successfully added to the order number ', current_order_id);
        else
            # if there is an order, check if product is already in it
            select product_id into product_in_order from order_items
            where order_id = current_order_id and product_id = chosen_product_id and size = chosen_size;

            if product_in_order is not null then
                # product is in order, check already selected quantity
                select quantity into current_quantity from order_items
                where order_id = current_order_id and product_id = chosen_product_id and size = chosen_size;

                set @total_quantity = current_quantity + chosen_quantity;
                # check if the stock quantity is sufficient if user adds more to the order
                set @enough_quantity = check_availability(chosen_product_id, customer_address_id, @total_quantity, chosen_size);

                if @enough_quantity = -1 then
                    # quantity is sufficient, update item and order
                    set @update_order_item_return = update_price_and_quantity(chosen_product_id, current_order_id, @total_quantity, chosen_size);

                    return concat('Quantity of product with id ', chosen_product_id, ' is successfully increased for order number ', current_order_id);
                else
                    # quantity is insufficient
                    return concat('There are only ', @enough_quantity, ' available in your region');
                end if;

            else
                # product is not in order, add item to order
                set @add_product_to_order_return = add_order_item(current_order_id, chosen_product_id, chosen_size, chosen_quantity);

                return concat('Item with id ', chosen_product_id, ' is successfully added to the order number ', current_order_id);
            end if;
        end if;
    else
        # if the quantity in stock is insufficient
        return concat('There are only ', in_stock, ' available in your region');
    end if;
end;
# TODO: test functions with different genders


##### UPDATE QUANTITY #####

# update quantity and price for item and set new price for order(subtract old price and add new price of updated item)

create function update_quantity(
    current_customer_id int,
    chosen_product_id int,
    new_quantity int
) returns varchar(100) deterministic
begin
    declare current_order int;
    declare product_price float;
    declare item_price float;

    # select active order
    select order_id into current_order from orders_
    where customer_id = current_customer_id;

    # select product price
    select price into product_price from products
    where product_id = chosen_product_id;

    # select item price
    select price into item_price from order_items
    where order_id = current_order and product_id = chosen_product_id;

    # change price and quantity of the item
    update order_items
    set quantity = new_quantity, price = product_price * quantity
    where order_id = current_order and product_id = chosen_product_id;

    # change price of the order
    update orders_
    set price = price - item_price + product_price * new_quantity
    where order_id = current_order;

    return 'Quantity was updated successfully';
end;


##### REMOVE FROM ORDER #####

# updates order price(subtract item price) and deletes item

create function remove_from_order(
    chosen_product_id int,
    current_customer_id int
) returns varchar(100) deterministic
begin
    declare item_price float;
    declare current_order int;

    # select active order
    select order_id into current_order from orders_
    where customer_id = current_customer_id;

    # select item price
    select price into item_price from order_items
    where order_id = current_order and product_id = chosen_product_id;

    # update order price
    update orders_
    set price = price - item_price
    where order_id = current_order;

    # remove item
    delete from order_items
    where order_id = current_order and product_id = chosen_product_id;

    return 'Item deleted successfully';
end;


##### ADMIN REGISTRATION #####

# check if email is in use
# if yes, return message
# if not, check if phone number is in use
#   if yes, return message
#   if not, check the validity of reference code
#       if valid, create admin and return message
#       if not, return message

create function admin_registration(
    new_first_name varchar(20),
    new_last_name varchar(20),
    new_email varchar(50),
    new_phone_number varchar(15),
    new_password varchar(1000),
    reference_code_ varchar(10)
) returns varchar(30) deterministic
begin
    declare reference_code_exists varchar(10);
    declare email_in_use int;
    declare phone_number_in_use int;

    # check if email is in use
    select admin_id into email_in_use from admins where email = new_email;

    if email_in_use is null then
        # if not
        # check if phone number in use
        select admin_id into phone_number_in_use from admins where phone_number = new_phone_number;

        if phone_number_in_use is null then
            # if not
            # check the validity of reference code
            select reference_code into reference_code_exists from admins where reference_code = reference_code_;

            if reference_code_exists is not null then
                # if valid
                # create admin
                insert into admins(first_name, last_name, email, phone_number, password_)
                    values (new_first_name, new_last_name, new_email, new_phone_number, new_password);
                return 'Admin registered';
            else
                # if invalid
                return 'Invalid reference code';
            end if;
        else
            # if phone number is in use
            return 'Phone number is already in use';
        end if;
    else
        # if email is in use
        return 'Email is already in use';
    end if;
end;


##### ADMIN LOGIN #####

# return password if email is in database, otherwise return message

create function admin_login(
    login_email varchar(50)
) returns varchar(100) deterministic
begin
    declare existing_email varchar(50);
    declare existing_password varchar(1000);

    # check if email is in database
    select email into existing_email from admins where email = login_email;

    if existing_email is null then
        # if not
        return 'Account with following email was not found';
    else
        # if it is
        select password_ into existing_password from admins where email = login_email;
            return existing_password;
    end if;
end;


##### ADD NEW STORAGE #####

create function add_storage(
    storage_country varchar(20),
    storage_city varchar(20)
) returns varchar(30) deterministic
begin
    # insert into storages
    insert into storages(country, city) values (storage_country, storage_city);
    return 'Storage added successfully';
end;


##### ADD NEW PRODUCT #####

# add product if it does not exist. if it is, return message

create function add_product(
    product_name varchar(20),
    product_price float,
    product_brand varchar(20),
    product_color_1 varchar(10),
    product_color_2 varchar(10),
    product_color_3 varchar(10),
    product_category varchar(10),
    product_release_year int,
    product_gender varchar(6),
    product_description varchar(500)
) returns varchar(30) deterministic
begin
    declare existing_product_id int;

    # check if product with given name, colors and gender exists
    select product_id into existing_product_id from products
    where name_ = product_name and
          color_1 = product_color_1 and
          color_2 = product_color_2 and
          color_3 = product_color_3;

    if existing_product_id is null then
        # if product does not exist, insert into products
        insert into products(name_, price, brand, color_1, color_2, color_3, category, release_year, gender, description_)
        values (product_name, product_price, product_brand, product_color_1, product_color_2, product_color_3, product_category, product_release_year, product_gender, product_description);

        return 'Product added successfully';
    else
        # if exists
        return 'Product already exists';
    end if;
end;

##### ADD PRODUCT TO STORAGE #####

# check if product exists
# if not, return message
# if yes, select storage, add product to the storage and return message

create function add_product_to_storage(
    product_name varchar(20),
    product_color_1 varchar(10),
    product_color_2 varchar(10),
    product_color_3 varchar(10),
    product_gender varchar(6),
    product_size float,
    chosen_storage_city varchar(20),
    product_quantity int
) returns varchar(50) deterministic
begin
    declare product_id_ int;
    declare storage_country_ varchar(20);

    # check if product exists
    select product_id into product_id_ from products
    where name_ = product_name and color_1 = product_color_1 and color_2 = product_color_2 and color_3 = product_color_3 and gender = product_gender;

    if product_id_ is null then
        # if not
        return 'There is no such a product';
    else
        # if exists, select country of one storage in given city
        select country into storage_country_ from storages
        where city = chosen_storage_city
        limit 1;

        # insert into products_storages
        insert into products_storages (product_id, size, storage_country, quantity)
        values (product_id_, product_size, storage_country_, product_quantity);

        return concat(product_name, ' added to storage in ', chosen_storage_city);
    end if;
end;


##### PURCHASE BASKET #####

# inner function that sets order date and deceases the quantity purchased products in storage

create function purchase_inner(
    current_order_id int
) returns varchar(60)  deterministic
begin

    # change the date of the order
    update orders_
    set order_date = CURDATE()
    where order_id = current_order_id;

    # decrease the quantity in products_storages that have the same product, country and size as the order does
    update products_storages as ps
    join order_items oi on ps.product_id = oi.product_id and ps.size = oi.size
    join orders_ o on oi.order_id = o.order_id
    join addresses a on a.address_id = o.address_id
    set ps.quantity = ps.quantity - oi.quantity
    where a.country = ps.storage_country and ps.size = oi.size and o.order_id = current_order_id;

    return 'Order date was changed. Quantity in storage decreased.';
end;


# check if there is an active order for a current customer
#
# if not, return message
# if there is, select order id, count order items and count order items that are available
#
#   if all of them are available, call purchase_inner() and return message
#   if not, return message

create function purchase(
    current_customer_id int
) returns varchar(50) deterministic
begin
    declare current_order_id int;
    declare current_address_id int;
    declare items_in_order int;
    declare items_available int;

    # check if there is an active order
    select order_id into current_order_id from orders_
    where customer_id = current_customer_id and order_date is null;

    if current_order_id is null then
        # if not
        return 'There is no order for this customer';
    else
        # if there is, select the id of order address
        select address_id into current_address_id from orders_
        where order_id = current_order_id;

        select count(product_id) into items_in_order from order_items
        where order_id = current_order_id;

        select count(product_id) into items_available from order_availability oa
        where oa.ordered_quantity < oa.in_stock_quantity and oa.storage_country = oa.order_country and oa.order_id = current_order_id;

        if items_in_order = items_available then
            # if all items are available in selected size and quantity, execute purchase
            set @purchase_return = purchase_inner(current_order_id);

            return 'Purchase is finished';
        else
            # if some items are not available
            return 'Some items are not available in your region';
        end if;
    end if;
end;
# TODO: find particular items that are not available


##### CHANGE PRODUCT #####

# check if product with given name, colors and gender exist
#
# if yes, change all columns that have non-null input and return message
# if not, return message

create function change_product(
    product_name varchar(20),
    product_color_1 varchar(10),
    product_color_2 varchar(10),
    product_color_3 varchar(10),
    product_gender varchar(6),
    product_name_ch varchar(20),
    product_color_1_ch varchar(10),
    product_color_2_ch varchar(10),
    product_color_3_ch varchar(10),
    product_gender_ch varchar(6),
    product_price_ch float,
    product_brand_ch varchar(20),
    product_category_ch varchar(10),
    product_release_year_ch int,
    product_description_ch varchar(500)
) returns varchar(50) deterministic
begin
    declare product_to_change_id int;

    select product_id into product_to_change_id from products
    where name_ = product_name and
          color_1 = product_color_1 and
          color_2 = product_color_2 and
          color_3 = product_color_3 and
          gender = product_gender;

    if product_to_change_id is not null then
        if product_name_ch is not null then
            update products
            set name_ = product_name_ch
            where product_id = product_to_change_id;
        end if;

        if product_color_1_ch is not null then
            update products
            set color_1 = product_color_1_ch
            where product_id = product_to_change_id;
        end if;

        if product_color_2_ch is not null then
            update products
            set color_2 = product_color_2_ch
            where product_id = product_to_change_id;
        end if;

        if product_color_3_ch is not null then
            update products
            set color_3 = product_color_3_ch
            where product_id = product_to_change_id;
        end if;

        if product_gender_ch is not null then
            update products
            set gender = product_gender_ch
            where product_id = product_to_change_id;
        end if;

        if product_price_ch is not null then
            update products
            set price = product_price_ch
            where product_id = product_to_change_id;
        end if;

        if product_brand_ch is not null then
            update products
            set brand = product_brand_ch
            where product_id = product_to_change_id;
        end if;

        if product_category_ch is not null then
            update products
            set category = product_category_ch
            where product_id = product_to_change_id;
        end if;

        if product_release_year_ch is not null then
            update products
            set release_year = product_release_year_ch
            where product_id = product_to_change_id;
        end if;

        if product_description_ch is not null then
            update products
            set description_ = product_description_ch
            where product_id = product_to_change_id;
        end if;

        return 'Product was changed successfully';
    else
        return 'Product does not exist';
    end if;
end;
# TODO: change prices in orders


##### DELETE PRODUCT #####

# check if product exists
#
# if not, return message
# if yes, delete all order items, products in storages and products with its id, return message

create function delete_product(
    product_name varchar(20),
    product_color_1 varchar(10),
    product_color_2 varchar(10),
    product_color_3 varchar(10),
    product_gender varchar(6)
) returns varchar(50) deterministic
begin
    declare product_to_delete_id int;

    select product_id into product_to_delete_id from products
    where name_ = product_name and
          color_1 = product_color_1 and
          color_2 = product_color_2 and
          color_3 = product_color_3 and
          gender = product_gender;

    if product_to_delete_id is null then
        return 'Product does not exist';
    else
        delete from order_items
        where product_id = product_to_delete_id;

        delete from products_storages
        where product_id = product_to_delete_id;

        delete from products
        where product_id = product_to_delete_id;

        return 'Product was deleted successfully';
    end if;
end;

# TODO: change orders
# TODO: change logic of removing from order_items