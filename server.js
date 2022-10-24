const express = require('express');
const fs = require("fs");
const app = express()
app.use(express.json())
const mysql = require('mysql');
const redis = require('redis');
var bodyParser = require('body-parser')
    //jwt设置
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
    //连接mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'test'
});
connection.connect(err => {
    if (err) {
        console.error('failed to connect to database, error: ', err)
        process.exit(1)
    }
})

//连接redis
const client = redis.createClient(6379, 'localhost');
client.on('error', (err) => {
    console.log('Redis Client Error', err);
    process.exit(1)
})
client.on('connect', () => {
    console.log('redis connect success');
})

client.connect();

var CryptoJS = require("crypto-js");
var key = "aaaabbbbccccddddeeeeffffgggghhhh";
var iv = "1234567812345678";


//文件加密
function encrypt(text) {
    return CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
}
//文件解密
function decrypt(text) {
    var result = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return result.toString(CryptoJS.enc.Utf8)
}


const {
    enc
} = require('crypto-js/core');
const {
    randomBytes,
    KeyObject
} = require('crypto');
const {
    json
} = require('express/lib/response');
app.use(expressJwt({
    secret: 'secret12345',
    algorithms: ['HS256']
}).unless({
    path: ['/login', '/signup', '/verifycode', '/username'] //除了这三个，其他都需要url验证
}))

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

app.use(function(err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send('invalid token')
        }
    })
    //获取所有用户用户名
app.get('/username', function(req, res) {
        const sql = 'SELECT username FROM users '
        connection.query(sql, function(err, result) {
            if (err) {
                return res.send({
                    code: 500,
                    message: err
                })
            }
            res.status(200).json(result)
        })
    })
    //获取我的todo
app.get('/users', function(req, res) {
    const createdBy = req.user.username;
    const sql = 'SELECT * FROM todos where createdBy=' + JSON.stringify(createdBy);
    connection.query(sql, function(err, result) {
        if (err) {
            return res.status(500).json({
                message: err
            })
        }
        res.status(200).json(result)
    })
})

//获取我指派的
app.get('/createdfor', function(req, res) {
    const createdBy = req.user.username;
    const sql = 'SELECT * FROM todos where createdFor=' + JSON.stringify(createdBy);
    connection.query(sql, function(err, result) {
        if (err) {
            return res.status(500).json({
                message: err
            })
        }
        res.status(200).json(result)
    })
})

// 指定id
app.delete('/users/:id', function(req, res) {
        const createdBy = req.user.username;
        let id = req.params.id;
        const delSql = 'DELETE FROM todos where id=? and createdBy = ' + JSON.stringify(createdBy);
        connection.query(delSql, [id], function(err, result) {
            if (err) {
                return res.send({
                    code: 400,
                    message: err
                })
            }

            // if (result.affectedRows == 0) {
            //     return res.send({
            //         code: 403,
            //         message: "id错误或者无权查找他人id"
            //     })
            // } else {
            res.send({
                    code: 200,
                    message: "删除成功"
                })
                // }
        })
    })
    //获得指定id
app.get('/users/:id', function(req, res) {
        const createdBy = req.user.username;
        let id = req.params.id;
        const Sql = 'SELECT * from todos where id=? and createdBy = ' + JSON.stringify(createdBy);
        connection.query(Sql, [id], function(err, result) {
            if (err) {
                return res.send({
                    code: 400,
                    message: err
                })
            }

            if (result.length <= 0) {
                return res.send({
                    code: 404,
                    message: "id错误或者无权查找他人id"
                })
            } else {
                res.status(200).json(result)
            }
        })
    })
    //上传
app.post('/users', function(req, res) {
    const createdBy = req.user.username;
    const {
        time,
        task,
        finsh,
        createdFor
    } = req.body;
    if (!time || !task || !finsh || !createdFor) {
        return res.send({
            code: 400,
            message: "上传内容不完整"
        })
    }
    const addSql = `INSERT INTO todos(time,task,finsh,createdBy,createdFor) VALUES('${time}', '${task}', '${finsh}','${createdBy}','${createdFor}')`;
    connection.query(addSql, function(err, result) {
        if (err) {
            return res.send({
                code: 403,
                message: err
            })
        }
        res.send({
            code: 200,
            message: '添加成功',
            id: result.insertId
        })
    });

})

