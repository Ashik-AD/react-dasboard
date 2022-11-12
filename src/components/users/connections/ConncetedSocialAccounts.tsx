import { useState } from "react";
import { IconButton } from "../../../ui";
import Box from "../../box/Box";
import Card from "../../card/Card";
import AppInfo from "./AppInfo";
import Title from "./Title";
import { DeleteOutline, LinkOutlined } from "@mui/icons-material";

const ConnectedSocialAccounts = () => {
  const [app] = useState([
    {
      id: 1,
      name: "Facebook",
      connected: false,
      avatar: "/src/image/logo/facebook.png",
      userId: "",
    },
    {
      id: 2,
      name: "Twitter",
      connected: true,
      avatar: "/src/image/logo/twitter.png",
      userId: "@corde",
    },
    {
      id: 3,
      name: "LinkedIn",
      connected: true,
      avatar: "/src/image/logo/linkedin.png",
      userId: "ashikdhimal",
    },
    {
      id: 4,
      name: "Instagram",
      connected: false,
      avatar: "/src/image/logo/instagram.png",
      userId: "",
    },
    {
      id: 5,
      name: "Behance",
      connected: false,
      avatar: "/src/image/logo/behance.png",
      userId: "",
    },
    {
      id: 6,
      name: "Dribble",
      connected: false,
      avatar: "/src/image/logo/dribble.png",
      userId: "",
    },
  ]);
  return (
    <Card px="1.25rem" py="1.25rem">
      <Title
        title="Social accounts"
        description="Display content from social accounts on your site"
      />
      <Box display="flex" flexDirection="column" space={1.8}>
        {app.map((ap) => (
          <Box
            key={ap.id}
            display="flex"
            align="center"
            justify="space-between"
            space={1}
          >
            <AppInfo
              avatar={ap.avatar}
              appName={ap.name}
              title={ap.connected ? ap.userId : "Not Connected"}
            />
            <>
              {ap.connected ? (
                <IconButton
                  varient="outlined"
                  color="error"
                  contentOpacity={6}
                  fontSize={20}
                >
                  <DeleteOutline />
                </IconButton>
              ) : (
                <IconButton varient="outlined" contentOpacity={6} fontSize={20}>
                  <LinkOutlined />
                </IconButton>
              )}
            </>
          </Box>
        ))}
      </Box>
    </Card>
  );
};
export default ConnectedSocialAccounts;
