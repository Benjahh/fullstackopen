
const listHelper = require('../utils/list_helper')

const blog = [
    {
        id: 1,
        likes: 3
    },
    {
        id: 2,
        likes: 4
    },
    {
        id: 3,
        likes: 5
    }
]
const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]


describe('Total likes', () => {
    test('of empty list is zero', () => {
        const emptyBlog = []
        const result = listHelper.totalLikes(emptyBlog)
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)


})

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blog)
        expect(result).toBe(12)
    })
    
})