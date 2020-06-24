// 메인 자바스크립트 관리 (HTML문서에서 BOdy태그에 해당하는 내용)
import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress } from '@material-ui/core'
import { fade, withStyles} from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


/*
  리액트 라이브러리가 처음 component를 실행하는 순서
  1) constructor()
  2) componentWillMount()
  3) render() : 실제로 component를 화면에 그림
  4) componentDidMount()

  props or state 변경 시 => shouldComponentUpdate()
      - 다시 render()를 호출해 view를 갱신
*/

const styles = theme => ({
  root : {
    width : '100%',
    minWidth : 1080
  }, 
  paper : {
    marginLeft : 18,
    marginRight : 18
  },
  tableHead : {
    fontSize : '1.5 rem'
  },
  menu : {
    marginTop : 15,
    marginBottom : 15, 
    display : 'flex',
    justifyContent : 'center'
  },
  progress : {
    margin : theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
})



// 하나의 component안에 여러 개의 component 가능
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customer : '',
      completed : 0,
      searchKeyword : ''
    }
  }

stateRefresh = () => {
  this.setState({
    customers : '',
    completed : 0,
    searchKeyword : ''
  });
  this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(err => console.log(err));
}

  componentDidMount() { 
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(err => console.log(err));
  }

  callApi = async () => { // API를 비동기적으로 호출
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({completed : completed >= 100 ? 0 : completed +1})
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  
  render() {
    // 검색
    const filterComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>
      })
    }
    const {classes} = this.props;
    const cellList = ["번호", "이미지", "이름","생년월일","성별","직업","설정"];
    return (
      <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Customer Managing System
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name = "searchKeyword"
              value = {this.state.searchKeyword}
              onChange = {this.handleValueChange}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={this.stateRefresh}/> {/* stateRefresh 함수를 전달*/}
      </div>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {cellList.map(c => {
                return <TableCell className={classes.tableHead}>{c}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* this.state.customers에 정보가 존재한다면 출력 아니면 빈칸 */}
            {this.state.customers ? 
              filterComponents(this.state.customers) : 
            // this.state.customers.map(c => {  // map : 반복문
            //   return (
            //     <Customer
            //       stateRefresh={this.stateRefresh}
            //       key={c.id}  // map 사용 시 key 필수 (사용 안하면 개발자 도구 console에 오류 출력)
            //       id={c.id}
            //       image={c.image}
            //       name={c.name}
            //       birthday={c.birthday}
            //       gender={c.gender}
            //       job={c.job}
            //     />
            //   )
            // }) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);
