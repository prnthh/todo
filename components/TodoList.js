const TodoItem = React.memo(({ todo, onToggleActive, onUpdateTimeLimit, formatTime }) => {
    const { elapsed, progress, remaining } = useTimer(todo);

    return (
        <li className={`p-4 ${
            todo.completed ? 'text-gray-500 bg-gray-50' : ''
        } ${todo.lastStartTime ? 'bg-blue-50' : ''}`}>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <span className={`font-medium ${todo.completed ? 'line-through' : ''}`}>
                        {todo.task}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 rounded-full text-sm text-blue-800">
                        {todo.tag}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden relative">
                        <div 
                            className={`h-full ${todo.completed ? 'bg-gray-500' : 'bg-green-500'}`}
                            style={{ width: `${progress}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-xs">
                            <span className={progress > 50 ? 'text-white' : 'text-gray-700'}>
                                {formatTime(elapsed)} / {todo.timeLimit}m
                            </span>
                        </div>
                    </div>
                    {!todo.completed && (
                        <button
                        onClick={() => onUpdateTimeLimit(todo.id, todo.timeLimit + 5)}
                        className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        title="Add 5 minutes"
                    >
                        +5m
                    </button>
                    )}
                </div>
                {!todo.completed && (
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => onToggleActive(todo.id)}
                            className={`px-4 py-2 rounded-md text-white ${
                                todo.lastStartTime 
                                ? 'bg-gray-500 hover:bg-gray-600' 
                                : 'bg-green-500 hover:bg-green-600'
                            }`}
                        >
                            {todo.lastStartTime ? 'Stop' : 'Start'}
                        </button>
                        <button
                            onClick={() => onToggleActive(todo.id, true)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Complete
                        </button>
                    </div>
                )}
            </div>
        </li>
    );
});

const TodoList = ({ todos, onToggleActive, onUpdateTimeLimit, formatTime }) => {
    const sortedTodos = [...todos].sort((a, b) => {
        // Sort by completion status first
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        // For active tasks, prioritize those with lastStartTime
        if (!a.completed && !b.completed) {
            if (a.lastStartTime !== b.lastStartTime) {
                return a.lastStartTime ? -1 : 1;
            }
        }
        return 0;
    });

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="text-lg font-semibold p-4 bg-gray-50 border-b">Tasks</h2>
            <ul className="divide-y divide-gray-200">
                {sortedTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggleActive={onToggleActive}
                        onUpdateTimeLimit={onUpdateTimeLimit}
                        formatTime={formatTime}
                    />
                ))}
            </ul>
        </div>
    );
};
