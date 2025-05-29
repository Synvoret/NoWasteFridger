import React from 'react'
import Button from './Button'

function Main() {
  return (
    <>
      <div className="container">
        <div className="p-5 text-center bg-light-dark rounded">
          <h1 className="text-light">Portal</h1>
          <p className="text-light lead">Stock text Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus corrupti doloremque tempora molestias obcaecati nobis aliquid aliquam! Labore perspiciatis illo numquam, minima nostrum accusamus dolore cumque adipisci cupiditate voluptatibus reiciendis?</p>
          <Button text="Explore Now" class="btn-outline-info" url='/dashboard'/>
        </div>
      </div>
    </>
  )
}

export default Main