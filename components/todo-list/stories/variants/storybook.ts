import {DataListContextHook, DataListStyle} from "@miniskylab/antimatter-data-list";
import {useBreakpoint} from "@miniskylab/antimatter-framework";
import {type ViewStyle} from "@miniskylab/antimatter-view";
import {TodoListContextHook} from "../../hooks";
import {type TodoListStyle} from "../../models";
import * as TodoListVariant from "../../variants";

const TodoList__DataList__Root: ViewStyle = function (viewProps)
{
    const todoListContext = TodoListContextHook.useTodoListContext();
    const dataListContext = DataListContextHook.useDataListContext();
    const isViewportSizeGreaterThanOrEqualToMediumBreakpoint = useBreakpoint("Medium");

    const inheritedStyle = TodoListVariant.Default(todoListContext.props, todoListContext.state)
        .DataList(dataListContext.props)
        .Root(viewProps);

    return {
        ...inheritedStyle,
        minWidth: 390,
        ...isViewportSizeGreaterThanOrEqualToMediumBreakpoint && {
            maxWidth: 500,
            height: 636
        }
    };
};

const TodoList__DataList: DataListStyle = function (dataListProps)
{
    const todoListContext = TodoListContextHook.useTodoListContext();

    const inheritedStyle = TodoListVariant.Default(todoListContext.props, todoListContext.state)
        .DataList(dataListProps);

    return {
        ...inheritedStyle,
        Root: TodoList__DataList__Root
    };
};

export const Storybook: TodoListStyle = function (todoListProps, todoListState)
{
    return {
        ...TodoListVariant.Default(todoListProps, todoListState),
        DataList: TodoList__DataList
    };
};
