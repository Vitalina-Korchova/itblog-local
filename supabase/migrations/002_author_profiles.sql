alter table users
add column if not exists linkedin_url varchar(500),
add column if not exists github_url varchar(500);
