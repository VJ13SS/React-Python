import { Box, Button, Container, Flex, Text, useColorMode, useColorModeValue } from "@chakra-ui/react"
import CreateUserModel from "./CreateUserModel"
const Navbar = ({setUsers}) => {
    
    return (
        <Container maxW={"900px"}>
            <Box
            px={4}
            my={4}
            borderRadius={5}
            bg={useColorModeValue("gray.500","gray.700")}
            >
                <Flex h= "16"
                alignItems={"center"}
                justifyContent={"space-between"}
                >
                    <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={3}
                    display={{base:"none",sm:"flex"}}>
                        {/*left side */}
                        <Text fontSize={"30px"} color={"white"}>#Friendship</Text>

                    </Flex>
                    <Flex gap={3} alignItems={"center"}>
                        {/*right side */}
                        <Text fontSize={"25px"} fontWeight={500} color={"white"} display={{base:"none",md:"block"}}>BFFShip🔥</Text>                       
                        <CreateUserModel setUsers={setUsers}/>
                    </Flex>

                </Flex>
                
            </Box>
        </Container>
    )
}

export default Navbar