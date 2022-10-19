var express = require('express');
const {
    json
} = require('express/lib/response');
var router = express.Router();
var app = express();
app.use(express.json());
var mysql = require('mysql');