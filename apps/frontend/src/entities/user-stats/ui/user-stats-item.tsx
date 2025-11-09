import type { FC, PropsWithChildren, ReactNode } from "react";

import { UiTypography } from "@/shared/ui/ui-typography";

type Props = PropsWithChildren<{
  icon: ReactNode;
  className?: string;
}>;

const UserStatsItem: FC<Props> = ({ icon, className, children }) => {
  return (
    <div className={className}>
      {icon}
      <UiTypography color="greenPrimary" fontWeight="semibold">
        {children}
      </UiTypography>
    </div>
  );
};

export default UserStatsItem;
