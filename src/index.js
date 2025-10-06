const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/books.routes');

const swaggerDocument = YAML.load('./src/swagger.yaml');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Add root route to avoid "Cannot GET /" (redirect to Swagger UI)
app.get('/', (req, res) => {
  res.redirect('/api/v1/docs');
});

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/users', authRoutes);
app.use('/api/v1/books', bookRoutes);

const PORT = process.env.PORT || 4000;

// MongoDB connect
// Current mongoose/driver versions enable the newer parser and topology by default.
// Removing deprecated options to avoid driver warnings.
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
