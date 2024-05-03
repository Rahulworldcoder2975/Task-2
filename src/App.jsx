import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import for generating unique IDs

const styles = {
  container: {
    backgroundColor: '#f0f0f0', // Light gray background color
    padding: '20px', // Add padding to the container
    margin: '20px', // Add margin to the container
  },
  paper: {
    backgroundColor: 'white', // White paper color
    padding: '20px', // Add padding to the paper
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow for a paper-like effect
    borderRadius: '8px', // Add border radius for rounded corners
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    marginBottom: '20px', // Add margin to the table
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '10px',
  },
  tableData: {
    padding: '10px',
    border: '1px solid #ddd',
  },
  inputField: {
    padding: '8px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '150px',
  },
  button: {
    backgroundColor: '#4CAF50', /* Green */
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    cursor: 'pointer',
    marginRight: '10px',
  },
};

function App() {
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [newData, setNewData] = useState({ id: '', name: '', age: '' });

  const addData = (newData) => {
    const existingData = tableData.find((data) => data.id === newData.id);
    console.log(existingData)
    if (!existingData) {
      setTableData([...tableData, newData]);
      setNewData({ id: uuidv4(), name: '', age: '' });
      setCount(count + 1);
    } else {
      console.warn('Duplicate data found. Please enter a unique ID.');
    }
  };

  const editData = (id, updatedData) => {
    setTableData(
      tableData.map((data) =>
        data.id === id ? { ...data, ...updatedData } : data
      )
    );
    
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleAdd = () => {
    if (validateData(newData)) {
      addData(newData);
    } else {
      console.warn('Please enter name and age');
    }
  };

  const handleUpdate = () => {
    if (validateData(newData)) {
      editData(newData.id, newData); // Use newData.id for update
      setCount(count + 1);
      setNewData({ id: uuidv4(), name: '', age: '' });

    } else {
      console.warn('Please enter name and age');
    }
  };

  const handleSelectRow = (id) => {
    const selectedData = tableData.find((data) => data.id === id);
    if (selectedData) {
      setNewData(selectedData); // Pre-fill update fields with selected data
    } else {
      console.warn('Row not found');
    }
  };

  const validateData = (data) => {
    // Check for empty name or age
    if (!data.name || !data.age) {
      return false; // Validation failed
    }
    return true; // Validation passed
  };

  return (
    <div style={styles.container}>
      <div style={styles.paper}>
        <h1>Data Management</h1>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Age</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => (
              <tr key={data.id}>
                <td style={styles.tableData}>{data.name}</td>
                <td style={styles.tableData}>{data.age}</td>
                <td style={styles.tableData}>
                  <button
                    onClick={() => handleSelectRow(data.id)}
                    style={styles.button}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <input
            type='text'
            placeholder='Name'
            value={newData.name}
            onChange={handleInputChange}
            name='name'
            style={styles.inputField}
          />
          <input
            type='number'
            placeholder='Age'
            value={newData.age}
            onChange={handleInputChange}
            name='age'
            style={styles.inputField}
          />
          <button onClick={handleAdd} style={styles.button}>
            Add
          </button>
          <button onClick={handleUpdate} style={styles.button}>
            Update
          </button>
        </div>

        <p>Count: {count}</p>
      </div>
    </div>
  );
}

export default App