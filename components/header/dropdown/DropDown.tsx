
import { Dispatch, useState } from 'react';
import { logout as logoutService } from '@/services/auth';
import { useRouter } from 'next/router';
import ProfileIcon from '../../ProfileIcon';
import { User } from '@/types/UserType';
import Container from './Container';
import Settings from './Settings';
import MainMenu from './MainMenu';
type headerProps = {
    user: User
    profileOpened:boolean,
    setProfileOpened:Dispatch<React.SetStateAction<boolean>>,
}

export default function HeaderDropDown({user, profileOpened, setProfileOpened}:headerProps){
    
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    
    const contentToShow = () => {
        if(isSettingsOpen){
            return(
                <Settings/>
            )
        }else{
            return(
                <MainMenu setIsSettingsOpen={setIsSettingsOpen} user={user} profileOpened={profileOpened} setProfileOpened={setProfileOpened}/>
            )
        }
    }
    return(
        <Container>
            {contentToShow()}
        </Container>
    )
}