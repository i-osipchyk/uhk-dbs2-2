##### ADD INITIAL ADMIN #####

insert into admins(first_name, last_name, email, phone_number, password_, reference_code)
values ('Initial', 'Admin', 'initial.admin@project.com', '+420776119548', 'password', 'ref111');

##### CONFIGURATIONS #####

SET GLOBAL log_bin_trust_function_creators = 1;