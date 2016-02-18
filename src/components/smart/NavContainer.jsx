import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Nav from '../Nav';

const mapStateToProps = (state) => ({
    teacher: state.auth.isTeacher,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
