// No ex 15, 16, 22

import React from 'react';
import { useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import LoginForm from './components/login'
import loginService from './services/login'
import CreateBlogSection from './components/createBlog';
import blogService from './services/services'
import BlogSection from './components/blogs';


function App() {

  const toast = useToast()

  const [newUser, setUser] = useState(null)
  const [allBlogs, setAllBlogs] = useState([])

  useEffect(async () => {
    const blogs = await blogService.getAll()

    setAllBlogs(blogs)
  }, [])

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])




  const handleLogin = async (loginObject) => {
    
    try {
      const user = await loginService.login(loginObject)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      console.log(user)

      toast({
        title: 'Succesful Log-in',
        description: 'Have fun!',
        status: 'success',
        duration: 5000,
        isClosable: true
      })

    } catch (exception) {
      toast({
        title: 'Invalid credentials',
        description: 'Try again',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  

  const handleRegister = async (regObject) => {
    
    try {
      await loginService.register( regObject )

      toast({
        title: 'Account created',
        description: 'Succesful register, you can now log in',
        status: 'success',
        duration: 5000,
        isClosable: true
      })

    } catch (exception) {
      toast({
        title: 'Invalid username or password',
        description: 'Try again',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  const handleBlogPost = async (blogObject) => {
    try {

      const blogToAdd = { title: blogObject.title, author: newUser.name, content: blogObject.content }
      const blog = await blogService.create(blogToAdd)

      setAllBlogs(allBlogs.concat(blog))

      toast({
        title: 'Blog created succesfully',
        description: 'Congratulations!',
        status: 'success',
        duration: 1000,
        isClosable: true
      })

    } catch (exception) {
      toast({
        title: 'Error while creating a Blog',
        description: 'Try again',
        status: 'error',
        duration: 1000,
        isClosable: true
      })
    }

  }

  const handleBlogDelete = async (deleteObject) => {
    try {
      const blogToDelete = allBlogs.find(b => b.title === deleteObject.title) 
      const user = await blogService.deleteBlog(blogToDelete.id)

      setAllBlogs(allBlogs.filter(b => b.title !== deleteObject.title))
      
      toast({
        title: 'Blog removed succesfully',
        status: 'success',
        duration: 1000,
        isClosable: true
      })

    } catch (exception) {
      toast({
        title: 'Error while removing blog',
        status: 'error',
        duration: 1000,
        isClosable: true
      })
    }
  }

  const handleLikes = async (likesObject) => {
    try {
      
      const blogToUpdate = allBlogs.find(blog => blog.title === likesObject.title)
      const user = await blogService.update(blogToUpdate.id, likesObject)
      toast({
        title: 'Thanks for the feedback!',
        status: 'success',
        duration: 1000,
        isClosable: true
      })



      setAllBlogs(allBlogs.map(b => b.title === likesObject.title ? likesObject : b))

    } catch (exception) {
      console.log('error')
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
  }

  

  return (
    <>
      <Navbar />
      {newUser === null ? 
        <LoginForm loginSubmition={handleLogin} regSubmition={handleRegister}/> :
        <CreateBlogSection logOut={handleLogOut} username={newUser.username} createBlog={handleBlogPost}/>}
      <BlogSection blogs={allBlogs} likesSubmition={handleLikes} user={newUser} blogDelete={handleBlogDelete}/>
    </>
  );
}

export default App;
