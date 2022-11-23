## Users and Friends

### Run project

After cloning, run "npm i" from project directory

Create file ".env" to connect DB, example ".env.example"

After that, run the command "npm run migrate:run" to create DB tables

For seeding, run the command "npm run seed", you'll have 200 users with the followings (max 150)

#### Start server "npm start"

### Project endpoints

#### - (GET)/api/users - get all users with following

#### - (GET)/api/users/not-following - get all users without following

#### - (GET)/api/users/:user_ID/friends?order_by=id&order_type=desc - get user's friends
order_by = 'id' | 'first_name' | 'gender' | 'created_at'
order_type = 'desc' | 'asc'

#### - (GET)/api/users/max-following - get all top users with the most following

