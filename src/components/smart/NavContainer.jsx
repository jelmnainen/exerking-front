import { connect } from 'react-redux';
import Nav from '../Nav';

const mapStateToProps = (state) => ({
    teacher: state.auth.isTeacher,
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
