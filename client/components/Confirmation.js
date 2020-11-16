import React from 'react'

export default class Confirmation extends React.Component {
  render() {
    return (
      <div className="thankYou">
        <h2 className="thankYouContent">
          Thank you for your order! We hope you enjoy your treats!
        </h2>
        <h2 className="thankYouContent">Come back soon!</h2>
        <div className="thankYouContent">
          <img
            id="forkImage"
            src="https://cdn.pixabay.com/photo/2013/07/12/15/07/fork-149488_1280.png"
          />
        </div>
      </div>
    )
  }
}
