import { Router } from "express";
import auth from "../routes/auth.router.js";
import category from "../routes/category.router.js";
import accounts from "../routes/accounts.router.js";
import incomeExpense from "../routes/incomeExpense.router.js";

const app = Router();

app.get("/", (req, res) => res.send("Server Running 🚀"));

app.use("/auth", auth);
app.use("/category", category);
app.use("/accounts", accounts);
app.use("/income-expense", incomeExpense);

export default app;
