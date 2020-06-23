const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers', (req, res) => {
    res.send(
        [
            {
              'id': 1,
              'image': 'https://placeimg.com/64/64/1',
              'name': '가나다',
              'birthday': '961222',
              'gender': '남자',
              'job': '대학생1'
            },
            {
              'id': 2,
              'image': 'https://placeimg.com/64/64/2',
              'name': '라마바',
              'birthday': '961221',
              'gender': '여자',
              'job': '대학생2'
            },
            {
              'id': 3,
              'image': 'https://placeimg.com/64/64/3',
              'name': '사아자',
              'birthday': '961220',
              'gender': '여자',
              'job': '대학생3'
            }
          ]
    );
});

app.listen(port, () => console.log(`Listening on a port ${port}`));