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

const mostLikes = (blogList) => {
    if (blogList.length === 0) {
        return null
    } else if (blogList.length === 1) {
        return {
            name: blogList[0].author,
            likes: blogList[0].likes
        }
    } else {
        const authors = []
        let blogs = [...blogList]

        while (blogs.length > 0) {
            const author = {
                name: blogs[0].author,
                likes: 0
            }

            blogs = blogs.filter(blog => blog.author !== author.name)
            author.likes = blogList.reduce((totalLikes, blog) => {
                if (typeof totalLikes === 'number' && blog.author === author.name) {
                    return totalLikes += blog.likes
                } else if (totalLikes.author === author.name || blog.author === author.name) {
                    let likes = 0

                    if (totalLikes.author === author.name) {
                        likes += totalLikes.likes
                    }

                    if (blog.author === author.name) {
                        likes += blog.likes
                    }

                    return likes
                } else if (typeof totalLikes === 'number') {
                    return totalLikes
                } else {
                    return 0
                }
            })

            authors.push(author) 
        }

        return authors.reduce((authorWithMost, author) => 
            authorWithMost.likes > author.likes ? authorWithMost : author
        )
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}