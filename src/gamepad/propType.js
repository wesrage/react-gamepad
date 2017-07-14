import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
   PropTypes.shape({
      id: PropTypes.number.isRequired,
      axes: PropTypes.arrayOf(
         PropTypes.shape({
            id: PropTypes.number.isRequired,
            value: PropTypes.number.isRequired,
         }),
      ).isRequired,
      buttons: PropTypes.arrayOf(
         PropTypes.shape({
            id: PropTypes.number.isRequired,
            value: PropTypes.number.isRequired,
            pressed: PropTypes.bool.isRequired,
         }),
      ).isRequired,
   }),
).isRequired;
