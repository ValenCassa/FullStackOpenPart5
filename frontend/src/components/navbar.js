import { Container, Box, Image, Text } from '@chakra-ui/react';
import logo from '../dist/logo.png'


const Navbar = () => {
  return (
    <Box w='100%' display='flex' justifyContent='center' p={2} backgroundColor='#FBFBFB' boxShadow='0px 4px 16px rgba(0, 0, 0, 0.1)'>
      <Image src={logo} />
      <Text fontFamily='Kiona' fontWeight='400' fontSize='25px' mt={1} ml={1}>SUFFIX</Text>
    </Box>
  )
}

export default Navbar