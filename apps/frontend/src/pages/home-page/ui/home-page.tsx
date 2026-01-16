import { toast } from "react-toastify";

import UiNotification from "@/shared/ui/ui-notification/ui-notification.tsx";

const HomePage = () => {
  const click = () =>
    toast(
      <UiNotification
        title="Такого e-mail нет"
        text="Попробуйте другой e-mail или проверьте правильность его написания"
        variant="error"
      />,
    );

  return (
    <h1>
      homePage
      <button onClick={click}>Toast</button>
    </h1>
  );
};

export default HomePage;
