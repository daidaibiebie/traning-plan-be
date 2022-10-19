var express = require('express');
const {
    json
} = require('express/lib/response');
var router = express.Router();
var app = express();
app.use(express.json());
var mysql = require('mysql');

//数据库连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'course'
});

connection.connect(err => {
    if (err) {
        console.error('failed to connect to database, error: ', err)
        process.exit(1)
    }
})


//跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Headers", "content-type,Authorization");
    next();
});

//查询所有开课信息
app.get('/allcourses', function(req, res) {
        let sql = 'SELECT * from module,course where course.cou_parent_id=module.module_eid'
        connection.query(sql, function(err, result) {
            if (err) {
                return res.send({
                    code: 400,
                    message: err
                })
            } else {
                res.send({
                    "status": "ok",
                    "code": 200,
                    "data": result
                })
            }
        })
    })
    //查询树状关系
app.get('/module', function(req, res) {
        let sql = 'SELECT * from module '
        connection.query(sql, function(err, result) {
            if (err) {
                return res.send({
                    code: 400,
                    message: err
                })
            } else {
                res.send({
                    "status": "ok",
                    "code": 200,
                    "data": result
                })
            }
        })
    })
    //查询指定模块课程
app.get('/courses/designated', function(req, res) {
        let {
            cou_parent_id
        } = req.body
        console.log(req.body)
        let sql = 'SELECT code,name,englishName,credits,total_hour,teacher_hour,practice_hour,experiment_hour,in_class,out_class,term,exam,start,remark,cou_parent_id from course where cou_parent_id=' + JSON.stringify(cou_parent_id)
        connection.query(sql, function(err, result) {
            if (err) {
                return res.send({
                    code: 400,
                    message: err
                })
            } else {
                res.send({
                    "status": "ok",
                    "code": 200,
                    "data": result
                })
            }
        })
    })
    //查询数据库注释
app.get('/comment', function(req, res) {
        let sql = 'show full columns from module '
        connection.query(sql, function(err, result) {
            if (err) {
                return res.send({
                    code: 400,
                    message: err
                })
            } else {
                res.send({
                    "status": "ok",
                    "code": 200,
                    "data": result
                })
            }
        })
    })
    //添加课程模块
app.post('/startmodule', function(req, res) {
    let {
        name,
        mod_parent_id,
        expect_score
    } = req.body
    console.log(req.body)
    let sql = `INSERT INTO module(name,mod_parent_id,expect_score) VALUES ('${name}','${mod_parent_id}','${expect_score}')`
    connection.query(sql, function(err, result) {
        if (err) {
            return res.send({
                code: 400,
                message: err
            })
        } else {
            res.send({
                code: 200,
                message: "模块添加成功"
            })
        }
    })
})


//添加开课课程
app.post('/startcourse', function(req, res) {
        let {
            code,
            name,
            englishName,
            credits,
            total_hour,
            teacher_hour,
            practice_hour,
            experiment_hour,
            in_class,
            out_class,
            term,
            exam,
            start,
            remark,
            cou_expect_score,
            on_group,
            cou_parent_id
        } = req.body
        console.log(req.body)
        let sql = `INSERT INTO course(code,name,englishName,credits,total_hour,teacher_hour,practice_hour,experiment_hour,in_class,out_class,term,exam,start,remark,cou_expect_score,on_group,cou_parent_id) VALUES('${code}','${name}','${englishName}','${credits}','${total_hour}','${teacher_hour}','${practice_hour}','${experiment_hour}','${in_class}','${out_class}','${term}','${exam}','${start}','${remark}','${cou_expect_score}','${on_group}','${cou_parent_id}')`
        connection.query(sql, function(err, result) {
            if (err) {
                if (err.code = "ER_DUP_ENTRY") {
                    return res.send('该课程名已存在')
                }
                return res.send({
                    code: 400,
                    message: err
                })
            } else {

                res.send({
                    code: 200,
                    message: "开课成功"
                })
            }
        })
    })
    //删除课程
app.delete('/endcourse/:eid', function(req, res) {
    const eid = req.params.eid
    let sql = `DELETE from course where course_eid=?`
    connection.query(sql, eid, function(err, result) {
        if (err) {
            return res.send({
                code: 400,
                message: err
            })
        } else {

            res.send({
                code: 200,
                message: "删除成功"
            })
        }
    })

})


//修改课程父节点
app.post('/dropcourse', function(req, res) {
    let {
        courses_eid,
        cou_parent_id
    } = req.body
    console.log(req.body)
    let sql = `UPDATE course SET cou_parent_id=` + JSON.stringify(cou_parent_id) + `where course_eid=` + JSON.stringify(courses_eid)
    connection.query(sql, function(err, result) {
        if (err) {
            return res.send({
                code: 400,
                message: err
            })
        } else {

            res.send({
                code: 200,
                message: "修改成功"
            })
        }
    })

})
app.post('/dropmodule', function(req, res) {
    let {
        module_eid,
        mod_parent_id
    } = req.body
    console.log(req.body)
    let sql = `UPDATE module SET mod_parent_id=` + JSON.stringify(mod_parent_id) + `where module_eid =` + JSON.stringify(module_eid)
    connection.query(sql, function(err, result) {
        if (err) {
            return res.send({
                code: 400,
                message: err
            })
        } else {

            res.send({
                code: 200,
                message: "修改成功"
            })
        }
    })

})

const todos = app.listen(8088, 'localhost', function() {

    const host = todos.address().address
    const port = todos.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)


})