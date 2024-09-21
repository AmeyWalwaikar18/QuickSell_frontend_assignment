import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Header from './Header';
import Column from './Column';

function App() {
  const [tickets,setTickets] = useState([]);
  const [users,setUsers] = useState([]);
  const [groupBy,setGroupBy] = useState("status");
  const [sortBy,setSortBy] = useState("priority");
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
    .then((response) => response.json())
    .then((data) => {
      console.log("showing data:",data);
      console.log("showing only tickets: ",data.tickets );
      console.log("showing only users: ",data.users );
      setTickets(data.tickets);
      setUsers(data.users);
      setLoading(false);
      // console.log("showing tickets: ",tickets);
      // console.log("showing users: ",users);
    })
    .catch((error) => {
      console.log("Error fetching data: ",error);
      setLoading(false);
    })
  },[]);

  console.log("showing tickets: ",tickets);
  console.log("showing users: ",users);

  // we also want the user name based on the user_id
  const getUserName = (userId) => {
    const user = users.find((user) => 
      user.id === userId
    );
    return user ? user.name : "User not found";
  };

  // we also want to group tickets on the basis of status, user, priority
  const groupTickets = (tickets,groupBy) => {
    const grouped = {};
    // we will now iterate over the tickets one by one
    tickets.forEach((ticket) => {
      let groupKey;
      if(groupBy === "user"){
        // we will now group on the basis of users
        groupKey = getUserName(ticket.userId);
      }
      else{
        groupKey = ticket[groupBy] || "No " + groupBy;
      }

      if(!grouped[groupKey]){
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(ticket);
    });

    return grouped;
  }

  // we allso want to sort tickets by priority or title
  const sortTickets = (tickets,sortBy) => {
    return tickets.sort((a,b) => {
      if(sortBy === "priority"){
        return b.priority - a.priority;
      }
      if(sortBy === "title"){
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };
  
  // this is basically an object of multiple arrays
  const groupedTickets = groupTickets(tickets,groupBy);
  Object.keys(groupedTickets).forEach((key) => {
    groupedTickets[key] = sortTickets(groupedTickets[key], sortBy);
  });

  if(loading) return <div>Loading...</div>;


  return (
    <div className="App">
     <Header setGroupBy = {setGroupBy} setSortBy = {setSortBy}>
      {/* <div className='kanban-board'>
        {Object.keys(groupedTickets).map((group) => (
          <Column key={group} title={group} tickets={groupedTickets[group]} />
        ))}
      </div> */}
     </Header>
     <div className='kanban-board'>
        {Object.keys(groupedTickets).map((group) => (
          <Column key={group} title={group} group={groupBy} tickets={groupedTickets[group]} />
        ))}
      </div>
    </div>
  );
}

export default App;
