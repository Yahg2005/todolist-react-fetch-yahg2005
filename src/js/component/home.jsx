import React, { useState, useEffect } from "react";
import "../../styles/index.css";

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
			
			const nuevaTarea = { label: inputValue.trim(), done: false };
			console.log('Nueva tarea creada:', nuevaTarea);
			
			const tareasActualizadas = [...todos, nuevaTarea];
			console.log('Lista de tareas actualizada:', tareasActualizadas);
	
			fetch('https://playground.4geeks.com/todo/users/yahg2005', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(tareasActualizadas),
			})
			.then(response => {
				console.log('Respuesta de la API:', response);
				return response.json();
			})
			.then(data => {
				console.log('Datos recibidos de la API:', data);
				setTodos(tareasActualizadas);
			})
			.catch(error => console.error('Error al agregar la tarea:', error));
	
			setInputValue('');
		}
	};
	
	const handleDelete = (index) => {
		console.log('Índice de la tarea a eliminar:', index);
		
		const nuevasTareas = todos.filter((_, todoIndex) => todoIndex !== index);
		console.log('Lista de tareas actualizada después de eliminar:', nuevasTareas);
	
		fetch('https://playground.4geeks.com/todo/users/yahg2005', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(nuevasTareas),
		})
		.then(response => {
			console.log('Respuesta de la API:', response);
			return response.json();
		})
		.then(data => {
			console.log('Datos recibidos de la API:', data);
			setTodos(nuevasTareas);
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

	const ClearAll = () => {
		console.log('Eliminando todas las tareas');
		
		const clearTodos = [];
		
		fetch('https://playground.4geeks.com/todo/users/yahg2005', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(clearTodos),
		})
		.then(response => {
			console.log('Respuesta de la API:', response);
			return response.json();
		})
		.then(data => {
			console.log('Datos recibidos de la API:', data);
			setTodos(clearTodos);
		})
		.catch(error => console.error('Error al eliminar todas las tareas:', error));
	};

	const toggleTask = (index) => {
		const updatedTodos = todos.map((todo, todoIndex) => {
			if (todoIndex === index) {
				return { ...todo, done: !todo.done };
			}
			return todo;
		});
		setTodos(updatedTodos);

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
		})
		.catch(error => console.error('Error al actualizar la tarea:', error));
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
						placeholder="¿Qué necesitas hacer?" />
				</li>
				{todos.length === 0 ? (
					<li>No hay tareas, añadir tareas</li>
				) : (
					todos.map((item, index) => (
						<li key={index} className="todo-item">
							<input 
								type="checkbox" 
								checked={item.done}
								onChange={() => toggleTask(index)}
							/>
							{item.label}
							<span
								className="fas fa-trash-alt"
								onClick={() => handleDelete(index)}></span>
						</li>
					))
				)}
			</ul>
			<div>{todos.filter(todo => !todo.done).length} tareas pendientes</div>
			<button onClick={ClearAll} style={{ color: 'white', backgroundColor: 'orange', border: 'none', padding: '10px 20px', borderRadius: '12px' }}>
				Limpiar Lista
			</button>  
		</div>
	);
};

export default Home;
