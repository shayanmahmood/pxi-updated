/* eslint-disable */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
// chakra imports

export function SidebarLinks(props) {
  // Chakra color mode
  const location = useLocation();
  const [openParents, setOpenParents] = useState({}); // track which parents are open

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routePath) => {
    return (
      location.pathname === routePath ||
      location.pathname.startsWith(routePath + "/")
    );
  };

  const isChildActive = (children, parentLayout, parentPath) => {
    return children?.some((child) => location.pathname.startsWith(child.path));
  };

  const toggleParent = (name) => {
    setOpenParents((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const renderChildLinks = (children, parentLayout) => {
    return (
      <ul className="ml-12 list-none">
        {children.map((child, idx) => {
          const fullChildPath = `${child.path}`;
          const isActive =
            location.pathname.includes(fullChildPath) ||
            location.pathname.startsWith(fullChildPath + "/");

          console.log(location.pathname);
          console.log(fullChildPath);
          console.log(isActive);
          return (
            <Link key={idx} to={fullChildPath}>
              <li
                className={`my-[3px] flex cursor-pointer items-center px-8 ${
                  isActive
                    ? "font-bold text-navy-700 dark:text-white"
                    : "font-medium text-gray-600"
                }`}
              >
                <p>{child.name}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    );
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        const parentPath = route.layout + "/" + route.path;
        const isActive = activeRoute(parentPath);
        const hasChildren = route.children && route.children.length > 0;
        const childActive =
          hasChildren &&
          isChildActive(route.children, route.layout, route.path);
        const isOpen = openParents[route.name] || childActive;

        return (
          <div key={index}>
            <Link to={route.layout + "/" + route.path}>
              <div
                className="relative mb-3 flex hover:cursor-pointer"
                onClick={() => hasChildren && toggleParent(route.name)}
              >
                <li
                  className="my-[3px] flex cursor-pointer items-center px-8"
                  key={index}
                >
                  <span
                    className={`${
                      isActive || childActive
                        ? "font-bold text-brand-500 dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.icon ? route.icon : <DashIcon />}
                  </span>
                  <p
                    className={`leading-1 ml-4 flex ${
                      isActive || childActive
                        ? "font-bold text-navy-700 dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.name}
                  </p>
                </li>
                {(isActive || childActive) && (
                  <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                )}
              </div>
            </Link>
            {hasChildren &&
              isOpen &&
              renderChildLinks(route.children, parentPath)}
          </div>
        );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
