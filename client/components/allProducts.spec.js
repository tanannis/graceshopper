/* eslint-env mocha */

import 'jsdom-global/register'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import chai, {expect} from 'chai'
import enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllProducts, {AllProducts as UnconnectedAllProducts} from './AllProducts'
import {fetchProducts} from '../store/allProducts'
import sinon from 'sinon'
import mockAxios from '../../Test/mock-axios'

//Tests:
//should render all products
//should be able to filter products by productType

const adapter = new Adapter()
enzyme.configure({adapter})

describe('allProducts component', () => {
  const products = [
    {
      name: 'ice cream cake',
      imageUrl: 'https://i.ibb.co/icecream.jpg',
      description: 'yummy ice cream cake',
      price: 800,
      quantity: 100,
      productType: 'pastry'
    },
    {
      name: 'everything bagel',
      imageUrl: 'https://i.ibb.co/bagel.jpg',
      description: 'best bagel ever',
      price: 300,
      quantity: 10,
      productType: 'pastry'
    },
    {
      name: 'oat cookie',
      imageUrl: 'https://i.ibb.co/oactcookie.jpg',
      description: 'healthy cookie',
      price: 300,
      quantity: 10,
      productType: 'pastry'
    },
    {
      name: 'hot coffee',
      imageUrl: 'https://i.ibb.co/hotcoffee.jpg',
      description: 'best coffeet in NY',
      price: 300,
      quantity: 10,
      productType: 'beverage'
    },
    {
      name: 'apple juice',
      imageUrl: 'https://i.ibb.co/applejuice.jpg',
      description: 'better than jamba juice',
      price: 300,
      quantity: 10,
      productType: 'beverage'
    }
  ]

  beforeEach(() => {
    // mockAxios ensures that when our client-side code requests data from the
    // server, the request is always successful (even if we haven't implemented)
    // our server yet.
    mockAxios.onGet('/api/products').replyOnce(200, products)
  })

  describe('<AllProducts /> component', () => {
    const getProductsSpy = sinon.spy()
    afterEach(() => {
      getProductsSpy.resetHistory()
    })

    it('renders a list of products passed in as props', () => {
      const wrapper = mount(
        <UnconnectedAllProducts
          products={products}
          getProducts={getProductsSpy}
        />
      )
      console.log('WRAPPER', wrapper)
      expect(wrapper.text()).to.include('ice cream cake')
      // expect(wrapper).to.include('yummy ice cream cake')
      // expect(wrapper).to.include('pastry')
    })
  })
})

// describe('App Component', () => {
//   it('renders the Counter wrapper', () => {
//     const wrapper = shallow(<App />);
//     expect(wrapper.find(Counter)).to.have.length(1);
//   });
// })
