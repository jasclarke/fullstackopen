const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogList) => {
    if (blogList.length === 0) {
        return 0
    } else if (blogList.length === 1) {
        return blogList[0].likes
    } else {
        return blogList.reduce((totalLikes, blog) => {
            return typeof totalLikes === 'number' 
                ? totalLikes += blog.likes 
                : totalLikes.likes += blog.likes
        })
    }
}

const favouriteBlog = (blogList) => {
    if (blogList.length === 0) {
        return null
    } else if (blogList.length === 1) {
        return blogList[0]
    } else {
        return blogList.reduce((favBlog, blog) => {
            return favBlog.likes > blog.likes ? favBlog : blog
        })
    }
}

const mostBlogs = (blogList) => {
    if (blogList.length === 0) {
        return null
    } else if (blogList.length === 1) {
        return {
            name: blogList[0].author,
            blogs: 1
        }
    } else {
        const authors = []
        let blogs = [...blogList]

        while (blogs.length > 0) {
            const author = {
                name: blogs[0].author,
                blogs: blogs.length
            }

            blogs = blogs.filter(blog => blog.author !== author.name)
            author.blogs -= blogs.length
            authors.push(author) 
        }

        return authors.reduce((authorWithMost, author) => 
            authorWithMost.blogs > author.blogs ? authorWithMost : author
        )
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}