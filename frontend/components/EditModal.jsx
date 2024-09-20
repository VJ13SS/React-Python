import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { BiEdit } from 'react-icons/bi'

const EditModal = ({user,setUsers}) =>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const [inputs,setUserInputs] = useState({
        name:user.name,
        role:user.role,
        gender:user.gender,
        description:user.description
        });
    const handleEdit = async (e) =>{
        e.preventDefault();
        try{
            const res = await fetch(`http://127.0.0.1:5000/api/friends/update/${user.id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(inputs)
            })
            const data = await res.json()

            if(!res.ok){
                throw new Error(data.error)
            }
            toast({
                status:'success',
                title:'Success',
                description:'Friend Updated Successfully',
                duration:4000,
                position:'top-center'
            })
            setUsers((prevUsers) => prevUsers.map((prevUser) => prevUser.id === user.id ? data:prevUser ))
            onClose();
        }
        catch(error){
            toast({
                status:'error',
                title:'Error occured',
                description:error.message,
                duration:4000,
                position:'top-center'
            })
            console.error(error)
        }
    }
    return(
        <>
        <IconButton
        variant='ghost'
        colorScheme="blue"
        size={'sm'}
        aria-label="See Menu"
        icon={<BiEdit size={20} />}
        onClick={onOpen}/>
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        >
            <ModalOverlay />
            <form onSubmit={handleEdit}>
            <ModalContent>
                <ModalHeader>My New BFF😊</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex alignItems={"center"} gap={6}>
                        <FormControl>
                            <FormLabel>Full name</FormLabel>
                            <Input value={inputs.name} onChange={(e) => setUserInputs((prev) => ({...prev,name:e.target.value}))}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input value={inputs.role} onChange={(e) => setUserInputs((prev) => ({...prev,role:e.target.value}))}/>
                        </FormControl>
                    </Flex>
                    <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea 
                            resize={"none"}
                            overflowY={"hidden"} value={inputs.description} onChange={(e) => setUserInputs((prev) => ({...prev,description:e.target.value}))}/>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} type="submit" onClick={onClose}>Update</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </form>

        </Modal>
        </>
    )
};
export default EditModal;