import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import { ADD_TODO, UPDATE_TODO } from "../graphql/Mutation";
import { GET_TODOS, GET_TODO } from "../graphql/Query";
import { TodoContext } from "../TodoContext";


const AddTodos = () => {
    const { selectedId, setSelectedId } = useContext(TodoContext);
    const [todo, setTodo] = useState({ title: '', detail: '', date: '' });
    useQuery(GET_TODO, { variables: { id: selectedId }, onCompleted: (data) => setTodo(data.getTodo) });

    const [updateTodo] = useMutation(UPDATE_TODO);
    const inputAreaRef = useRef();

    const [addTodo] = useMutation(ADD_TODO);


    const onSubmit = e => {
        e.preventDefault();
        if (selectedId === 0) {
            addTodo({
                variables: {
                    title: todo.title,
                    detail: todo.detail,
                    date: todo.date
                }, refetchQueries: [
                    { query: GET_TODOS }
                ]
            });
        } else {
            updateTodo({
                variables: {
                    id: selectedId,
                    title: todo.title,
                    detail: todo.detail,
                    date: todo.date
                }, refetchQueries: [
                    { query: GET_TODOS }
                ]
            });
        }
        setTodo({ title: '', detail: '', date: '' })
    }

    useEffect(() => {
        const checkIfClickedOutSide = e => {
            if (!inputAreaRef.current.contains(e.target)) {
                setSelectedId(0)
            } else {
                console.log("Inside of the input area");
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutSide);
        return () => document.removeEventListener("mousedown", checkIfClickedOutSide);
    }, [setSelectedId]);

    return (
        <div>
            <form onSubmit={onSubmit} ref={inputAreaRef}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" value={todo.title} onChange={e => setTodo({ ...todo, title: e.target.value })} className="form-control" placeholder="enter title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Detail</label>
                    <input type="text" value={todo.detail} onChange={e => setTodo({ ...todo, detail: e.target.value })} className="form-control" placeholder="enter detail" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Date</label>
                    <input type="date" value={moment(todo.date).format("YYYY-MM-DD")} onChange={e => setTodo({ ...todo, date: e.target.value })} className="form-control" placeholder="enter detail" />
                </div>
                <button type="submit" className="btn btn-primary">{(selectedId === 0) ? "Add" : "Update"}</button>
            </form>

        </div>
    )
}

export default AddTodos;