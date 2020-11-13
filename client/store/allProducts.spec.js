/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {fetchProducts} from './allProducts'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = []

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchProducts', () => {
    it('eventually dispatches the GET_ALL_PRODUCTS action', async () => {
      const fakeProducts = [
        {
          id: 1,
          name: 'Cookie',
          description: 'delicious',
          price: 5,
          quantity: 10
        },
        {
          id: 2,
          name: 'Cake',
          description: 'yum',
          price: 5,
          quantity: 10
        }
      ]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProducts)
    })
  })
})
