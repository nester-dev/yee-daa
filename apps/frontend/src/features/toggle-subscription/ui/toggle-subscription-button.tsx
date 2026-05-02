import { decodeAccessToken } from "@/shared/api/jwt-decode";
import SubscribeIcon from "@/shared/assets/icons/subscribe.svg?react";
import SubscribedIcon from "@/shared/assets/icons/subscribed.svg?react";
import UiButton from "@/shared/ui/ui-button/ui-button";
import { UiTypography } from "@/shared/ui/ui-typography";

import { useToggleSubscriptionMutation } from "../api/subscribe-api";

type Props = {
  isSubscribed: boolean;
  bloggerId: string;
};

const ToggleSubscriptionButton = ({ isSubscribed, bloggerId }: Props) => {
  const [toggleSubscription] = useToggleSubscriptionMutation();
  const { text, Icon, buttonColor, textColor } = {
    text: isSubscribed ? "Вы подписаны" : "Подписаться",
    Icon: isSubscribed ? SubscribedIcon : SubscribeIcon,
    buttonColor: isSubscribed ? "primary" : "secondary",
    textColor: isSubscribed ? "black" : "white",
  } as const;

  const handleClick = () => {
    const payload = {
      fromUserId: decodeAccessToken()?.userId || null,
      toUserId: bloggerId,
    };

    toggleSubscription(payload);
  };

  return (
    <UiButton
      onClick={handleClick}
      size="sm"
      color={buttonColor}
      variant="solid"
      icon={<Icon />}
    >
      <UiTypography variant="xs" fontWeight="semibold" color={textColor}>
        {text}
      </UiTypography>
    </UiButton>
  );
};

export default ToggleSubscriptionButton;
