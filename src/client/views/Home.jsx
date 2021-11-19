import React, { Fragment, useState, useEffect } from 'react'

const Home = () => {
    const [formState, setFormState] = useState({
        title: '',
        description: '',
        _id: ''
    })
    const [showData, setShowData] = useState([])


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(formState._id) {
            fetch(`http://localhost:3000/api/tasks/${formState._id}`, {
                method: 'PUT',
                body: JSON.stringify(formState),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html:'Task Updated'})
                setFormState({
                    title:'',
                    description:'',
                    _id:''
                })
                fetchData()
            })
        } else {
            fetch('http://localhost:3000/api/tasks', {
                method:'POST',
                mode: 'cors',
                body: JSON.stringify(formState),
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'Task Saved'})
                    setFormState({
                        title:'',
                        description:'',
                        _id:''
                    })
                    fetchData()
                })
        }
    }

    const fetchData = () => {
        fetch('http://localhost:3000/api/tasks', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => setShowData(data))
    } 

    useEffect(() => {
        fetchData()
    },[])

    const deleteTask = (id) => {
        fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html: 'Task deleted'})
            fetchData()
        })
    }

    const editTask = (id) => {
        fetch(`http://localhost:3000/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setFormState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
        })
    }


    return (
        <Fragment>
            <div className="container">
            <h1>MERN STACK</h1>

                <div className="row">

                    <form className="col s12" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="input-field col s6">
                                <input type="text" id="title" name="title" className="validate" onChange={handleChange} value={formState.title}/>
                                <label htmlFor="title">Title</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input type="text" id="description" name="description" className="validate" onChange={handleChange} value={formState.description}/>
                                <label htmlFor="description">Description</label>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={handleSubmit}>Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </form>

                    <div className="row">
                     
                        <div className="col s6">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    showData.map(item => (
                                        <tr key={item._id}>

                                            <td>{item.title}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <button className="btn light-blue darken-blue" style={{margin:'4px'}} onClick={()=>editTask(item._id)}><i className="material-icons">edit</i></button>
                                                <button className="btn light-blue darken-blue" onClick={() => deleteTask(item._id)}><i className="material-icons">delete</i></button>
                                            </td>
                                            <td></td>
                                        </tr>
                    
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    
                    </div>

                </div>
            </div>
        </Fragment>
    )
}


export default Home;