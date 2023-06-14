import * as React from 'react';
import {
  Admin, Resource, ListGuesser, EditGuesser,
  defaultTheme, Layout, AppBar, ToggleThemeButton,
} from "react-admin";
import { QueryClient } from 'react-query';
import jsonServerProvider from "ra-data-json-server";
import { Dashboard } from './Dashboard';
import { UserList } from "./users";
import { PostList, PostEdit, PostCreate, PostShow } from "./posts";
import { createTheme, Box, Typography } from '@mui/material';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const darkTheme = createTheme({
  palette: { mode: 'dark' },
});

const MyAppBar = props => (
  <AppBar {...props}>
    <Box flex="1">
      <Typography variant="h6" id="react-admin-title"></Typography>
    </Box>
    <ToggleThemeButton
      lightTheme={defaultTheme}
      darkTheme={darkTheme}
    />
  </AppBar>
);

const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;

const App = () => {
  var queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0
      }
    }
  });
  return (
    <Admin disableTelemetry dataProvider={dataProvider} dashboard={Dashboard} layout={MyLayout} queryClient={queryClient}>
      <Resource name="users" list={UserList} recordRepresentation="name" />
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} show={PostShow} />
    </Admin>
  )
}

export default App;
