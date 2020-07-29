import React, { Component, Fragment } from "react";
import styled from 'styled-components'
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getPostDetails } from "../../actions/postDetails";
import { getAllPosts, getPostVote } from "../../actions/post";
import { routes } from "../Router";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Comment from "../../img/baseline_comment_black_18dp.png";
import UpVote from "@material-ui/icons/ThumbUp";
import UpVoteOutlined from "@material-ui/icons/ThumbUpOutlined";
import DownVote from "@material-ui/icons/ThumbDown";
import DownVoteOutlined from "@material-ui/icons/ThumbDownOutlined";


class PostList extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchInput: '',
    };
  }
  
  componentDidMount(){
    const token = window.localStorage.getItem("token")
    if (token === null) {
      this.props.goToLoginPage()
    }

    this.props.getAllPosts()
  }

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOnClickPostDetails = (postId) => {
    console.log(postId)
    this.props.getPostDetails(postId);
    localStorage.setItem('postId', postId)
    this.props.goToPostDetailsPage();
  }


  clickVote = (postId, direction) => {
    console.log(postId, direction)
    this.props.getPostVote(postId, direction);
  }

  render(){
    const { allPosts } = this.props

    const theme = createMuiTheme({
      overrides: {
        MuiCard: {
          root: {
            margin: "2vw 0",
            boxShadow: "0.1vw -0.1vw 0.5vw",
            width: '100%',
          },
        },
        MuiCardContent: {
          root:{
            cursor: "pointer",
          }
        }
      },
    });

    const filteredPosts = allPosts.filter(
      post =>
        post.username || post.text ? 
        (
          post.username
          .toUpperCase()
          .search(this.state.searchInput.toUpperCase()) !== -1
        || post.text
          .toUpperCase()
          .search(this.state.searchInput.toUpperCase()) !== -1
        ) : (
        allPosts
        )
    );
      
    return(
      <Fragment>

          <SearchWrapper>
            <InputBase
              name="searchInput"
              onChange={this.handleFieldChange}
              value={this.state.searchInput}
              placeholder="Procure um post!"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton aria-label="search" color="secondary">
              <SearchIcon />
            </IconButton>
          </SearchWrapper>

        {filteredPosts
          .sort((a, b) => b.commentsCount - a.commentsCount)
          .sort((a, b) => b.votesCount - a.votesCount)
          .map((post) => (
          <ThemeProvider theme={theme}>         
            <Card
              key={post.id}>

              <CardHeader
                avatar={
                <Avatar aria-label="recipe"></Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post.username}   
              />
              <CardContent 
                onClick={ () => this.handleOnClickPostDetails(post.id)} 
              >
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.text}
                </Typography>
              </CardContent>
              <CardActions disableSpacing> 
                <IconButton 
                  aria-label="DisLiked Post"                    
                >                             
                  {post.userVoteDirection === 1 ? (
                    <UpVote
                    onClick = {() => this.clickVote(post.id,0)}
                    /> 
                    ):( 
                    <UpVoteOutlined
                    onClick = {() => this.clickVote(post.id,1)}
                    />
                    )}          
                </IconButton>
                <IconButton 
                  aria-label="DisLiked Post"                    
                >
                  {post.userVoteDirection === -1 ? (
                    <DownVote 
                    onClick = {() => this.clickVote(post.id,0)}
                    />
                    ):(
                    <DownVoteOutlined 
                    onClick = {() => this.clickVote(post.id,-1)}
                    />
                    )}
                </IconButton>   
                <Typography>{post.votesCount}</Typography> 
                <Typography>Likes</Typography>
                <IconButton 
                  aria-label="Comments"
                  onClick={() => this.handleOnClickPostDetails(post.id)} 
                >
                  <img src={Comment} />                   
                </IconButton>
                <Typography>{post.commentsCount}</Typography>
                <Typography>Comentários</Typography>
              </CardActions>
            </Card>
          </ThemeProvider>
          ))
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  allPosts: state.posts.allPosts.posts,  
});

const mapDispatchToProps = dispatch => ({
  goToPostDetailsPage: () => dispatch(push(routes.postDetails)),
  goToLoginPage: () => dispatch(push(routes.root)),
  getAllPosts: () => dispatch(getAllPosts()),
  getPostVote: (postId, direction) => dispatch(getPostVote(postId, direction)),
  getPostDetails: (postId) => dispatch(getPostDetails(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList)


const SearchWrapper = styled.div`
  width: 60%;
  padding: 1vw 3vw 0 3vw;
  display: flex;
  justify-content: flex-start;
`