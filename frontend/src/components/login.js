import React from 'react'
import { Box, Text, Input, Container, Divider, IconButton, InputGroup, InputRightElement, Accordion, AccordionButton, AccordionIcon, AccordionPanel, AccordionItem } from '@chakra-ui/react'
import { BiSend } from 'react-icons/bi'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { useState } from 'react'
import PropTypes from 'prop-types'

const StyledInput = ({ placeholder, ...props }) => {
  return (
    <Input  _focus={{ outline: 'none' }} p={2.5} fontFamily='CreatoDisplay' fontWeight='500' placeholder={placeholder} backgroundColor='#E0E0E0' _placeholder={{ 'color': '#A7A7A7', fontWeight: '400' }} {...props}/>
  )
}

const StyledButton = ({ ...props }) => {
  return (
    <IconButton mt={3} _hover={{ backgroundColor: '#482ff7' }} w='100%' backgroundColor='#2d6cdf' icon={<BiSend color='white'/>} {...props}/>
  )
}

const StyledPass = ({ ...props }) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup>
      <Input type={show ? 'text' : 'password'} _focus={{ outline: 'none' }} p={2.5} fontFamily='CreatoDisplay' fontWeight='500' placeholder='password...' backgroundColor='#E0E0E0' _placeholder={{ 'color': '#A7A7A7', fontWeight: '400' }} {...props} />
      <InputRightElement>
        <IconButton size='sm' h='68%' colorScheme={show ? 'red' : 'blue'} onClick={handleClick} icon={show ? <AiFillEyeInvisible /> : <AiFillEye />}/>
      </InputRightElement>
    </InputGroup>
  )
}

const LoginForm = ({ loginSubmition, regSubmition }) => {
    
  const [newLogUsername, setLogUsername] = useState('')
  const [newLogPassword, setLogPassword] = useState('')

  const [newRegUsername, setRegUsername] = useState('')
  const [newRegPassword, setRegPassword] = useState('')
  const [newName, setName] = useState('')

  const handleNewLogUsername = (event) => {
    setLogUsername(event.target.value)
  }
    
  const handleNewLogPassword = (event) => {
    setLogPassword(event.target.value)
  }


  const handleNewRegUsername = (event) => {
    setRegUsername(event.target.value)
  }

  const handleNewRegPassword = (event) => {
    setRegPassword(event.target.value)
  }

  const handleNewName = (event) => {
    setName(event.target.value)
  }

  const loginAction = (event) => {
    event.preventDefault()

    loginSubmition({
      username: newLogUsername,
      password: newLogPassword
    })

    setLogUsername('')
    setLogPassword('')

  }

  const registerAction = (event) => {
    event.preventDefault()

    regSubmition({
      username: newRegUsername,
      name: newName,
      password: newRegPassword
    })

    setRegUsername('')
    setRegPassword('')
    setName('')
  }

  return (
        
    <Container maxW='container.md' borderRadius='4px' backgroundColor='#FBFBFB' mt={8}>
      <Accordion allowMultiple border='white' outline='none'>
        <AccordionItem>
          <AccordionButton>
            <Box flex='1' fontSize='18px' fontWeight='600' textAlign='center'>Log in / Register</Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Container maxW={{ base: 'container.sm', md: 'container.lg' }}py={3} justifyContent='center'>
              <Box display={{ base: 'block', md: 'flex' }} justifyContent='center' >
                <form onSubmit={loginAction}>
                  <Box mb={{ base: '20px', md: 'unset' }}>
                    <Text textAlign='center' mb={2} fontFamily='CreatoDisplay' fontWeight='600' fontSize='18px' color='#E4487C'>Log in</Text>
                    <StyledInput placeholder='username...' mb={3} value={newLogUsername} onChange={handleNewLogUsername} id='username'/>
                    <br/>
                                
                    <StyledPass value={newLogPassword} onChange={handleNewLogPassword} id='password'/>
                    <StyledButton type='submit' id='login-button'/>
                  </Box>
                </form>
                <Divider orientation='vertical' width='2px' mx={4} backgroundColor='black'/>
                <form onSubmit={registerAction}>
                  <Box>
                    <Text textAlign='center' mb={2} fontFamily='CreatoDisplay' fontWeight='600' fontSize='18px' color='black'>Register</Text>
                    <Box display='flex' mb={3}>
                      <StyledInput placeholder='username...' mr={4} value={newRegUsername} onChange={handleNewRegUsername} id='reg_username'/>
                      <StyledInput placeholder='name...' value={newName} onChange={handleNewName} id='reg_name'/>
                    </Box>
                    <StyledPass value={newRegPassword} onChange={handleNewRegPassword} id='reg_pass' />
                    <StyledButton type='submit' id='reg_submit'/>
                  </Box>
                </form>
              </Box>
            </Container>
          </AccordionPanel>
        </AccordionItem>

      </Accordion>

    </Container>
  )
}


LoginForm.propTypes = {
  loginSubmition: PropTypes.func.isRequired,
  regSubmition: PropTypes.func.isRequired
}

export default LoginForm