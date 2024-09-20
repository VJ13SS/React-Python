import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import { data } from "../dummy/dummydata";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";

const UserGrid = ({users,setUsers}) =>{
    const [isLoading,setIsLoading] = useState(false)

    {/*Fetching data from the api */}
    useEffect(() => {
        const getUsers = async () =>{
        try{
            const res = await fetch('http://127.0.0.1:5000/api/friends')
            const data = await res.json();
            console.log(data)
            if(!res.ok){
                throw new Error(data.error)
            }
            setUsers(data);
        }
        catch(error){
            console.error(error)
        }
        finally{
            setIsLoading(false)
        }
    };
    getUsers();
},[setUsers])
    return (
        <>
        <Grid templateColumns={{
            base:"1fr",
            md:"repeat(2, 1fr)",
            lg:"repeat(3, 1fr)",
        }}>
            {users.map((user)=>{
                return(
                    <UserCard key={user.id} user={user} setUsers={setUsers}/>
                )
            })}
        </Grid>
        {isLoading && (
            <Flex justifyContent={'center'}>
                <Spinner size={'xl'} />
            </Flex>
        )}
        {!isLoading && users.length === 0 &&(
            <Flex justifyContent={'center'}>
                <Text fontSize={'xl'}>
                    <Text as={'span'} fontSize={'2xl'} fontWeight={'bold'}>
                        Poor You😭 
                    </Text>
                    No Friends Found 
                </Text>
            </Flex>
        )}
        </>
    )
};

export default UserGrid;