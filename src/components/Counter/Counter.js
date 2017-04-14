import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

function Counter(props) {
  const { counter, increment, asyncPost } = props;
  // console.log(counter.counter);
  return (
    <div>
      <Helmet title="TEST" />
      {counter.counter}
      {' '}
      <button onClick={() => increment()}>Add</button>
      <br />
      {JSON.stringify(counter.async)}
      <button onClick={() => asyncPost()}>Async Post</button>
    </div>
  );
}

Counter.propTypes = {
  counter: PropTypes.object.isRequired,
  asyncPost: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired
};

export default Counter;
