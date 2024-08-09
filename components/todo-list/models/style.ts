import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {DataListStyle} from "@miniskylab/antimatter-data-list";
import {Reminder} from "../components";
import {TodoListProps} from "./props";
import {TodoListState} from "./state";

export type TodoListStyle = (todoListProps: WithoutStyle<TodoListProps>, todoListState: TodoListState) => {
    DataList: DataListStyle;
    Reminder: Reminder.Style;
};
