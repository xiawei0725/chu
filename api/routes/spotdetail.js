const express = require("express")
const router = express.Router();
const pool = require("../pool")

//app.use("/details",Details)
//服务端接口地址http://localhost:3000/details
//客户端请求时:
//http://localhost:3000/details?lid=1
router.get("/", (req, res) => {
    var id = req.query.id;
    var sql1 = `select * from c_scenic_spot where id = ? limit 1`;
    pool.query(sql1, [id], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        var data = result[0];
        let sql = `select * from c_scenic_img where scenic_spot_id = ?`;
        pool.query(sql, [id], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            data['images'] = result;
            console.log(data);
            res.send(data);
        })
  })
})

module.exports = router;