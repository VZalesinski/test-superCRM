import type { FC } from 'react'
import styles from './Header.module.scss'
import addIcon from '../../assets/icons/add_bold.svg'

interface HeaderProps {
	counter: number
}

export const Header: FC<HeaderProps> = ({ counter }) => {
	return (
		<div className={styles.header__row}>
			<span className={styles.header__text}>Today</span>

			<div className={styles.header__buttons}>
				<button className={styles.header__add_button} onClick={() => {}}>
					<img src={addIcon} alt='add' />
				</button>

				<div className={styles.header__items_counter}>{counter}</div>
			</div>
		</div>
	)
}
