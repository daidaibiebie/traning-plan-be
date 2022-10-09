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
    //查询指定课程
app.get('/courses/computer/compulsory', function(req, res) {
    let {
        cou_parent_id,
        mod_parent_id,
        nat_parent_id,
        typ_parent_id
    } = req.body
    let sql = 'SELECT course_module,course_nature,course_type,major,code,name,englishName,credits,total_hour,teacher_hour,practice_hour,experiment_hour,in_class,out_class,term,exam,start,remark,cou_parent_id from nature,type,module,course,major where major.major_eid=type.typ_parent_id and type.type_eid=nature.nat_parent_id and nature.nature_eid=module.mod_parent_id and module.module_eid=course.cou_parent_id and cou_parent_id=' + JSON.stringify(cou_parent_id) + 'and mod_parent_id=' + JSON.stringify(mod_parent_id) + ' and nat_parent_id= ' + JSON.stringify(nat_parent_id) + 'and typ_parent_id=' + JSON.stringify(typ_parent_id)
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
        cou_parent_id
    } = req.body
    let sql = `INSERT INTO course(code,name,englishName,credits,total_hour,teacher_hour,practice_hour,experiment_hour,in_class,out_class,term,exam,start,remark,cou_parent_id) VALUES('${code}','${name}','${englishName}','${credits}','${total_hour}','${teacher_hour}','${practice_hour}','${experiment_hour}','${in_class}','${out_class}','${term}','${exam}','${start}','${remark}','${cou_parent_id}')`
    connection.query(sql, function(err, result) {
        if (err) {
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

//拖拽修改
app.post('dropcourse', function(req, res) {
    let {
        cou_parent_id
    } = req.body
    let sql = `UPDATE course SET cou_parent_id=` + JSON.stringify(cou_parent_id)
    connection.query(sql, function(err, result) {
        if (err) {
            return res.send({
                code: 400,
                message: err
            })
        } else {

            res.send({
                code: 200,
                message: "拖拽成功"
            })
        }
    })

})

const todos = app.listen(8088, function() {

    const host = todos.address().address
    const port = todos.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)


})