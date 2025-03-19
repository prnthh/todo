const TodoForm = ({ onAddTodo }) => {
    const DEFAULT_TAGS = ['Work', 'Vibin', 'Triage', 'Compliance', 'Other'];
    const [newTask, setNewTask] = React.useState('');
    const [hours, setHours] = React.useState('');
    const [minutes, setMinutes] = React.useState('');
    const [newTag, setNewTag] = React.useState('');
    const [isCustomTag, setIsCustomTag] = React.useState(false);

    const handleTimeChange = (value, type) => {
        const numValue = parseInt(value) || 0;
        
        if (type === 'minutes') {
            const totalHours = Math.floor(numValue / 60);
            const remainingMinutes = numValue % 60;
            
            if (totalHours > 0) {
                setHours(h => (parseInt(h) || 0) + totalHours);
                setMinutes(remainingMinutes.toString());
            } else {
                setMinutes(numValue.toString());
            }
        } else {
            setHours(numValue.toString());
        }
    };

    const handleSubmit = () => {
        const totalMinutes = (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0);
        if (newTask && totalMinutes > 0 && newTag) {
            onAddTodo(newTask, totalMinutes, newTag);
            setNewTask('');
            setHours('');
            setMinutes('');
            setNewTag('');
        }
    };

    const handleTagChange = (e) => {
        const value = e.target.value;
        if (value === 'custom') {
            setIsCustomTag(true);
            setNewTag('');
        } else {
            setIsCustomTag(false);
            setNewTag(value);
        }
    };

    return (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                    type="text"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    placeholder="Task"
                    className="border p-2 rounded-md col-span-2"
                />
                <div className="flex space-x-2">
                    <input
                        type="number"
                        min="0"
                        value={hours}
                        onChange={e => handleTimeChange(e.target.value, 'hours')}
                        placeholder="Hours"
                        className="border p-2 rounded-md w-1/2"
                    />
                    <input
                        type="number"
                        min="0"
                        max="59"
                        value={minutes}
                        onChange={e => handleTimeChange(e.target.value, 'minutes')}
                        placeholder="Mins"
                        className="border p-2 rounded-md w-1/2"
                    />
                </div>
                {isCustomTag ? (
                    <input
                        type="text"
                        value={newTag}
                        onChange={e => setNewTag(e.target.value)}
                        placeholder="Custom Tag"
                        className="border p-2 rounded-md"
                    />
                ) : (
                    <select
                        value={newTag}
                        onChange={handleTagChange}
                        className="border p-2 rounded-md"
                    >
                        <option value="">Select Tag</option>
                        {DEFAULT_TAGS.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                        <option value="custom">Custom Tag...</option>
                    </select>
                )}
                <button
                    className="md:col-span-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                    onClick={handleSubmit}
                >
                    Add Task
                </button>
            </div>
        </div>
    );
};
