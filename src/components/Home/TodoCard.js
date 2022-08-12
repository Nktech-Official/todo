import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { remove, ref, update } from "firebase/database";
import { db, auth } from "../../FirebaseConfig";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
export default function TodoCard(props) {
  const path = ref(db, `${localStorage.getItem("uid")}/todo/${props.itemKey}/`);
  const [uptitle, Setuptitle] = useState();
  const [updesc, setUpdesc] = useState();
  const [editable, setEditable] = useState(false);
  const Remove = () => {
    remove(path).catch((err) => {
      console.log(err);
    });
  };
  const upData = () => {
    console.log("tile", uptitle);
    console.log("desc", updesc);
    update(path, {
      title: uptitle,
      Desc: updesc,
    }).then(() => {
      setEditable(false);
    });
  };
  const Edit = () => {
    setEditable(true);
  };

  return (
    <Box mt={5} display="flex" alignItems="center" justifyContent="center">
      <Box
        px={3}
        py={3}
        borderRadius={12}
        bg={props.color ? props.color : "#49c0ec"}
        w="75%"
        h="fit-content"
        minH="100px"
        display={props.msg ? "flex" : "block"}
        alignItems={props.msg ? "center" : "none"}
      >
        {props.msg ? (
          <Text w="100%" color="white" textAlign="center" fontSize={40}>
            {props.msg}
          </Text>
        ) : (
          <>
            <Box display="flex">
              {/* <Text
                contentEditable={editable ? true : false}
                fontSize={28}
                color="white"
                fontWeight={600}
              >
                {props.title}
              </Text> */}
              <Editable
                fontSize={28}
                fontWeight={600}
                isPreviewFocusable={editable}
                color="white"
                defaultValue={props.title}
                submitOnBlur={true}
              >
                <EditablePreview />
                <EditableInput
                  onChange={(e) => {
                    console.log(e.target.value);
                    Setuptitle(e.target.value);
                  }}
                />
              </Editable>
              <Box h="100%" w="100%" display="flex" justifyContent="flex-end">
                <Button
                  mx={3}
                  _hover={{
                    bg: "red",
                  }}
                  onClick={Remove}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  mx={3}
                  _hover={{
                    bg: "green",
                  }}
                  onClick={editable ? upData : Edit}
                >
                  {editable ? <CheckIcon /> : <EditIcon />}
                </Button>
              </Box>
            </Box>
            {/* <Text contentEditable={editable ? true : false} color="white"> */}
            <Editable
              isPreviewFocusable={editable}
              color="white"
              defaultValue={props.desc}
              submitOnBlur={true}
            >
              <EditablePreview />
              <EditableInput
                onChange={(e) => {
                  console.log(e.target.value);
                  setUpdesc(e.target.value);
                }}
              />
            </Editable>
            {/* 
            </Text> */}
          </>
        )}
      </Box>
    </Box>
  );
}
