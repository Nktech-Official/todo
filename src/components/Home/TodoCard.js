import React from "react";
import { Box, Text } from "@chakra-ui/react";
export default function TodoCard(props) {
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
            <Text fontSize={28} color="white" fontWeight={600}>
              {props.title}
            </Text>
            <Text color="white">{props.desc}</Text>
          </>
        )}
      </Box>
    </Box>
  );
}
