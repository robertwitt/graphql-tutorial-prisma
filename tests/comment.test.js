import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import seedDatabase, { userTwo, commentOne, commentTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { deleteComment } from './utils/operations'

beforeEach(seedDatabase)

test('Should delete own comment', async () => {
    const client = getClient(userTwo.jwt)
    const variables = {
        id: commentOne.comment.id
    }
    await client.mutate({ mutation: deleteComment, variables })
    const commentExists = await prisma.exists.Comment({ id: commentOne.comment.id })

    expect(commentExists).toBe(false)
})

test('Should not delete other users comment', async () => {
    const client = getClient(userTwo.jwt)
    const variables = {
        id: commentTwo.comment.id
    }
    await expect(client.mutate({ mutation: deleteComment, variables })).rejects.toThrow()

    const commentExists = await prisma.exists.Comment({ id: commentTwo.comment.id })
    expect(commentExists).toBe(true)
})