//修改
app.put('/todos/:id', function(req, res) {
    const createdBy = req.user.username;
    const {
        id
    } = req.params
    if (!id) {
        return res.status(400).json({
            message: "invalid parameters"
        })
    }
    //权限查看
    const dSql = 'SELECT * from todos where id=? and createdBy = ' + JSON.stringify(createdBy);
    connection.query(dSql, [id], function(err, result) {
        if (err) {
            return res.status(500).json({
                message: err
            })
        }

        if (result.length <= 0) {
            return res.status(404).json({
                message: "id错误或者无权查找他人id"
            })
        } else {

            const {
                task,
                time,
                status,
            } = req.body
            if (!task && !time && !status) {
                return res.status(400).json({
                    message: "invalid parameters"
                })
            }
            let sql = "update todos set "
            let fields = []
            let args = []
            if (task) {
                fields.push('task=?')
                args.push(task)
            }
            if (time) {
                fields.push('time=?')
                args.push(time)
            }
            if (status) {
                fields.push('status=?')
                args.push(status)
            }
            fields.push('createdBy=?')
            args.push(createdBy)

            sql += fields.join(',')
            sql += " where id=?"
            args.push(id)
                // console.log(sql, args)
            connection.query(sql, args, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    })
                }
                res.status(200).end()
            })
        }
    })
})

//注册
app.post('/signup', function(req, res) {
        const {
            username,
            password,
            phoneNumber,
            verifycode
        } = req.body
        if (!username || !password || !verifycode || !phoneNumber) {
            return res.send({
                code: 404,
                message: "用户名、密码、手机号或验证码不能为空"
            })
        }
        (async() => {
            const code = await client.get('key' + phoneNumber);
            const codecount = await client.get('keycount' + phoneNumber);
            if (code != verifycode) {
                if (codecount < 3) {
                    client.incr('keycount' + phoneNumber)
                    return res.send({
                        code: 401,
                        message: "验证码错误,请重新输入验证码"
                    })
                } else {
                    client.flushDb();
                    return res.send({
                        code: 403,
                        message: "验证次数过多，请重新获取验证码"
                    })
                }
            } else {
                let addsql = `INSERT into users(username,password,phoneNumber) VALUES('${username}','${encrypt(password)}','${phoneNumber}')`;
                connection.query(addsql, function(err, result) {
                    if (err) {
                        if (err.code == 'ER_DUP_ENTRY') {
                            client.flushDb();
                            return res.send({
                                code: 403,
                                message: "该用户名已存在"
                            })
                        }
                    }
                    client.flushDb();
                    return res.send({
                        code: 200,
                        message: "注册成功"
                    })

                });
            }
        })();
    })
    //登录
app.post('/login', function(req, res) {
    const {
        username,
        password
    } = req.body
        // (async () => {
        //     await client.set('login', 1);

    let sql = `SELECT password from users where username=` + JSON.stringify(req.body.username);
    // if ((await client.get('login')) < 4) { // 密码或用户名输入错误少于4次
    connection.query(sql, function(err, result) {
            if (err) {
                return res.status(422).json({
                    message: err
                })
            }
            if (result.length) {
                const decryptword = decrypt(result[0].password);
                if (decryptword != password) {
                    // client.incr('login');
                    return res.send({
                        code: 401,
                        message: "密码错误"
                    })
                } else {
                    const token = 'Bearer ' + jwt.sign({
                            username: username,
                        },
                        'secret12345', {
                            expiresIn: 3600 * 24 * 3
                        }
                    )
                    res.send({
                        status: 'ok',
                        code: 200,
                        message: "登陆成功",
                        data: {
                            token: token
                        }
                    })
                }
            } else {
                // client.incr('login');
                return res.send({
                    code: 404,
                    message: "用户名不存在"
                })
            }

        })
        // } else {
        //     const {
        //         username,
        //         password,
        //         verifycode
        //     } = req.body


    // }
    // })();

})

//短信注册
app.post('/verifycode', function(req, res) {
    const phoneNumber = req.body.phoneNumber;
    if (!phoneNumber) {
        return res.send({
            code: 403,
            message: "手机号不能为空"
        })
    }
    if (phoneNumber.length != 11) {
        return res.send({
            code: 403,
            message: "请输入正确的手机号"
        })
    }
    (async() => {
        //60秒内只能发一次
        const count = await client.get('count' + phoneNumber);
        if (count === null) {
            const verifycode = Math.floor((Math.random() * 9000 + 1000));
            await client.setEx('key' + phoneNumber, '300', verifycode); //验证码
            await client.set('keycount' + phoneNumber, 1); //验证三次后验证码删除
            await client.setEx('count' + phoneNumber, '60', verifycode); //60s发送一次
            // res.status(200);
            console.log(verifycode);
            return res.send({
                code: 200,
                message: "已发送验证码"
            })

            // res.send({
            //     verifycode
            // });
        } else {
            return res.send({
                code: 403,
                message: "请稍后再尝试获取验证码"
            })
        }
    })();
})

const todos = app.listen(8088, function() {

    const host = todos.address().address
    const port = todos.address().port
    client.flushDb(); //每次响应都清除redis的键
    console.log("应用实例，访问地址为 http://%s:%s", host, port)


})