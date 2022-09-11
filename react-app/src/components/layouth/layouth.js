import React from "react";

const Layout = ({ children, theme }) => {
  return (
    <>
      <main className={theme}>{children}</main>
    </>
  );
};

export default Layout;
