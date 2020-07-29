import React, { Component } from "react";
import { connect } from "react-redux";
import { push, goBack } from "connected-react-router";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { routes } from "../Router";
import {getPostDetails, postComment} from '../../actions/postDetails'
import { getAllPosts } from "../../actions/post";
import CommentsList from '../CommentsList/CommentList'
import Logo from "../../img/logo.png";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class PostDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  componentDidMount(){
    const token = window.localStorage.getItem("token")
    if (token === null) {
      this.props.goToLoginPage();
    }
    this.getPostDetails()
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getPostDetails = () => {
    const postId = localStorage.getItem('postId')
    this.props.getPostDetails(postId)
  }

  toPostComment = () => {
    this.props.postComment(this.state.text, this.props.postDetails.id)
    this.props.getPostDetails(this.props.postDetails.id)
    this.setState({text: ""})
  }

  render() {

    const { text } = this.state

    const { postDetails, goBack } = this.props

    const useStyles = makeStyles((theme) => ({
      root: {
        maxWidth: 345,
      },      
      avatar: {
        backgroundColor: green[500],
      },
    }));

    const theme = createMuiTheme({
      overrides: {
        MuiCard: {
          root: {
            margin: "2vw 0",
            minHeight: "160px",
            boxShadow: "0.1vw 0.1vw 0.5vw",
          },
        },
      },
    });

    return (
      <PostDetailsPageWrapper>
        <GoBackContainer>
        <Button
          color="primary"
          onClick={goBack}
          >Voltar ao Feed
        </Button>
        </GoBackContainer>
        <CommentWrapper>
          <InputWrapper>
          <ThemeProvider theme={theme}>         
            <Card
            key={postDetails.id}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={useStyles.avatar}></Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={postDetails.username}  
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {postDetails.text} 
                </Typography>
              </CardContent>              
            </Card>
            </ThemeProvider>
          <TextField
            onChange={this.handleFieldChange}
            name="text"
            type="text"
            label="Comentário"
            value={text}
            multiline
            rowsMax={10}
            color={"secondary"}
          />
          <Button
            color="secondary"
            onClick={this.toPostComment}
          >Enviar Comentário
          </Button>
          </InputWrapper>

          <CommentsList/>

        </CommentWrapper>
      </PostDetailsPageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  allPosts: state.posts.allPosts,
  postDetails: state.posts.postDetails,
});

const mapDispatchToProps = (dispatch) => {
  return{
    goToFeedPage: () => dispatch(push(routes.feedPage)),
    goToLoginPage: () => dispatch(push(routes.root)),
    goBack: () => dispatch(goBack()),
    getPostDetails: (postId) => dispatch(getPostDetails(postId)),
    postComment:(comment, postId) => dispatch(postComment(comment, postId)),
    getAllPosts: () => dispatch(getAllPosts()),
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostDetailsPage);

const PostDetailsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  min-height: 75vh;
`

const GoBackContainer = styled.div`
  width: 60%;
  padding: 1vw 3vw 0 3vw;
  display: flex;
  justify-content: flex-start;
`

const CommentWrapper = styled.div`
  min-width: 400px;
  background-color: #F6B08F;
  width: 60%;
  height: auto;
  min-height: 68vh;
  box-shadow: 0.1vw 0.2vw 1vw;
  border-radius: 2vw;
  padding: 2vw;
  margin: 2vw 0;
  display: flex;
  flex-direction: column;
  border: 1px white solid;
`

const InputWrapper = styled.div`
  min-width: 350px;
  background-color: white;
  box-shadow: 0.1vw 0.1vw 0.5vw;
  padding: 1vw 2vw;
  border-radius: 0.5vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`