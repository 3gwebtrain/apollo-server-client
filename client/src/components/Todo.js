import React, { useContext } from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "../graphql/Mutation";
import { GET_TODOS } from "../graphql/Query";
import { TodoContext } from "./../TodoContext";

const Todo = ({ id, title, detail, date }) => {
    const { selectedId, setSelectedId } = useContext(TodoContext);
    const [deleteTodo] = useMutation(DELETE_TODO);

    const removeTodo = (id) => {
        deleteTodo({
            variables: {
                id: id
            }, refetchQueries: [{ query: GET_TODOS }]
        })
    }

    return (
        <a onClick={() => setSelectedId(id)} alt="link" className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{title} </h5>
                <small className="text-muted">{moment(date).format("MMMM DD YY")}</small>
            </div>
            <p className="mb-1">{detail}</p>
            <small className="text-muted" onClick={() => removeTodo(id)}>
                <img alt="" src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/32/000000/external-delete-multimedia-kiranshastry-solid-kiranshastry.png" />
            </small>
        </a>
    )
}

export default Todo;