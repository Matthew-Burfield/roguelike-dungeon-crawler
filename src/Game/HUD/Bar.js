import React from 'react';

const Bar = ({ color, height, width, maxVal, currVal }) => {
  const widthCurrVal = (currVal / maxVal) * width;

  return (
    <div style={{ margin: 'auto', width, height, background: 'linear-gradient(#424242, #212121)' }}>
      <div style={{ transition: 'width 0.5s', margin: 'left', width: widthCurrVal, height, background: color }}>{name}</div>
    </div>
  );
};


Bar.propTypes = {
  color: React.PropTypes.string.isRequired,
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  maxVal: React.PropTypes.number.isRequired,
  currVal: React.PropTypes.number.isRequired,
};

export default Bar;
