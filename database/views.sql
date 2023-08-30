# columns: product id, ordered quantity, in stock quantity, storage country, order country
# product id and ordered quantity for all order items of current order
# in stock quantity and storage country for all products and sizes from order items
# country from current address
# view is used to find out if there is enough quantity of a particular product for a given country

create view order_availability as
select oi.product_id, oi.quantity as ordered_quantity, ps.quantity as in_stock_quantity, ps.storage_country as storage_country, a.country as order_country, o.order_id as order_id
from order_items oi
join products_storages ps on oi.product_id = ps.product_id and oi.size = ps.size
join orders_ o on oi.order_id = o.order_id
join addresses a on o.address_id = a.address_id;

create view adidas_products as
select * from products
where brand like '%Adidas%';

create view nike_products as
select * from products
where brand like '%Nike%';

create view jordan_products as
select * from products
where brand like '%Jordan%';