import { useState, useMemo, type FC } from 'react'
import styles from './Card.module.scss'
import { faker } from '@faker-js/faker'
import { formatDate } from '../../utils'
import rectangleImg from '../../assets/icons/Rectangle-card.svg'
import avatarImg from '../../assets/avatar.png'

interface CardProps {
	completed: boolean
	title: string
}

export const Card: FC<CardProps> = ({ title, completed }) => {
	const [checked, setChecked] = useState(completed)
	const description = useMemo(() => faker.commerce.productDescription(), [])
	const startDate = useMemo(() => faker.date.anytime(), [])
	const endDate = useMemo(() => faker.date.anytime(), [])
	const tag1 = useMemo(
		() => faker.lorem.word({ length: { min: 3, max: 7 }, strategy: 'fail' }),
		[]
	)
	const tag2 = useMemo(
		() => faker.lorem.word({ length: { min: 3, max: 7 }, strategy: 'fail' }),
		[]
	)

	return (
		<div className={styles.container__border}>
			<div className={styles.container}>
				<div className={styles.title}>
					<input
						type='checkbox'
						className={styles.input}
						onChange={() => setChecked(!checked)}
						checked={checked}
					/>
					{title}
				</div>

				<div className={styles.dates__row}>
					<p className={styles.date}>{formatDate(startDate)}</p>
					<p className={styles.date}>{formatDate(endDate)}</p>
				</div>

				<p className={styles.description}>{description}</p>

				<div className={styles.footer}>
					<div className={styles.tags__row}>
						<div className={styles.tag1}>{tag1}</div>

						<div className={styles.tag2__wrapper}>
							<div className={styles.tag2}>{tag2}</div>

							<img
								src={rectangleImg}
								alt='rectangle'
								className={styles.rectangle}
							/>
						</div>
					</div>

					<img src={avatarImg} alt='avatar' className={styles.avatar} />
				</div>
			</div>
		</div>
	)
}
