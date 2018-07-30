import React, { Component } from 'react';
import './App.css';
import initialData from './model/initial-data';
import Column from './component/Column';
import '@atlaskit/css-reset';
import {DragDropContext} from 'react-beautiful-dnd';

class App extends Component {
  state =  initialData;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if(!destination) {
        return;
    }

    if(
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return;
    }

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
        ...column,
        taskIds: newTaskIds,
    };

    const newState = {
        ...this.state,
        columns: {
            ...this.state.columns,
            [newColumn.id]: newColumn,
        }
    };

    this.setState(newState);
  };

    render() {
        return(
        <DragDropContext onDragEnd = {this.onDragEnd} >
            {this.state.columnOrder.map(columnId => {
               const column = this.state.columns[columnId];
               const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

               return <Column ley={column.id} column = {column} tasks = {tasks} />;
            })}
        </DragDropContext>
        );
  }
}

export default App;
