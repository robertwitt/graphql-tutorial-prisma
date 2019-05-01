import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

const createPostForUser = async (authorID, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorID
                }
            }
        }
    }, '{ id }')

    const user = await prisma.query.user({
        where: {
            id: authorID
        }
    }, '{ id name email posts { id title published } }')

    return user
}

// createPostForUser('cjv5113yx002j0718417agycx', {
//     title: 'Great books to read',
//     body: 'The War of Art',
//     published: true 
// }).then(user => console.log(JSON.stringify(user, undefined, 2)))

const updatePostForUser = async (postId, data) => {
    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data: {
            ...data
        }
    }, '{ author { id } }')

    const user = await prisma.query.user({
        where: {
            id: post.author.id
        }
    }, '{ id name email }')

    return user
}

// updatePostForUser('cjv5d9etr00kr0718uihc8ko8', {
//     published: false 
// }).then(user => console.log(JSON.stringify(user, undefined, 2)))