const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;  // Set the port

// Middleware
app.use(cors());
app.use(express.json());

// Sample feature data
const featureData = {
  'E-commerce': { 'Product Listing': 30, 'Payment Integration': 25 },
  'Social Media': { 'User Profiles': 30, 'Chat System': 40 },
  'Cloud Kitchen': { 'Menu Display': 25, 'Online Ordering': 40 },
};

// Define your API route for calculating the cost
app.post('/api/calculate-cost', (req, res) => {
  const { category, features } = req.body;
  if (!category || !features || features.length === 0) {
    return res.status(400).json({ error: 'Please select a category and at least one feature.' });
  }

  const totalHours = features.reduce((sum, feature) => sum + (featureData[category][feature] || 0), 0);
  const totalCost = totalHours * 10;
  res.json({ totalCost });
});

// Add a listener to start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

