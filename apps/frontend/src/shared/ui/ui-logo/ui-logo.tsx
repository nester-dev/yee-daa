import type { FC } from 'react';
import { Link } from "react-router";
import Logo from "@/shared/assets/icons/logo.svg?react";
import { ROUTE_PATHS } from "@/shared/config/route-paths.ts";

const UiLogo: FC = () => {
  return (
    <Link to={ROUTE_PATHS.HOME}>
      <Logo />
    </Link>
  );
};

export default UiLogo;