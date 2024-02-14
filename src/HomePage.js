import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const LandingPage = () => {
  return (
    <>
      <main className={styles.container}>
        <div className={styles.hederContainer}>
          <h1>Todo App</h1>
          <p>Create and manage your tasks</p>
        </div>
        <div className={styles.container}>
          <Link to="/TodoList" className={styles.button}>
            View Todo List
          </Link>
          <Link to="/NewTodoList" className={styles.button}>
            Create New Todo List
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© 2024 Todo App. All rights reserved.</p>
      </footer>
    </>
  );
};

export default LandingPage;