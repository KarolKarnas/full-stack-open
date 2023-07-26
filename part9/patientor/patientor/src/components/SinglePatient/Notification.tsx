import { Alert } from "@mui/material";

interface Props {
  notification: string | null;
  setNotification: React.Dispatch<React.SetStateAction<string | null>>
}

const Notification = ({ notification, setNotification }: Props) => {
	if (notification === null) {
		return null;
	} else {
    setInterval(() => { setNotification(null) }, 3000)
		return  <Alert severity="error">{notification}</Alert>
	}
};
export default Notification;
