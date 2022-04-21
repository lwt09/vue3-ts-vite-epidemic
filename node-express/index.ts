import express, { Express, Router, Request, Response } from "express";
import axios from "axios";

const app = express();

app.use("*", (req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const router: Router = express.Router();

app.use("/api", router);
router.get("/list", async (req: Request, res: Response) => {
  let result = await axios.get(
    "https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf"
  );
  //     "https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare"

  res.send(result.data.data);
});

app.listen(3333, () => {
  console.log("server is running at port 3333");
});
