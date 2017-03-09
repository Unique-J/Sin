import { connect } from 'react-redux';
import { Counter } from '../../components';
import * as ActionCreators from '../../actions/counter';

export default connect(
  state => ({ counter: state.counter }),
  ActionCreators
)(Counter);
