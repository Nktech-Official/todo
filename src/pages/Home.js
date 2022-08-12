import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import AddNew from "../components/Home/AddNew";
import TodoCard from "../components/Home/TodoCard";
import { onValue, ref } from "firebase/database";
import { db, auth } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
export default function Home() {
  const [todoList, setTodoList] = useState();
  const [hasTodo, setHasTodo] = useState();
  useEffect(() => {
    // if (localStorage.getItem("login")) {

    // }
    // return () => {
    //   if (localStorage.getItem("login")) {
    //     off(ref(ref(db, `${localStorage.getItem("uid")}/todo/`)));
    //   }
    // };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        onValue(ref(db, `${localStorage.getItem("uid")}/todo/`), (datax) => {
          if (datax.hasChildren()) {
            setHasTodo(true);
            const Json = datax.toJSON();

            const keys = Object.keys(Json);
            const postJson = keys.map((key) => {
              const element = Json[key];
              return [element.title, element.Desc, key, element.chk];
            });
            setTodoList(postJson);
          } else {
            setHasTodo(false);
          }
        });
      }
    });
  }, []);

  return (
    <Box>
      <AddNew />
      <Box
        mt={5}
        mx="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box w="80%" mb={2}>
          <Text fontSize={25}>Todo List</Text>
        </Box>
      </Box>
      <Box mb={5}>
        {hasTodo ? (
          todoList.map((item, key) => {
            return (
              <TodoCard
                key={key}
                title={item[0]}
                desc={item[1]}
                itemKey={item[2]}
                chk={item[3]}
              />
            );
          })
        ) : (
          <Box>
            <TodoCard color="#eb564b" msg="No Data" />
          </Box>
        )}
      </Box>
    </Box>
  );
}
