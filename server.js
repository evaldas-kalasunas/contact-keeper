const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ msg: 'Welcome To Contact Keeper API!' }))

// Define Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/users', require('./routes/users'))

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))