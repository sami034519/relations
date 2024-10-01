import connection from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import router from "./router/userrouter.js";


dotenv.config({ path: ".env" });
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json())
  app.use("/api/getuserbyid/:id", (req, res, next) => {
    connection.query(
      `SELECT MAX(id) AS max_id, MIN(id) AS min_id FROM user`,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal server error");
          return;
        }

        const maxId = results[0].max_id;
        const minId = results[0].min_id;

        const requestedId = parseInt(req.params.id);

        if (requestedId < minId || requestedId > maxId) {
          res.status(400).send("No user with this id");
        } else {
          next();
        }
      }
    );
  });

  app.use((req, res, next) => {
    console.log("request time: ", Date.now());
    next();
  });

  app.use("/api", router);
  app.listen(port, () => {
    console.log("app running at port", port);
  });
  // import childprocess from "child_process";
// // childprocess.exec(`start chrome https://www.youtube.com/watch?v=JjOvDXe8-jQ`);
// import os from "os";
// const ops = os.cpus().length;
// console.log(ops);
// import cluster from "cluster";



// app.use(express.json());
// if (cluster.isPrimary) {
//   for (let i = 1; i <= ops; i++) {
//     cluster.fork();
//   }
// } else {
// }
// import express from "express";
// import cluster from "cluster";
// import os from "os";
// const app=express();
// const port=3000;

// const cpu=os.cpus().length;
// // console.log(cpu);
// if(cluster.isMaster){
//   for(let i=1; i<=cpu ; i++){
//     cluster.fork();
//   }
// }else{
//   app.get("/sami",(req,res)=>{
//     res.send(`my name is sami ,${process.pid}`);
//   });
//   app.listen(port,()=>{
//     console.log(`"app running on port",${port},${process.pid}`);
//   })
// };
