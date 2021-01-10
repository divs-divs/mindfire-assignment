import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from "prop-types";
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';

// routes config
import routes from '../../routes';

if (localStorage.getItem("name")==null) {
  window.location.href = '/login'
}

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

var navItems = { items: [] };


class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
     };
    if (navigation) {
      navigation.items.map((element, i) => {
        // to get navigation brand
        if ((element.name === "Airport")) {
          element.name = "Airport"
          navItems.items.push(element);
        }
    
        if (element.name === "AirCraft") {
          element.name = "AirCraft"
          navItems.items.push(element);
        }
        if (element.name === "Transaction") {
          element.name = "Transaction"
          navItems.items.push(element);
        }
        if (element.name === "Reports") {
          element.name = "Reports"
          navItems.items.push(element);
        }
      })
    }
  }
  componentWillMount(prevState){

  }

loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

signOut() {
        localStorage.clear();
        this.props.history.push('/login')
}

render() {
  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={this.loading()}>
          <DefaultHeader onLogout={() => this.signOut()} />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navItems} {...this.props} router={router} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <Container fluid>
            <Suspense fallback={this.loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  ) : (null);
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Suspense>
          </Container>
        </main>
        <AppAside fixed>
          <Suspense fallback={this.loading()}>
            <DefaultAside />
          </Suspense>
        </AppAside>
      </div>
      <AppFooter>
        <Suspense fallback={this.loading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
}
}

export default (DefaultLayout);
