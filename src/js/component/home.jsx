import React, { useState, useEffect } from "react";
import "../../styles/index.css";
// Crear tu primer componente
const Home = () => {
	const [inputValue, setInputValue] = useState('');
	const [todos, setTodos] = useState([]);
	
	useEffect(() => {
		console.log('Componente montado, iniciando solicitud GET');
		fetch('https://playground.4geeks.com/todo/users/yahg2005')
		  .then(response => response.json())
		  .then(data => setTodos(data.todos))

		  .catch(error => console.error('Error al cargar las tareas:', error));
	}, []);

	const handleAddTask = () => {
		if (inputValue.trim()) {
			console.log('Añadiendo tarea:', inputValue.trim());
			
			const newTask = { label: inputValue.trim(), done: false };
			console.log('Nueva tarea creada:', newTask);
			
			const updatedTodos = [...todos, newTask];
			console.log('Lista de tareas actualizada:', updatedTodos);
	
			fetch('https://playground.4geeks.com/todo/users/yahg2005', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedTodos),
			})
			.then(response => {
				console.log('Respuesta de la API:', response);
				return response.json();
			})
			.then(data => {
				console.log('Datos recibidos de la API:', data);
				setTodos(updatedTodos);
			})
			.catch(error => console.error('Error al agregar la tarea:', error));
	
			setInputValue('');
		}
	};
	
	const handleDelete = (index) => {
		console.log('Índice de la tarea a eliminar:', index);
		
		const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
		console.log('Lista de tareas actualizada después de eliminar:', newTodos);
	
		fetch('https://playground.4geeks.com/todo/users/yahg2005', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newTodos),
		})
		.then(response => {
			console.log('Respuesta de la API:', response);
			return response.json();
		})
		.then(data => {
			console.log('Datos recibidos de la API:', data);
			setTodos(newTodos);
		})
		.catch(error => console.error('Error al eliminar la tarea:', error));
	};
	
	const handleKeyDown = (e) => {
		console.log('Tecla presionada:', e.key);
		if (e.key === "Enter") {
			console.log('Enter presionado, añadiendo tarea');
			handleAddTask();
		}
	};
	

	return (
		<div className="container">
			<h1>todos</h1>
			<ul>
				<li>
					<input 
						type="text" 
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={handleKeyDown}
						placeholder="What do you need to do?" />
				</li>
				{todos.length === 0 ? (
					<li>No hay tareas, añadir tareas</li>
				) : (
					todos.map((item, index) => (
						<li key={index} className="todo-item">
							{item.label}
							<span
								className="fas fa-trash-alt"
								onClick={() => handleDelete(index)}></span>
						</li>
					))
				)}
			</ul>
			<div>{todos.length} tasks left</div>
		</div>
	);
};

export default Home;