import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Checkbox,
} from "@chakra-ui/react";
import { remove, ref, update } from "firebase/database";
import { db } from "../../FirebaseConfig";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
export default function TodoCard(props) {
  const path = ref(db, `${localStorage.getItem("uid")}/todo/${props.itemKey}/`);
  const [uptitle, Setuptitle] = useState();
  const [updesc, setUpdesc] = useState();
  const [editable, setEditable] = useState(false);
  const [checked, setChecked] = useState(props.chk || false);
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
  const markChecked = () => {
    update(path, {
      chk: !checked,
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
        minW="75%"
        w="fit-content"
        maxW="90%"
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
              <Editable
                fontSize={28}
                fontWeight={600}
                isPreviewFocusable={editable}
                color="white"
                defaultValue={props.title}
                submitOnBlur={true}
                overflowWrap="anywhere"
              >
                <EditablePreview
                  overflowWrap="anywhere"
                  textDecoration={checked ? "line-through" : "none"}
                />
                <EditableInput
                  overflowWrap="anywhere"
                  onChange={(e) => {
                    console.log(e.target.value);
                    Setuptitle(e.target.value);
                  }}
                />
              </Editable>
            </Box>
            {/* <Text contentEditable={editable ? true : false} color="white"> */}
            <Editable
              isPreviewFocusable={editable}
              color="white"
              defaultValue={props.desc}
              submitOnBlur={true}
              overflowWrap="anywhere"
            >
              <EditablePreview
                overflowWrap="anywhere"
                textDecoration={checked ? "line-through" : "none"}
              />
              <EditableInput
                overflowWrap="anywhere"
                onChange={(e) => {
                  console.log(e.target.value);
                  setUpdesc(e.target.value);
                }}
              />
            </Editable>
            <Box
              mt={3}
              h="100%"
              w="100%"
              display="flex"
              justifyContent="flex-end"
            >
              <Checkbox
                onChange={(e) => {
                  setChecked(e.target.checked);
                  markChecked();
                  console.log(e.target.checked);
                }}
                color="white"
                mx={3}
                size="lg"
                colorScheme="green"
                isChecked={checked}
              >
                Done
              </Checkbox>

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
            {/* 
            </Text> */}
          </>
        )}
      </Box>
    </Box>
  );
}
