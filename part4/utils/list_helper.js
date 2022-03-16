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


module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}