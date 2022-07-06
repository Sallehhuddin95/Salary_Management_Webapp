import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { FaFileUpload, FaCloudDownloadAlt } from "react-icons/fa";
import { requirePropFactory } from "@mui/material";

const drawerWidth = 240;
const profilePic = require("../images/avatar_profile_icon.png");

export default function Sidebar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* <Toolbar /> */}

      <Card sx={{ maxWidth: 345 }} className="profile-div">
        <CardMedia
          className="profile-img"
          component="img"
          height="140"
          image={profilePic}
          alt="profile picture"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Long User Name
          </Typography>
        </CardContent>
      </Card>

      <List>
        {[
          "Upload Data",
          "Function 2",
          "Function 3",
          "Function 4",
          "Function 5",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <FaFileUpload /> : <FaCloudDownloadAlt />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
