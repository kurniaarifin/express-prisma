const app = require('./index');

// app port
const PORT = process.env.APP_PORT || 3001;
// run app
app.listen(PORT, () => console.log(`app running on port ${PORT}`));