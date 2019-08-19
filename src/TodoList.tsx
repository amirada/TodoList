import * as React from 'react'
import TodoStore from './TodoStore'
import { Todo } from './interfaces'
import TodoItem from './TodoItem'

interface TodoListProps { }

interface TodoListState {
  todos: Todo[]

}
export default class TodoList extends React.Component<TodoListProps,TodoListState> {
  private store: TodoStore = new TodoStore()
 private toggleTodo: (todo: Todo) => void

  constructor(props: TodoListProps) {
    super(props)
    this.state = {
      todos: []
    }
    this.store.onChange((store) => {
     this.setState({ todos: store.todos })
   })
   this.toggleTodo = this.store.toggleTodo.bind(this.store)

}


 ComponentDidMount(){
     this.store.addTodo('salut')
     this.store.addTodo('les gens')
   }

  render() {
    let {todos} = this.state
    return <section className="todoapp">
      <div>
        <header className="header" >
          <h1 >todos</h1>
          <input className="new-todo" placeholder="What needs to be done?" value="" />
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all"></label>
          <ul className="todo-list">
            {todos.map(todo => {
              return <TodoItem todo={todo} key={todo.id} onToggle={this.toggleTodo} />
            }
            )}

            <li className="">
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>list2</label>
                <button className="destroy"></button>
              </div>
              <input className="edit" value="list2" />
            </li>
          </ul>
        </section>
        <footer className="footer"><span className="todo-count">
          <strong>2</strong><span> </span>
          <span >items</span><span> left</span></span>
          <ul className="filters"><li><a href="#/" className="selected">All</a>
          </li><span> </span>
            <li><a href="#/active" className="">Active</a></li>
            <span> </span>
            <li><a href="#/completed" className="">Completed</a></li>
          </ul>
        </footer>
      </div>
    </section>

  }
}
