import NotificationList from './NotificationList';
import SideBarContainer from './SidbarContatiner';

interface Props {
    onClose: () => void;
}
function NotificationBar({ onClose }: Props) {
    return (
        <SideBarContainer onClose={onClose} title="알림">
            <NotificationList onClose={onClose} />
        </SideBarContainer>
    );
}

export default NotificationBar;
