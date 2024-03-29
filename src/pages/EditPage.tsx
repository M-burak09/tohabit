/*
const [todos, setTodos] = useState([]);
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        handleUserTodos();
        handleUserHabits();
    }, []);

    const handleUserTodos = async () => {
        try {
            let res = await fetch(url.rest + "user/todos/" + sessionStorage.getItem("current_user"));
            if (res.status === 200) {
              const data = await res.json();
              setTodos(data);
            } else {
              const errorData = await res.json();
              console.error('Failed to get data:', errorData);
            }
          } catch (err) {
            console.log(err);
          }
    }

    const handleUserHabits = async () => {
        try {
            let res = await fetch(url.rest + "user/habits/" + sessionStorage.getItem("current_user"));
            if (res.status === 200) {
              const data = await res.json();
              setHabits(data);
            } else {
              const errorData = await res.json();
              console.error('Failed to get data:', errorData);
            }
          } catch (err) {
            console.log(err);
          }
    }


<p>Todo's</p>
            {todos.map((data) => {
                return(
                    // This is test code to show all tasks. The next step will be categorising the dates
                    <div className="flex border" key={data.id}>
                        <input type="checkbox" />
                        <p>{data.title}</p>
                        <img src={data.image} alt={data.image} />
                    </div>
                )
            })}
            <p>Habits</p>
            {habits.map((data) => {
                return(
                    // This is test code to show all tasks. The next step will be categorising the dates
                    <div className="flex border" key={data.id}>
                        <input type="checkbox" />
                        <p>{data.title}</p>
                        <img src={data.image} alt={data.image} />
                    </div>
                )
            })}
*/