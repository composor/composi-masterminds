import {h, Component} from '../composi'


export const title = new Component({
  container: 'header',
  render: (message) => {
    return (
      <nav>
        <i className="fa fa-gamepad fa-3x text-white my-auto"></i>
        <h1>Composi {message}!</h1>
      </nav>
    )
  }
})
