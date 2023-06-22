import React from "react";

import { Box, Chip, Typography } from "@mui/material";

import { IAttributeGroupListDrawer } from "../../types";
import styles from './AttributeGroupListDrawer.module.css';

export const AttributeGroupListDrawer: React.FC<IAttributeGroupListDrawer> = (props) => {
	const { attribute_groups, open } = props;
	return (
		<div className={styles.modalContainer} style={{ display: open ? "flex" : "none" }}>

			<div className={styles.modal}>
				<div className={styles.modalGrid}>
					{attribute_groups?.map((attribute: any, index: number) => (

						<div key={`${index}_${attribute.ExtID}`} className={styles.item}>
							<Box mb="10px">

								<Typography
									variant='h4'
									fontWeight='600'
								>
									{attribute.Name ? attribute.Name : <i>Аттрибут группа без имени</i>}
								</Typography>

								<Chip sx={{ margin: "5px 0" }} label={`Min=${attribute.Min}`} />
								<Chip sx={{ margin: "5px 10px" }} label={`Max=${attribute.Min}`} />
								<Box mb='.5rem' />

								{attribute?.Attributes ?
									attribute?.Attributes?.map((atr_name: any, index: number) => (
										<Typography
											key={`${atr_name.ext_id}^${atr_name.name}`}
											variant='h4'
											fontWeight='400'
											mb='.8rem'
										>
											{atr_name.name ? atr_name.name : "<i>Аттрибут без имени</i>"}
										</Typography>
									))
									: null

								}
							</Box>
						</div>

					))}
				</div>
			</div>

		</div>
	);
};
