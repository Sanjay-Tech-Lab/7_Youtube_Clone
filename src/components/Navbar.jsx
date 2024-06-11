import { Stack, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { currentUser } = useAuth();
  let button = (
    <Link to="/login">
      <Button
        sx={{
          color: "white",
          backgroundColor: "#f31503",
          mt: 2,
          ":hover": { color: "#f31503", backgroundColor: "white" },
        }}
      >
        Log In
      </Button>
    </Link>
  );
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          className="logo"
          src={require("../images/metube.png")}
          alt="logo"
        />
      </Link>
      <SearchBar />
      {!currentUser && button}
      {currentUser && (
        <Link to="/dashboard">
          <Avatar src="../images/user.png"></Avatar>
        </Link>
      )}
    </Stack>
  );
}

export default Navbar;
