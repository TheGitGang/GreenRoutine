import JSConfetti from 'js-confetti';
import './Home.css'

const Home = () => {
    const handleClick = () => {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
    }
    return (
        <div className='centerContent'>
            <h1>This is a homepage!</h1>
            <button onClick={handleClick}>Confetti!</button>
        </div>
    )
}

export default Home;