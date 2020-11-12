/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const sinon = require('sinon')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'Cody',
          lastName: 'Pug',
          email: 'cody@puppybook.com',
          password: 'hello',
          userType: 'user'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('hello')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })

      it('has fields firstName, lastName, email, passsword, userType', async () => {
        const user = await User.create({
          firstName: 'Sally',
          lastName: 'Ride',
          email: 'sallyride@nasa.gov',
          password: 'hellew',
          userType: 'user'
        })
        expect(user.firstName).to.equal('Sally')
        expect(user.lastName).to.equal('Ride')
        expect(user.email).to.equal('sallyride@nasa.gov')
        //README - do we want to test if password is a function?
        //     expect(user.password).to.equal(get() {
        //   return () => this.getDataValue('password')
        // })
        expect(user.userType).to.equal('user')
      })

      it('email must be a valid email', async () => {
        const user = User.build({
          email: 'figgy'
        })
        try {
          await user.validate()
        } catch (err) {
          expect(err.message).to.contain('Validation isEmail on email failed')
        }
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
