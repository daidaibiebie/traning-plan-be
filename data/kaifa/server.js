var express = require('express');
const res = require('express/lib/response');
const {
    json
} = require('express/lib/response');
var router = express.Router();
var app = express();
app.use(express.json());
var mysql = require('mysql');
const {
    CLIENT_REMEMBER_OPTIONS
} = require('mysql/lib/protocol/constants/client');
const {
    CLIENT_NO_SCHEMA
} = require('mysql/lib/protocol/constants/client');

//数据库连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: '3306',
    database: 'course'
});

function handleDisconnect() {
    connection.connect(function(err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });
    connection.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}
handleDisconnect();
setInterval(function() {
    connection.query('SELECT 1');
}, 5000);



//防止异常退出
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});

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
            throw (err)
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
function designatedcourse(eid) {
    return new Promise(function(resolve, reject) {
        let sql = 'SELECT course_eid,code,name,englishName,credits,total_hour,teacher_hour,practice_hour,experiment_hour,in_class,out_class,term,exam,start,remark,cou_parent_id,cou_tag from course where cou_parent_id =' + JSON.stringify(eid)
        connection.query(sql, function(err, result) {
            if (err) {
                return 1
            } else {
                // result = JSON.stringify(result)
                // console.log(JSON.stringify(result)
                resolve(result)
            }
        });
    });
}
app.get('/module', function(req, res) {
    let sql = 'SELECT * from module'
    connection.query(sql, async(err, result) => {
        if (err) {
            throw (err)
        } else {
            console.log(JSON.stringify(result[2].mod_tag))
                //returnArr={名字，iD，lessonArr}
                //查询对应id模块的lessonArr
            var returnArr = [];
            for (var i = 0; i < result.length; i++) {
                var obj = {};
                obj.module_eid = '';
                obj.name = '';
                obj.mod_parent_id = '';
                obj.expect_score = '';
                obj.mod_tag = '';
                obj.lessonArr = '',
                    returnArr.push(obj);
            }
            for (var i in result) {
                const returnLesson = await designatedcourse(result[i].module_eid)
                    // console.log(option)
                    // returnArr[i].lessonArr.push(option)
                returnArr[i].lessonArr = returnLesson
                returnArr[i].module_eid = result[i].module_eid
                returnArr[i].name = result[i].name
                returnArr[i].mod_parent_id = result[i].mod_parent_id
                returnArr[i].mod_tag = result[i].mod_tag
                returnArr[i].expect_score = result[i].expect_score
            }
            console.log(returnArr)
            res.send({
                "status": "ok",
                "code": 200,
                "data": returnArr
            })
        }
    })
})

//查询指定模块课程
app.get('/courses/designated/:id', function(req, res) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                message: "invalid parameters"
            })
        }
        console.log(id)
        let sql = 'SELECT code,name,englishName,credits,total_hour,teacher_hour,practice_hour,experiment_hour,in_class,out_class,term,exam,start,remark,cou_parent_id,cou_tag from course where cou_parent_id =?'
        connection.query(sql, id, function(err, result) {
            if (err) {
                throw (err)
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
            throw (err)
        } else {
            res.send({
                "status": "ok",
                "code": 200,
                "data": result
            })
        }
    })
})

function stag(eid) {
    return new Promise(function(resolve, reject) {
        let sql = 'SELECT cou_tag from course where course_eid =' + JSON.stringify(eid)
        connection.query(sql, function(err, result) {
            if (err) {
                return 1
            } else {
                result = JSON.stringify(result);
                resolve(result)
            }
        });
    });
}
//获取课程tag
app.get('/allCtags', function(req, res) {
    let sql = `SELECT cou_tag from course`
    connection.query(sql, function(err, result) {
        if (err) {
            throw (err)
        } else {
            // console.log(result)
            let tag = []
                // console.log(result.length)
            for (var i in result) {
                // console.log(result[i].tag)
                if (JSON.stringify(result[i].cou_tag) != "null") {
                    const ntag = result[i].cou_tag.split(";")
                    console.log(ntag)
                    for (var n in ntag) {
                        console.log(ntag[n])
                        console.log(tag.indexOf(ntag[n]))
                        if (tag.indexOf(ntag[n]) == -1) {
                            tag.push.apply(tag, ntag)
                        }
                    }

                }
            }
            console.log(tag)
            res.send({
                code: 200,
                tag: tag
            })
        }
    })
})

