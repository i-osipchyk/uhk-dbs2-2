drop function add_product;
drop function add_order;
drop function add_product_to_order;
drop function add_order_item;
drop function add_product_to_storage;
drop function add_storage;
drop function check_availability;
drop function remove_from_order;
drop function update_price_and_quantity;
drop function update_quantity;

delete from products_storages;
delete from order_items;
delete from orders_;
delete from products;
delete from customers;
delete from addresses;


##### TESTING CALLS #####

select customer_registration('Ivan', 'Osipchyk', 'mail@example.com', '+420123456789', 'password', 'Germany', 'Munich', 'Hansastrase', '41', '81373');
select * from customers;

select add_product('Air Jordan 1', 129.99, 'Nike/Jordan', 'red', 'white', 'black', 'lifestyle', 2022, 'male', 'Return of iconic model');
select add_product('Air Force 1', 119.99, 'Nike', 'white', 'white', 'white', 'lifestyle', 2020, 'female', 'Classic model that suits anyone');
select * from products;

select add_storage('Germany', 'Dresden');
select * from storages;

select add_product_to_storage('Air Jordan 1', 'red', 'white', 'black', 'male', 10.5, 'Dresden', 100);
select * from products_storages;

select add_product_to_storage('Air Jordan 1', 'red', 'white', 'black', 'male', 11.5, 'Dresden', 100);
select add_product_to_storage('Air Force 1', 'white', 'white', 'white', 'female', 8.5, 'Dresden', 100);

select add_product_to_order(3, 5, 2, 2, 10.5);
select add_product_to_order(3, 3, 2, 2, 10.5);

select add_product_to_order(3, 93, 2, 2, 10.5);
select add_product_to_order(3, 3, 2, 2, 11.5);
select add_product_to_order(3, 5, 2, 2, 11.5);
select add_product_to_order(3, 95, 2, 2, 9.5);

select purchase(2);
select purchase_inner(5);

drop function purchase;
drop function purchase_inner;

select CURDATE();

select add_product_to_order(3, 1, 2, 2, 11.5);

select count(product_id) from order_items
where order_id = 6;

select count(product_id) from order_availability oa
where oa.ordered_quantity < oa.in_stock_quantity and oa.storage_country = oa.order_country;

select * from order_availability;

call filter_products(null, 100, 130, 'Jordan', null, null, null, null, null, null);
select * from products;
select delete_product('Air Force 1', 'white', 'white', 'white', 'female');

select * from orders_;
select * from order_items;

select * from admins;