const express = require("express");
const app = express();
const port = process.env.PORT || 9090;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(port, () => console.log(`Listening on ${port}`));