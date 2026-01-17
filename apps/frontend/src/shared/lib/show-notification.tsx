import { toast } from "react-toastify";

import UiNotification, {
  type NotificationProps,
} from "@/shared/ui/ui-notification/ui-notification.tsx";

export const showNotification = (params: NotificationProps) => {
  toast(<UiNotification {...params} />);
};