//删除课程标签
app.put('/changeCtag/:id', async(req, res) => {
    let {
        dtag
    } = req.body
    if (!dtag) {
        return res.send({
            code: 412,
            message: '注意部分参数不能为空'
        })
    }
    const id = req.params.id
    const tag = JSON.parse(await stag(id))
    const tag1 = tag[0].tag
    const ntag = tag1.split(";")
    for (var i = 0; i < ntag.length; i++) {
        if (ntag[i] === dtag) {
            ntag.splice(i, 1);
        }
    }
    console.log(ntag)
    var newarr = ntag.join(';')
    console.log(newarr)
    let sql = `UPDATE course set cou_tag = ` + JSON.stringify(newarr) + `where course_eid=?`
    connection.query(sql, id, function(err, result) {
        if (err) {
            throw (err)
        } else {
            res.send({
                code: 200,
                message: "课程标签删除成功"
            })
        }
    })
})

//修改课程tag
app.put('/revise/Ctag/:id', function(req, res) {
    let id = req.params.id
    let {
        ctag
    } = req.body
    if (!id) {
        return res.status(400).json({
            message: "invalid parameters"
        })
    }
    if (ctag == "null" || ctag == "NULL" || ctag == "") {
        let sql = `UPDATE course set cou_tag = null where course_eid=?`
        connection.query(sql, id, function(err, result) {
            if (err) {
                throw (err)
            } else {
                res.send({
                    code: 200,
                    message: "课程标签修改成功"
                })
            }
        })
    } else {
        let sql = `UPDATE course set cou_tag = ` + JSON.stringify(ctag) + `where course_eid=?`
        connection.query(sql, id, function(err, result) {
            if (err) {
                throw (err)
            } else {
                res.send({
                    code: 200,
                    message: "课程标签修改成功"
                })
            }
        })
    }
})

//修改模块tag
app.put('/revise/Mtag/:id', function(req, res) {
        let id = req.params.id
        let {
            mtag
        } = req.body
        if (!id) {
            return res.status(400).json({
                message: "invalid parameters"
            })
        }
        if (mtag == "null" || mtag == "NULL" || mtag == "") {
            let sql = `UPDATE module set mod_tag = null where module_eid=?`
            connection.query(sql, id, function(err, result) {
                if (err) {
                    throw (err)
                } else {
                    res.send({
                        code: 200,
                        message: "模块标签修改成功"
                    })
                }
            })
        } else {
            let sql = `UPDATE module set mod_tag = ` + JSON.stringify(mtag) + `where module_eid=?`
            connection.query(sql, id, function(err, result) {
                if (err) {
                    throw (err)
                } else {
                    res.send({
                        code: 200,
                        message: "模块标签修改成功"
                    })
                }
            })
        }
    })
    //查询带该标签的课程
app.get('/Ctag', function(req, res) {
        let {
            tag
        } = req.body
        let sql = `SELECT * from course `
        connection.query(sql, function(err, result) {
            if (err) {
                throw (err)
            } else {
                let result1 = []
                var totalCredit = 0
                var totalHour = 0
                    // console.log(JSON.stringify(result[1].cou_tag))
                for (var i in result) {
                    if (JSON.stringify(result[i].cou_tag) != "null") {
                        const ntag = result[i].cou_tag.split(";")
                        console.log(ntag)
                        if (ntag.indexOf(tag) != -1) {
                            totalCredit += parseFloat(result[i].credits)
                            totalHour += parseFloat(result[i].total_hour)
                                // console.log(JSON.parse(result[i]))
                            result1.push(result[i])
                        }
                    }
                }
                console.log(totalCredit)
                console.log(totalHour)
                res.send({
                    code: 200,
                    totalCredit: totalCredit,
                    totalHour: totalHour,
                    data: result1
                })
            }
        })
    })
    //添加课程标签
