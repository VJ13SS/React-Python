import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, Toast, useToast } from "@chakra-ui/react";
import { BiTrash } from 'react-icons/bi'
import EditModal from "./EditModal";

const UserCard = ({user,setUsers}) =>{
    const toast = useToast()
    const handleDelete = async () =>{
        try{
            const res = await fetch(`http://127.0.0.1:5000/api/friends/delete/${user.id}`,{
                method:"DELETE",
            })
            const data = await res.json()

            if(!res.ok){
                throw new Error(data.error)
            }

            setUsers((prevUsers) => prevUsers.filter((prevUser)=> prevUser.id !== user.id))
            toast({
                status:'success',
                title:'Success',
                description:"Friend Deleted Successfully.",
                duration:2000,
                position:'top-center'
            });
        }
        catch(error){
            console.error(error)
            toast({
                status:'error',
                title:'Error occured',
                description:error.message,
                duration:4000,
                position:'top-center'
            })
        }
    }
    return (
        <Card m={5}>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex={"1"} gap={4}>
                        <Avatar src={user.imgUrl} />
                        <Box>
                            <Heading size='sm'>{user.name}</Heading>
                            <Text>{user.role}</Text>
                        </Box>
                    </Flex>
                    <Flex>
                        <EditModal user={user} setUsers={setUsers}/>
                        <IconButton
                        variant='ghost'
                        colorScheme="red"
                        size={'sm'}
                        aria-label="See Menu"
                        icon={<BiTrash size={20} />}
                        onClick={handleDelete}/>
                    </Flex>

                </Flex>
            </CardHeader>
            <CardBody>
                <Text>{user.description}</Text>
            </CardBody>
        </Card>
    )
};
export default UserCard;