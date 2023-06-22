import React from 'react';
import cn from 'classnames';

import { OrderStatusProps } from './OrderStatus.props';
import styles from './OrderStatus.module.css';

export const OrderStatus: React.FC<OrderStatusProps> = (props) => {
	const { className, children, appearance, ...otherProps } = props;

	const cls = cn(styles.status, className, {
		[styles.ready]: appearance === 'ready',
		[styles.accepted]: appearance === 'accepted',
		[styles.new]: appearance === 'new',
		[styles.delivered]: appearance === 'delivered',
		[styles.courier]: appearance === 'courier',
	});

	return (
		<div className={cls} {...otherProps}>
			{children}
		</div>
	);
};