app.post('/addCtag/:id', async(req, res) => {
        let {
            tag
        } = req.body
        const id = req.params.id
        const oldtag = JSON.parse(await stag(id))
        const oldtag1 = oldtag[0].cou_tag
        console.log(oldtag1)
        if (oldtag1 != null) {
            const newtag = [oldtag1, tag].join(';')
            console.log(newtag)
            let sql = `UPDATE course set cou_tag = ` + JSON.stringify(newtag) + `where course_eid=?`
            connection.query(sql, id, function(err, result) {
                if (err) {
                    // return res.send({
                    //     code: 400,
                    //     message: err
                    // })
                    throw (err)
                } else {
                    res.send({
                        code: 200,
                        message: "课程标签添加成功",
                    })
                }
            })
        } else {
            let sql = `UPDATE course set cou_tag = ` + JSON.stringify(tag) + `where course_eid=?`
            connection.query(sql, id, function(err, result) {
                if (err) {
                    throw (err)
                } else {
                    res.send({
                        code: 200,
                        message: "课程标签创建成功",
                    })
                }
            })
        }
    })
    ///////////////
    /////////////////
    //////////////////
    ///////////////////
    //////////////////////////
function mtag(eid) {
    return new Promise(function(resolve, reject) {
        let sql = 'SELECT mod_tag from module where module_eid =' + JSON.stringify(eid)
        connection.query(sql, function(err, result) {
            if (err) {
                return 1
            } else {
                result = JSON.stringify(result);
                resolve(result)
            }
        });
    });
}
//添加模块标签
app.post('/addMtag/:id', async(req, res) => {
    let {
        tag
    } = req.body
    const id = req.params.id
    const oldtag = JSON.parse(await mtag(id))
    const oldtag1 = oldtag[0].mod_tag
    console.log(oldtag1)
    if (oldtag1 != null) {
        const newtag = [oldtag1, tag].join(';')
        console.log(newtag)
        let sql = `UPDATE module set mod_tag = ` + JSON.stringify(newtag) + `where module_eid=?`
        connection.query(sql, id, function(err, result) {
            if (err) {
                throw (err)
            } else {
                res.send({
                    code: 200,
                    message: "模块标签添加成功",
                })
            }
        })
    } else {
        let sql = `UPDATE module set mod_tag = ` + JSON.stringify(tag) + `where module_eid=?`
        connection.query(sql, id, function(err, result) {
            if (err) {
                throw (err)
            } else {
                res.send({
                    code: 200,
                    message: "模块标签创建成功",
                })
            }
        })
    }
})

//添加课程模块
app.post('/startmodule', function(req, res) {
    let {
        name,
        mod_parent_id,
        expect_score
    } = req.body
    console.log(req.body)
    if (!name || !mod_parent_id) {
        return res.send({
            code: 412,
            message: '注意部分参数不能为空'
        })
    }
    let sql = `INSERT INTO module(name,mod_parent_id,expect_score) VALUES ('${name}','${mod_parent_id}','${expect_score}')`
    connection.query(sql, function(err, result) {
        if (err) {
            // return res.send({
            //     code: 400,
            //     message: err
            // })
            throw (err)
        } else {
            result = eval(result)
            console.log(result.insertId)
            res.send({
                code: 200,
                message: "模块添加成功",
                data: JSON.stringify(result.insertId)
            })
        }
    })
});
//删除模块标签
app.put('/changeMtag/:id', async(req, res) => {
        let {
            dtag
        } = req.body
        if (!dtag) {
            return res.send({
                code: 412,
                message: '注意部分参数不能为空'
            })
        }
        const id = req.params.id
        const tag = JSON.parse(await mtag(id))
        const tag1 = tag[0].mod_tag
        const ntag = tag1.split(";")
        for (var i = 0; i < ntag.length; i++) {
            if (ntag[i] === dtag) {
                ntag.splice(i, 1);
            }
        }
        console.log(ntag)
        var newarr = ntag.join(';')
        console.log(newarr)
        let sql = `UPDATE module set mod_tag = ` + JSON.stringify(newarr) + `where module_eid=?`
        connection.query(sql, id, function(err, result) {
            if (err) {
                throw (err)
            } else {
                res.send({
                    code: 200,
                    message: "模块标签删除成功"
                })
            }
        })
    })
    //
app.get('/mtag', function(req, res) {
        let {
            tag
        } = req.body
        let sql = `SELECT * from module  `
        connection.query(sql, function(err, result) {
            if (err) {
                throw (err)
            } else {
                let result1 = []
                for (var i in result) {
                    if (JSON.stringify(result[i].mod_tag) != "null") {
                        const ntag = result[i].mod_tag.split(";")
                            // console.log(ntag)
                        if (ntag.indexOf(tag) != -1) {
                            result1.push(result[i])
                        }
                    }
                }
                res.send({
                    code: 200,
                    data: result1
                })
            }
        })
    })
    //获取模块tag
