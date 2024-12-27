import React from "react";
import { Outlet } from "react-router";

export default function CategoryList() {
  return (
    <>
      <Outlet />
      <div>CategoryList</div>
    </>
  );
}
