import React from 'react';

const style = {
};

const Button = ({ clickHandler, children }) =>
  <button style={style} onClick={clickHandler}>
    { children }
  </button>;

Button.propTypes = {
  clickHandler: React.PropTypes.func,
  children: React.PropTypes.string,
};

Button.defaultProps = {
  clickHandler: () => {},
  children: '',
};

export default Button;
