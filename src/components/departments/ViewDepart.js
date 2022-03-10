import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default class ListDepart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departs: [],
        };
    }

    viewDepart() {
        fetch(`http://localhost:8080/departs/${id}`)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                departs: json
            });
        })
    }

    render() {
        return (
            <>
            <Link className="btn btn-primary" to="/departments">List Department</Link>
            <h3 className="display-4">Department Id: {id}</h3>
               <hr />
             <ul className="list-group col-12 col-md-9 col-lg-6 px-0">
                <li className="list-group-item text-break">Department Name: {departs.departmentName}</li>
                {/* <li className="list-group-item text-break">Description: {departs.description}</li> */}
            </ul>
            </>
        )
    }
}

// const ViewDepart = () => {

//     const [depart, setDepart] = useState({
//         name: "",
//         description: "",
//     });

//     const { id } = useParams();

//     useEffect(() => {
//         loadDepart();
//     }, []);

//     const loadDepart = async () => {
//         const res = await axios.get(`http://localhost:8080/departs/${id}`);
//         setDepart(res.data);
//     };

//     return (
//         <>
//             <Link className="btn btn-primary" to="/departments">List Department</Link>
//             <h3 className="display-4">Department Id: {id}</h3>
//             <hr />
//             <ul className="list-group col-12 col-md-9 col-lg-6 px-0">
//                 <li className="list-group-item text-break">Name: {depart.name}</li>
//                 <li className="list-group-item text-break">Description: {depart.description}</li>
//             </ul>
//         </>
//     );
// };

// export default ViewDepart;