app.get('/allMtags', function(req, res) {
    let sql = `SELECT mod_tag from module`
    connection.query(sql, function(err, result) {
        if (err) {
            throw (err)
        } else {
            console.log(result)
            let tag = []
                // console.log(result.length)
            for (var i in result) {
                // console.log(result[i].tag)
                if (JSON.stringify(result[i].mod_tag) != "null") {
                    const ntag = result[i].mod_tag.split(";")
                        // console.log(ntag)
                    for (var n in ntag) {
                        // console.log(ntag[n])
                        // console.log(tag.indexOf(ntag[n]))
                        if (tag.indexOf(ntag[n]) == -1) {
                            tag.push.apply(tag, ntag)
                        }
                    }

                }
            }
            console.log(tag)
            res.send({
                code: 200,
                tag: tag
            })
        }
    })
})

function judgemodule(id) {
    let sql = "SELECT * from module where module_eid=" + JSON.stringify(id)
    connection.query(sql, function(err, result) {
        if (err) {
            throw (err)
        } else {

        }

    })
}

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
        if (!code || !name || !englishName || !credits || !total_hour || !term || !exam || !start || !cou_parent_id) {
            return res.send({
                code: 412,
                message: '注意部分参数不能为空'
            })
        }
        console.log(req.body)
        let sql = `INSERT INTO course(code,name,englishName,credits,total_hour,teacher_hour,practice_hour,experiment_hour,in_class,out_class,term,exam,start,remark,cou_expect_score,on_group,cou_parent_id) VALUES('${code}','${name}','${englishName}','${credits}','${total_hour}','${teacher_hour}','${practice_hour}','${experiment_hour}','${in_class}','${out_class}','${term}','${exam}','${start}','${remark}','${cou_expect_score}','${on_group}','${cou_parent_id}')`
        connection.query(sql, function(err, result) {
            if (err) {
                if (err.code = "ER_DUP_ENTRY") {
                    return res.send({
                        code: 206,
                        message: '该课程名已存在'
                    })
                }
                throw (err)
            } else {
                result = eval(result)
                console.log(result.insertId)
                res.send({
                    code: 200,
                    message: "课程添加成功",
                    data: JSON.stringify(result.insertId)
                })
            }
        })
    })
    //修改课程信息
app.put('/revise/course/:eid', function(req, res) {
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
        let eid = req.params.eid
        if (!code || !name || !englishName || !credits || !total_hour || !term || !exam || !start || !cou_parent_id) {
            return res.send({
                code: 412,
                message: '注意部分参数不能为空'
            })
        }
        console.log(req.body)
        let sql = `UPDATE course SET code = ` + JSON.stringify(code) + `,name = ` + JSON.stringify(name) + `,englishName = ` + JSON.stringify(englishName) + `,credits = ` + JSON.stringify(credits) + `,total_hour=` +
            JSON.stringify(total_hour) + `,teacher_hour=` + JSON.stringify(teacher_hour) + `,practice_hour=` + JSON.stringify(practice_hour) + `,experiment_hour=` +
            JSON.stringify(experiment_hour) + `,in_class=` + JSON.stringify(in_class) + `,out_class=` + JSON.stringify(out_class) + `,term=` + JSON.stringify(term) + `,exam=` +
            JSON.stringify(exam) + `,start=` + JSON.stringify(start) + `,remark=` + JSON.stringify(remark) + `,cou_expect_score=` + JSON.stringify(cou_expect_score) + `,on_group=` +
            JSON.stringify(on_group) + `,cou_parent_id=` + JSON.stringify(cou_parent_id) + `where course_eid=?`
        connection.query(sql, eid, function(err, result) {
            if (err) {
                if (err.code = "ER_DUP_ENTRY") {
                    res.send({
                        code: 206,
                        message: "该课程名或英文名已存在,修改失败"
                    })
                } else if (err.code = "ER_BAD_NULL_ERROR") {
                    res.send({
                        code: 412,
                        message: "课程代号,课程名,课程英文名不得为空"
                    })
                }
                throw (err)
            } else {
                res.send({
                    code: 200,
                    message: "修改课程信息成功"
                })
            }
        })
    })
    //修改模块信息
