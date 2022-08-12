import { Box, Input, Textarea, Text, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { auth, db } from "../../FirebaseConfig";
import { ref, set, push } from "firebase/database";

export default function AddNew() {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  const addToDatabase = () => {
    console.log(auth.currentUser.uid);
    const id = push(ref(db, `${auth.currentUser.uid}/todo`));
    console.log(id);
    set(id, {
      title: title,
      Desc: desc,
    }).then(() => {
      setTitle("");
      setDesc("");
    });
  };

  return (
    <>
      <Box
        my={12}
        mx="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box w="80%" mb={4}>
          <Text fontSize={28}>Title</Text>
        </Box>
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          px="auto"
          mx="auto"
          variant="filled"
          w="80%"
          h={12}
          fontSize={24}
          placeholder="Title"
        />
      </Box>
      <Box
        mt={12}
        mb={2}
        mx="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box w="80%" mb={4}>
          <Text fontSize={28}>Description</Text>
        </Box>
        <Textarea
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          value={desc}
          px="auto"
          mx="auto"
          variant="filled"
          w="80%"
          h={12}
          fontSize={24}
          placeholder="Description"
        />
      </Box>
      <Box
        mx="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box w="80%" mb={2}>
          <Button onClick={addToDatabase} bg={"#b1aad8"}>
            ADD
          </Button>
        </Box>
      </Box>
    </>
  );
}
