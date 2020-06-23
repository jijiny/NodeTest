// 메인 자바스크립트 관리 (HTML문서에서 BOdy태그에 해당하는 내용)
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';

const customers = [
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

// 하나의 component안에 여러 개의 component 가능
class App extends Component {
  render() {
    return (
      <div>
        { customers.map(c => {  // map : 반복문
            return (
              <Customer
                key={c.id}  // map 사용 시 key 필수 (사용 안하면 개발자 도구 console에 오류 출력)
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            )
          })}
      </div>
    );
  }
}

export default App;
