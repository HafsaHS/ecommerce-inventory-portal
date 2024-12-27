import React from "react";
import { Outlet } from "react-router";

export default function ProductList() {
  return (
    <>
      <Outlet />
      <div>ProductList</div>
    </>
  );
}
