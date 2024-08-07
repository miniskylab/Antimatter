import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {TodoListContext} from "../models";

export function useTodoListContext(): NonNullable<TodoListContext> { return useContextOrThrow(TodoListContext); }
