'use strict'

import { test } from 'tap'
import build from './app.js'
import { Client, request } from 'undici'

let item_id = ''

test('ITEMS GET', async t => {
    const app = build()

    const response = await request('http://localhost:5000/items')

    const { body } = response
    const data = await body.json()
    t.equal(response.statusCode, 200, 'returns a status code of 200')
    t.equal(data.length, 2)
})

test('ITEMS Create an item', async t => {
    const app = build()

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
    const { _id } = await body.json()
    item_id = _id


    t.equal(response.statusCode, 201, 'returns a status code of 201')
})

test('ITEMS Create an item wit the same name', async t => {
    const app = build()

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

    const { body } = response

    t.equal(response.statusCode, 500, 'returns a status code of 500')
})

test('ITEMS Delete previous created item', async t => {
    const app = build()

    const response = await request(`http://localhost:5000/items/${item_id}`,
        {
            method: 'DELETE'
        })

    t.equal(response.statusCode, 200, 'returns a status code of 200')
})