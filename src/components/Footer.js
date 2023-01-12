import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  console.log(year);
  return (
    <footer className="bg-light py-4  text-center">
      <h6>CopyRights {year} By GaneshSadhashivam ❤️ DEVSNEST</h6>
    </footer>
  );
};

export default Footer;
