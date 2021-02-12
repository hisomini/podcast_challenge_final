import { isLoggedInVar } from "../apollo";
import { LS_TOKEN } from "../constants";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Podcasts } from "../pages/listener/podcasts";
import { NotFound } from "../404";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { Episodes } from "../pages/listener/episodes";
import React from "react";
import { LogoutPage } from "../pages/logout";
import { Home_Host } from "../pages/host/home";
import { CreatePodcast } from "../pages/host/create_podcast";
import { EditProfile } from "../pages/edit-profile";
import { Search } from "../pages/listener/search";
import { Category } from "../pages/listener/category";
import { Home_Detail_Host } from "../pages/host/home-detail";
import { EditPodcast } from "../pages/host/edit-podcast";

const ListenerRoutes = [
  <Route key={1} path="/" exact>
    <Podcasts />
  </Route>,
  <Route key={2} path="/podcasts/:id">
    <Episodes />
  </Route>,
  <Route key={3} path="/logout">
    <LogoutPage />
  </Route>,
  <Route key={4} path="/edit-profile">
    <EditProfile />
  </Route>,
  <Route key={5} path="/search">
    <Search />
  </Route>,
  <Route key={6} path="/category/:name">
    <Category />
  </Route>,
];
const HostRoutes = [
  <Route key={1} path="/" exact>
    <Home_Host />
  </Route>,
  <Route key={2} path="/new_podcast" exact>
    <CreatePodcast />
  </Route>,
  <Route key={3} path="/logout" exact>
    <LogoutPage />
  </Route>,
  <Route key={4} path="/edit-profile">
    <EditProfile />
  </Route>,
  <Route key={5} path="/podcasts/:id">
    <Home_Detail_Host />
  </Route>,
  <Route key={6} path="/edit-podcast/:id">
    <EditPodcast />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  const handleClick = () => {
    localStorage.removeItem(LS_TOKEN);
    isLoggedInVar(false);
  };
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Listener" && ListenerRoutes}
        {data.me.role === "Host" && HostRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
