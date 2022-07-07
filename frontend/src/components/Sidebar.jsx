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
import { FaCloudDownloadAlt } from "react-icons/fa";
import FileUploader from "./FileUploader";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;
const profilePic = require("../images/avatar_profile_icon.png");

export default function Sidebar(props) {
  const [mobileOpen, setMobileOpen] = React.useState(props.mobileOpen);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        // open
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
              {index === 0 ? (
                <FileUploader />
              ) : (
                <ListItemButton>
                  <ListItemIcon>
                    <FaCloudDownloadAlt />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
        className="menu-btn"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
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
              {index === 0 ? (
                <FileUploader />
              ) : (
                <ListItemButton>
                  <ListItemIcon>
                    <FaCloudDownloadAlt />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
