const SearchResultsRender = (results) => {
    for( var result of results)
    {
        if(result.status == "Completed")
        {
            return (
                <div >
                    <div className="card lightgrey-card" key={result.challenge.id}>
                    <h5 className="card-title lightgrey-card">{challenge.name}</h5>
                    <ul className="list-group list-group-flush lightgrey-card">
                        <li className="list-group-item lightgrey-card">Difficulty: {challenge.difficulty}</li>
                        <li className="list-group-item lightgrey-card">Length: {challenge.length}</li>
                        <li className="list-group-item lightgrey-card">Description: {challenge.description}</li>
                        <li className="list-group-item lightgrey-card">Miles: {challenge.miles}</li>
                    </ul>
                    </div>
                </div>
            );
        }
    }
    

    // return (
    //     <div>
    //         {results.length > 0 && (
    //             <div>
    //                 <br/>
    //                 <h2>Search Results: </h2>
    //                 {results.map((challenge) => (
    //                     <div key={challenge.id}>
    //                         <div className="card lightgrey-card" key={challenge.id}>
    //                         <h5 className="card-title lightgrey-card">{challenge.name}</h5>
    //                         <ul className="list-group list-group-flush lightgrey-card">
    //                             <li className="list-group-item lightgrey-card">Difficulty: {challenge.difficulty}</li>
    //                             <li className="list-group-item lightgrey-card">Length: {challenge.length}</li>
    //                             <li className="list-group-item lightgrey-card">Description: {challenge.description}</li>
    //                             <li className="list-group-item lightgrey-card">Miles: {challenge.miles}</li>
    //                         </ul>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         )} 
    //     </div>
    // );
}

export default SearchResultsRender;