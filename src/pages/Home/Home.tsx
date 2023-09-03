import { useEffect, useState } from 'react'
import type { FC } from 'react'
import styles from './Home.module.scss'
import { Card, Header } from '../../components'
import axios from 'axios'
import { api_url } from '../../api'
import { useInView } from 'react-intersection-observer'

interface todosProps {
	completed: boolean
	id: number
	title: string
	userId: number
}

export const Home: FC = () => {
	const [todos, setTodos] = useState<[] | todosProps[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [fetching, setFetching] = useState(true)
	const [totalCount, setTotalCount] = useState(0)

	const { ref, inView } = useInView({
		threshold: 1,
		triggerOnce: true
	})

	useEffect(() => {
		if (fetching) {
			axios
				.get(`${api_url}?_limit=10&_page=${currentPage}`)
				.then(data => {
					setTodos([...todos, ...data.data])
					setCurrentPage(prevState => prevState + 1)
					setTotalCount(data.headers['x-total-count'])
				})
				.catch(error => console.log(error))
				.finally(() => setFetching(false))
		}
	}, [fetching])

	useEffect(() => {
		if (inView && todos.length < totalCount) setFetching(true)
	}, [inView, totalCount, todos])

	// Infinite Scroll without intersection-observe

	// useEffect(() => {
	// 	const list = document.getElementById('list-todos')
	// 	list?.addEventListener('scroll', scrollHandler)

	// 	return () => {
	// 		list?.removeEventListener('scroll', scrollHandler)
	// 	}
	// }, [totalCount])

	// const scrollHandler = e => {
	// 	if (
	// 		e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) < 100 &&
	// 		todos.length < totalCount
	// 	) {
	// 		setFetching(true)
	// 	}
	// }

	return (
		<div className={styles.main__container}>
			<Header counter={todos.length} />

			<div className={styles.list} id='list-todos'>
				{todos.map(todo =>
					todos.length - 3 === todo.id ? (
						<div ref={ref} key={todo.id}>
							<Card title={todo.title} completed={todo.completed} />
						</div>
					) : (
						<div key={todo.id}>
							<Card title={todo.title} completed={todo.completed} />
						</div>
					)
				)}
			</div>
		</div>
	)
}
