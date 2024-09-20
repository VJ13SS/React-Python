import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, Toast, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";

const CreateUserModel = ({setUsers}) =>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading,setIsLoading] = useState(false)
    const [inputs,setUserInputs] = useState({
        name:'',
        role:'',
        gender:'',
        description:''
        });
    const toast = useToast()
    const handleCreateUser = async (e) =>{
        e.preventDefault();//prevent page reload
        setIsLoading(true)
        try{
            const res = await fetch('http://127.0.0.1:5000/api/friends',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",//used when we are creating or updating the data
                },
                body:JSON.stringify(inputs)//Passing the inputs to the backend
            })
            const data=await res.json()

            if(!res.ok){
                throw new Error(data.error)
            }
            toast({
                status:'success',
                title:'Yayy',
                description:"Friend Created Successfully.",
                duration:2000,
                position:'top-center'
            });
            onClose();
            setUsers((prevUsers) => [...prevUsers,data]);
        }
        catch(error) {
            toast({
                status:'error',
                title:'Error occured',
                description:error.message,
                duration:4000,
                position:'top-center'
            })
        }
        finally{
            setIsLoading(false)
            setUserInputs({
                name:'',
                role:'',
                gender:'',
                description:''
            })
        }
    }    
        
    return (
        <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20}/>
        </Button>
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        >
            <ModalOverlay />
            <form onSubmit={handleCreateUser}>
            <ModalContent>
                <ModalHeader>My New BFF😊</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex alignItems={"center"} gap={6}>
                        {/*Left*/}
                        <FormControl>
                            <FormLabel>Full name</FormLabel>
                            <Input placeholder="John Doe" value={inputs.name} onChange={(e) => setUserInputs({...inputs,name: e.target.value})}/>
                        </FormControl>
                        {/*Right*/}
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input placeholder="Software Developer" value={inputs.role} onChange={(e) => setUserInputs({...inputs,role: e.target.value})}/>
                        </FormControl>
                    </Flex>
                    <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea 
                            resize={"none"}
                            overflowY={"hidden"}
                            placeholder="He is a software engineer who loves to code and build things" value={inputs.description} onChange={(e) => setUserInputs({...inputs,description: e.target.value})}/>
                    </FormControl>

                    <RadioGroup mt={4}>
                        <Flex gap={5}>
                            <Radio value="male" onChange={(e) => setUserInputs({...inputs,gender:e.target.value})}>Male</Radio>
                            <Radio value="female" onChange={(e) => setUserInputs({...inputs,gender:e.target.value})}>Female</Radio>
                        </Flex>
                    </RadioGroup>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} type="submit">Add</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>

            </form>

        </Modal>
        </>
    )
};

export default CreateUserModel;