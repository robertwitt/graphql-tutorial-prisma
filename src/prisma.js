import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query.users(null, '{ id name posts { id title } }').then(data => console.log(JSON.stringify(data, undefined, 2)))
// prisma.query.comments(null, '{ id text author { id name } }').then(data => console.log(JSON.stringify(data, undefined, 2)))

// prisma.mutation.createPost({
//     data: {
//         title: "GraphQL 101",
//         body: "",
//         published: false,
//         author: {
//             connect: {
//                 id: "cjv51wxt600dn07185zxbuusj"
//             }
//         }
//     }
// }, '{ id title body published }').then(data => {
//     console.log(data)
//     return prisma.query.users(null, '{ id name posts { id title } }')
// }).then(data => console.log(JSON.stringify(data, undefined, 2)))

prisma.mutation.updatePost({
    where: {
        id: "cjv5cnd7a00io0718iaiypufv"
    },
    data: {
        body: "This is how to get started with GraphQL ...",
        published: true
    }
}, '{ id body published }')
    .then(() => prisma.query.posts(null, '{ id title body published }'))
    .then(data => console.log(JSON.stringify(data, undefined, 2)))