const app = require("../app");
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.clear();
    console.log(`masuk sini bayar`, PORT);
  });