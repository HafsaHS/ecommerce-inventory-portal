import React from "react";
import { Outlet, useNavigate } from "react-router";
import { account } from "../../../lib/appwrite";

export default function ProductList() {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await account.deleteSession("current");
    navigate("/");
  };
  return (
    <>
      <Outlet />
      <div>ProductList</div>
      <button onClick={handleLogOut}>Log Out</button>
    </>
  );
}
