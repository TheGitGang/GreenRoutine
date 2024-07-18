import { Button, Card, CardTitle, Col, Row } from "reactstrap";
import CreateGlobalChallengeModal from "./CreateGlobalChallengeModal";
import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import RemoveGlobalChallengeButton from "./RemoveGlobalChallengeButton";

const AdminPage = () => {
    const [globalChallenges, setGlobalChallenges] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [userId, setUserId] = useState("");
    const [displayModal, setDisplayModal] = useState(false);

    const toggle = () => {
        setDisplayModal(!displayModal);
    }

    const handleCreateSubmit = async (challenge) => {
        setGlobalChallenges(prevChallenges => [...prevChallenges, challenge])
    }

    const handleRemoveSubmit = async (challengeId) => {
        const payload = {
            challengeId: challengeId
        }
        const response = await fetch('/api/RoleManagement/DeleteGlobalChallenge', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            setGlobalChallenges(prevChallenges => prevChallenges.filter(challenge => challenge.id !== challengeId))
        } else {
            console.log('Unable to remove challenge')
        }
    };

    const fetchGlobalChallenges = async () => {
        const response = await fetch('/api/RoleManagement/GetGlobalChallenges', {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            setGlobalChallenges(data);
        } else {
            console.log('Unable to fetch global challenges')
        }
    }

    useEffect(() => {
        fetchGlobalChallenges();
    }, [])

    useEffect(() => {
        const fetchUserId = async () => {
            const response = await fetch('pingauth', {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                setUserId(data.id);
            }
        }
        fetchUserId();
    }, [])

    const formatChallenges = (challenges) => {
        if (challenges) {
            return challenges.map((challenge) => {
                const timeSpan = challenge.timeSpan === "1.00:00:00" ? "1 day" :
                    challenge.timeSpan === "3.00:00:00" ? "3 days" :
                        challenge.timeSpan === "7.00:00:00" ? "1 week" :
                            challenge.timeSpan;

                return {
                    id: challenge.id,
                    name: challenge.name,
                    description: challenge.description,
                    category: challenge.category,
                    difficulty: challenge.difficulty,
                    timeSpan: timeSpan,
                    miles: challenge.miles
                };
            })
        }
    }

    useEffect(() => {
        setRowData(formatChallenges(globalChallenges))
    }, [globalChallenges])

    const columnDefs = [
        { field: "name", filter: true, headerName: "Challenge Name" },
        { field: "description", filter: true, headerName: "Description" },
        { field: "category", filter: true, headerName: "Category" },
        { field: "difficulty", filter: true, headerName: "Difficulty" },
        { field: "timeSpan", headerName: "Timespan" },
        { field: "miles", headerName: "Miles" },
        {
            field: "delete",
            headerName: "Delete",
            cellRenderer: RemoveGlobalChallengeButton,
            cellRendererParams: (params) => ({
                data: params.data,
                handleRemoveSubmit: handleRemoveSubmit
            })
        }
    ];

    const defaultColDef = {
        resizable: true,
        sortable: true,
        flex: 1,
    };

    return (
        <Card className="lightgrey-card">
            <div className="ag-theme-quartz">
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <h3 className="display-6 m-2">
                            Global Challenges
                        </h3>
                    </Col>
                    <Col xs='2' className='d-flex justify-content-end'>
                        <Button color="success m-2" onClick={toggle}>
                            + Create Challenge
                        </Button>
                        <CreateGlobalChallengeModal
                            isOpen={displayModal}
                            toggle={toggle}
                            userId={userId}
                            handleCreateSubmit={handleCreateSubmit}
                        />
                    </Col>
                </Row>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 20, 50]}
                    domLayout="autoHeight"
                    defaultColDef={defaultColDef}
                    frameworkComponents={{
                        removeGlobalChallengeButton: RemoveGlobalChallengeButton
                    }}
                />
            </div>
        </Card>
    )
};

export default AdminPage;