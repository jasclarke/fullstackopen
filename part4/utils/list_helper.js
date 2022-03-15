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


module.exports = {
    dummy,
    totalLikes
}