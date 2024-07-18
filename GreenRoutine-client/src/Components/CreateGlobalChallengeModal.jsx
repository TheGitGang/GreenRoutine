import { Button, Row, Col, Modal, ModalHeader, Form, Input, Label, ModalBody, ModalFooter, Alert } from "reactstrap";
import { useEffect, useState } from "react";

const CreateGlobalChallengeModal = ({ userId, isOpen, toggle, handleCreateSubmit }) => {
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState(1);
    const [miles, setMiles] = useState(0);
    const [timeSpan, setTimeSpan] = useState("1.00:00:00");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(1);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/Category/categories', {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
                setError("");
            } else {
                setError('Unable to load categories');
            }
        };
        fetchCategories();
    },[])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        if (name === 'difficulty') setDifficulty(value);
        if (name === 'miles') setMiles(value);
        if (name === 'timeSpan') setTimeSpan(value);
        if (name === 'description') setDescription(value);
        if (name === 'category') setCategory(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !difficulty || !category ) {
            setError("Name, difficulty, and category are required")
        } else {
            setError("");
            const payload = {
                userId: userId,
                name: name,
                difficulty: difficulty,
                miles: Number(miles),
                timeSpan: timeSpan,
                description: description,
                categoryId: category
            }
            const response = await fetch('api/RoleManagement/CreateGlobalChallenge', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const data = await response.json();
                handleCreateSubmit(data);
                setName("");
                setDifficulty(1);
                setMiles(0);
                setTimeSpan("1.00:00:00");
                setDescription("");
                setCategory(1);
                toggle();
            } else {
                setError('Unable to create global challenge')
            }
        }
    }

    const categoryOptions = categories.map((category) => {
        return (
            <option key={category.id} value={category.id}>{category.name}</option>
        )
    })

    return (
       <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader>Create Global Challenge</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col>
                                <Label htmlFor='name'>Challenge Name:</Label>
                                    <Input 
                                        type='text'
                                        id='name'
                                        name='name'
                                        value={name}
                                        onChange={handleChange}
                                    />
                            </Col>
                            <Col>
                                <Label htmlFor='description'>Challenge Description:</Label>
                                    <Input 
                                        type='text'
                                        id='description'
                                        name='description'
                                        value={description}
                                        onChange={handleChange}
                                    />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Label htmlFor='difficulty'>Difficulty:</Label>
                                    <Input 
                                        type="select"
                                        name="difficulty" 
                                        id="difficulty"
                                        value={difficulty}
                                        onChange={handleChange}
                                    >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </Input>
                            </Col>
                            <Col>
                                <Label htmlFor="timeSpan">Timespan: </Label>
                                    <Input 
                                        type="select"
                                        name="timeSpan" 
                                        id="timeSpan"
                                        value={timeSpan}
                                        onChange={handleChange}
                                    >
                                        <option value="1.00:00:00">1 Day</option>
                                        <option value="3.00:00:00">3 Days</option>
                                        <option value="7.00:00:00">1 Week</option>
                                    </Input>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Label htmlFor="category">Category:</Label>
                                    <Input
                                        type='select'
                                        id='category'
                                        name='category'
                                        value={category}
                                        onChange={handleChange}
                                    >
                                        {categoryOptions}
                                    </Input>
                            </Col>
                            <Col>
                                <Label htmlFor="miles">Miles</Label>
                                    <Input
                                        type='text'
                                        id='miles'
                                        name='miles'
                                        value={miles}
                                        onChange={handleChange}
                                    />
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                            <Button color="primary" onClick={handleSubmit}>Create</Button>
                            <Button onClick={() => {
                                toggle();
                                setError("");
                                setName("");
                                setCategory("");
                                setDescription("");
                                setDifficulty(1);
                                setMiles(0);
                                setTimeSpan("1.00:00:00");
                            }}
                            >
                                Cancel
                            </Button>
                </ModalFooter>
                {error && <Alert color='danger' className="mr-2 ml-2">{error}</Alert>}
            </Modal>
       </div>
    )
    
};

export default CreateGlobalChallengeModal;