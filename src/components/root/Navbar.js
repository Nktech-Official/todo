import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
} from "@chakra-ui/react";
import { Link as reachLink } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Logo from "../../assets/icon/logo.jpg";
import { auth, GoogleLogin } from "../../FirebaseConfig";
import { getRedirectResult, signOut, onAuthStateChanged } from "firebase/auth";

const NavLink = ({ children, url }) => (
  <Link as={reachLink} px={2} py={1} rounded={"md"} to={url}>
    {children}
  </Link>
);

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [logedin, setLogedin] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLogedin(true);
      localStorage.setItem("login", "true");
      localStorage.setItem("uid", auth.currentUser.uid);
    } else {
      setLogedin(false);
    }
  });
  useEffect(() => {
    if (auth.currentUser) {
      getRedirectResult(auth)
        .then((result) => {
          console.log(result);
          setLogedin(true);
        })
        .catch((erro) => {
          console.log(erro);
          setLogedin(false);
        });
    }
  }, []);
  const logout = () => {
    signOut(auth).then(() => {
      setLogedin(false);
    });
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <NavLink children={<Image src={Logo} w="50" h="50" />} url="/" />
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {logedin ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      name={auth.currentUser.displayName}
                      size={"sm"}
                      src={auth.currentUser.photoURL}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        name={auth.currentUser.displayName}
                        src={auth.currentUser.photoURL}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{auth.currentUser.displayName}</p>
                    </Center>
                    <br />

                    <MenuItem>
                      <Text onClick={logout}>Logout</Text>{" "}
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <NavLink
                  children={<Button onClick={GoogleLogin}>LOGIN</Button>}
                  url=""
                />
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
