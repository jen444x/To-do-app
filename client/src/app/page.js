"use client";
import { useEffect } from "react"; // remove later to use without jquery
import InputTodo from "../components/InputTodo";
import ListTodos from "../components/ListTodos";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap CSS

// remove later to use without jquery
export default function Home() {
  useEffect(() => {
    // Dynamically load Bootstrap JS only on client
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
      .then(() => console.log("✅ Bootstrap JS loadedd"))
      .catch((err) => console.error("Failed to load Bootstrap JS", err));
  }, []);

  return (
    <div className="container">
      <InputTodo />
      <ListTodos />
    </div>
  );
}

// export default function Home() {
//   return (
//     <div className="container">
//       <InputTodo />
//       <ListTodos />
//     </div>
//   );
// }
