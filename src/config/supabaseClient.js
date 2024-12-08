// config/supabaseClient.js
// This file creates a client for interacting with the Supabase database
// We use the createClient function from @supabase/supabase-js to create the client
// We use the dotenv library to load the environment variables from the .env file
// We then use the environment variables to create the client
// Finally, we export the client so it can be used in other parts of the application

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
