import { Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Logout from "../pages/Logout";

import Accounts from "../pages/Account";
import Category from "../pages/Category";
import Transfer from "../pages/Transfer";
import Dashboard from "../pages/Dashboard";
import IncomeExpense from "../pages/IncomeExpense";

export const authRoutes = [
  { path: "/", title: "Dashboard", component: <Dashboard /> },

  { path: "/category", title: "Category", component: <Category /> },
  { path: "/accounts", title: "Accounts", component: <Accounts /> },
  { path: "/transfer", title: "Transfer", component: <Transfer /> },
  { path: "/income-expense", title: "Income Expense", component: <IncomeExpense /> },

  { path: "/logout", title: "Log out", component: <Logout /> },

  { path: "*", component: <Navigate to="/" /> },
];
export const nonAuthRoutes = [{ path: "/login", component: <Login />, title: "Login" }];
