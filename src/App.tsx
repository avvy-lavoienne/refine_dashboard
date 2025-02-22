import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { authProvider, dataProvider, liveProvider } from "./providers";
import { Home, ForgotPassword, Login, Register, CompanyList } from "./pages/index";
import { resources } from "./config/resources";
import routerBindings, { CatchAllNavigate, DocumentTitleHandler, UnsavedChangesNotifier } from "@refinedev/react-router";
import { App as AntdApp, List } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Layout from "./components/layout";
import CreateCompany from "./pages/company/createCompany";
import EditCompany from "./pages/company/editCompany";
import TaskList from "./pages/tasks/list";
import CreateTask from "./pages/tasks/create";
import EditTask from "./pages/tasks/edit";
import TasksCreatePage from "./pages/tasks/create";
import TasksEditPage from "./pages/tasks/edit";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "q1O3AY-hq2jEQ-XEFgLt",
                liveMode: "auto",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated 
                      key="autenthicated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="/companies">
                    <Route index element={<CompanyList />} />
                    <Route path="new" element={<CreateCompany />} />
                    <Route path="edit/:id" element={<EditCompany />} />
                  </Route>
                  <Route path="/tasks" element={
                    <TaskList>
                      <Outlet />
                    </TaskList>
                  }>
                    <Route path="new" element={<TasksCreatePage />} />
                    <Route path="edit/:id" element={<TasksEditPage />} />
                  </Route>
                </Route>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;