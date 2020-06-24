const fs = require('fs');   // 파일에 접근할 수 있는 라이브러리
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const data = fs.readFileSync('./database.json');    // 파일 읽어오기
const conf = JSON.parse(data);  
const mysql = require('mysql');

const connection = mysql.createConnection({
    // database.json에 명시되어 있는 정보 가져오기
    host : conf.host,   
    user : conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});
connection.connect();   // 연결을 수행

const multer = require('multer');
const upload = multer({dest:'./upload'});

app.get('/api/customers', (req, res) => {
    // 데이터 전달해주는 하드코딩
    // res.send(
        // [
        //     {
        //       'id': 1,
        //       'image': ' ',
        //       'name': '가나다',
        //       'birthday': '961222',
        //       'gender': '남자',
        //       'job': '대학생1'
        //     },
        //     {
        //       'id': 2,
        //       'image': 'https://placeimg.com/64/64/2',
        //       'name': '라마바',
        //       'birthday': '961221',
        //       'gender': '여자',
        //       'job': '대학생2'
        //     },
        //     {
        //       'id': 3,
        //       'image': 'https://placeimg.com/64/64/3',
        //       'name': '사아자',
        //       'birthday': '961220',
        //       'gender': '여자',
        //       'job': '대학생3'
        //     }
        //   ]
    // );
    connection.query(
      "SELECT * FROM CUSTOMER",
       (err, rows, fields) => {     // 실제로 가져온 데이터는 rows로 처리
            res.send(rows);
       } 
    );
});

app.use('/image',express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req,res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
    let image = 'http://localhost:5000/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        })
})

app.listen(port, () => console.log(`Listening on a port ${port}`));