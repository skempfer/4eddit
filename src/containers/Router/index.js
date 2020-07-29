import React, { Fragment } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import Header from "../Header";
import Footer from "../../components/Footer";
import FeedPage from "../FeedPage";
import PostDetailsPage from "../PostDetailsPage";



export const routes = {
  root: "/",
  feedPage: "/feed",
  postDetails: "/details"
};

export default function Router(props) {
  return (
    <Fragment>
    <Header/>
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={LoginPage} />
        <Route exact path={routes.feedPage} component={FeedPage} />
        <Route exact path={routes.postDetails} component={PostDetailsPage} /> 
      </Switch>
    </ConnectedRouter>
    <Footer/>
    </Fragment>

  );
}
