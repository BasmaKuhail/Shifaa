import { Dispatch, useState } from "react";
import { User } from "@/types/UserType";
import Container from "./Container";
import Settings from "./Settings";
import MainMenu from "./MainMenu";

type headerProps = {
  user: User;
  profileOpened: boolean;
  setProfileOpened: Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderDropDown({ user }: headerProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const contentToShow = () => {
    if (isSettingsOpen) {
      return <Settings />;
    }

    return <MainMenu setIsSettingsOpen={setIsSettingsOpen} user={user} />;
  };

  return <Container>{contentToShow()}</Container>;
}

