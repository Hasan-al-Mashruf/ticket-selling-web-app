import React from "react";
import "./BreadCrumb.css";
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const BreadCrumb = () => {
  const breadcrumbs = useReactRouterBreadcrumbs();
  return (
    <div className="h-[250px] w-full p-9 breadcrumb ">
      <div className="container relative z-50  flex flex-col gap-0 items-center justify-center w-full h-full">
        <h4 className="text-white text-xl font-normal flex items-center gap-[2px]">
          {breadcrumbs?.map(({ match, breadcrumb }, index) => (
            <React.Fragment key={match.pathname}>
              {index > 0 && <IoIosArrowForward />}
              <span>
                <Link
                  to={match.pathname}
                  className={
                    index === breadcrumbs?.length - 1
                      ? "active font-semibold text-[#FB923C]"
                      : undefined
                  }
                >
                  {breadcrumb}
                </Link>
              </span>
            </React.Fragment>
          ))}
        </h4>
      </div>
    </div>
  );
};

export default BreadCrumb;
