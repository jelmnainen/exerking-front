import { connect } from 'react-redux';
import Nav from '../Nav';

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Nav);
