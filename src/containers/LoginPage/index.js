import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { routes } from "../Router";
import {toLogin, toSignUp, toRenderSignUp} from '../../actions/login'
import Logo from '../../img/logo.png'
import Chip from '@material-ui/core/Chip';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username:"",
    };
  }


  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toSignUp = event => {
    event.preventDefault()
    this.props.toSignUp(this.state.email, this.state.password, this.state.username)
    this.setState({email: "", password: "", username: ""})
  }
  
  toLogin = event => {
    event.preventDefault()

    this.props.toLogin(this.state.email, this.state.password)
    this.setState({email: "", password: "", username: ""})
  }


  render() {
    const {email, password, username, goToFeedPage, signUpRender, toRenderSignUp } = this.props
    const isLoged = localStorage.getItem("token") !== null

    const theme = createMuiTheme({
      overrides: {
        MuiButton: {
          root: {
            color: '#ffff',
            backgroundColor: '#E2AC9D',
            '&:hover': {color: '#ED7F61'},
          },
        },
      },
    });
    
    const theme2 = createMuiTheme({
      overrides: {
        MuiButton: {
          root: {
            color: '#ED7F61',
          },
        },
      },
    });

    return (
      <LoginPageWrapper>
        {isLoged ?
        <LoginWrapper>
          <Img src={Logo}/>
          <Chip
          label = {`Usuário: ${localStorage.getItem('username')}`}
          color = "secondary"
          variant= 'outlined'
          />
          <Button 
          onClick={goToFeedPage}
          color='primary'
          >Explore seu Feed!
          </Button>
        </LoginWrapper>
        :
        <LoginWrapper onSubmit={this.toLogin}>
          {localStorage.getItem('invalidLogin') ?
            <Invalid>E-mail ou senha inválida</Invalid>
            :
            ""
          }
          <TextField
            onChange={this.handleFieldChange}
            name="email"
            type="email"
            label="E-mail"
            value={email}
            inputProps={{
            }}
          />
          <TextField
            onChange={this.handleFieldChange}
            name="password"
            type="password"
            label="Senha"
            value={password}
            inputProps={{
              pattern: '^.{6,}$',
            }}
          />
          {signUpRender ? (
          <TextField
            onChange={this.handleFieldChange}
            name="username"
            type="text"
            label="Nome de Usuário"
            value={username}
          />
          ) : (
          ""
          )}
          {signUpRender ? (
            <Fragment>
              <ThemeProvider theme={theme2}>
              <Button
                onClick={this.toSignUp} 
                >Cadastrar
              </Button>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <Button
                  onClick={toRenderSignUp} 
                  >Voltar ao Login
                </Button>
              </ThemeProvider>
            </Fragment>
          ) : (
            <ThemeProvider theme={theme2}>
            <Button
              type="submit"
              >Login
            </Button>
            </ThemeProvider>
          )}
        </LoginWrapper>
        }
        {localStorage.removeItem('invalidLogin')}
      </LoginPageWrapper>
      
    );
  }
}

const mapStateToProps = state => ({
  signUpRender: state.posts.toRenderSignUp
})

const mapDispatchToProps = (dispatch) => {
  return{
    toSignUp: (email, password, username) => dispatch(toSignUp(email, password, username)),
    toLogin: (email, password) => dispatch(toLogin(email, password)),
    toRenderSignUp: () => dispatch(toRenderSignUp(false)),
    goToFeedPage: () => dispatch(push(routes.feedPage))
  }
}



export default connect (mapStateToProps, mapDispatchToProps) (LoginPage);

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 75vh;
`

const LoginWrapper = styled.form`
  width: 100%;
  height: 100%;
  place-content: center center;
  gap: 1vw;
  display: grid;
`

const Img = styled.img`
  width: 17vw;
  min-width: 250px;
  box-shadow: 0.5vw 0.5vw 1vw;
  border-radius: 2vw;
  margin: 5vw 0 4vw 0;
`
const Invalid = styled.p`
  color: red;
`
