import React, { useState, useEffect } from "react";
import "../../css/widgets/fakeNumberWidget.css";

const FakeNumberWidget = () => {
const [user, setUser] = useState([]);

  const getUser = () => {
    fetch('http://localhost:3000/api/user')
    .then(response => response.json())
    .then(json => setUser(json))
    .catch(error => console.error("Error fetching user:", error)); 
  }
useEffect(() => { 
getUser();
}
, []);

  return(
    <div>
     {user.map(data => (
      <div key={data.id} className="user">
        <h2>{data.name}</h2>
        <p>{data.email}</p>
        <p>{data.phone}</p>
      </div>
     ))}
    </div>
  );

};

export default FakeNumberWidget;
