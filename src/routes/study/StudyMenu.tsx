import { Link, Outlet } from "react-router-dom";

export default function StudyMenu() {
  return (
    <div>
      <div><Link to="/study/new"> New </Link></div>
      <div><Link to="/study/review"> Review </Link></div>
    </div>
  );
}
