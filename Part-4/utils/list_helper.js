
const totalLikes = (blog) => {
       return blog.length === 0 ? 0 : blog.reduce((acc, blog) => acc + blog.likes, 0)
    }


module.exports = {
    totalLikes
}