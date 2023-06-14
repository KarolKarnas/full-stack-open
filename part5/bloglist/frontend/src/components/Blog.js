const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author} {blog.likes} <a href={blog.url}>link</a>
  </div>  
)

export default Blog