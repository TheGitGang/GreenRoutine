import leafIcon from '../assets/images/leaf.png'
import { Row } from 'reactstrap';

const LeavesCount = ({value}) => {
    return (
        <div className='center-content'>
            <img src={leafIcon} style={{height: '1rem'}}/>
            <span> {value}</span>    
        </div>
    )
};

export default LeavesCount;
