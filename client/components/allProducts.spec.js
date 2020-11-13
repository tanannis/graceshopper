/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './AllProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('allProducts', () => {
  let allProducts

  beforeEach(() => {
    allProducts = shallow(<AllProducts />)
  })

  it('renders the name in an h2', () => {
    expect(allProducts.find('h2').text()).to.be(true)
    // expect(allProducts.find('h2').text()).to.be.equal('Cookie')
  })
})
