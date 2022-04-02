import React, { useContext, useEffect, useState } from "react";
import { Api, User } from "./services/api";

function Visitor() {
  const { api } = useContext(appContext);
  const [visitors, setVisitors] = useState(0);
  async function effect() {
    const numVisitors = await api.getVisited();
    setVisitors(numVisitors.visited);
  }

  useEffect(() => {
    effect();
  }, []);

  return (
    <div>
      <p>Number of visitors: {visitors} </p>
      <button
        onClick={() => {
          effect();
        }}
      >
        Increase visitors
      </button>
      <button
        onClick={async () => {
          const numVisitors = await api.clearVisited();
          setVisitors(numVisitors.visited);
        }}
      >
        Clear visitors
      </button>
    </div>
  );
}

function Users() {
  const { api } = useContext(appContext);
  const [users, setUsers] = useState<User[]>([]);
  async function effect() {
    const users = await api.getUsers();
    setUsers(users);
  }
  useEffect(() => {
    effect();
  }, []);

  return (
    <div>
      <p>Users {JSON.stringify(users, null, 1)}</p>
      <button
        onClick={async () => {
          await api.makeUser();
          effect();
        }}
      >
        Make User
      </button>
      <button
        onClick={async () => {
          await api.clearUsers();
          effect();
        }}
      >
        Clear users
      </button>
    </div>
  );
}

const appContext = React.createContext({
  api: new Api(process.env.REACT_APP_BACKEND_URL || "api"),
});

function App() {
  return (
    <div className="App">
      <Visitor />
      <Users />
    </div>
  );
}

export default App;
