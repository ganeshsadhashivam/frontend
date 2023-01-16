import React from "react";
import "./Footer.css";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  const year = new Date().getFullYear();
  console.log(year);
  return (
    <footer className="   text-center">
      <h6> ©️CopyRights {year} By GaneshSadhashivam ❤️ DEVSNEST</h6>
      <a href="https://twitter.com/WhenTheyNeedYou" target={"_blank"}>
        <FaTwitter
          size={50}
          style={{ color: "#1DA1F2", marginRight: "0.5rem" }}
        />
      </a>
      <a href="https://github.com/ganeshsadhashivam" target={"_blank"}>
        <FaGithub size={50} style={{ marginRight: "0.5rem" }} />
      </a>
      <a
        href="https://www.linkedin.com/in/ganesh-sadhashivam/"
        target={"_blank"}
      >
        <FaLinkedin
          size={50}
          style={{ color: "#0077b5", marginRight: "0.5rem" }}
        />
      </a>
    </footer>
  );
};

export default Footer;
