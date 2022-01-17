import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { BlogCard } from './blogs'
import { prettyDOM } from '@testing-library/dom'
import CreateBlogSection from './createBlog'


test('<CreateBlog /> updates updates parent state and calls onSubmit', () => {

    const createBlog = jest.fn()

    const component = render(
        <div className='createblog'>
            <CreateBlogSection username={'Test'} createBlog={createBlog}/>
        </div>
    )

    const input = component.container.querySelector('input')
    const textarea = component.container.querySelector('textarea')
    const form = component.container.querySelector('form')
    
    fireEvent.change(input, {
        target: { value: 'testing forms' }
    })
    fireEvent.change(textarea, {
        target: { value: 'Testing forms is easy' }
    })
    fireEvent.submit(form)


    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].content).toBe('Testing forms is easy')
})

describe('testing blog', () => {

    test('renders blog', () => {

        const blog = {
            title: 'testing react',
            author: 'Test',
            content: 'This is a test',
            user: null
        }
    
        const component = render(
            <BlogCard title={blog.title} author={blog.author} content={blog.content} user={blog.user} />
        )
        const b = component.container.querySelector('.blog')
    
        console.log(prettyDOM(b))
    
        expect(component.container).toHaveTextContent(
            'testing react'
        )
    })
    
    test('clicking button works', () => {
    
        const blog = {
            title: 'testing react',
            author: 'Test',
            content: 'This is a test',
            user: {
                name: 'Test'
            }
        }
    
        const mockHandler = jest.fn()
    
        const component = render(
            <BlogCard title={blog.title} author={blog.author} content={blog.content} user={blog.user} blogDelete={mockHandler}/>
        )
        
        const button = component.getByText('Delete')
        fireEvent.click(button)
    
        expect(mockHandler.mock.calls).toHaveLength(1)
    })

    test('blog does not render url', () => {
        
        const blog = {
            title: 'testing react',
            author: 'Test',
            content: 'This is a test',
            user: null
        }
    
        const component = render(
            <BlogCard title={blog.title} author={blog.author} content={blog.content} user={blog.user} />
        )


    
        expect(component.container).not.toHaveTextContent(
            'url'
         )
    })

    test('likes button clicked twice', () => {
        
        let blog = {
            title: 'testing react',
            author: 'Test',
            content: 'This is a test',
            user: null,
            likes: 0
        }

        const mockHandler = jest.fn()
    
        const component = render(
            <BlogCard title={blog.title} author={blog.author} content={blog.content} user={blog.user} likesSubmition={mockHandler}/>
        )

        const button = component.getByTestId('likes')

        fireEvent.click(button)
        fireEvent.click(button)
    
        expect(mockHandler.mock.calls).toHaveBeenCalledTimes(2)
    })
})