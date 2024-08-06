// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// const port = 5000;

// app.use(cors());

// app.get("/api/languages/:code", async (req, res) => {
//   const { code } = req.params;
//   try {
//     const response = await axios.get(
//       `https://global.metadapi.com/lang/v1/languages/${code}`
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send("Error fetching language data");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
