import { connect } from 'react-redux';
import Nav from '../Nav';

const mapStateToProps = (state) => {
  const auth = state.get('auth');
  return {
    isSignedIn: auth.get('isSignedIn'),
    email: auth.get('email'),
  };
};

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Nav);
