import React from "react";
import { Outlet } from "react-router";

export default function Admin() {
  return (
    <>
      <Outlet />
      <div>Admin</div>
    </>
  );
}
