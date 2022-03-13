import { React, useState } from "react";
import "../submission/Submit.css";

const Submit = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                }),
            });
            let resJson = await res.json();
            if (res.status == 200) {
                setName("");
                setEmail("");
                setPhone("");
                setMessage("Submit successfull");
            } else {
                setMessage("error rip roi");
            } 
        } catch (err) {
            console.log(err);
            alert(message);       
        }
    };

    return (
        <div className="submit">
            <form onSubmit={handleSubmit}>

                <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}/>

                <input
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}/>

                <input
                type="text"
                value={phone}
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}/>

                <button type="submit">Submit</button>

                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
        </div>
    );
}

export default Submit;