'use strict'

import { test } from 'tap'
import build from './app.js'


test('requests the "/items" route', async t => {
    const app = build()

    const response = await app.inject({
        method: 'GET',
        url: 'items'
    })
    t.equal(response.statusCode, 200, 'returns a status code of 200')
})