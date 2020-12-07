import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import UserInfoPage from "./views/UserInfoPage/UserInfoPage.js";
import ResetPage from './views/ResetPage/ResetPage.js';
import UploadProductPage from './views/UploadProductPage/UploadProductPage.js';
import DetailReviewPage from './views/DetailReviewPage/DetailReviewPage';
import ScrapPage from './views/ScrapPage/ScrapPage';
import UpdateReviewPage from './views/UpdateReviewPage/UpdateReviewPage';
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/reset_user" component={Auth(ResetPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/userInfo" component={Auth(UserInfoPage, true)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailReviewPage, null)} />
          <Route exact path="/user/scrap" component={Auth(ScrapPage, true)} />
          <Route exact path="/product/updateReview/:productId" component={Auth(UpdateReviewPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
