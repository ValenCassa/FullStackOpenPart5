import { Input, Container, Box, Text, Accordion, AccordionButton, AccordionIcon, AccordionPanel, AccordionItem, Textarea, IconButton, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { IoMdSend } from 'react-icons/io'

export const CreateBlog = ({ title, handleTitle, blog, handleBlog, handleBlogSubmit }) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex='1' textAlign='left' fontSize='16px' fontWeight='400'>Want to create a blog?</Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <form onSubmit={handleBlogSubmit}>
          <Input mb={2} fontSize='16px' fontWeight='600' placeholder='Write the title here...' value={title} onChange={handleTitle} id='blog_title'/> 
          <Textarea fontSize='14px' value={blog} onChange={handleBlog} placeholder='Start writing here...' id='blog_content'/>
          <IconButton type="submit" id='blog_submit' w='80px' mt={4} _hover={{ backgroundColor: '#482ff7' }} backgroundColor='#2d6cdf' icon={<IoMdSend color='white'/>}/>
        </form>
      </AccordionPanel>
    </AccordionItem>
  )
}

const CreateBlogSection = ({ username, logOut, createBlog }) => {

  const [title, setTitle] = useState('')
  const [newBlog, setBlog] = useState('')

  const handleNewTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleNewBlog = (event) => {
    setBlog(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      content: newBlog,
    })

    setTitle('')
    setBlog('')
  }

    
  return (
    <Container maxW='container.md' borderRadius='4px' backgroundColor='#FBFBFB'>
      <Container fontFamily='CreatoDisplay' maxW={{ base: 'container.sm', md: 'container.lg' }} mt={10} py={3}>
        <Box>
          <Box display='flex'>
            <Text flex='1' fontWeight='600' fontSize='20px' mb={4}>Welcome {username}!</Text>
            <Button size='sm' colorScheme='red' onClick={logOut}>Log Out</Button>
          </Box>
          <Accordion allowMultiple>
            <CreateBlog title={title} handleTitle={handleNewTitle} blog={newBlog} handleBlog={handleNewBlog} handleBlogSubmit={addBlog}/>

          </Accordion>
        </Box>
      </Container>
    </Container>
  )
}

export default CreateBlogSection