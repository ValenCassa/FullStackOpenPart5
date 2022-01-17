import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Container,
  Input,
  Button,
  chakra
} from '@chakra-ui/react';

import { AiFillLike } from 'react-icons/ai'

import { useState } from 'react';


export const BlogCard = ({ title, content, author, likes, likesSubmition, user, blogDelete }) => {

  const [disabled, setDisabled] = useState(false)

  const handleLikes = (event) => {
    event.preventDefault()

    likesSubmition({
      title: title,
      author: author,
      content: content,
      likes: likes + 1
    })

    setDisabled(true)
  }

  const handleDelete = (event) => {
    event.preventDefault()

    blogDelete({
      title: title,
    })
  }


  return (
    <Center fontFamily='CreatoDisplay' pb={3} mb={3}>
      <Box
        maxW={'650px'}
        w={'full'}
        bg='white'
        boxShadow='md'
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Stack>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={600}
              fontSize={'sm'}
              letterSpacing={1.1}>
              Blog
            </Text>
            {user !== null ? (user.name === author ? <Button onClick={handleDelete} size={'xs'} colorScheme={'red'}>Delete</Button>: null): null}
          </Box>
          <Heading
            color='gray.700'
            fontSize={'2xl'}
          >
            {title}
          </Heading>
          <Text color={'gray.500'} className='blog'>
            {content}
          </Text>
        </Stack>

        <Box display={'flex'} justifyContent={'space-between'}>
          <Box mt={6} fontSize={'14px'}>
            <Text fontWeight={600}>{author}</Text>
            <Text color={'gray.500'}>6min read</Text>
          </Box>
          <Box display={'flex'}>
            <Button data-testid='likes' id='likes' disabled={disabled} onClick={handleLikes} color={'white'} leftIcon={<AiFillLike color='white'/>} right={0} mt={6} backgroundColor={'#28c7fa'} _hover={{ backgroundColor: '#3d5af1' }}><chakra.span mt='0.15em'>{likes}</chakra.span></Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}

const Filter = ({ filter, onChange }) => {
  return (
    <Box display={'flex'} px='8em' pt={6} justifyContent={'center'}><Input fontFamily={'CreatoDisplay'} fontWeight={'500'} size={'sm'} value={filter} onChange={onChange} placeholder='Filter...'></Input></Box>
  )
}

const NoFilter = ({ blogs, likesSubmition, user, blogDelete }) => {
  

  return (
    <Box py={6}>
      {blogs.sort(( a,b ) => b.likes - a.likes).map(blog => {
        return(
          <BlogCard key={blog.title} user={user} blogDelete={blogDelete} likesSubmition={likesSubmition} title={blog.title} author={blog.author} content={blog.content} likes={blog.likes} />
        )
      })}
    </Box>
  )
}

const Filtered = ({ blogs, filter, likesSubmition, user, blogDelete }) => {
  return (
    <Box py={6}>
      {blogs.map(blog => {
        if (blog.title.toLowerCase().includes(filter.toLowerCase())) {
          return(
            <BlogCard key={blog.title} user={user} blogDelete={blogDelete} likesSubmition={likesSubmition} title={blog.title} author={blog.author} content={blog.content} likes={blog.likes} />
          )
        }
      })}
    </Box>
  )
}


const BlogSection = ({ blogs, likesSubmition, user, blogDelete }) => {
  
  const [newFilter, setFilter] = useState('')

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <Container mt={6} maxW='container.md' borderRadius='4px' backgroundColor='#FBFBFB'>
      <Container maxW={'container.md'}>
        <Filter filter={newFilter} onChange={handleFilter}/>
        {newFilter === '' ? <NoFilter user={user} blogDelete={blogDelete} blogs={blogs} likesSubmition={likesSubmition} /> : <Filtered blogDelete={blogDelete} user={user} blogs={blogs} likesSubmition={likesSubmition} filter={newFilter} />}
      </Container>
    </Container>
        
  )
}

export default BlogSection