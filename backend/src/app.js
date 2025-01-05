const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
