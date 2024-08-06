import React from "react";
import {  LuPhoneCall } from "react-icons/lu";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const BreadCrumb = ({ path }) => {
  return (
    <div className="breadcrumbs text-sm mb-4">
      <ul className="flex items-center">
        <MdOutlineKeyboardArrowRight className="text-xl" />
        <Link to={"/products"}>
          <li>
            <a className="gap-1 flex items-center">
              <LuPhoneCall />
              <span>{path}</span>
            </a>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default BreadCrumb;
