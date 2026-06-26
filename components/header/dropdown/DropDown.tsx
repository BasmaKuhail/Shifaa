
import { Dispatch, useState } from 'react';
import { User } from '@/types/UserType';
import Container from './Container';
import Settings from './Settings';
import MainMenu from './MainMenu';
import MedicalChatPanel from './MedicalChatPanel';
type headerProps = {
    user: User
    profileOpened:boolean,
    setProfileOpened:Dispatch<React.SetStateAction<boolean>>,
}

export default function HeaderDropDown({user}:headerProps){
    
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)
    
    const contentToShow = () => {
        if(isChatOpen){
            return(
                <MedicalChatPanel onClose={() => setIsChatOpen(false)}/>
            )
        }else if(isSettingsOpen){
            return(
                <Settings/>
            )
        }else{
            return(
                <MainMenu setIsChatOpen={setIsChatOpen} setIsSettingsOpen={setIsSettingsOpen} user={user}/>
            )
        }
    }
    return(
        <Container>
            {contentToShow()}
        </Container>
    )
}