app.put('/revise/module/:eid', function(req, res) {
        let {
            name,
            expect_score
        } = req.body
        let eid = req.params.eid
        if (!name) {
            return res.send({
                code: 412,
                message: '注意部分参数不能为空'
            })
        }
        console.log(req.body)
        if (eid == 1) {
            return res.send({
                code: 403,
                message: "该模块不能被修改"
            })
        } else {
            let sql = `UPDATE module set name=` + JSON.stringify(name) + `,expect_score=` + JSON.stringify(expect_score) + `where module_eid=?`
            connection.query(sql, eid, function(err, result) {
                if (err) {
                    throw (err)
                } else {
                    res.send({
                        code: 200,
                        message: "模块修改成功"
                    })
                }
            })
        }
    })
    //删除课程
app.delete('/endcourse/:eid', function(req, res) {
        const eid = req.params.eid
        if (!eid) {
            return res.status(400).json({
                message: "invalid parameters"
            })
        }
        let sql = `DELETE from course where course_eid=?`
        connection.query(sql, eid, function(err, result) {
            if (err) {
                throw (err)
            } else {
                res.send({
                    code: 200,
                    message: "删除成功"
                })
            }
        })

    })
    //删除指定模块
app.delete('/endmodule/:eid', function(req, res) {
    const eid = req.params.eid
    console.log(eid)
    if (!eid) {
        return res.status(400).json({
            message: "invalid parameters"
        })
    } else if (eid == 1) {
        return res.status(400).json({
            message: "该模块不允许删除"
        })
    }
    let sql = `delete  from module where module_eid in (` + eid + `)`
    connection.query(sql, function(err, result) {
        if (err) {
            throw (err)
        } else {
            console.log(JSON.stringify(result))
            console.log((JSON.stringify(result))[31])
            if ((JSON.stringify(result))[31] != "0") {
                deletemoudule(eid)
                res.send({
                    code: 200,
                    message: "删除成功"
                })
            } else {
                res.send({
                    code: 400,
                    message: '删除错误'
                })

            }


        }
    })

})

function deletemoudule(eid) {
    let sql = `select * from module where mod_parent_id  in (` + eid + `)`
    connection.query(sql, function(err, result) {
        if (err) {
            return 0
        }
        console.log(result.length)
        if (result.length) {
            for (var i in result) {
                console.log((result[i].module_eid))
                let sql1 = `delete from module where module_eid in (` + (result[i].module_eid) + ")"
                let sql2 = `select * from module where mod_parent_id  in (` + (result[i].module_eid) + `)`
                connection.query(sql2, function(err, result2) {
                    connection.query(sql1, function(err, result1) {
                        if (err) {
                            return 2
                        }
                    })
                    for (var n in result2) {
                        console.log((result2[n].module_eid))
                        if (err) {
                            return 3
                        } else {
                            deletemoudule(result2[n].module_eid)
                        }
                    }
                })
            }
        } else if (result.length == 0) {
            let sql3 = `delete from module where module_eid in (` + (eid) + ")"
            let sql4 = `delete from course where cou_parent_id in (` + (eid) + ")"
            connection.query(sql3, function(err, result) {
                if (err) {
                    return 2
                }
            })
            connection.query(sql4, function(err, result) {
                if (err) {
                    return 3
                }
            })
        } else {
            console.log(1)
            return 1
        }
    })
}


//修改课程父节点
app.post('/dropcourse', function(req, res) {
        let {
            courses_eid,
            cou_parent_id
        } = req.body
        console.log(req.body)
        let sql = `UPDATE course SET cou_parent_id =` + JSON.stringify(cou_parent_id) + ` where course_eid =` + JSON.stringify(courses_eid)
        connection.query(sql, function(err, result) {
            if (err) {
                throw (err)
            } else {

                res.send({
                    code: 200,
                    message: "修改成功"
                })
            }
        })

    })
    //修改模块父节点
app.post('/dropmodule', function(req, res) {
        let {
            module_eid,
            mod_parent_id
        } = req.body
        console.log(req.body)
        let sql = `UPDATE module SET mod_parent_id =` + JSON.stringify(mod_parent_id) + ` where module_eid =` + JSON.stringify(module_eid)
        connection.query(sql, function(err, result) {
            if (err) {
                throw (err)
            } else {

                res.send({
                    code: 200,
                    message: "修改成功"
                })
            }
        })

    })
    //测试接口
app.get('/', function(req, res) {
    res.send({
        code: 200,
        message: "3.1 bug over"
    })
})

const todos = app.listen(8088, 'localhost', function() {
    const host = todos.address().address
    const port = todos.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})