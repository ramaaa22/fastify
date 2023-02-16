'use strict'

import { test } from 'tap'

import { request } from 'undici'

let item_id = ''
const unexistent_id = 'blablabla'

test('ITEMS GET', async t => {

    const response = await request('http://localhost:5000/items')

    const { body } = response
    const data = await body.json()
    t.equal(response.statusCode, 200, 'returns a status code of 200')
    t.equal(data.length, 2)
})

test('ITEMS Create an item', async t => {

    const item = {
        name: 'Testing',
        price: 500
    }

    const response = await request('http://localhost:5000/items',
        {
            body: JSON.stringify(item),
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

    const { body } = response
    const { _id, name, price } = await body.json()
    item_id = _id


    t.equal(response.statusCode, 201, 'returns a status code of 201')
    t.equal(name, 'Testing')
    t.equal(price, 500)
})

test('ITEMS Update item created previously', async t => {
    const item = {
        price: 900
    }
    const response = await request(`http://localhost:5000/items/${item_id}`,
        {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

    const { body } = response
    const { price } = await body.json()

    t.equal(response.statusCode, 200, 'succesfully modified')
    t.equal(price, 900, `correct price ${price}`)
})

test('ITEMS Create an item with the same name', async t => {

    const item = {
        name: 'Testing'
    }

    const response = await request('http://localhost:5000/items',
        {
            body: JSON.stringify(item),
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

    t.equal(response.statusCode, 500, 'returns a status code of 500')
})

test('ITEMS Update item sending the same name', async t => {
    const item = {
        price: 1900,
        name: 'Testing'
    }
    const response = await request(`http://localhost:5000/items/${item_id}`,
        {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

    const { body } = response
    const { price } = await body.json()

    t.equal(response.statusCode, 200, 'succesfully modified')
    t.equal(price, 1900, `correct price ${price}`)
})

test('ITEMS Delete previous created item', async t => {

    const response = await request(`http://localhost:5000/items/${item_id}`,
        {
            method: 'DELETE'
        })

    t.equal(response.statusCode, 200, 'returns a status code of 200')
})

test('ITEMS Try to delete unexistent item', async t => {

    const response = await request(`http://localhost:5000/items/${unexistent_id}`,
        {
            method: 'DELETE'
        })

    const { body } = response
    const { statusCode } = await body.json()

    t.equal(statusCode, 404, 'item to delete not found')
})

