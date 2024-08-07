import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {TodoListProps} from "./props";
import {TodoListState} from "./state";

export const TodoListContext = createContext<TodoListContext>(undefined);
export type TodoListContext = ComponentContext<TodoListProps, TodoListState>;
