
// faux database

var account = exports.account = [ ];

account.push({
	id: 0,
	name: 'Admin User',
	suspended: 0,
	deleted: 0,
	created_datetime: new Date( ).getTime( ),
	created_user_id: 0,
	modified_datetime: new Date( ).getTime( ),
	modified_user_id: 0
});

var user = exports.user = [ ];

user.push({
	id: 0,
	account_id: 0,
	user_type_id: 0,
	email_address: 'admin@test.com',
	password: 'test123',
	first_name: 'Admin',
	last_name: 'User',
	num_logins: 0,
	admin: 1,
	suspended: 0,
	deleted: 0,
	created_datetime: new Date( ).getTime( ),
	modified_datetime: new Date( ).getTime( )
});

var user_type = exports.user_type = [ ];

user_type.push({ id: 0, name: 'Admin' });
user_type.push({ id: 1, name: 'Normal' });
