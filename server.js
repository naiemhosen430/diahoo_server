import { dbString, port } from "./secret.js"
import app from "./src/app/app.js"
import db from "./src/app/db.js"

db(dbString)
  .then(() => {
    app.listen(port, () => {
      console.log(`app is listening at port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
});
