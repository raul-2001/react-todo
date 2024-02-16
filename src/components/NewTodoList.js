import React, {useCallback, useState} from "react";
import styles from './TodoListItem.module.css'


const CreateNewTodoList = () => {

    const [tableResponse, setTableResponse] = useState([]);
    const [TableTitle, setTableTitle] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);

    const handleNameChange = (event) => {
        setTableTitle(event.target.value);
    }


    const handleCreate = useCallback((event) => {
        event.preventDefault();
        const records = 
        {
            description: "A to-do list",
            name: TableTitle,
            fields: [
              {
                description: "Name of the todo",
                name: "title",
                type: "singleLineText"
              },
              {
                name: "createdTime",
                type: "date",
                options: {
                    dateFormat:{
                        name: "iso",
                        format: "YYYY-MM-DD"
                    }
                }
              },
              {
                name: "completeAd",
                type: "date",
                options: {
                    dateFormat: {
                        name: "iso",
                        format: "YYYY-MM-DD"
                    }
                }
              },
              {
                name: "completed",
                options: {
                  color: "greenBright",
                  icon: "check"
                },
                type: "checkbox"
              }
            ]
        }
        console.log(typeof records)

        try {
            const response = PostTableData(records);
            
            // if (response) {
            //   // setTodoList([...todoList, response]);
            //   fetchData();
            // }
          } catch (error) {
            console.log(error.message);
          }

        setTableTitle("")
       
    }
    )

    const PostTableData = async (todo) => {

        try {

            if (todo.length === 0) {
              return
            };
      
            console.log("post data =>>", todo)
      
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
              },
              body: JSON.stringify(todo)
            }
      
            const url = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables/`;
      
            const response = await fetch(
              url, options
            );
            // console.log("response =>>", response)
      
            if (!response.ok) {
              const message = `Error has accured: ${response.status}`;
              throw new Error(message);
            }
      
            console.log(response)
            const responseData = await response.json();


            setTableResponse([responseData.name]);
        
      
            return responseData;
      
          } catch (error) {
            setIsError(error);
            console.log(error.message);
            return null;
          }
    }


    return(
        <div className={styles.container}>
            <h1 className={styles.headlinePrimary}>New Todo table</h1>
            <form onSubmit={handleCreate} className={styles.searchForm}>
                <label htmlFor="tableName" className={styles.label}>Table Name</label>
                <input 
                id="tableName"
                type="text"
                name="title"
                value={TableTitle}
                onChange={handleNameChange}
                className={styles.input}
                />
                <div>
                    <button type="submit" className={styles.buttonLarge} >Create</button>
                </div>

                <br/>

            </form>
            
            {isError ? <p>Something went wrong ...</p> : 
           
            <h1>Created Table: {tableResponse}</h1>} 
            
        </div>
    )
}

export default CreateNewTodoList;