import { useEffect, useState } from "react";
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Alert, Input, Label } from "reactstrap";

const SendChallengeModal = ({ isOpen, toggle, data, userId }) => {

    const [globalChallenges, setGlobalChallenges] = useState([]);
    const [message, setMessage] = useState("");
    //const [challenge, setChallenge] = useState(0);
    const [globalChallenge, setGlobalChallenge] = useState(1);
    const [wageredLeaves, setWageredLeaves] = useState(0);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'message') setMessage(value);
        if (name === 'challenge') setChallenge(value);
        if (name === 'wageredLeaves') setWageredLeaves(value);
        if (name === 'globalChallenge') setGlobalChallenge(value);
       // if (name === 'challenge') setChallenge(value);
    }

    const fetchGlobalChallenges = async () => {
        const response = await fetch('/api/RoleManagement/GetGlobalChallenges', {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setGlobalChallenges(data);
        } else {
            setError('Unable to fetch global challenges')
        }
    }

    useEffect(() => {
        fetchGlobalChallenges();
    }, [])

    const handleSubmit = async () => {
        const payload = {
            sender: userId,
            receiver: data.id,
            globalChallengeId: globalChallenge,
            wageredLeaves: wageredLeaves,
            message: message 
        }
        const response = await fetch('/api/Friend/CreateChallengeRequest', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            setError("Challenge successfully sent!")
            setTimeout(() => {
                toggle();
                setError("");
            }, 2000)
        } else {
            setError("Unable to send challenge.")
        }
    };

    const globalChallengeOptions = globalChallenges.map((challenge) => {
        return (
            <option key={challenge.id} value={challenge.id}>{challenge.name}</option>
        )
    }) 

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader>
                    Send Challenge
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                        <Label htmlFor="globalChallenge">Select a Challenge:</Label>
                            <Input
                                type='select'
                                id='globalChallenge'
                                name='globalChallenge'
                                value={globalChallenge}
                                onChange={handleChange}
                            >
                                {globalChallengeOptions}
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label htmlFor="wageredLeaves">Leaves to Wager: (optional)</Label>
                            <Input
                                type='number'
                                id='wageredLeaves'
                                name='wageredLeaves'
                                value={wageredLeaves}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label htmlFor="message">Message: (optional)</Label>
                            <Input
                                type='textarea'
                                id='message'
                                name='message'
                                value={message}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Send Challenge</Button>
                    <Button onClick={() => {
                        toggle();
                        setMessage("");
                        setChallenge(1);
                        setWageredLeaves(0);
                    }}>Cancel</Button>
                </ModalFooter>
                {error && <Alert color={error === "Challenge successfully sent!" ? 'success' : 'danger'} className="mr-2 ml-2">{error}</Alert>}
            </Modal>
        </div>
    )
};

export default SendChallengeModal;