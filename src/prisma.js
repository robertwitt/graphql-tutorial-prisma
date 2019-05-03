import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'thisismysupersecrettext'
})

export { prisma as default }

// const createPostForUser = async (authorID, data) => {
//     const userExists = await prisma.exists.User({
//         id: authorID
//     })
//     if (!userExists) {
//         throw new Error('User not found')
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorID
//                 }
//             }
//         }
//     }, '{ author { id name email posts { id title published } } }')

//     return post.author
// }

// createPostForUser('cjv51wxt600dn07185zxbuusj', {
//     title: 'Great books to read',
//     body: 'The War of Art',
//     published: true 
// }).then(user => console.log(JSON.stringify(user, undefined, 2)))
//     .catch(error => console.log(error))

// const updatePostForUser = async (postId, data) => {
//     const postExists = await prisma.exists.Post({
//         id: postId
//     })
//     if (!postExists) {
//         throw new Error('Post not found')
//     }
    
//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postId
//         },
//         data: {
//             ...data
//         }
//     }, '{ author { id name email } }')

//     return post.author
// }

// updatePostForUser('cjv5d9etr00kr0718uihc8ko8', {
//     published: false 
// }).then(user => console.log(JSON.stringify(user, undefined, 2)))
//     .catch(error => console.log(error))